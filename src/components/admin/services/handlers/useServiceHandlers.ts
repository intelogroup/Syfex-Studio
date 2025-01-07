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
      if (!session) {
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
        secondary_icon: formData.secondary_icon || 'code',
        features: formData.features || [],
        details: formData.details || [],
        created_by: session.user.id
      };
      
      const { error } = await supabase
        .from('services')
        .insert([servicePayload]);

      if (error) {
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
      console.error('[useServiceHandlers] Create operation failed:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create service card",
      });
      return false;
    }
  };

  const handleSave = async (id: string, data: any) => {
    try {
      console.log('[useServiceHandlers] Starting service save:', { id, data });
      await mutate({ id, ...data });
    } catch (error: any) {
      console.error('[useServiceHandlers] Save error:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Service card has been deleted",
      });
      
      return true;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete service card",
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