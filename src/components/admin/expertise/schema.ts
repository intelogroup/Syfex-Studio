import { z } from "zod";

export const expertiseSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required").max(500, "Description is too long"),
  tech: z.array(z.string()).min(1, "At least one technology is required"),
  icon: z.string().min(1, "Icon is required"),
  key: z.string().min(1, "Key is required"),
  locale: z.string().min(2, "Locale is required"),
  long_description: z.string().min(1, "Long description is required"),
  benefits: z.array(z.string()).min(1, "At least one benefit is required"),
  image_url: z.string().min(1, "Image URL is required"),
  published: z.boolean().default(false)
});

export type ExpertiseFormData = z.infer<typeof expertiseSchema>;