"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/wizard/otp-input";
import { useSignup } from "@/lib/signup-store";
import { maskEmail, maskPhone } from "@/lib/format";
import { toast } from "sonner";

const CORRECT_OTP = "123456";
const MAX_ATTEMPTS = 3;
const RESEND_SECONDS = 60;

export default function VerifyPage() {
  const { data, updateData, nextStep } = useSignup();
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(RESEND_SECONDS);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const id = setTimeout(() => setTimer((t) => t - 1), 1000);
      return () => clearTimeout(id);
    }
    setCanResend(true);
  }, [timer]);

  const verify = useCallback(
    async (otp: string) => {
      setLoading(true);
      setError(false);
      await new Promise((r) => setTimeout(r, 1500));

      if (otp === CORRECT_OTP) {
        setSuccess(true);
        updateData({ verified: true });
        toast.success("Verification successful!");
        setTimeout(() => nextStep(), 1200);
      } else {
        setAttempts((a) => {
          const newA = a + 1;
          if (newA >= MAX_ATTEMPTS) {
            toast.error("Too many failed attempts. Please request a new code.");
          } else {
            toast.error(`Incorrect code. ${MAX_ATTEMPTS - newA} attempts remaining.`);
          }
          return newA;
        });
        setError(true);
        setCode("");
        setLoading(false);
      }
    },
    [updateData, nextStep]
  );

  const handleComplete = useCallback(
    (otp: string) => {
      if (attempts >= MAX_ATTEMPTS) return;
      verify(otp);
    },
    [attempts, verify]
  );

  const handleResend = async () => {
    setCanResend(false);
    setTimer(RESEND_SECONDS);
    setAttempts(0);
    setError(false);
    toast.success("New verification code sent!");
  };

  const displayIdentifier =
    data.identifierType === "email" ? maskEmail(data.identifier) : maskPhone(data.identifier);

  const timerStr = `${Math.floor(timer / 60).toString().padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`;

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {success ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            >
              <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
            </motion.div>
            <h2 className="text-xl font-bold text-heading mb-2">Verified!</h2>
            <p className="text-sm text-muted-foreground">Redirecting you to the next step...</p>
          </motion.div>
        ) : (
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-heading mb-2">Verify your identity</h1>
              <p className="text-sm text-muted-foreground">
                We sent a 6-digit code to <span className="font-medium text-foreground">{displayIdentifier}</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
              <div className="mb-6">
                <OtpInput
                  value={code}
                  onChange={(v) => { setCode(v); setError(false); }}
                  onComplete={handleComplete}
                  error={error}
                  disabled={loading}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-destructive mt-3"
                  >
                    Incorrect code. Please try again.
                  </motion.p>
                )}
              </div>

              {loading && (
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </div>
              )}

              <Button
                onClick={() => handleComplete(code)}
                disabled={code.length < 6 || loading || attempts >= MAX_ATTEMPTS}
                className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold"
              >
                Verify
              </Button>

              <div className="mt-4 text-center">
                {canResend ? (
                  <button
                    onClick={handleResend}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Resend code
                  </button>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Resend code in <span className="font-medium">{timerStr}</span>
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
