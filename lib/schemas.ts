import { z } from "zod";

export const otpSchema = z.object({
  code: z.string().length(6, "Please enter the full 6-digit code"),
});

export const personalDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(50, "First name is too long")
    .regex(/^[a-zA-Z\s\-']+$/, "Only letters, spaces, hyphens, and apostrophes")
    .transform((s) => s.trim()),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(50, "Last name is too long")
    .regex(/^[a-zA-Z\s\-']+$/, "Only letters, spaces, hyphens, and apostrophes")
    .transform((s) => s.trim()),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  pronouns: z.string().min(1, "Please select your pronouns"),
});

export const contactAddressSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(254, "Email is too long"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .refine((v) => v.replace(/\D/g, "").length === 10, "Please enter a valid 10-digit phone number"),
  streetAddress: z
    .string()
    .min(1, "Street address is required")
    .max(200, "Address is too long")
    .transform((s) => s.trim()),
  apartment: z.string().max(50, "Too long").optional().default("").transform((s) => s.trim()),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .refine((v) => /^\d{5}$/.test(v), "Please enter a valid 5-digit ZIP code"),
});

export const incomeBankSchema = z.object({
  payFrequency: z.string().min(1, "Please select how often you get paid"),
  payDay: z.string().optional(),
  monthlyIncome: z
    .string()
    .min(1, "Monthly income is required")
    .refine((v) => {
      const num = parseInt(v.replace(/\D/g, ""), 10);
      return !isNaN(num) && num >= 500 && num <= 50000;
    }, "Income must be between $500 and $50,000"),
  bankMethod: z.enum(["manual", "connect"], {
    errorMap: () => ({ message: "Please select a bank connection method" }),
  }),
  routingNumber: z.string().optional(),
  accountNumber: z.string().optional(),
}).refine(
  (data) => {
    if (data.bankMethod === "manual") {
      return data.routingNumber?.length === 9 && (data.accountNumber?.length ?? 0) >= 4;
    }
    return true;
  },
  { message: "Please enter valid routing and account numbers", path: ["routingNumber"] }
);

export const identificationSchema = z.object({
  idType: z.string().min(1, "Please select an ID type"),
  idNumber: z
    .string()
    .min(1, "ID number is required")
    .max(30, "ID number is too long"),
  idState: z.string().optional(),
  agreeToTerms: z.boolean().refine((v) => v === true, {
    message: "You must agree to the Terms & Conditions",
  }),
  marketingOptIn: z.boolean().optional(),
}).refine(
  (data) => {
    if (data.idType !== "passport") {
      return !!data.idState;
    }
    return true;
  },
  { message: "State is required for this ID type", path: ["idState"] }
);

export type OtpData = z.infer<typeof otpSchema>;
export type PersonalDetailsData = z.infer<typeof personalDetailsSchema>;
export type ContactAddressData = z.infer<typeof contactAddressSchema>;
export type IncomeBankData = z.infer<typeof incomeBankSchema>;
export type IdentificationData = z.infer<typeof identificationSchema>;
