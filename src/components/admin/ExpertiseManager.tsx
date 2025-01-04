import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus } from "lucide-react";
import { ExpertiseForm } from "./ExpertiseForm";
import { createExpertise, updateExpertise, deleteExpertise } from "./expertiseService";
import { ExpertiseItem } from "../expertise/types";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading } = useContent('expertise');
  const { mutate: updateContent } = useContentMutation();

  const handleCreate = async () => {
    try {
      await createExpertise();
      updateContent();
      setNewCard(false);
    } catch (error) {
      console.error('Error creating expertise:', error);
    }
  };

  const handleSave = async (id: string, data: Partial<ExpertiseItem>) => {
    try {
      await updateExpertise(id, data);
      updateContent();
    } catch (error) {
      console.error('Error updating expertise:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteExpertise(id);
      updateContent();
    } catch (error) {
      console.error('Error deleting expertise:', error);
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

      {content?.map((item: any) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpertiseForm
              item={{
                id: item.id,
                title: item.title || '',
                description: item.description || '',
                tech: JSON.parse(item.metadata?.tech || '[]'),
                icon: item.metadata?.icon || '',
                details: {
                  longDescription: item.metadata?.details?.longDescription || '',
                  benefits: JSON.parse(item.metadata?.details?.benefits || '[]'),
                  image: item.metadata?.details?.image || '/placeholder.svg'
                }
              }}
              onSave={handleSave}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  );
};