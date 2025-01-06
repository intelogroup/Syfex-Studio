import { supabase } from "@/integrations/supabase/client";
import { ContentResponse, ExpertiseItem } from "./types";

export const fetchExpertiseContent = async (): Promise<ExpertiseItem[]> => {
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('type', 'expertise')
    .eq('locale', 'en')
    .range(2, 1000); // Skip first 2 items, get up to 1000 items

  if (error) {
    console.error('Error fetching expertise content:', error);
    throw error;
  }

  if (!data) return [];

  return data.map(item => {
    const metadata = item.metadata as {
      tech: string[];
      icon: string;
      details: {
        longDescription: string;
        benefits: string[];
        image: string;
      };
    };

    return {
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      tech: metadata.tech || [],
      icon: metadata.icon || 'code',
      details: {
        longDescription: metadata.details?.longDescription || '',
        benefits: metadata.details?.benefits || [],
        image: metadata.details?.image || '/placeholder.svg'
      }
    };
  });
};