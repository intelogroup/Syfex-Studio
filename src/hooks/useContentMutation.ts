import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentTableWithLocale, ContentMutationParams } from "@/types/content";

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
            .update(content)
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
            .insert(content)
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
    onSuccess: (_, variables) => {
      console.log('[useContentMutation] Operation successful, invalidating queries');
      queryClient.invalidateQueries({
        queryKey: ['content', variables.type],
      });
      toast({
        title: "Success",
        description: "Changes saved successfully",
      });
    },
  });
};