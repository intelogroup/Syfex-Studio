import * as z from "zod";

// Helper function to sanitize strings
const sanitizeString = (str: string) => {
  return str.trim()
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, ''); // Remove onclick= and similar
};

export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .transform(sanitizeString)
    .refine(val => /^[a-zA-Z\s-']+$/.test(val), {
      message: "Name can only contain letters, spaces, hyphens, and apostrophes"
    }),
  
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters")
    .transform(str => str.toLowerCase().trim()),
  
  orgType: z.string()
    .optional()
    .transform(val => val ? sanitizeString(val) : val),
  
  projectType: z.string()
    .optional()
    .transform(val => val ? sanitizeString(val) : val),
  
  description: z.string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must not exceed 2000 characters")
    .transform(sanitizeString)
    .refine(val => !/(<script|<iframe|<object|<embed)/gi.test(val), {
      message: "Description contains invalid content"
    }),
  
  budget: z.string()
    .optional()
    .transform(val => val ? sanitizeString(val) : val),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;