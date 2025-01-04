import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Laptop, Smartphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

interface ExpertiseCardProps {
  title: string;
  description: string;
  tech: string[];
  icon: string;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case "code":
      return <Code2 className="h-6 w-6" />;
    case "database":
      return <Database className="h-6 w-6" />;
    case "smartphone":
      return <Smartphone className="h-6 w-6" />;
    case "palette":
      return <Palette className="h-6 w-6" />;
    case "globe":
      return <Globe className="h-6 w-6" />;
    case "laptop":
      return <Laptop className="h-6 w-6" />;
    default:
      return <Code2 className="h-6 w-6" />;
  }
};

export const ExpertiseCard = ({ title, description, tech, icon }: ExpertiseCardProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {getIcon(icon)}
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="mt-3">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tech.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-secondary/10">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};