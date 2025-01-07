import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ContentTable, ContentQueryParams, LocalizedContent } from "@/types/content";

export const useContent = <T extends ContentTable>(
  type: T,
  params?: ContentQueryParams
) => {
  return useQuery({
    queryKey: ['content', type, params],
    queryFn: async () => {
      console.log(`[useContent] Fetching ${type} content from Supabase`, params);

      let query = supabase.from(type).select('*');

      if (params?.locale) {
        query = query.eq('locale', params.locale);
      }

      if (params?.published !== undefined) {
        query = query.eq('published', params.published);
      }

      const { data, error } = await query;

      if (error) throw error;

      console.log(`[useContent] Successfully fetched ${type}:`, data?.length, 'items');
      return data as LocalizedContent<T>[];
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};