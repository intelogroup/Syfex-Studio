import { useContentMutation } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ServiceFormData } from "../schema";

export const useServiceHandlers = () => {
  const { mutate, isPending } = useContentMutation();
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
      const servicePayload = {
        key,
        title: formData.title,
        description: formData.description,
        locale: formData.locale || 'en',
        published: formData.published || false,
        icon: formData.icon || 'code',
        features: formData.features || [],
        details: formData.details || [],
        created_by: session.user.id
      };
      
      console.log('[useServiceHandlers] Prepared service payload:', servicePayload);

      const { error } = await supabase
        .from('services')
        .insert([servicePayload]);

      if (error) {
        console.error('[useServiceHandlers] Database error:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to create service card",
        });
        return false;
      }

      await mutate({ type: 'services' });
      
      toast({
        title: "Success",
        description: "New service card created successfully",
      });
      
      return true;
    } catch (error: any) {
      console.error('[useServiceHandlers] Create operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create service card",
      });
      return false;
    }
  };

  const handleSave = async (id: string, data: Partial<ServiceFormData>) => {
    try {
      console.log('[useServiceHandlers] Starting service update:', { id, data });
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      const { error } = await supabase
        .from('services')
        .update({
          title: data.title,
          description: data.description,
          icon: data.icon,
          features: data.features || [],
          details: data.details || [],
          published: data.published,
          key: data.key,
          locale: data.locale
        })
        .eq('id', id)
        .select();

      if (error) {
        console.error('[useServiceHandlers] Update error:', error);
        throw error;
      }

      console.log('[useServiceHandlers] Service updated successfully');
      await mutate({ type: 'services' });

      toast({
        title: "Success",
        description: "Service updated successfully",
      });
    } catch (error: any) {
      console.error('[useServiceHandlers] Save operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update service",
      });
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
      await mutate({ type: 'services' });
      
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