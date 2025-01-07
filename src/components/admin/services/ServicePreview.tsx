import { ServicePreviewData } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface ServicePreviewProps {
  services: ServicePreviewData[];
}

export const ServicePreview = ({ services }: ServicePreviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service, index) => {
        const Icon = Icons[service.icon as keyof typeof Icons] || Icons.code;
        
        return (
          <Card key={index} className="bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Description</h4>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>

              {service.features && service.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, idx) => (
                      <Badge key={idx} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {service.details && service.details.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Details</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Key: {service.key}</span>
                <span>Locale: {service.locale}</span>
                <span>Status: {service.published ? 'Published' : 'Draft'}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};