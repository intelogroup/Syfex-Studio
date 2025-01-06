import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useContent = (type: string, locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('id, title, description, metadata, type, key, locale, created_at, updated_at, created_by, published')
        .eq('type', type)
        .eq('locale', locale);

      if (error) {
        console.error('Content fetch error:', error);
        throw error;
      }
      return data || [];
    },
  });
};

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...content }: any) => {
      if (id) {
        const { error } = await supabase
          .from('content')
          .update(content)
          .eq('id', id);

        if (error) throw error;
        return { id }; // Return minimal data needed
      } else {
        const { error } = await supabase
          .from('content')
          .insert(content);

        if (error) throw error;
        return { success: true }; // Return minimal data needed
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      toast({
        title: "Success",
        description: "Content updated successfully",
      });
    },
    onError: (error: any) => {
      console.error('Content mutation error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update content",
      });
    },
  });
};