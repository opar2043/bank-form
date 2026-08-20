"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLabelSelect } from "@/components/wizard/field-inputs";
import { PillRadioGroup } from "@/components/wizard/pill-radio";
import { ReviewSummary } from "@/components/wizard/review-summary";
import { Checkbox } from "@/components/ui/checkbox";
import { useSignup } from "@/lib/signup-store";
import { identificationSchema, type IdentificationData } from "@/lib/schemas";
import { stateList } from "@/lib/states-cities";
import { toast } from "sonner";

const idTypeOptions = [
  { value: "driver-license", label: "Driver's License" },
  { value: "state-id", label: "Non-Driver State ID" },
  { value: "military", label: "US Military ID" },
  { value: "passport", label: "US Passport" },
];

export default function Step4Page() {
  const { data, updateData, nextStep, reset } = useSignup();
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(identificationSchema),
    defaultValues: {
      idType: data.idType || "",
      idNumber: data.idNumber || "",
      idState: data.idState || "",
      agreeToTerms: data.agreeToTerms || false,
      marketingOptIn: data.marketingOptIn || false,
    },
  });

  const idType = form.watch("idType");
  const showState = idType && idType !== "passport";

  const onSubmit = async (formData: any) => {
    setSubmitting(true);
    setSubmitError("");
    await new Promise((r) => setTimeout(r, 2500));

    const shouldFail = new URLSearchParams(window.location.search).get("fail") === "1";
    if (shouldFail) {
      setSubmitError("We couldn't verify your bank details. Please try again.");
      toast.error("Submission failed. Please try again.");
      setSubmitting(false);
      return;
    }

    updateData({ ...formData, verified: true });
    toast.success("Account created successfully!");
    nextStep();
    setSubmitting(false);
  };

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-5"
      >
        <div className="mb-2">
          <h1 className="text-xl font-bold text-heading mb-1">Identification & Review</h1>
          <p className="text-sm text-muted-foreground">Almost done! Let&apos;s verify your identity.</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* ID Section */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <h3 className="text-base font-semibold text-heading">Government ID</h3>
            </div>

            <PillRadioGroup
              options={idTypeOptions}
              value={idType}
              onChange={(v) => {
                form.setValue("idType", v);
                form.setValue("idNumber", "");
                form.setValue("idState", "");
              }}
            />
            {form.formState.errors.idType?.message && (
              <p className="text-xs text-destructive">{form.formState.errors.idType.message}</p>
            )}

            {idType && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-3"
              >
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-muted-foreground">
                    {idType === "passport" ? "Passport Number" : "ID Number"}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter ID number"
                    maxLength={30}
                    className="w-full h-12 rounded-xl border border-border-subtle bg-white text-foreground font-medium px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    value={form.watch("idNumber")}
                    onChange={(e) => form.setValue("idNumber", e.target.value)}
                  />
                  {form.formState.errors.idNumber?.message && (
                    <p className="text-xs text-destructive">{form.formState.errors.idNumber.message}</p>
                  )}
                  {form.watch("idNumber") && (
                    <p className="text-xs text-muted-foreground">
                      Visible: ••••{form.watch("idNumber").slice(-4)}
                    </p>
                  )}
                </div>

                {showState && (
                  <FloatingLabelSelect
                    label="Issuing State"
                    value={form.watch("idState") || ""}
                    onChange={(v) => form.setValue("idState", v)}
                    options={stateList.map((s) => ({ value: s, label: s }))}
                    placeholder="Select state..."
                    error={form.formState.errors.idState?.message}
                  />
                )}
              </motion.div>
            )}
          </div>

          {/* Review */}
          <ReviewSummary data={data} />

          {/* Agreements */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 space-y-4">
            <h3 className="text-base font-semibold text-heading">Agreements</h3>

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={form.watch("agreeToTerms")}
                onCheckedChange={(v) => form.setValue("agreeToTerms", v as boolean)}
                className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-foreground leading-snug">
                I agree to the{" "}
                <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="/terms" target="_blank" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </a>
              </span>
            </label>
            {form.formState.errors.agreeToTerms?.message && (
              <p className="text-xs text-destructive">{form.formState.errors.agreeToTerms.message}</p>
            )}

            <label className="flex items-start gap-3 cursor-pointer">
              <Checkbox
                checked={form.watch("marketingOptIn")}
                onCheckedChange={(v) => form.setValue("marketingOptIn", v as boolean)}
                className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <span className="text-sm text-muted-foreground leading-snug">
                I&apos;d like to receive product updates and promotional offers via email (optional)
              </span>
            </label>
          </div>

          {submitError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-destructive/20 rounded-xl p-4 text-sm text-destructive"
            >
              {submitError}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
