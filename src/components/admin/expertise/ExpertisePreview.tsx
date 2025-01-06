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
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle className="text-xl">{item.title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Description</h4>
          <p className="text-sm text-muted-foreground">{item.description}</p>
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
      </CardContent>
    </Card>
  );
};