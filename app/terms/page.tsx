"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: `By downloading, installing, or using the ProEarn application ("App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to all of these Terms, you may not access or use the App. These Terms constitute a legally binding agreement between you ("User," "you," or "your") and ProEarn, Inc. ("Company," "we," "us," or "our"). We reserve the right to modify these Terms at any time. Continued use of the App following any changes constitutes acceptance of the revised Terms.`,
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: `You must be at least 18 years of age to use the App. By using the App, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into a binding agreement. You must be a legal resident of the United States and have an active bank account at a U.S. financial institution. We reserve the right to verify your identity and eligibility at any time, and to refuse service to anyone for any reason at our sole discretion. You may not use the App on behalf of a third party.`,
  },
  {
    id: "account",
    title: "Account Registration",
    content: `To use the App, you must create an account by providing accurate, current, and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate your account at any time, with or without notice, if we reasonably believe that you have violated these Terms or engaged in fraudulent or suspicious activity.`,
  },
  {
    id: "services",
    title: "Services",
    content: `ProEarn provides earned wage access services that allow eligible users to access a portion of their earned but unpaid wages before their scheduled payday. The maximum amount you may access is determined by your verified income and employment information. All advances are subject to approval and may be modified, suspended, or discontinued at any time. Funds are typically deposited within minutes but may take up to one business day depending on your financial institution.`,
  },
  {
    id: "fees",
    title: "Payments & Fees",
    content: `ProEarn offers both free and premium access tiers. Free tier users may be subject to standard processing fees for each advance. Premium subscribers enjoy expedited processing at no additional per-transaction cost. Any applicable fees will be clearly disclosed before you confirm a transaction. Fees are non-refundable except as required by applicable law. We reserve the right to change our fee structure with 30 days' prior notice.`,
  },
  {
    id: "privacy",
    title: "Privacy & Data",
    content: `Your privacy is important to us. Our collection, use, and disclosure of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the App, you consent to the collection and use of your information as described in the Privacy Policy. We implement industry-standard security measures including 256-bit SSL encryption to protect your personal and financial data. We do not sell your personal information to third parties.`,
  },
  {
    id: "conduct",
    title: "User Responsibilities",
    content: `You agree to use the App only for lawful purposes and in accordance with these Terms. You shall not: use the App in any manner that could damage, disable, or impair the App; attempt to gain unauthorized access to any part of the App; use automated means to access the App; interfere with or circumvent any security features; provide false or misleading information during registration; or use the App for any illegal or unauthorized purpose. You are solely responsible for any content you submit through the App.`,
  },
  {
    id: "termination",
    title: "Termination",
    content: `We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason, including without limitation if you breach these Terms. Upon termination, your right to use the App will cease immediately. You may terminate your account at any time by contacting our support team. All outstanding balances must be repaid before termination is effective. Provisions of these Terms that by their nature should survive termination will survive.`,
  },
  {
    id: "liability",
    title: "Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, ProEarn and its officers, directors, employees, agents, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the App. Our total aggregate liability to you for all claims arising from or relating to the App shall not exceed the greater of one hundred dollars ($100) or the amount you have paid to ProEarn in the twelve (12) months preceding the claim.`,
  },
  {
    id: "governing",
    title: "Governing Law",
    content: `These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles. Any disputes arising from or relating to these Terms or your use of the App shall be resolved exclusively in the state or federal courts located in Wilmington, Delaware. You consent to the personal jurisdiction of such courts and waive any objection to venue.`,
  },
  {
    id: "contact",
    title: "Contact Us",
    content: `If you have any questions about these Terms, please contact us at:\n\nProEarn, Inc.\n123 Finance Street, Suite 400\nWilmington, DE 19801\nEmail: support@proearn.com\nPhone: (800) 555-0123`,
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-page">
      <div className="bg-white border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="font-semibold text-heading">Terms & Conditions</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="bg-white rounded-2xl border border-border-subtle shadow-sm p-6 sm:p-10">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-heading mb-2">Terms & Conditions</h2>
            <p className="text-sm text-muted-foreground">Last updated: August 1, 2026</p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-base font-semibold text-heading mb-3">{section.title}</h3>
                <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-border-subtle text-center">
            <p className="text-xs text-muted-foreground">
              By using ProEarn, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
