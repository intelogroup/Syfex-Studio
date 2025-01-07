import { useContentMutation } from "@/hooks/useContent";
import { ExpertiseItem } from "@/components/expertise/types";
import { useToast } from "@/hooks/use-toast";
import { createExpertise, deleteExpertise } from "@/services/expertise";
import { supabase } from "@/integrations/supabase/client";

export const useExpertiseHandlers = () => {
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      console.log('Starting expertise creation');
      const newExpertise = await createExpertise();
      console.log('Created new expertise:', newExpertise);
      
      if (newExpertise) {
        mutate({ ...newExpertise });
        toast({
          title: "Success",
          description: "New expertise card has been created",
        });
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Create error:', {
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

  const handleSave = async (id: string, data: Partial<ExpertiseItem>) => {
    try {
      console.log('Starting expertise save:', { id, data });
      await mutate({ id, ...data });
    } catch (error: any) {
      console.error('Save error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
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
        const error = new Error('Authentication required');
        console.error('[handleDelete] Auth error:', error);
        throw error;
      }

      console.log('[handleDelete] Executing delete query...');
      const { error, data } = await supabase
        .from('expertise')
        .delete()
        .eq('id', id);
      
      console.log('[handleDelete] Delete response:', { error, data });

      if (error) {
        console.error('[handleDelete] Database error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw error;
      }

      // Only mutate state if deletion was successful
      console.log('[handleDelete] Updating UI state...');
      mutate({ id });
      
      console.log('[handleDelete] Showing success toast...');
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
      });
    } catch (error: any) {
      console.error('[handleDelete] Operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
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