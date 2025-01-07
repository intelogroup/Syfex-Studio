import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useContent = (type: 'expertise', locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(type)
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
      try {
        if (id) {
          const { data, error } = await supabase
            .from('expertise')
            .update(content)
            .eq('id', id)
            .select('*')
            .single();

          if (error) throw error;
          return data;
        } else {
          const { data, error } = await supabase
            .from('expertise')
            .insert([content])
            .select('*')
            .single();

          if (error) throw error;
          return data;
        }
      } catch (error: any) {
        console.error('Mutation error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
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
      console.error('Content mutation error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update content",
      });
    },
  });
};