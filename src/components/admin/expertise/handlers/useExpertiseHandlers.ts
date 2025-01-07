import { useContentMutation } from "@/hooks/useContent";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseItem } from "@/components/expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "../../expertiseService";

export const useExpertiseHandlers = () => {
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      await createExpertise();
      mutate(['content', 'expertise']);
      toast({
        title: "Success",
        description: "New expertise card has been created",
      });
      return true;
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

  const handleSave = async (id: string, data: Partial<ExpertiseItem>) => {
    try {
      await updateExpertise(id, data);
      mutate(['content', 'expertise']);
      toast({
        title: "Success",
        description: "Expertise card has been updated",
      });
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update expertise card",
      });
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpertise(id);
      mutate(['content', 'expertise']);
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
      });
    } catch (error: any) {
      console.error('Delete error:', error);
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