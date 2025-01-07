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
      console.error('[useExpertiseHandlers] Create operation failed:', error);
      throw error;
    }
  };

  const handleSave = async (id: string, updates: Partial<ExpertiseFormData>) => {
    try {
      console.log('[useExpertiseHandlers] Starting expertise update:', { id, updates });
      await mutate({ 
        id, 
        type: 'expertise',
        data: updates
      });
    } catch (error: any) {
      console.error('[useExpertiseHandlers] Save error:', error);
      throw error;
    }
  };

  return {
    handleCreate,
    handleSave,
    isPending
  };
};