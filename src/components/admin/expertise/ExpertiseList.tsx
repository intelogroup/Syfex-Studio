import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExpertiseItem } from "../../expertise/types";
import { ExpertiseForm } from "./ExpertiseForm";

interface ExpertiseListProps {
  content: any[];
  onSave: (id: string, data: Partial<ExpertiseItem>) => void;
  onDelete: (id: string) => void;
}

export const ExpertiseList = ({ content, onSave, onDelete }: ExpertiseListProps) => {
  return (
    <div className="space-y-4">
      {Array.isArray(content) && content.map((item: any) => {
        if (!item?.id) return null;
        
        try {
          const tech = JSON.parse(item.metadata?.tech || '[]');
          const benefits = JSON.parse(item.metadata?.details?.benefits || '[]');
          
          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.title || 'Untitled'}</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpertiseForm
                  item={{
                    id: item.id,
                    title: item.title || '',
                    description: item.description || '',
                    tech: Array.isArray(tech) ? tech : [],
                    icon: item.metadata?.icon || '',
                    details: {
                      longDescription: item.metadata?.details?.longDescription || '',
                      benefits: Array.isArray(benefits) ? benefits : [],
                      image: item.metadata?.details?.image || '/placeholder.svg'
                    }
                  }}
                  onSave={onSave}
                  onDelete={onDelete}
                />
              </CardContent>
            </Card>
          );
        } catch (error) {
          console.error('Error parsing item data:', error);
          return null;
        }
      })}
    </div>
  );
};