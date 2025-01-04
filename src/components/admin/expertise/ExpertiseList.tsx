import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpertiseItem } from "../../expertise/types";
import { ExpertiseForm } from "../ExpertiseForm";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableExpertiseCard } from "./SortableExpertiseCard";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ExpertiseListProps {
  content: any[];
  onSave: (id: string, data: Partial<ExpertiseItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ExpertiseList = ({ content, onSave, onDelete, isLoading }: ExpertiseListProps) => {
  const [items, setItems] = useState(content);
  const [previewMode, setPreviewMode] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={togglePreviewMode}
          className="flex items-center gap-2"
        >
          {previewMode ? (
            <>
              <EyeOff className="h-4 w-4" />
              Exit Preview
            </>
          ) : (
            <>
              <Eye className="h-4 w-4" />
              Preview Mode
            </>
          )}
        </Button>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {Array.isArray(items) && items.map((item: any) => {
              if (!item?.id) return null;
              
              const metadata = item.metadata || {};
              const tech = Array.isArray(metadata.tech) ? metadata.tech : [];
              const details = metadata.details || {};
              const benefits = Array.isArray(details.benefits) ? details.benefits : [];
              
              const expertiseItem: ExpertiseItem = {
                id: item.id,
                title: item.title || '',
                description: item.description || '',
                tech: tech,
                icon: metadata.icon || 'code',
                details: {
                  longDescription: details.longDescription || '',
                  benefits: benefits,
                  image: details.image || '/placeholder.svg'
                }
              };
              
              return (
                <SortableExpertiseCard
                  key={item.id}
                  item={expertiseItem}
                  onSave={onSave}
                  onDelete={onDelete}
                  isLoading={isLoading}
                  previewMode={previewMode}
                />
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};