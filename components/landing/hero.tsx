"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, CreditCard, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/landing/navbar";

const features = [
  { icon: <Zap className="w-6 h-6" />, title: "Get Funds Fast", desc: "Access your earned wages in minutes, not days." },
  { icon: <ShieldCheck className="w-6 h-6" />, title: "No Credit Check", desc: "Your credit score is never affected." },
  { icon: <CreditCard className="w-6 h-6" />, title: "Bank-Level Security", desc: "256-bit encryption protects your data." },
  { icon: <Clock className="w-6 h-6" />, title: "24/7 Access", desc: "Withdraw anytime, day or night." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export function LandingPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 sm:pt-24 sm:pb-32">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-light/60 text-emerald-dark text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <Zap className="w-3.5 h-3.5" />
                Earned Wage Access
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-heading leading-tight mb-6">
                Get paid <span className="text-primary">today</span>, not tomorrow
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                Why wait for payday? Access the money you&apos;ve already earned, instantly. No hidden fees, no credit checks.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/signup">
                  <Button size="lg" className="bg-primary hover:bg-emerald-dark text-white rounded-full px-8 text-base font-semibold h-12 w-full sm:w-auto">
                    Get Started — It&apos;s Free
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-base h-12 w-full sm:w-auto border-border-subtle">
                    Log In
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-light/20 to-transparent" />
        </section>

        {/* How it works */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-heading mb-12">How it works</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { step: "1", title: "Sign Up", desc: "Create your account in under 2 minutes." },
                  { step: "2", title: "Connect Bank", desc: "Securely link your bank account." },
                  { step: "3", title: "Get Paid", desc: "Withdraw your earned wages instantly." },
                ].map((item) => (
                  <div key={item.step} className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="font-semibold text-heading mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-border-subtle py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-[10px]">P</span>
              </div>
              <span className="font-semibold text-sm text-heading">ProEarn</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </div>
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} ProEarn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
