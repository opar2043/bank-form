"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  onComplete?: (value: string) => void;
}

export function OtpInput({ length = 6, value, onChange, disabled, error, onComplete }: OtpInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (!disabled) {
      const firstEmpty = value.split("").findIndex((v) => !v);
      const idx = firstEmpty === -1 ? length - 1 : firstEmpty;
      inputRefs.current[idx]?.focus();
      setFocusedIndex(idx);
    }
  }, [disabled, length, value]);

  const handleChange = useCallback(
    (index: number, digit: string) => {
      if (disabled) return;
      const sanitized = digit.replace(/\D/g, "");
      if (sanitized.length > 1) {
        // paste
        const chars = sanitized.slice(0, length).split("");
        const newValue = value.split("");
        chars.forEach((c, i) => {
          if (index + i < length) newValue[index + i] = c;
        });
        const joined = newValue.join("").slice(0, length);
        onChange(joined);
        const nextIdx = Math.min(index + chars.length, length - 1);
        inputRefs.current[nextIdx]?.focus();
        setFocusedIndex(nextIdx);
        if (joined.length === length && !joined.includes("")) {
          onComplete?.(joined);
        }
        return;
      }
      const newValue = value.split("");
      newValue[index] = sanitized;
      const joined = newValue.join("");
      onChange(joined);
      if (sanitized && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
      if (joined.length === length && !joined.includes("")) {
        onComplete?.(joined);
      }
    },
    [disabled, length, onChange, onComplete, value]
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Backspace") {
        if (!value[index] && index > 0) {
          const newValue = value.split("");
          newValue[index - 1] = "";
          onChange(newValue.join(""));
          inputRefs.current[index - 1]?.focus();
          setFocusedIndex(index - 1);
        } else {
          const newValue = value.split("");
          newValue[index] = "";
          onChange(newValue.join(""));
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
        setFocusedIndex(index - 1);
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    },
    [disabled, length, onChange, value]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
      if (pasted) {
        const newValue = pasted.split("");
        while (newValue.length < length) newValue.push("");
        onChange(newValue.join(""));
        const nextIdx = Math.min(pasted.length, length - 1);
        inputRefs.current[nextIdx]?.focus();
        setFocusedIndex(nextIdx);
        if (pasted.length === length) {
          onComplete?.(pasted);
        }
      }
    },
    [length, onChange, onComplete]
  );

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={length}
          disabled={disabled}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={() => setFocusedIndex(i)}
          className={cn(
            "w-11 h-14 sm:w-12 sm:h-16 text-center text-xl font-semibold rounded-xl border-2 transition-all duration-200 outline-none",
            "bg-white text-foreground",
            error
              ? "border-destructive bg-red-50"
              : focusedIndex === i
              ? "border-primary ring-2 ring-primary/20"
              : value[i]
              ? "border-primary bg-emerald-light/50"
              : "border-border-subtle hover:border-gray-300",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          aria-label={`Digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
