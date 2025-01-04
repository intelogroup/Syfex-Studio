import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseItem } from "../expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading } = useContent('expertise');
  const { mutate } = useContentMutation();
  const { toast } = useToast();

  const handleCreate = async () => {
    try {
      const newExpertise = await createExpertise();
      mutate(['content', 'expertise']);
      setNewCard(false);
      toast({
        title: "Success",
        description: "New expertise card has been created",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create expertise card",
        variant: "destructive",
      });
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update expertise card",
        variant: "destructive",
      });
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expertise card",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-4">
      <ExpertiseHeader 
        onNewCard={() => setNewCard(true)} 
        isNewCardDisabled={newCard} 
      />

      {newCard && (
        <NewExpertiseCard
          onCreate={handleCreate}
          onCancel={() => setNewCard(false)}
        />
      )}

      <ExpertiseList
        content={content}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};