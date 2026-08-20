"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/lib/signup-store";

export default function SuccessPage() {
  const { reset } = useSignup();

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("proearn-signup-data");
    };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-8 sm:p-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle className="w-24 h-24 text-primary mx-auto mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold text-heading mb-3"
          >
            Welcome to ProEarn!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mb-8 max-w-sm mx-auto"
          >
            Your account has been created successfully. You&apos;re ready to start accessing your earned wages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Link href="/dashboard">
              <Button className="w-full h-12 bg-primary hover:bg-emerald-dark text-white rounded-xl font-semibold">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={() => reset()}
              >
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
