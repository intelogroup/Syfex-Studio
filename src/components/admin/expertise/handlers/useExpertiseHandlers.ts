import { useContentMutation } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseItem } from "@/components/expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "../../expertiseService";

export const useExpertiseHandlers = () => {
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      const newExpertise = await createExpertise();
      console.log('Created new expertise:', newExpertise);
      mutate({ ...newExpertise });
      toast({
        title: "Success",
        description: "New expertise card has been created",
      });
      return true;
    } catch (error: any) {
      console.error('Create error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
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
      console.log('Saving expertise:', { id, data });
      await mutate({ id, ...data });
    } catch (error: any) {
      console.error('Update error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('Deleting expertise:', id);
      await deleteExpertise(id);
      mutate({ id });
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
      });
    } catch (error: any) {
      console.error('Delete error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
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