# ProEarn — Earned Wage Access Platform

ProEarn is a modern fintech web application that lets users access money they've already earned before payday. This project implements the complete front-end experience: a marketing landing page, a multi-step account onboarding wizard with identity verification, and a post-signup dashboard.

## Features

### Landing Page
- Hero section with animated entrance effects (Framer Motion)
- Feature highlights: instant wage access, no credit checks, bank-level security, 24/7 availability
- Responsive navbar with mobile menu

### Multi-Step Signup Wizard
A guided onboarding flow persisted across steps via React Context + `sessionStorage`:

| Step | Route | Description |
|------|-------|-------------|
| 0 | `/signup` | Email or phone entry |
| 1 | `/signup/verify` | 6-digit OTP verification code |
| 2 | `/signup/step-1` | Personal details (name, date of birth, pronouns) |
| 3 | `/signup/step-2` | Contact & address (email, phone, US state/city, ZIP) |
| 4 | `/signup/step-3` | Income & banking (pay frequency, monthly income, manual or connected bank) |
| 5 | `/signup/step-4` | Identification (ID type/number, terms acceptance, marketing opt-in) |
| 6 | `/signup/success` | Confirmation screen |

Additional capabilities:
- Progress bar tracking wizard completion
- Directional slide animations between steps
- Session persistence — refresh mid-signup and resume where you left off
- Full client-side validation with Zod schemas (name formats, 10-digit phone, 5-digit ZIP, income range $500–$50,000, routing/account number rules, conditional ID state requirement)

### Other Pages
- `/login` — returning user sign-in
- `/dashboard` — account overview with available balance, monthly activity, and pay frequency cards
- `/terms` — Terms & Conditions

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org) 16 (App Router) + React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** shadcn/ui (Radix-based)
- **Forms:** React Hook Form + [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- **Validation:** Zod
- **Animation:** Framer Motion
- **Notifications:** Sonner
- **Icons:** Lucide React

## Project Structure

```
app/
├── page.tsx              # Landing page
├── login/page.tsx        # Login
├── dashboard/page.tsx    # User dashboard
├── terms/page.tsx        # Terms & conditions
└── signup/               # Onboarding wizard
    ├── layout.tsx        # Wizard shell + state provider
    ├── page.tsx          # Step 0: email/phone
    ├── verify/           # Step 1: OTP
    ├── step-1 … step-4/  # Steps 2–5
    └── success/          # Completion screen

components/
├── landing/              # Navbar, hero
├── wizard/               # Reusable wizard pieces (progress bar, OTP input,
│                         #   field inputs, pill radio, review summary)
└── ui/                   # shadcn/ui primitives

lib/
├── signup-store.tsx      # Wizard state machine (Context + sessionStorage)
├── schemas.ts            # Zod validation schemas per step
├── states-cities.ts      # US state/city data
├── format.ts             # Formatting helpers
└── utils.ts              # cn() class merge helper
```

## Getting Started

### Prerequisites
- Node.js 18.18 or later
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## Notes

- This is a front-end implementation; authentication, OTP delivery, and bank connections are simulated on the client.
- Signup progress is stored in `sessionStorage` under the key `proearn-signup-data` and is cleared when the flow completes or the user signs out.
