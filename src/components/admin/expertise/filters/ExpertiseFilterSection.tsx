import { ExpertiseSearch } from "../ExpertiseSearch";
import { ExpertiseFilters } from "../ExpertiseFilters";

interface ExpertiseFilterSectionProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedTech: string[];
  availableTech: string[];
  onTechSelect: (tech: string) => void;
  onTechRemove: (tech: string) => void;
  isDisabled?: boolean;
}

export const ExpertiseFilterSection = ({
  searchTerm,
  onSearchChange,
  selectedTech,
  availableTech,
  onTechSelect,
  onTechRemove,
  isDisabled
}: ExpertiseFilterSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-3">
        <ExpertiseSearch
          value={searchTerm}
          onChange={onSearchChange}
          disabled={isDisabled}
        />
      </div>
      <div className="border rounded-lg p-4">
        <ExpertiseFilters
          selectedTech={selectedTech}
          availableTech={availableTech}
          onTechSelect={onTechSelect}
          onTechRemove={onTechRemove}
        />
      </div>
    </div>
  );
};