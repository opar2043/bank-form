"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-border-subtle sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-bold text-lg text-heading">ProEarn</span>
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Log In
          </Button>
          <Link href="/signup">
            <Button size="sm" className="bg-primary hover:bg-emerald-dark text-white rounded-full px-5">
              Get Started
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden p-2 text-muted-foreground hover:text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="sm:hidden border-t border-border-subtle bg-white px-4 py-4 space-y-3"
        >
          <Link href="/terms" className="block text-sm text-muted-foreground py-2" onClick={() => setOpen(false)}>
            Terms & Conditions
          </Link>
          <div className="pt-2 space-y-2">
            <Button variant="ghost" className="w-full text-muted-foreground" onClick={() => setOpen(false)}>
              Log In
            </Button>
            <Link href="/signup" className="block" onClick={() => setOpen(false)}>
              <Button className="w-full bg-primary hover:bg-emerald-dark text-white rounded-full">
                Get Started
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
