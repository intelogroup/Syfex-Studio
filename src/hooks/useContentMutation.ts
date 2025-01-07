import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentTableWithLocale, ContentMutationParams, LocalizedContent } from "@/types/content";
import { Tables } from "@/integrations/supabase/types";

export const useContentMutation = <T extends ContentTableWithLocale>() => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type, ...content }: ContentMutationParams<T>) => {
      console.log('[useContentMutation] Starting mutation with:', { id, type, content });

      try {
        if (id) {
          console.log(`[useContentMutation] Updating ${type} with id:`, id);
          const { data, error } = await supabase
            .from(type)
            .update(content as Tables<T>)
            .eq('id', id)
            .select()
            .single();

          if (error) {
            console.error('[useContentMutation] Update error:', error);
            throw error;
          }

          return data;
        } else {
          console.log(`[useContentMutation] Creating new ${type}`);
          const { data, error } = await supabase
            .from(type)
            .insert(content as Tables<T>)
            .select()
            .single();

          if (error) {
            console.error('[useContentMutation] Insert error:', error);
            throw error;
          }

          return data;
        }
      } catch (error: any) {
        console.error('[useContentMutation] Operation failed:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to save changes",
        });
        throw error;
      }
    },
    onMutate: async ({ id, type, ...content }) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: ['content', type] });

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<LocalizedContent<T>[]>(['content', type]);

      // Optimistically update the UI
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
      console.error('[useContentMutation] Error occurred:', err);
      // Revert to the previous state on error
      if (context?.previousData) {
        queryClient.setQueryData(['content', type], context.previousData);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Changes have been reverted.",
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