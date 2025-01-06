import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseItem } from "../expertise/types";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { useToast } from "@/hooks/use-toast";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ErrorBoundary } from "../error-boundary";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: content, isLoading, error } = useContent('expertise');
  const { mutate, isPending } = useContentMutation();
  const { toast } = useToast();

  const filteredContent = content?.filter(item => 
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        title: "Error",
        description: error.message || "Failed to create expertise card",
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
    } catch (error: any) {
      console.error('Update error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update expertise card",
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
    } catch (error: any) {
      console.error('Delete error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to delete expertise card",
        variant: "destructive",
      });
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
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

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expertise cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            disabled={isLoading || isPending}
          />
        </div>

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