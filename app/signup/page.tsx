"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/wizard/field-inputs";
import { useSignup } from "@/lib/signup-store";
import { toast } from "sonner";

const emailSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
});

const phoneSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((v) => v.replace(/\D/g, "").length === 10, "Please enter a valid 10-digit phone number"),
});

export default function SignupPage() {
  const { updateData, nextStep } = useSignup();
  const [mode, setMode] = useState<"email" | "phone">("email");

  const emailForm = useForm({ resolver: zodResolver(emailSchema), defaultValues: { email: "" } });
  const phoneForm = useForm({ resolver: zodResolver(phoneSchema), defaultValues: { phone: "" } });

  const onSubmit = (data: { email: string } | { phone: string }) => {
    if ("email" in data) {
      updateData({ identifier: data.email, identifierType: "email", email: data.email });
    } else {
      updateData({ identifier: data.phone, identifierType: "phone", phone: data.phone });
    }
    toast.success("Verification code sent!");
    nextStep();
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-heading mb-2">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email or phone number to get started
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
          {/* Mode Toggle */}
          <div className="flex bg-gray-50 rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("email")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "email"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button
              onClick={() => setMode("phone")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                mode === "phone"
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Smartphone className="w-4 h-4" />
              Phone
            </button>
          </div>

          {mode === "email" ? (
            <form onSubmit={emailForm.handleSubmit(onSubmit)} className="space-y-4">
              <FloatingLabelInput
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                error={emailForm.formState.errors.email?.message}
                {...emailForm.register("email")}
              />
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold"
                disabled={emailForm.formState.isSubmitting}
              >
                Continue
              </Button>
            </form>
          ) : (
            <form onSubmit={phoneForm.handleSubmit(onSubmit)} className="space-y-4">
              <FloatingLabelInput
                label="Phone Number"
                type="tel"
                placeholder="(555) 123-4567"
                error={phoneForm.formState.errors.phone?.message}
                {...phoneForm.register("phone")}
              />
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold"
                disabled={phoneForm.formState.isSubmitting}
              >
                Continue
              </Button>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By continuing, you agree to our{" "}
          <a href="/terms" className="text-primary hover:underline">
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a href="/terms" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </motion.div>
    </div>
  );
}
