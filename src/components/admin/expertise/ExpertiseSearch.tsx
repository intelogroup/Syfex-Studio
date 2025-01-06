import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ExpertiseSearchProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const ExpertiseSearch = ({ value, onChange, disabled }: ExpertiseSearchProps) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search expertise cards..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
        disabled={disabled}
      />
    </div>
  );
};