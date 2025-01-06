import { z } from "zod";

export const expertiseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  tech: z.array(z.string()).min(1, "At least one technology is required"),
  icon: z.string().min(1, "Icon is required"),
  details: z.object({
    longDescription: z.string().min(1, "Long description is required"),
    benefits: z.array(z.string()).min(1, "At least one benefit is required"),
    image: z.string().min(1, "Image URL is required")
  })
});

export type ExpertiseFormData = z.infer<typeof expertiseSchema>;