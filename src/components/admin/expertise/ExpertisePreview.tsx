import { ExpertiseItem } from "../../expertise/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface ExpertisePreviewProps {
  item: ExpertiseItem;
}

export const ExpertisePreview = ({ item }: ExpertisePreviewProps) => {
  const Icon = Icons[item.icon as keyof typeof Icons] || Icons.code;

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-muted p-2">
          <Icon className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.description}</p>
        </div>
      </div>

      {item.tech.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Technologies</h4>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {item.details.longDescription && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Details</h4>
          <p className="text-sm text-muted-foreground">
            {item.details.longDescription}
          </p>
        </div>
      )}

      {item.details.benefits.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Benefits</h4>
          <ul className="list-disc list-inside space-y-1">
            {item.details.benefits.map((benefit, index) => (
              <li key={index} className="text-sm text-muted-foreground">
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.details.image && item.details.image !== '/placeholder.svg' && (
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Image</h4>
          <img
            src={item.details.image}
            alt={item.title}
            className="rounded-lg object-cover w-full max-h-48"
          />
        </div>
      )}
    </div>
  );
};