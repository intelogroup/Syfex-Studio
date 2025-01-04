import { z } from "zod";

export const expertiseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: z.array(z.string()),
  icon: z.string(),
  details: z.object({
    longDescription: z.string(),
    benefits: z.array(z.string()),
    image: z.string().url("Must be a valid URL")
  })
});

export type ExpertiseFormData = z.infer<typeof expertiseSchema>;