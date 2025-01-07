import { useContentMutation } from "@/hooks/useContentMutation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseFormData } from "../schema";

export const useExpertiseHandlers = () => {
  const { mutate, isPending } = useContentMutation<'expertise'>();
  const { toast } = useToast();

  const handleCreate = async (formData: ExpertiseFormData): Promise<boolean> => {
    try {
      console.log('[useExpertiseHandlers] Starting expertise creation with data:', formData);
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[useExpertiseHandlers] Auth session:', session ? 'Present' : 'Missing');

      if (!session) {
        console.error('[useExpertiseHandlers] Authentication required');
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please sign in to create expertise cards",
        });
        return false;
      }

      const key = formData.key || `expertise-${Date.now()}`;

      await mutate({
        type: 'expertise',
        data: {
          key,
          title: formData.title,
          description: formData.description,
          locale: formData.locale || 'en',
          published: formData.published || false,
          tech: Array.isArray(formData.tech) ? formData.tech : [],
          icon: formData.icon || 'code',
          long_description: formData.long_description,
          benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
          image_url: formData.image_url || '/placeholder.svg',
          created_by: session.user.id
        }
      });
      return true;
    } catch (error: any) {
      console.error('[useExpertiseHandlers] Create operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create expertise card",
      });
      return false;
    }
  };

  const handleSave = async (id: string, data: Partial<ExpertiseFormData>) => {
    try {
      console.log('[useExpertiseHandlers] Starting expertise save:', { id, data });
      await mutate({ 
        id, 
        type: 'expertise',
        data
      });
    } catch (error: any) {
      console.error('[useExpertiseHandlers] Save error:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('[handleDelete] Starting delete operation for expertise:', id);
      console.log('[handleDelete] Checking authentication...');
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[handleDelete] Auth session:', session ? 'Present' : 'Missing');

      if (!session) {
        throw new Error('Authentication required');
      }

      console.log('[handleDelete] Executing delete query...');
      const { error } = await supabase
        .from('expertise')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('[handleDelete] Database error:', error);
        throw error;
      }

      console.log('[handleDelete] Delete successful, invalidating queries');
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
      });
      
      return true;
    } catch (error: any) {
      console.error('[handleDelete] Operation failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete expertise card",
      });
      throw error;
    }
  };

  return {
    handleCreate,
    handleSave,
    handleDelete,
    isPending
  };
};