import { Button } from "@/components/ui/button";
import { Plus, Eye } from "lucide-react";

interface ServicesHeaderProps {
  onNewCard: () => void;
  onPreview: () => void;
  isNewCardDisabled: boolean;
}

export const ServicesHeader = ({ onNewCard, onPreview, isNewCardDisabled }: ServicesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Manage Services</h2>
      <div className="flex gap-2">
        <Button onClick={onPreview} variant="outline">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
        <Button onClick={onNewCard} disabled={isNewCardDisabled}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Service
        </Button>
      </div>
    </div>
  );
};