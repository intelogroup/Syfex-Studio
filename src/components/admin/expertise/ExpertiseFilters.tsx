import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ExpertiseFiltersProps {
  selectedTech: string[];
  availableTech: string[];
  onTechSelect: (tech: string) => void;
  onTechRemove: (tech: string) => void;
}

export const ExpertiseFilters = ({
  selectedTech,
  availableTech,
  onTechSelect,
  onTechRemove,
}: ExpertiseFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4" />
        <h3 className="text-sm font-medium">Filters</h3>
      </div>
      
      {selectedTech.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Selected Technologies:</div>
          <ScrollArea className="h-20">
            <div className="flex flex-wrap gap-2">
              {selectedTech.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tech}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 hover:bg-transparent"
                    onClick={() => onTechRemove(tech)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}

      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">Available Technologies:</div>
        <ScrollArea className="h-40">
          <div className="flex flex-wrap gap-2">
            {availableTech
              .filter((tech) => !selectedTech.includes(tech))
              .map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="cursor-pointer hover:bg-secondary"
                  onClick={() => onTechSelect(tech)}
                >
                  {tech}
                </Badge>
              ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};