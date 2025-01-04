import { ExpertiseItem } from "../expertise/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";

interface ExpertiseFormProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => void;
  onDelete: (id: string) => void;
}

export const ExpertiseForm = ({ item, onSave, onDelete }: ExpertiseFormProps) => {
  return (
    <form className="space-y-4">
      <div>
        <Label htmlFor={`title-${item.id}`}>Title</Label>
        <Input
          id={`title-${item.id}`}
          defaultValue={item.title}
          onChange={(e) => {
            const updatedData = { ...item, title: e.target.value };
            onSave(item.id, updatedData);
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
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`longDescription-${item.id}`}>Long Description</Label>
        <Textarea
          id={`longDescription-${item.id}`}
          defaultValue={item.details?.longDescription || ''}
          onChange={(e) => {
            const updatedData = {
              ...item,
              details: {
                ...item.details,
                longDescription: e.target.value
              }
            };
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`tech-${item.id}`}>Technologies (comma-separated)</Label>
        <Input
          id={`tech-${item.id}`}
          defaultValue={item.tech?.join(', ') || ''}
          onChange={(e) => {
            const updatedData = {
              ...item,
              tech: e.target.value.split(',').map((t: string) => t.trim())
            };
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`benefits-${item.id}`}>Benefits (comma-separated)</Label>
        <Input
          id={`benefits-${item.id}`}
          defaultValue={item.details?.benefits?.join(', ') || ''}
          onChange={(e) => {
            const updatedData = {
              ...item,
              details: {
                ...item.details,
                benefits: e.target.value.split(',').map((b: string) => b.trim())
              }
            };
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`icon-${item.id}`}>Icon</Label>
        <Input
          id={`icon-${item.id}`}
          defaultValue={item.icon}
          onChange={(e) => {
            const updatedData = {
              ...item,
              icon: e.target.value
            };
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div>
        <Label htmlFor={`image-${item.id}`}>Image URL</Label>
        <Input
          id={`image-${item.id}`}
          defaultValue={item.details?.image || ''}
          onChange={(e) => {
            const updatedData = {
              ...item,
              details: {
                ...item.details,
                image: e.target.value
              }
            };
            onSave(item.id, updatedData);
          }}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(item.id)}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </form>
  );
};