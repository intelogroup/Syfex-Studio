import { useState } from "react";
import { ExpertiseItem } from "../../expertise/types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";

interface ExpertiseFormProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => void;
  onDelete: (id: string) => void;
}

export const ExpertiseForm = ({ item, onSave, onDelete }: ExpertiseFormProps) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInfoFields
        id={item.id}
        title={formData.title}
        description={formData.description}
        onChange={handleChange}
      />

      <TechnicalFields
        id={item.id}
        tech={formData.tech}
        longDescription={formData.details.longDescription}
        onChange={handleChange}
      />

      <MediaFields
        id={item.id}
        icon={formData.icon}
        image={formData.details.image}
        onChange={handleChange}
      />

      <div className="flex justify-end gap-2">
        <Button type="submit" size="sm">
          Save Changes
        </Button>
        <Button
          type="button"
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