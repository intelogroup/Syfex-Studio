import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFieldsProps {
  id: string;
  title: string;
  description: string;
  onChange: (field: string, value: string) => void;
}

export const BasicInfoFields = ({ id, title, description, onChange }: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`title-${id}`}>Title</Label>
        <Input
          id={`title-${id}`}
          value={title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`description-${id}`}>Description</Label>
        <Textarea
          id={`description-${id}`}
          value={description}
          onChange={(e) => onChange('description', e.target.value)}
        />
      </div>
    </div>
  );
};