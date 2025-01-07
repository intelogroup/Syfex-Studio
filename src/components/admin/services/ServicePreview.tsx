import { ServiceCard } from "@/components/services/ServiceCard";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ServicePreviewProps } from "./types";

export const ServicePreview = ({ service }: ServicePreviewProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Eye className="w-4 h-4 mr-2" />
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Service Preview</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ServiceCard 
            service={{
              id: 'preview',
              title: service.title || 'Untitled Service',
              description: service.description || 'No description provided',
              icon: service.icon || 'code',
              features: service.features || [],
              details: service.details || [],
              published: service.published || false,
              key: service.key || 'preview',
              locale: service.locale || 'en'
            }}
            index={0}
            isExpanded={false}
            onToggle={() => {}}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};