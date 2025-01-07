import { ServiceForm } from "./ServiceForm";
import { Card } from "@/components/ui/card";
import { Tables } from "@/integrations/supabase/types";

interface ServicesListProps {
  content: Tables<"services">[];
  onSave: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ServicesList = ({ content, onSave, onDelete, isLoading }: ServicesListProps) => {
  console.log('[ServicesList] Rendering services:', content);
  
  return (
    <div className="space-y-4">
      {Array.isArray(content) && content.map((item) => (
        <Card key={item.id} className="p-6">
          <ServiceForm
            item={item}
            onSave={onSave}
            onDelete={onDelete}
            isLoading={isLoading}
          />
        </Card>
      ))}
      
      {(!content || content.length === 0) && (
        <div className="text-center text-muted-foreground py-8">
          No services found. Create one using the button above.
        </div>
      )}
    </div>
  );
};