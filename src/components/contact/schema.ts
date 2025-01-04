import * as z from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  orgType: z.string().optional(),
  projectType: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  budget: z.string().optional(),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;