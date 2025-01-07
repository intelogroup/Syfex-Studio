import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ContentTableWithLocale, ContentQueryParams, LocalizedContent } from "@/types/content";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useContent = <T extends ContentTableWithLocale>(
  type: T,
  params?: ContentQueryParams
) => {
  return useQuery({
    queryKey: ['content', type, params],
    queryFn: async () => {
      console.log(`[useContent] Fetching ${type} content from Supabase`, params);

      let retries = 0;
      let lastError: any;

      while (retries < MAX_RETRIES) {
        try {
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
        } catch (error: any) {
          lastError = error;
          retries++;

          // Only retry on network errors or specific database errors
          if (!error.message.includes('network') && 
              !error.message.includes('timeout') && 
              !error.message.includes('connection') &&
              !error.code?.includes('57P')) {
            throw error; // Don't retry on validation or permission errors
          }

          console.log(`[useContent] Fetch failed (attempt ${retries}/${MAX_RETRIES}):`, error);
          
          if (retries < MAX_RETRIES) {
            const delay = RETRY_DELAY * Math.pow(2, retries - 1); // Exponential backoff
            console.log(`[useContent] Retrying in ${delay}ms...`);
            await wait(delay);
          }
        }
      }

      console.error(`[useContent] ${type} fetch error after all retries:`, {
        message: lastError.message,
        details: lastError.details,
        hint: lastError.hint,
        code: lastError.code
      });
      throw lastError;
    },
    retry: false, // We handle retries manually
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};