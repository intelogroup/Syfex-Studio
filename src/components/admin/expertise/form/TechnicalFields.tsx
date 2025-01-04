import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TechnicalFieldsProps {
  id: string;
  tech: string[];
  longDescription: string;
  onChange: (field: string, value: string) => void;
}

export const TechnicalFields = ({ id, tech, longDescription, onChange }: TechnicalFieldsProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`tech-${id}`}>Technologies (comma-separated)</Label>
        <Input
          id={`tech-${id}`}
          value={tech.join(', ')}
          onChange={(e) => onChange('tech', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor={`longDescription-${id}`}>Long Description</Label>
        <Textarea
          id={`longDescription-${id}`}
          value={longDescription}
          onChange={(e) => onChange('longDescription', e.target.value)}
        />
      </div>
    </div>
  );
};