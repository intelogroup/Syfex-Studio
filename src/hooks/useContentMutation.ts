import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ContentTable, ContentMutationParams, LocalizedContent } from "@/types/content";
import { TableInsert, TableUpdate, isContentTable } from "@/types/database";

export const useContentMutation = <T extends ContentTable>() => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, type, data }: ContentMutationParams<T>) => {
      if (!isContentTable(type)) {
        throw new Error(`Invalid content type: ${type}`);
      }

      if (id) {
        console.log(`[useContentMutation] Updating ${type} with id:`, id);
        const { data: result, error } = await supabase
          .from(type)
          .update(data as TableUpdate<T>)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return result;
      } else {
        console.log(`[useContentMutation] Creating new ${type}`);
        const { data: result, error } = await supabase
          .from(type)
          .insert(data as TableInsert<T>)
          .select()
          .single();

        if (error) throw error;
        return result;
      }
    },
    onMutate: async ({ id, type, data }) => {
      await queryClient.cancelQueries({ queryKey: ['content', type] });
      const previousData = queryClient.getQueryData<LocalizedContent<T>[]>(['content', type]);

      if (id) {
        queryClient.setQueryData<LocalizedContent<T>[]>(['content', type], (old) => {
          if (!old) return [];
          return old.map((item) => 
            item.id === id ? { ...item, ...data } as LocalizedContent<T> : item
          );
        });
      } else {
        const optimisticItem = {
          id: `temp-${Date.now()}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...data
        } as LocalizedContent<T>;

        queryClient.setQueryData<LocalizedContent<T>[]>(['content', type], (old) => {
          return [...(old || []), optimisticItem];
        });
      }

      return { previousData };
    },
    onError: (err, { type }, context) => {
      console.error('[useContentMutation] Error occurred:', err);
      if (context?.previousData) {
        queryClient.setQueryData(['content', type], context.previousData);
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save changes. Please try again.",
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