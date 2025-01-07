import { ExpertiseItem } from "@/components/expertise/types";

export const validateExpertiseUpdate = (updates: Partial<ExpertiseItem>) => {
  if (!updates.title || !updates.key) {
    throw new Error('Title and key are required fields');
  }

  return {
    title: updates.title,
    description: updates.description,
    key: updates.key,
    locale: updates.locale || 'en',
    published: updates.published,
    tech: Array.isArray(updates.tech) ? updates.tech : [],
    icon: updates.icon,
    long_description: updates.long_description,
    benefits: Array.isArray(updates.benefits) ? updates.benefits : [],
    image_url: updates.image_url
  };
};