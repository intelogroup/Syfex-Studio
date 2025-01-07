import { useState } from "react";
import { ExpertiseItem } from "../../expertise/types";
import { ExpertiseForm } from "../ExpertiseForm";
import { DndContext, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableExpertiseCard } from "./SortableExpertiseCard";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ExpertiseListProps {
  content: ExpertiseItem[];
  onSave: (id: string, data: Partial<ExpertiseItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ExpertiseList = ({ content, onSave, onDelete, isLoading }: ExpertiseListProps) => {
  const [items, setItems] = useState(content);
  const [previewMode, setPreviewMode] = useState(false);

  console.log('[ExpertiseList] Current items:', items.length);

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
        console.log('[ExpertiseList] Reordering items:', { oldIndex, newIndex });
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      console.log('[ExpertiseList] Delete requested for item:', id);
      await onDelete(id);
      console.log('[ExpertiseList] Delete successful, updating items list');
      setItems(items.filter(item => item.id !== id));
    } catch (error: any) {
      console.error('[ExpertiseList] Delete operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      throw error;
    }
  };

  const togglePreviewMode = () => {
    console.log('[ExpertiseList] Toggling preview mode:', !previewMode);
    setPreviewMode(!previewMode);
  };

  if (!items.length && !isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No expertise cards found. Create one using the button above.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={togglePreviewMode}
          className="flex items-center gap-2"
          disabled={isLoading}
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

      <DndContext 
        sensors={sensors} 
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {Array.isArray(items) && items.map((item) => (
              <SortableExpertiseCard
                key={item.id}
                item={item}
                onSave={onSave}
                onDelete={handleDelete}
                isLoading={isLoading}
                previewMode={previewMode}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
