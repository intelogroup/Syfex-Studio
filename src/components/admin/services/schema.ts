import { z } from "zod";

export const serviceSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
  icon: z.string().default('code'),
  secondary_icon: z.string().default('code'),
  features: z.array(z.string())
    .default([])
    .refine(val => val.length <= 4, "Maximum 4 features allowed")
    .transform(val => val.map(t => t.trim())),
  details: z.array(z.string())
    .default([])
    .refine(val => val.length <= 4, "Maximum 4 details allowed")
    .transform(val => val.map(b => b.trim())),
  published: z.boolean().default(false),
  key: z.string()
    .min(1, "Key is required")
    .regex(/^[a-z0-9-]+$/, "Key must contain only lowercase letters, numbers, and hyphens"),
  locale: z.string()
    .min(2, "Locale is required")
    .max(5, "Invalid locale format")
    .default('en')
});

export type ServiceFormData = z.infer<typeof serviceSchema>;