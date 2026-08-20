"use client";

import React, { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";

export type WizardStep = "email" | "verify" | "step-1" | "step-2" | "step-3" | "step-4" | "success";

const STEP_ORDER: WizardStep[] = ["email", "verify", "step-1", "step-2", "step-3", "step-4", "success"];

export interface SignupData {
  // Step 0: Verification
  identifier: string;
  identifierType: "email" | "phone";
  verified: boolean;

  // Step 1: Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  pronouns: string;

  // Step 2: Contact & Address
  email: string;
  phone: string;
  streetAddress: string;
  apartment: string;
  state: string;
  city: string;
  zipCode: string;

  // Step 3: Income & Bank
  payFrequency: string;
  payDay: string;
  monthlyIncome: string;
  bankMethod: "manual" | "connect" | "";
  routingNumber: string;
  accountNumber: string;

  // Step 4: Identification
  idType: string;
  idNumber: string;
  idState: string;
  agreeToTerms: boolean;
  marketingOptIn: boolean;
}

const INITIAL_DATA: SignupData = {
  identifier: "",
  identifierType: "email",
  verified: false,
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  pronouns: "",
  email: "",
  phone: "",
  streetAddress: "",
  apartment: "",
  state: "",
  city: "",
  zipCode: "",
  payFrequency: "",
  payDay: "",
  monthlyIncome: "",
  bankMethod: "",
  routingNumber: "",
  accountNumber: "",
  idType: "",
  idNumber: "",
  idState: "",
  agreeToTerms: false,
  marketingOptIn: false,
};

interface SignupContextValue {
  currentStep: WizardStep;
  data: SignupData;
  direction: number;
  completedSteps: WizardStep[];
  setStep: (step: WizardStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (partial: Partial<SignupData>) => void;
  reset: () => void;
}

const SignupContext = createContext<SignupContextValue | null>(null);

const STORAGE_KEY = "proearn-signup-data";

function loadFromStorage(): { data: SignupData; step: WizardStep } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToStorage(data: SignupData, step: WizardStep) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ data, step }));
  } catch {}
}

export function SignupProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("email");
  const [direction, setDirection] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<WizardStep[]>([]);
  const [data, setData] = useState<SignupData>(INITIAL_DATA);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadFromStorage();
    if (saved && STEP_ORDER.includes(saved.step) && saved.step !== "success") {
      setData(saved.data);
      setCurrentStep(saved.step);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && currentStep !== "success") {
      saveToStorage(data, currentStep);
    }
  }, [data, currentStep, hydrated]);

  const setStep = useCallback((step: WizardStep) => {
    setDirection(STEP_ORDER.indexOf(step) > STEP_ORDER.indexOf(currentStep) ? 1 : -1);
    setCurrentStep(step);
  }, [currentStep]);

  const nextStep = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx < STEP_ORDER.length - 1) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setDirection(1);
      setCurrentStep(STEP_ORDER[idx + 1]);
    }
  }, [currentStep, completedSteps]);

  const prevStep = useCallback(() => {
    const idx = STEP_ORDER.indexOf(currentStep);
    if (idx > 0) {
      setDirection(-1);
      setCurrentStep(STEP_ORDER[idx - 1]);
    }
  }, [currentStep]);

  const updateData = useCallback((partial: Partial<SignupData>) => {
    setData((prev) => ({ ...prev, ...partial }));
  }, []);

  const reset = useCallback(() => {
    setData(INITIAL_DATA);
    setCurrentStep("email");
    setCompletedSteps([]);
    setDirection(1);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <SignupContext.Provider
      value={{ currentStep, data, direction, completedSteps, setStep, nextStep, prevStep, updateData, reset }}
    >
      {children}
    </SignupContext.Provider>
  );
}

export function useSignup() {
  const ctx = useContext(SignupContext);
  if (!ctx) throw new Error("useSignup must be used within SignupProvider");
  return ctx;
}

export function getStepIndex(step: WizardStep): number {
  return STEP_ORDER.indexOf(step);
}

export function getTotalSteps(): number {
  return STEP_ORDER.length - 1;
}
