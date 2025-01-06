import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { ExpertiseItem } from "@/components/expertise/types";

const transformContent = (item: any): ExpertiseItem => {
  const metadata = item.metadata || {};
  return {
    id: item.id,
    title: item.title || '',
    description: item.description || '',
    key: item.key || '',
    locale: item.locale || 'en',
    tech: metadata.tech || [],
    icon: metadata.icon || 'code',
    details: {
      longDescription: metadata.details?.longDescription || '',
      benefits: metadata.details?.benefits || [],
      image: metadata.details?.image || '/placeholder.svg'
    },
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
          table: 'content',
          filter: 'type=eq.expertise'
        },
        (payload) => {
          console.log('Real-time update received:', payload);
          queryClient.invalidateQueries({ queryKey: ['content', 'expertise'] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ['content', 'expertise'],
    queryFn: async () => {
      console.log('Fetching expertise content...');
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', 'expertise')
        .eq('locale', 'en');

      if (error) {
        console.error('Error fetching expertise:', error);
        throw error;
      }

      return data?.map(transformContent) || [];
    },
  });
};