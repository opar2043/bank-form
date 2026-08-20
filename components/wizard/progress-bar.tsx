"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { getStepIndex, type WizardStep } from "@/lib/signup-store";

interface ProgressBarProps {
  currentStep: WizardStep;
}

const STEP_LABELS: { step: WizardStep; label: string }[] = [
  { step: "verify", label: "Verify" },
  { step: "step-1", label: "Personal" },
  { step: "step-2", label: "Contact" },
  { step: "step-3", label: "Income" },
  { step: "step-4", label: "Complete" },
];

export function ProgressBar({ currentStep }: ProgressBarProps) {
  const currentIdx = getStepIndex(currentStep);
  const STEP_ORDER_OFFSET = 1;

  return (
    <div className="w-full px-4">
      <div className="flex items-center justify-between mb-2">
        {STEP_LABELS.map((item, i) => {
          const itemIdx = getStepIndex(item.step);
          const isCompleted = currentIdx > itemIdx;
          const isCurrent = currentIdx === itemIdx;
          return (
            <div key={item.step} className="flex flex-col items-center gap-1.5 relative">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 border-2",
                  isCompleted
                    ? "bg-primary border-primary text-white"
                    : isCurrent
                    ? "border-primary bg-white text-primary"
                    : "border-gray-200 bg-gray-50 text-gray-400"
                )}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium hidden sm:block",
                  isCurrent ? "text-primary" : isCompleted ? "text-foreground" : "text-gray-400"
                )}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.max(0, ((currentIdx - STEP_ORDER_OFFSET) / (STEP_LABELS.length - 1)) * 100)}%` }}
        />
      </div>
    </div>
  );
}
