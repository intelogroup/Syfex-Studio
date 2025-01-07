import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentTableWithLocale } from "@/types/content";

type MutationParams = {
  id?: string;
  type?: ContentTableWithLocale;
  [key: string]: any;
};

export const useContentMutation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type, ...content }: MutationParams) => {
      try {
        console.log('[useContentMutation] Starting content mutation with:', { id, type, content });
        
        if (!id && !type) {
          throw new Error('Either id or type must be provided');
        }

        if (id) {
          console.log('[useContentMutation] Updating existing content');
          const { data, error } = await supabase
            .from('expertise')
            .update(content)
            .eq('id', id)
            .select()
            .single();

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