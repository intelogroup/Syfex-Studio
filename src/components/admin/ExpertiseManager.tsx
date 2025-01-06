import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseItem } from "../expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ErrorBoundary } from "../error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { ExpertiseSearch } from "./expertise/ExpertiseSearch";
import { ExpertiseFilters } from "./expertise/ExpertiseFilters";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const { data: content, isLoading, error } = useContent('expertise');
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const availableTech = Array.from(
    new Set(
      content?.flatMap((item) => {
        const metadata = item.metadata as Record<string, any>;
        return metadata?.tech || [];
      }) || []
    )
  );

  const filteredContent = content?.filter(item => {
    const metadata = item.metadata as Record<string, any>;
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech.length === 0 || 
      selectedTech.every(tech => metadata?.tech?.includes(tech));

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
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Error loading expertise cards: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ExpertiseHeader 
          onNewCard={() => setNewCard(true)} 
          isNewCardDisabled={newCard || isPending} 
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3 space-y-4">
            <ExpertiseSearch
              value={searchTerm}
              onChange={setSearchTerm}
              disabled={isLoading || isPending}
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

          <div className="border rounded-lg p-4">
            <ExpertiseFilters
              selectedTech={selectedTech}
              availableTech={availableTech}
              onTechSelect={(tech) => setSelectedTech([...selectedTech, tech])}
              onTechRemove={(tech) => setSelectedTech(selectedTech.filter(t => t !== tech))}
            />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};