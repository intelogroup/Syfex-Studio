import { useState } from "react";
import { ExpertiseItem } from "../expertise/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash } from "lucide-react";
import { LoadingSpinner } from "../ui/loading-spinner";

interface ExpertiseFormProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => void;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export const ExpertiseForm = ({ item, onSave, onDelete, isLoading }: ExpertiseFormProps) => {
  const [formData, setFormData] = useState<ExpertiseItem>(item);

  const handleChange = (field: keyof ExpertiseItem | 'longDescription' | 'benefits' | 'image', value: string) => {
    if (field === 'tech') {
      setFormData({
        ...formData,
        tech: value.split(',').map(t => t.trim())
      });
    } else if (field === 'longDescription' || field === 'benefits' || field === 'image') {
      setFormData({
        ...formData,
        details: {
          ...formData.details,
          [field]: field === 'benefits' 
            ? value.split(',').map(b => b.trim())
            : value
        }
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(item.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor={`title-${item.id}`}>Title</Label>
        <Input
          id={`title-${item.id}`}
          value={formData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`description-${item.id}`}>Description</Label>
        <Textarea
          id={`description-${item.id}`}
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`longDescription-${item.id}`}>Long Description</Label>
        <Textarea
          id={`longDescription-${item.id}`}
          value={formData.details?.longDescription || ''}
          onChange={(e) => handleChange('longDescription', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`tech-${item.id}`}>Technologies (comma-separated)</Label>
        <Input
          id={`tech-${item.id}`}
          value={formData.tech?.join(', ') || ''}
          onChange={(e) => handleChange('tech', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`benefits-${item.id}`}>Benefits (comma-separated)</Label>
        <Input
          id={`benefits-${item.id}`}
          value={formData.details?.benefits?.join(', ') || ''}
          onChange={(e) => handleChange('benefits', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`icon-${item.id}`}>Icon</Label>
        <Input
          id={`icon-${item.id}`}
          value={formData.icon}
          onChange={(e) => handleChange('icon', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div>
        <Label htmlFor={`image-${item.id}`}>Image URL</Label>
        <Input
          id={`image-${item.id}`}
          value={formData.details?.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          disabled={isLoading}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? <LoadingSpinner className="mr-2" /> : null}
          Save Changes
        </Button>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => onDelete(item.id)}
          disabled={isLoading}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </form>
  );
};