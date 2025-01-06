import { supabase } from "@/integrations/supabase/client";
import { ContentResponse, ExpertiseItem } from "./types";

export const fetchExpertiseContent = async (): Promise<ExpertiseItem[]> => {
  console.log('Fetching expertise content from Supabase...');
  
  const { data, error } = await supabase
    .from('content')
    .select('*')
    .eq('type', 'expertise')
    .eq('locale', 'en');

  if (error) {
    console.error('Error fetching expertise content:', error);
    throw error;
  }

  console.log('Raw data from Supabase:', data);

  if (!data) return [];

  const mappedData = data.map(item => {
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

  console.log('Mapped expertise data:', mappedData);
  return mappedData;
};