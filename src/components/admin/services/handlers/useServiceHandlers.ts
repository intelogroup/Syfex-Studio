import { useContentMutation } from "@/hooks/useContentMutation";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ServiceFormData } from "../schema";

export const useServiceHandlers = () => {
  const { mutate, isPending } = useContentMutation<'services'>();
  const { toast } = useToast();

  const handleCreate = async (formData: ServiceFormData): Promise<boolean> => {
    try {
      console.log('[useServiceHandlers] Starting service creation with data:', formData);
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[useServiceHandlers] Auth session:', session ? 'Present' : 'Missing');

      if (!session) {
        console.error('[useServiceHandlers] Authentication required');
        toast({
          variant: "destructive",
          title: "Authentication Required",
          description: "Please sign in to create service cards",
        });
        return false;
      }

      const key = formData.key || `service-${Date.now()}`;

      await mutate({
        type: 'services',
        data: {
          key,
          title: formData.title,
          description: formData.description,
          locale: formData.locale || 'en',
          published: formData.published || false,
          icon: formData.icon || 'code',
          features: Array.isArray(formData.features) ? formData.features : [],
          details: Array.isArray(formData.details) ? formData.details : [],
          created_by: session.user.id
        }
      });
      
      return true;
    } catch (error: any) {
      console.error('[useServiceHandlers] Create operation failed:', error);
      throw error;
    }
  };

  const handleSave = async (id: string, updates: Partial<ServiceFormData>) => {
    try {
      console.log('[useServiceHandlers] Starting service update:', { id, updates });
      await mutate({ 
        id, 
        type: 'services',
        data: updates
      });
    } catch (error: any) {
      console.error('[useServiceHandlers] Save error:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('[handleDelete] Starting delete operation for service:', id);
      console.log('[handleDelete] Checking authentication...');
      
      const { data: { session } } = await supabase.auth.getSession();
      console.log('[handleDelete] Auth session:', session ? 'Present' : 'Missing');

      if (!session) {
        throw new Error('Authentication required');
      }

      console.log('[handleDelete] Executing delete query...');
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('[handleDelete] Database error:', error);
        throw error;
      }

      console.log('[handleDelete] Delete successful, invalidating queries');
      await mutate({ type: 'services', data: {} });
      
      toast({
        title: "Success",
        description: "Service has been deleted",
      });
      
      return true;
    } catch (error: any) {
      console.error('[handleDelete] Operation failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete service",
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