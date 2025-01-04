import { useState } from "react";
import { useContent, useContentMutation } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Plus, Save, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "../expertise/types";

export const ExpertiseManager = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading } = useContent('expertise');
  const { mutate: updateContent } = useContentMutation();

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error deleting content",
        description: error.message,
      });
    } else {
      toast({
        title: "Content deleted",
        description: "The expertise card has been deleted successfully.",
      });
    }
  };

  const handleSave = async (id: string, data: Partial<ExpertiseItem>) => {
    const { error } = await supabase
      .from('content')
      .update({
        title: data.title,
        description: data.description,
        metadata: {
          tech: JSON.stringify(data.tech),
          icon: data.icon,
          details: {
            longDescription: data.details.longDescription,
            benefits: JSON.stringify(data.details.benefits),
            image: data.details.image
          }
        }
      })
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error updating content",
        description: error.message,
      });
    } else {
      toast({
        title: "Content updated",
        description: "The expertise card has been updated successfully.",
      });
    }
  };

  const handleCreate = async () => {
    const { error } = await supabase
      .from('content')
      .insert({
        type: 'expertise',
        key: 'expertise-' + Date.now(),
        title: 'New Expertise',
        description: 'Description here',
        metadata: {
          tech: JSON.stringify([]),
          icon: 'code',
          details: {
            longDescription: 'Long description here',
            benefits: JSON.stringify([]),
            image: '/placeholder.svg'
          }
        }
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error creating content",
        description: error.message,
      });
    } else {
      toast({
        title: "Content created",
        description: "New expertise card has been created.",
      });
      setNewCard(false);
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
            <form className="space-y-4">
              <div>
                <Label htmlFor={`title-${item.id}`}>Title</Label>
                <Input
                  id={`title-${item.id}`}
                  defaultValue={item.title}
                  onChange={(e) => {
                    const updatedData = { ...item, title: e.target.value };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`description-${item.id}`}>Description</Label>
                <Textarea
                  id={`description-${item.id}`}
                  defaultValue={item.description}
                  onChange={(e) => {
                    const updatedData = { ...item, description: e.target.value };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`longDescription-${item.id}`}>Long Description</Label>
                <Textarea
                  id={`longDescription-${item.id}`}
                  defaultValue={item.metadata?.details?.longDescription}
                  onChange={(e) => {
                    const updatedData = {
                      ...item,
                      details: {
                        ...item.metadata?.details,
                        longDescription: e.target.value
                      }
                    };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`tech-${item.id}`}>Technologies (comma-separated)</Label>
                <Input
                  id={`tech-${item.id}`}
                  defaultValue={JSON.parse(item.metadata?.tech || '[]').join(', ')}
                  onChange={(e) => {
                    const updatedData = {
                      ...item,
                      tech: e.target.value.split(',').map((t: string) => t.trim())
                    };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`benefits-${item.id}`}>Benefits (comma-separated)</Label>
                <Input
                  id={`benefits-${item.id}`}
                  defaultValue={JSON.parse(item.metadata?.details?.benefits || '[]').join(', ')}
                  onChange={(e) => {
                    const updatedData = {
                      ...item,
                      details: {
                        ...item.metadata?.details,
                        benefits: e.target.value.split(',').map((b: string) => b.trim())
                      }
                    };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`icon-${item.id}`}>Icon</Label>
                <Input
                  id={`icon-${item.id}`}
                  defaultValue={item.metadata?.icon}
                  onChange={(e) => {
                    const updatedData = {
                      ...item,
                      icon: e.target.value
                    };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div>
                <Label htmlFor={`image-${item.id}`}>Image URL</Label>
                <Input
                  id={`image-${item.id}`}
                  defaultValue={item.metadata?.details?.image}
                  onChange={(e) => {
                    const updatedData = {
                      ...item,
                      details: {
                        ...item.metadata?.details,
                        image: e.target.value
                      }
                    };
                    handleSave(item.id, updatedData);
                  }}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};