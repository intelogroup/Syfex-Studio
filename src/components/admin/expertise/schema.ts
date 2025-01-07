import { z } from "zod";

export const expertiseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  description: z.string()
    .nullable()
    .transform(val => val || '')
    .refine(val => !val || val.length <= 500, "Description must be less than 500 characters"),
  long_description: z.string()
    .nullable()
    .transform(val => val || '')
    .refine(val => !val || val.length <= 2000, "Long description must be less than 2000 characters"),
  icon: z.string()
    .nullable()
    .default('code')
    .refine(val => !val || val.length <= 50, "Icon name must be less than 50 characters"),
  image_url: z.string()
    .nullable()
    .default('/placeholder.svg')
    .refine(val => !val || val.startsWith('http') || val.startsWith('/'), "Image URL must be a valid URL or path"),
  tech: z.array(z.string())
    .default([])
    .refine(val => val.length <= 10, "Maximum 10 technologies allowed")
    .transform(val => val.map(t => t.trim())),
  benefits: z.array(z.string())
    .default([])
    .refine(val => val.length <= 5, "Maximum 5 benefits allowed")
    .transform(val => val.map(b => b.trim())),
  published: z.boolean().nullable().default(false),
  key: z.string()
    .min(1, "Key is required")
    .regex(/^[a-z0-9-]+$/, "Key must contain only lowercase letters, numbers, and hyphens"),
  locale: z.string()
    .min(2, "Locale is required")
    .max(5, "Invalid locale format")
    .default('en')
});

export type ExpertiseFormData = z.infer<typeof expertiseSchema>;