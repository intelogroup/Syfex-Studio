import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ExpertiseHeaderProps {
  onNewCard: () => void;
  isNewCardDisabled: boolean;
}

export const ExpertiseHeader = ({ onNewCard, isNewCardDisabled }: ExpertiseHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Manage Expertise</h2>
      <Button onClick={onNewCard} disabled={isNewCardDisabled}>
        <Plus className="w-4 h-4 mr-2" />
        Add New Card
      </Button>
    </div>
  );
};