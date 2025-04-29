import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must be 20 characters or fewer" })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: "Username can only contain letters, numbers, and underscores",
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});
export const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string(),
});

export const addExperience = z.object({
  company: z.string().min(1, { message: "Company name is required" }),
  title: z.string().min(1, { message: "Job title is required" }),
  companyWebsite: z.string().url({ message: "Invalid URL" }).optional(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  fromMonth: z.string().min(1, { message: "Start month is required" }),

  fromYear: z
    .string()
    .min(1, { message: "Start year is required" })
    .refine((val) => !isNaN(Number(val)), {
      message: "Start year must be a number",
    })
    .transform((val) => parseInt(val)),
  toMonth: z.string().optional(),
  toYear: z
    .string()
    .transform((val) => parseInt(val))
    .optional(),

  isCurrentlyWorking: z.boolean().optional(),
});
export const addEducation = z.object({
  school: z.string().min(1, { message: "School name is required" }),
  degree: z.string().min(1, { message: "Degree is required" }),
  fieldOfStudy: z.string(),
  startDate: z.string(),
  endDate: z.string(),
});

export const addCertification = z.object({
  name: z.string().min(1, { message: "Certification name is required" }),
  issuedBy: z
    .string()
    .min(1, { message: "Certification authority is required" }),
  certificationUrl: z.string().url({ message: "Invalid URL" }).optional(),
  issueMonth: z.string().min(1, { message: "Issue month is required" }),
  issueYear: z.string().min(1, { message: "Issue year is required" }),
  expirationMonth: z.string().optional(),
  expirationYear: z.string().optional(),
});
