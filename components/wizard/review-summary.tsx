"use client";

import React from "react";
import { useSignup, type SignupData } from "@/lib/signup-store";
import { maskEmail, maskPhone } from "@/lib/format";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewSummary({ data }: { data: SignupData }) {
  const sections = [
    {
      title: "Personal Information",
      items: [
        { label: "Name", value: `${data.firstName} ${data.lastName}` },
        { label: "Date of Birth", value: data.dateOfBirth },
        { label: "Pronouns", value: data.pronouns },
      ],
    },
    {
      title: "Contact",
      items: [
        { label: "Email", value: maskEmail(data.email) },
        { label: "Phone", value: maskPhone(data.phone) },
        { label: "Address", value: `${data.streetAddress}${data.apartment ? `, ${data.apartment}` : ""}` },
        { label: "City, State", value: `${data.city}, ${data.state} ${data.zipCode}` },
      ],
    },
    {
      title: "Income & Bank",
      items: [
        { label: "Pay Frequency", value: data.payFrequency },
        { label: "Monthly Income", value: `$${parseInt(data.monthlyIncome.replace(/\D/g, "") || "0").toLocaleString()}` },
        { label: "Bank Connection", value: data.bankMethod === "connect" ? "Connected via bank" : "Manual entry" },
      ],
    },
    {
      title: "Identification",
      items: [
        { label: "ID Type", value: data.idType },
        { label: "ID Number", value: `••••${data.idNumber.slice(-4)}` },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-heading">Review Your Information</h3>
      {sections.map((section) => (
        <Card key={section.title} className="border-border-subtle shadow-sm">
          <CardContent className="p-4">
            <h4 className="text-sm font-semibold text-heading mb-3">{section.title}</h4>
            <div className="space-y-2">
              {section.items.map((item) => (
                <div key={item.label} className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium text-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
