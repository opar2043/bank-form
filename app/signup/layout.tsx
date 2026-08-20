"use client";

import React from "react";
import { SignupProvider, useSignup, getStepIndex, type WizardStep } from "@/lib/signup-store";
import { ProgressBar } from "@/components/wizard/progress-bar";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SignupPage from "./page";
import VerifyPage from "./verify/page";
import Step1Page from "./step-1/page";
import Step2Page from "./step-2/page";
import Step3Page from "./step-3/page";
import Step4Page from "./step-4/page";
import SuccessPage from "./success/page";

const STEP_COMPONENTS: Record<WizardStep, React.ComponentType> = {
  email: SignupPage,
  verify: VerifyPage,
  "step-1": Step1Page,
  "step-2": Step2Page,
  "step-3": Step3Page,
  "step-4": Step4Page,
  success: SuccessPage,
};

function SignupShell() {
  const { currentStep, prevStep, direction } = useSignup();
  const stepIdx = getStepIndex(currentStep);
  const isFirstStep = stepIdx === 0;
  const isLastPage = currentStep === "success";

  const StepComponent = STEP_COMPONENTS[currentStep];

  return (
    <div className="min-h-screen bg-page flex flex-col">
      <div className="bg-white border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center gap-3">
          {isFirstStep || isLastPage ? (
            <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors">
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </Link>
          ) : (
            <button
              onClick={prevStep}
              className="p-2 -ml-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          )}
          <div className="flex-1">
            {!isLastPage && currentStep !== "email" && <ProgressBar currentStep={currentStep} />}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            initial={{ x: direction > 0 ? 80 : -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -80 : 80, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="flex-1"
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function SignupLayout() {
  return (
    <SignupProvider>
      <SignupShell />
    </SignupProvider>
  );
}
