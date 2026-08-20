"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutDashboard, DollarSign, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignupProvider, useSignup } from "@/lib/signup-store";

export const dynamic = "force-dynamic";

function DashboardContent() {
  const { data, reset } = useSignup();

  return (
    <div className="min-h-screen bg-page">
      <div className="bg-white border-b border-border-subtle">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-lg text-heading">ProEarn</span>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => reset()}>
              <LogOut className="w-4 h-4" />
              Sign Out
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-heading mb-1">
              Welcome, {data.firstName || "there"}!
            </h1>
            <p className="text-sm text-muted-foreground">Here&apos;s your account overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Available Balance</span>
              </div>
              <p className="text-3xl font-bold text-heading">$0.00</p>
              <p className="text-xs text-muted-foreground mt-1">Connect your bank to get started</p>
            </div>

            <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">This Month</span>
              </div>
              <p className="text-3xl font-bold text-heading">$0</p>
              <p className="text-xs text-muted-foreground mt-1">No withdrawals yet</p>
            </div>

            <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-light flex items-center justify-center">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">Pay Frequency</span>
              </div>
              <p className="text-lg font-bold text-heading capitalize">{data.payFrequency || "Not set"}</p>
              <p className="text-xs text-muted-foreground mt-1">{data.payDay || ""}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6">
            <h3 className="text-base font-semibold text-heading mb-4">Account Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name</span>
                <p className="font-medium text-heading">{data.firstName} {data.lastName}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Email</span>
                <p className="font-medium text-heading">{data.email}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Phone</span>
                <p className="font-medium text-heading">{data.phone}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Address</span>
                <p className="font-medium text-heading">
                  {data.streetAddress}, {data.city}, {data.state} {data.zipCode}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <SignupProvider>
      <DashboardContent />
    </SignupProvider>
  );
}
