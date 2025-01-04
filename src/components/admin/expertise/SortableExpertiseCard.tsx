import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpertiseItem } from "../../expertise/types";
import { ExpertiseForm } from "../ExpertiseForm";
import { GripVertical } from "lucide-react";
import { ExpertisePreview } from "./ExpertisePreview";

interface SortableExpertiseCardProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
  previewMode?: boolean;
}

export const SortableExpertiseCard = ({
  item,
  onSave,
  onDelete,
  isLoading,
  previewMode
}: SortableExpertiseCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`relative ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="h-6 w-6 text-muted-foreground" />
      </div>

      <CardHeader className="pl-12">
        <CardTitle>{item.title || 'Untitled'}</CardTitle>
      </CardHeader>
      <CardContent>
        {previewMode ? (
          <ExpertisePreview item={item} />
        ) : (
          <ExpertiseForm
            item={item}
            onSave={onSave}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        )}
      </CardContent>
    </Card>
  );
};