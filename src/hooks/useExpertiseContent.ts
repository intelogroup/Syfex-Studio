import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { ExpertiseItem } from "@/components/expertise/types";

const transformContent = (item: any): ExpertiseItem => {
  return {
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    key: item.key || '',
    locale: item.locale || 'en',
    tech: item.tech || [],
    icon: item.icon || 'code',
    longDescription: item.long_description || '',
    benefits: item.benefits || [],
    imageUrl: item.image_url || '/placeholder.svg',
    published: item.published || false
  };
};

export const useExpertiseContent = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('expertise-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'expertise'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['expertise'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['expertise'],
    queryFn: async () => {
      console.log('Fetching expertise content...');
      const { data, error } = await supabase
        .from('expertise')
        .select('*')
        .eq('locale', 'en');

      if (error) {
        console.error('Error fetching expertise:', error);
        throw error;
      }

      return data?.map(transformContent) || [];
    },
  });
};