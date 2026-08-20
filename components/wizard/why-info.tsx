"use client";

import React from "react";
import { HelpCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WhyInfoProps {
  title: string;
  content: string;
}

export function WhyInfo({ title, content }: WhyInfoProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          />
        }
      >
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Why do we need this?</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </DialogContent>
    </Dialog>
  );
}
