"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingLabelInput, FloatingLabelSelect } from "@/components/wizard/field-inputs";
import { useSignup } from "@/lib/signup-store";
import { personalDetailsSchema, type PersonalDetailsData } from "@/lib/schemas";
import { calculateAge } from "@/lib/format";
import { toast } from "sonner";

const pronounOptions = [
  { value: "He/Him", label: "He/Him" },
  { value: "She/Her", label: "She/Her" },
  { value: "They/Them", label: "They/Them" },
  { value: "Self-describe", label: "Prefer to self-describe" },
  { value: "Not specified", label: "Prefer not to say" },
];

export default function Step1Page() {
  const { data, updateData, nextStep } = useSignup();
  const [ageError, setAgeError] = useState("");

  const form = useForm<PersonalDetailsData>({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dateOfBirth: data.dateOfBirth || "",
      pronouns: data.pronouns || "",
    },
  });

  const handleDobChange = (value: string) => {
    form.setValue("dateOfBirth", value);
    if (value) {
      const dob = new Date(value);
      if (!isNaN(dob.getTime())) {
        const age = calculateAge(dob);
        if (age < 18) {
          setAgeError("You must be 18 or older to sign up");
          toast.error("You must be 18 or older to sign up");
        } else {
          setAgeError("");
        }
      }
    } else {
      setAgeError("");
    }
  };

  const onSubmit = (formData: PersonalDetailsData) => {
    if (formData.dateOfBirth) {
      const age = calculateAge(new Date(formData.dateOfBirth));
      if (age < 18) {
        setAgeError("You must be 18 or older to sign up");
        toast.error("You must be 18 or older to sign up");
        return;
      }
    }
    updateData(formData);
    nextStep();
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 100);

  return (
    <div className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-6">
          <h1 className="text-xl font-bold text-heading mb-1">Personal Details</h1>
          <p className="text-sm text-muted-foreground">Tell us a bit about yourself</p>
        </div>

        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <FloatingLabelInput
                label="First Name"
                placeholder="John"
                maxLength={50}
                error={form.formState.errors.firstName?.message}
                {...form.register("firstName")}
              />
              <FloatingLabelInput
                label="Last Name"
                placeholder="Doe"
                maxLength={50}
                error={form.formState.errors.lastName?.message}
                {...form.register("lastName")}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Date of Birth
              </label>
              <input
                type="date"
                max={maxDate.toISOString().split("T")[0]}
                min={minDate.toISOString().split("T")[0]}
                className="w-full h-12 rounded-xl border border-border-subtle bg-white text-foreground font-medium px-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                value={form.watch("dateOfBirth")}
                onChange={(e) => handleDobChange(e.target.value)}
              />
              {(form.formState.errors.dateOfBirth?.message || ageError) && (
                <p className="text-xs text-destructive">
                  {ageError || form.formState.errors.dateOfBirth?.message}
                </p>
              )}
            </div>

            <FloatingLabelSelect
              label="Pronouns"
              value={form.watch("pronouns")}
              onChange={(v) => form.setValue("pronouns", v)}
              options={pronounOptions}
              placeholder="Select pronouns..."
              error={form.formState.errors.pronouns?.message}
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
