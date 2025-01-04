import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus, Trash } from "lucide-react";
import { ExpertiseForm } from "./ExpertiseForm";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { ExpertiseItem } from "../expertise/types";
import { toast } from "@/hooks/use-toast";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading } = useContent('expertise');
  const { mutate: updateContent } = useContentMutation();

  const handleCreate = async () => {
    try {
      await createExpertise();
      updateContent();
      setNewCard(false);
      toast({
        title: "Success",
        description: "New expertise card has been created",
        variant: "default",
      });
    } catch (error) {
      console.error('Error creating expertise:', error);
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
      updateContent();
      toast({
        title: "Success",
        description: "Expertise card has been updated",
        variant: "default",
      });
    } catch (error) {
      console.error('Error updating expertise:', error);
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
      updateContent();
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
        variant: "default",
      });
    } catch (error) {
      console.error('Error deleting expertise:', error);
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Manage Expertise</h2>
        <Button onClick={() => setNewCard(true)} disabled={newCard}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Card
        </Button>
      </div>

      {newCard && (
        <Card>
          <CardHeader>
            <CardTitle>New Expertise Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={handleCreate}>Create Card</Button>
              <Button variant="outline" onClick={() => setNewCard(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Array.isArray(content) && content.map((item: any) => {
        if (!item?.id) return null;
        
        try {
          const tech = JSON.parse(item.metadata?.tech || '[]');
          const benefits = JSON.parse(item.metadata?.details?.benefits || '[]');
          
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title || 'Untitled'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpertiseForm
                  item={{
                    id: item.id,
                    title: item.title || '',
                    description: item.description || '',
                    tech: Array.isArray(tech) ? tech : [],
                    icon: item.metadata?.icon || '',
                    details: {
                      longDescription: item.metadata?.details?.longDescription || '',
                      benefits: Array.isArray(benefits) ? benefits : [],
                      image: item.metadata?.details?.image || '/placeholder.svg'
                    }
                  }}
                  onSave={handleSave}
                  onDelete={handleDelete}
                />
              </CardContent>
            </Card>
          );
        } catch (error) {
          console.error('Error parsing item data:', error);
          return null;
        }
      })}
    </div>
  );
};