import { z } from "zod";

export const expertiseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  long_description: z.string().nullable(),
  icon: z.string().nullable().default('code'),
  image_url: z.string().nullable().default('/placeholder.svg'),
  tech: z.array(z.string()).default([]),
  benefits: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  key: z.string().min(1, "Key is required"),
  locale: z.string().min(2, "Locale is required").default('en')
});

export type ExpertiseFormData = z.infer<typeof expertiseSchema>;