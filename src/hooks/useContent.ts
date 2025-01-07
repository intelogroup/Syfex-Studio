import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ContentTableWithLocale, ContentQueryParams, LocalizedContent } from "@/types/content";

export const useContent = <T extends ContentTableWithLocale>(
  type: T,
  params: ContentQueryParams = { locale: 'en' }
) => {
  const { locale = 'en' } = params;

  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      try {
        console.log(`[useContent] Fetching ${type} content from Supabase`);
        
        let query = supabase
          .from(type)
          .select('*');

        // Add locale filter if specified
        if (locale) {
          query = query.eq('locale', locale);
        }

        const { data, error } = await query;

        if (error) {
          console.error(`[useContent] ${type} fetch error:`, {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }

        console.log(`[useContent] Successfully fetched ${type}:`, data?.length, 'items');
        return data as LocalizedContent<T>[];
      } catch (error: any) {
        console.error(`[useContent] ${type} fetch error:`, {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }
    },
  });
};