"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="space-y-1.5">
        <Label htmlFor={inputId} className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            "h-12 rounded-xl border-border-subtle bg-white text-foreground font-medium",
            "focus:border-primary focus:ring-2 focus:ring-primary/20",
            error && "border-destructive focus:border-destructive focus:ring-destructive/20",
            className
          )}
          {...props}
        />
        {(error || helperText) && (
          <p className={cn("text-xs", error ? "text-destructive" : "text-muted-foreground")}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

interface FloatingLabelSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}

export function FloatingLabelSelect({
  label,
  value,
  onChange,
  options,
  error,
  placeholder = "Select...",
  disabled,
  id,
}: FloatingLabelSelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-1.5">
      <Label htmlFor={selectId} className="text-xs font-medium text-muted-foreground">
        {label}
      </Label>
      <select
        id={selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={cn(
          "w-full h-12 rounded-xl border bg-white text-foreground font-medium px-3 text-sm appearance-none",
          "focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all",
          error ? "border-destructive" : "border-border-subtle",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          !value && "text-muted-foreground"
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
