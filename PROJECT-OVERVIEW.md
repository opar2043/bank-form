# ProEarn — Project Overview (2–3 Minute Meeting Introduction)

Hi everyone, I'd like to give you a quick overview of the project I've been working on: **ProEarn**, an Earned Wage Access platform.

## The Problem

Millions of workers live paycheck to paycheck, and when an unexpected expense hits mid-month, they're forced to turn high-interest payday loans or overdraft fees. ProEarn solves this by letting users access money they've *already earned* — before payday arrives. No credit checks, no hidden fees.

## What I Built

This is a complete front-end implementation built with **Next.js 16, React 19, TypeScript, and Tailwind CSS 4**, using shadcn/ui components and Framer Motion for a polished, modern feel.

The application covers three main areas:

**1. Marketing Landing Page** — An animated hero section that communicates the value proposition instantly: "Get paid today, not tomorrow," along with key trust signals like bank-level security and no credit checks.

**2. Multi-Step Onboarding Wizard** — This is the core of the project. New users go through a guided six-step flow:
- Email or phone registration with OTP verification
- Personal details
- Contact and address information
- Income and banking details — either manual entry or bank connection
- Identification and terms acceptance

Each step is fully validated using Zod schemas — things like phone format, ZIP codes, income ranges, and conditional rules like requiring a state for driver's licenses but not passports. One feature I'm particularly happy with is session persistence: if a user refreshes or accidentally closes the tab mid-signup, their progress is saved and they resume exactly where they left off.

**3. User Dashboard** — After onboarding, users land on a dashboard showing their available balance, monthly activity, and pay frequency at a glance.

## Architecture Highlights

From an engineering standpoint, the wizard is driven by a centralized state machine built on React Context, which handles step ordering, navigation direction for animations, and completed-step tracking. All validation schemas live in one place, keeping form logic clean and testable. The UI is fully responsive from mobile to desktop.

## Current Status & Next Steps

The front-end experience is complete and working end-to-end. The natural next steps would be wiring up a real backend — actual OTP delivery, authentication, and a bank-linking integration like Plaid — plus adding unit tests around the validation layer.

To sum up: ProEarn demonstrates a production-quality onboarding experience for a fintech product, with strong attention to validation, UX polish, and resilience. Happy to take any questions — thank you.
