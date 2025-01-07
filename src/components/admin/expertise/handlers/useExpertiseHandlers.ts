import { useContentMutation } from "@/hooks/useContent";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useExpertiseHandlers = () => {
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      console.log('Starting expertise creation');
      const { data: newExpertise, error } = await supabase
        .from('expertise')
        .insert([{
          title: 'New Expertise',
          description: '',
          key: `expertise-${Date.now()}`,
          locale: 'en'
        }])
        .select()
        .maybeSingle();

      if (error) throw error;
      
      if (newExpertise) {
        mutate({ ...newExpertise });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Create error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create expertise card",
      });
      return false;
    }
  };

  const handleSave = async (id: string, data: any) => {
    try {
      console.log('Starting expertise save:', { id, data });
      await mutate({ id, ...data });
    } catch (error: any) {
      console.error('Save error:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('[handleDelete] Starting expertise deletion:', id);
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

      // Only invalidate queries after successful deletion
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