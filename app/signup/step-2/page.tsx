"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput, FloatingLabelSelect } from "@/components/wizard/field-inputs";
import { useSignup } from "@/lib/signup-store";
import { contactAddressSchema, type ContactAddressData } from "@/lib/schemas";
import { formatPhone, formatZip } from "@/lib/format";
import { statesCities, stateList } from "@/lib/states-cities";

export default function Step2Page() {
  const { data, updateData, nextStep } = useSignup();

  const form = useForm({
    resolver: zodResolver(contactAddressSchema),
    defaultValues: {
      email: data.email || data.identifier || "",
      phone: data.phone || "",
      streetAddress: data.streetAddress || "",
      apartment: data.apartment || "",
      state: data.state || "",
      city: data.city || "",
      zipCode: data.zipCode || "",
    },
  });

  const selectedState = form.watch("state");
  const cities = selectedState ? (statesCities[selectedState] || []) : [];

  const onSubmit = (formData: ContactAddressData) => {
    updateData(formData);
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
          <h1 className="text-xl font-bold text-heading mb-1">Contact & Address</h1>
          <p className="text-sm text-muted-foreground">How can we reach you?</p>
        </div>

        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FloatingLabelInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              error={form.formState.errors.email?.message}
              {...form.register("email")}
            />

            <FloatingLabelInput
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              error={form.formState.errors.phone?.message}
              onChange={(e) => {
                const formatted = formatPhone(e.target.value);
                form.setValue("phone", formatted);
              }}
              value={form.watch("phone")}
            />

            <FloatingLabelInput
              label="Street Address"
              placeholder="123 Main Street"
              maxLength={200}
              error={form.formState.errors.streetAddress?.message}
              {...form.register("streetAddress")}
            />

            <FloatingLabelInput
              label="Apartment / Unit (optional)"
              placeholder="Apt 4B"
              maxLength={50}
              {...form.register("apartment")}
            />

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">State</label>
                <select
                  className="w-full h-12 rounded-xl border border-border-subtle bg-white text-foreground font-medium px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                  value={form.watch("state")}
                  onChange={(e) => {
                    form.setValue("state", e.target.value);
                    form.setValue("city", "");
                  }}
                >
                  <option value="">Select...</option>
                  {stateList.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {form.formState.errors.state?.message && (
                  <p className="text-xs text-destructive">{form.formState.errors.state.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-muted-foreground">City</label>
                <select
                  className="w-full h-12 rounded-xl border border-border-subtle bg-white text-foreground font-medium px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none disabled:opacity-50 disabled:cursor-not-allowed"
                  value={form.watch("city")}
                  disabled={!selectedState}
                  onChange={(e) => form.setValue("city", e.target.value)}
                >
                  <option value="">{selectedState ? "Select city..." : "Select state first"}</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {form.formState.errors.city?.message && (
                  <p className="text-xs text-destructive">{form.formState.errors.city.message}</p>
                )}
              </div>
            </div>

            <FloatingLabelInput
              label="ZIP Code"
              placeholder="12345"
              maxLength={5}
              error={form.formState.errors.zipCode?.message}
              onChange={(e) => form.setValue("zipCode", formatZip(e.target.value))}
              value={form.watch("zipCode")}
            />

            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold mt-2"
            >
              Continue
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
