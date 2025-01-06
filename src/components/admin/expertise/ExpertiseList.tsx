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
            {Array.isArray(items) && items.map((item) => (
              <SortableExpertiseCard
                key={item.id}
                item={item}
                onSave={onSave}
                onDelete={onDelete}
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