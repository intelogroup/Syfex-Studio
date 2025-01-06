import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "./types";

export const fetchExpertiseContent = async (): Promise<ExpertiseItem[]> => {
  console.log('Fetching expertise content from Supabase...');
  
  const { data, error } = await supabase
    .from('expertise')
    .select('*')
    .eq('locale', 'en');

  if (error) {
    console.error('Error fetching expertise content:', error);
    throw error;
  }

  console.log('Raw data from Supabase:', data);

  if (!data) return [];

  const mappedData: ExpertiseItem[] = data.map(item => ({
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    longDescription: item.long_description || '',
    icon: item.icon || 'code',
    imageUrl: item.image_url || '/placeholder.svg',
    tech: item.tech || [],
    benefits: item.benefits || [],
    published: item.published || false,
    key: item.key,
    locale: item.locale
  }));

  console.log('Mapped expertise data:', mappedData);
  return mappedData;
};