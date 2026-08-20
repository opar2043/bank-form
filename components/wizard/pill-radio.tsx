"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface PillOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface PillRadioGroupProps {
  options: PillOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function PillRadioGroup({ options, value, onChange, disabled, className }: PillRadioGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border-2 transition-all duration-200 text-left",
              selected
                ? "border-primary bg-emerald-light/50"
                : "border-border-subtle bg-white hover:border-gray-300",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-200",
                selected ? "border-primary bg-primary" : "border-gray-300"
              )}
            >
              {selected && (
                <div className="w-2 h-2 rounded-full bg-white" />
              )}
            </div>
            {option.icon && <span className="text-muted-foreground">{option.icon}</span>}
            <span className={cn("text-sm font-medium", selected ? "text-foreground" : "text-foreground/80")}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

interface CompactRadioGroupProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function CompactRadioGroup({ options, value, onChange, disabled }: CompactRadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 text-sm",
              selected
                ? "border-primary bg-emerald-light/50 text-foreground"
                : "border-border-subtle bg-white hover:border-gray-300 text-foreground/80",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                selected ? "border-primary bg-primary" : "border-gray-300"
              )}
            >
              {selected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span className="font-medium">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
