import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentTableWithLocale, ContentMutationParams, LocalizedContent } from "@/types/content";
import { Tables } from "@/integrations/supabase/types";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useContentMutation = <T extends ContentTableWithLocale>() => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type, ...content }: ContentMutationParams<T>) => {
      console.log('[useContentMutation] Starting mutation with:', { id, type, content });

      let retries = 0;
      let lastError: any;

      while (retries < MAX_RETRIES) {
        try {
          if (id) {
            console.log(`[useContentMutation] Updating ${type} with id:`, id);
            const { data, error } = await supabase
              .from(type)
              .update(content)
              .eq('id', id)
              .select()
              .maybeSingle();

            if (error) throw error;
            return data;
          } else {
            console.log(`[useContentMutation] Creating new ${type}`);
            const { data, error } = await supabase
              .from(type)
              .insert(content)
              .select()
              .maybeSingle();

            if (error) throw error;
            return data;
          }
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

          console.log(`[useContentMutation] Operation failed (attempt ${retries}/${MAX_RETRIES}):`, error);
          
          if (retries < MAX_RETRIES) {
            const delay = RETRY_DELAY * Math.pow(2, retries - 1); // Exponential backoff
            console.log(`[useContentMutation] Retrying in ${delay}ms...`);
            await wait(delay);
          }
        }
      }

      console.error('[useContentMutation] All retry attempts failed:', lastError);
      throw lastError;
    },
    onMutate: async ({ id, type, ...content }) => {
      await queryClient.cancelQueries({ queryKey: ['content', type] });
      const previousData = queryClient.getQueryData<LocalizedContent<T>[]>(['content', type]);

      if (id) {
        queryClient.setQueryData<LocalizedContent<T>[]>(['content', type], (old) => {
          if (!old) return [];
          return old.map((item) => 
            item.id === id ? { ...item, ...content } : item
          );
        });
      } else {
        const optimisticItem = {
          id: `temp-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...content
        } as LocalizedContent<T>;

        queryClient.setQueryData<LocalizedContent<T>[]>(['content', type], (old) => {
          return [...(old || []), optimisticItem];
        });
      }

      return { previousData };
    },
    onError: (err, { type }, context) => {
      console.error('[useContentMutation] Error occurred after retries:', err);
      if (context?.previousData) {
        queryClient.setQueryData(['content', type], context.previousData);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes after multiple attempts. Please try again.",
      });
    },
    onSuccess: (_, { type }) => {
      console.log('[useContentMutation] Operation successful, invalidating queries');
      queryClient.invalidateQueries({
        queryKey: ['content', type],
      });
      toast({
        title: "Success",
        description: "Changes saved successfully",
      });
    },
  });
};