"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput } from "@/components/wizard/field-inputs";
import { PillRadioGroup, CompactRadioGroup } from "@/components/wizard/pill-radio";
import { WhyInfo } from "@/components/wizard/why-info";
import { useSignup } from "@/lib/signup-store";
import { incomeBankSchema, type IncomeBankData } from "@/lib/schemas";
import { formatCurrency, formatRouting, formatAccountNumber } from "@/lib/format";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";

const payFrequencyOptions = [
  { value: "Weekly", label: "Weekly" },
  { value: "Every other week", label: "Every other week" },
  { value: "Twice a month", label: "Twice a month" },
  { value: "Day of the Month", label: "Day of the Month" },
];

const dayOfWeekOptions = [
  { value: "Monday", label: "Mon" },
  { value: "Tuesday", label: "Tue" },
  { value: "Wednesday", label: "Wed" },
  { value: "Thursday", label: "Thu" },
  { value: "Friday", label: "Fri" },
  { value: "Saturday", label: "Sat" },
  { value: "Sunday", label: "Sun" },
];

const bankOptions = [
  { value: "manual", label: "Enter account details manually" },
  { value: "connect", label: "Connect bank account" },
];

const fakeBanks = [
  "Chase", "Bank of America", "Wells Fargo", "Citibank", "Capital One",
  "U.S. Bank", "PNC Bank", "TD Bank", "Truist", "Discover",
];

export default function Step3Page() {
  const { data, updateData, nextStep } = useSignup();
  const [bankConnectOpen, setBankConnectOpen] = useState(false);
  const [connectingBank, setConnectingBank] = useState(false);
  const [connectedBank, setConnectedBank] = useState("");

  const form = useForm({
    resolver: zodResolver(incomeBankSchema),
    defaultValues: {
      payFrequency: data.payFrequency || "",
      payDay: data.payDay || "",
      monthlyIncome: data.monthlyIncome || "",
      bankMethod: (data.bankMethod || "") as "" | "manual" | "connect",
      routingNumber: data.routingNumber || "",
      accountNumber: data.accountNumber || "",
    },
  });

  const payFrequency = form.watch("payFrequency");
  const bankMethod = form.watch("bankMethod");
  const showDayQuestion = payFrequency === "Weekly" || payFrequency === "Every other week";

  const handleConnectBank = async (bank: string) => {
    setConnectingBank(true);
    await new Promise((r) => setTimeout(r, 2000));
    setConnectedBank(bank);
    setConnectingBank(false);
    form.setValue("bankMethod", "connect");
    toast.success(`Connected to ${bank} successfully!`);
    setTimeout(() => setBankConnectOpen(false), 800);
  };

  const onSubmit = (formData: any) => {
    updateData(formData as IncomeBankData);
    nextStep();
  };

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold text-heading mb-1">Income & Bank Details</h1>
          <p className="text-sm text-muted-foreground">Help us understand your income</p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Pay Frequency */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 space-y-4">
            <div>
              <h3 className="text-base font-semibold text-heading mb-1">How often do you get paid?</h3>
              <WhyInfo
                title="Pay Frequency"
                content="We use this to calculate your available earned wages and ensure you don't exceed your limit."
              />
            </div>
            <PillRadioGroup
              options={payFrequencyOptions}
              value={payFrequency}
              onChange={(v) => {
                form.setValue("payFrequency", v);
                if (!showDayQuestion) form.setValue("payDay", "");
              }}
            />
            {form.formState.errors.payFrequency?.message && (
              <p className="text-xs text-destructive">{form.formState.errors.payFrequency.message}</p>
            )}

            {showDayQuestion && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-2"
              >
                <p className="text-sm font-medium text-heading mb-2">
                  Which day do you normally get paid?
                </p>
                <CompactRadioGroup
                  options={dayOfWeekOptions}
                  value={payFrequency === "Every other week" ? (form.watch("payDay") || "") : ""}
                  onChange={(v) => form.setValue("payDay", v)}
                />
              </motion.div>
            )}
          </div>

          {/* Income */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 space-y-3">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              <h3 className="text-base font-semibold text-heading">Monthly Income</h3>
            </div>
            <WhyInfo
              title="Income Information"
              content="Your income helps us determine how much you can access. This information is kept confidential and used solely for verification purposes."
            />
            <FloatingLabelInput
              label="Estimated Monthly Income"
              type="text"
              inputMode="numeric"
              placeholder="3,500"
              error={form.formState.errors.monthlyIncome?.message}
              onChange={(e) => form.setValue("monthlyIncome", formatCurrency(e.target.value))}
              value={form.watch("monthlyIncome")}
            />
          </div>

          {/* Bank Connection */}
          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <h3 className="text-base font-semibold text-heading">Bank Account</h3>
            </div>
            <WhyInfo
              title="Bank Connection"
              content="We need your bank details to deposit funds when you make a withdrawal. Your banking information is encrypted and never shared with third parties."
            />

            <PillRadioGroup
              options={bankOptions}
              value={bankMethod}
              onChange={(v) => {
                form.setValue("bankMethod", v as "manual" | "connect");
                if (v === "connect") setBankConnectOpen(true);
              }}
            />

            {bankMethod === "connect" && connectedBank && (
              <div className="flex items-center gap-2 text-sm text-primary bg-emerald-light/50 rounded-lg p-3">
                <CheckCircle className="w-4 h-4" />
                Connected to {connectedBank}
              </div>
            )}

            {bankMethod === "manual" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-3"
              >
                <FloatingLabelInput
                  label="Routing Number"
                  placeholder="123456789"
                  maxLength={9}
                  inputMode="numeric"
                  error={form.formState.errors.routingNumber?.message}
                  onChange={(e) => form.setValue("routingNumber", formatRouting(e.target.value))}
                  value={form.watch("routingNumber")}
                />
                <FloatingLabelInput
                  label="Account Number"
                  placeholder="Enter account number"
                  maxLength={17}
                  inputMode="numeric"
                  error={form.formState.errors.accountNumber?.message}
                  onChange={(e) => form.setValue("accountNumber", formatAccountNumber(e.target.value))}
                  value={form.watch("accountNumber")}
                />
              </motion.div>
            )}

            {form.formState.errors.bankMethod?.message && (
              <p className="text-xs text-destructive">{form.formState.errors.bankMethod.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold"
          >
            Continue
          </Button>
        </form>

        {/* Connect Bank Dialog */}
        <Dialog open={bankConnectOpen} onOpenChange={setBankConnectOpen}>
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-base font-semibold">
                {connectingBank ? "Connecting..." : "Select your bank"}
              </DialogTitle>
            </DialogHeader>
            {connectingBank ? (
              <div className="py-10 text-center">
                <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Securely connecting to your bank...</p>
              </div>
            ) : connectedBank ? (
              <div className="py-10 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <p className="text-sm font-medium text-heading">Connected to {connectedBank}</p>
              </div>
            ) : (
              <div className="space-y-2 py-2">
                {fakeBanks.map((bank) => (
                  <button
                    key={bank}
                    onClick={() => handleConnectBank(bank)}
                    className="w-full text-left px-4 py-3 rounded-xl border border-border-subtle hover:border-primary hover:bg-emerald-light/30 transition-all text-sm font-medium text-heading"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
}
