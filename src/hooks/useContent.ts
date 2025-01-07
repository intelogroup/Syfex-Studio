import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useContent = (type: 'expertise', locale: string = 'en') => {
  return useQuery({
    queryKey: ['content', type, locale],
    queryFn: async () => {
      try {
        console.log(`Fetching ${type} content from Supabase`);
        const { data, error } = await supabase
          .from(type)
          .select()
          .eq('locale', locale);

        if (error) {
          console.error(`${type} fetch error:`, {
            message: error.message,
            details: error.details,
            hint: error.hint,
            code: error.code
          });
          throw error;
        }

        console.log(`Successfully fetched ${type}:`, data?.length, 'items');
        return data || [];
      } catch (error: any) {
        console.error(`${type} fetch error:`, {
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
    mutationFn: async ({ id, ...content }: any) => {
      try {
        console.log('Starting content mutation with:', { id, content });
        
        if (id) {
          console.log('Updating existing content:', id);
          const { data, error } = await supabase
            .from('expertise')
            .update(content)
            .eq('id', id)
            .select('*');

          if (error) {
            console.error('Update error:', error);
            throw error;
          }

          return data?.[0] || null;
        } else {
          console.log('Creating new content');
          const { data, error } = await supabase
            .from('expertise')
            .insert([content])
            .select('*');

          if (error) {
            console.error('Insert error:', error);
            throw error;
          }

          return data?.[0] || null;
        }
      } catch (error: any) {
        console.error('Mutation error:', {
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