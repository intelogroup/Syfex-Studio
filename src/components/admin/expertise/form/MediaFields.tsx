import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MediaFieldsProps {
  id: string;
  icon: string;
  image: string;
  onChange: (field: string, value: string) => void;
}

export const MediaFields = ({ id, icon, image, onChange }: MediaFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`icon-${id}`}>Icon</Label>
        <Input
          id={`icon-${id}`}
          value={icon}
          onChange={(e) => onChange('icon', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`image-${id}`}>Image URL</Label>
        <Input
          id={`image-${id}`}
          value={image}
          onChange={(e) => onChange('image', e.target.value)}
        />
      </div>
    </div>
  );
};