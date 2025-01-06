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

  const getUnsplashImage = (title: string): string => {
    const images: Record<string, string> = {
      'Mobile Development': 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
      'Cloud Architecture': 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7',
      'Web Development': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
      'UI/UX Design': 'https://images.unsplash.com/photo-1483058712412-4245e9b90334',
      'DevOps': 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
      'Data Engineering': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158',
    };

    return images[title] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085';
  };

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

    // Update the image based on the expertise title
    const imageUrl = getUnsplashImage(item.title || '');

    return {
      id: item.id,
      title: item.title || '',
      description: item.description || '',
      tech: metadata.tech || [],
      icon: metadata.icon || 'code',
      details: {
        longDescription: metadata.details?.longDescription || '',
        benefits: metadata.details?.benefits || [],
        image: imageUrl
      }
    };
  });

  console.log('Mapped expertise data:', mappedData);
  return mappedData;
};