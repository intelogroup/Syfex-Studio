import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useContent = (type: 'expertise', locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expertise')
        .select('*')
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
          .from('expertise')
          .update(content)
          .eq('id', id);

        if (error) throw error;
        return { id };
      } else {
        const { error } = await supabase
          .from('expertise')
          .insert(content);

        if (error) throw error;
        return { success: true };
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