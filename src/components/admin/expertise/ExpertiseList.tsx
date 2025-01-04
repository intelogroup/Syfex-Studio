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
        
        const metadata = item.metadata || {};
        const tech = Array.isArray(metadata.tech) ? metadata.tech : [];
        const details = metadata.details || {};
        const benefits = Array.isArray(details.benefits) ? details.benefits : [];
        
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
                  tech: tech,
                  icon: metadata.icon || 'code',
                  details: {
                    longDescription: details.longDescription || '',
                    benefits: benefits,
                    image: details.image || '/placeholder.svg'
                  }
                }}
                onSave={onSave}
                onDelete={onDelete}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};