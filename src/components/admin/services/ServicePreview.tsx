import { ServiceCard } from "@/components/services/ServiceCard";
import { Card, CardContent } from "@/components/ui/card";
import { ServicePreviewProps } from "./types";

export const ServicePreview = ({ service }: ServicePreviewProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardContent className="pt-6">
        <ServiceCard 
          service={{
            id: 'preview',
            title: service.title || 'Untitled Service',
            description: service.description || 'No description provided',
            icon: service.icon || 'code',
            features: service.features || [],
            details: service.details || []
          }}
          index={0}
          isExpanded={false}
          onToggle={() => {}}
        />
      </CardContent>
    </Card>
  );
};