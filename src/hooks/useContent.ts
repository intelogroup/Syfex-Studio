import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useContent = (type: string, locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content')
        .select('*')
        .eq('type', type)
        .eq('locale', locale);

      if (error) {
        console.error('Content fetch error:', error);
        throw error;
      }
      return data;
    },
  });
};

export const useContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...content }: any) => {
      const { data, error } = await supabase
        .from('content')
        .upsert({ id, ...content })
        .select('*')
        .single();

      if (error) throw error;
      return data;
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
        description: error.message,
      });
    },
  });
};