import { supabase } from "@/integrations/supabase/client";
import { ContentResponse, ExpertiseItem } from "./types";

export const fetchExpertiseContent = async (): Promise<ExpertiseItem[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('type', 'expertise')
    .eq('locale', 'en')
    .eq('published', true);

  if (error) {
    console.error('Error fetching expertise content:', error);
    throw error;
  }

  return (data as ContentResponse[]).map(item => ({
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    tech: JSON.parse(item.metadata.tech),
    icon: item.metadata.icon,
    details: {
      longDescription: item.metadata.details.longDescription,
      benefits: JSON.parse(item.metadata.details.benefits),
      image: item.metadata.details.image
    }
  }));
};