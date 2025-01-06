import { useState } from "react";
import { useContentMutation } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseItem } from "../expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ErrorBoundary } from "../error-boundary";
import { ExpertiseFilterSection } from "./expertise/filters/ExpertiseFilterSection";
import { ExpertiseError } from "./expertise/error/ExpertiseError";
import { useExpertiseContent } from "@/hooks/useExpertiseContent";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const { data: content, isLoading, error } = useExpertiseContent();
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const availableTech = Array.from(
    new Set(content?.flatMap((item) => item.tech || []) || [])
  );

  const filteredContent = content?.filter(item => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech.length === 0 || 
      selectedTech.every(tech => item.tech?.includes(tech));

    return matchesSearch && matchesTech;
  });

  const handleCreate = async () => {
    try {
      await createExpertise();
      mutate(['content', 'expertise']);
      setNewCard(false);
      toast({
        title: "Success",
        description: "New expertise card has been created",
      });
    } catch (error: any) {
      console.error('Create error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create expertise card",
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
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update expertise card",
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
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete expertise card",
      });
    }
  };

  if (error) {
    return <ExpertiseError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ExpertiseHeader 
          onNewCard={() => setNewCard(true)} 
          isNewCardDisabled={newCard || isPending} 
        />

        <ExpertiseFilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTech={selectedTech}
          availableTech={availableTech}
          onTechSelect={(tech) => setSelectedTech([...selectedTech, tech])}
          onTechRemove={(tech) => setSelectedTech(selectedTech.filter(t => t !== tech))}
          isDisabled={isLoading || isPending}
        />

        {newCard && (
          <NewExpertiseCard
            onCreate={handleCreate}
            onCancel={() => setNewCard(false)}
            isLoading={isPending}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : (
          <ExpertiseList
            content={filteredContent || []}
            onSave={handleSave}
            onDelete={handleDelete}
            isLoading={isPending}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};