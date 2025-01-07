import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables } from "@/integrations/supabase/types";

type ContentType = 'expertise' | 'services';

export const useContent = <T extends ContentType>(type: T, locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      try {
        console.log(`[useContent] Fetching ${type} content from Supabase`);
        const { data, error } = await supabase
          .from(type)
          .select('*')
          .eq('locale', locale);

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
        return data as Tables<T>[];
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

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, type, ...content }: any) => {
      try {
        console.log('[useContentMutation] Starting content mutation with:', { id, type, content });
        
        if (!id && !type) {
          throw new Error('Either id or type must be provided');
        }

        // Handle update operation
        if (id) {
          console.log('[useContentMutation] Updating existing content');
          const { data, error } = await supabase
            .from('expertise')
            .update(content)
            .eq('id', id)
            .maybeSingle();

          if (error) {
            console.error('[useContentMutation] Update error:', error);
            throw error;
          }
          return data;
        }

        return null;
      } catch (error: any) {
        console.error('[useContentMutation] Mutation error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          stack: error.stack
        });
        throw error;
      }
    },
    onSuccess: () => {
      console.log('[useContentMutation] Mutation successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('[useContentMutation] Content mutation error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update content",
      });
    },
  });
};