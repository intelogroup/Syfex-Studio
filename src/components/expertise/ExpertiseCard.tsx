import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Laptop, Smartphone, Palette, ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";
import { ExpertiseDetails } from "./types";

interface ExpertiseCardProps {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  details: ExpertiseDetails;
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

export const ExpertiseCard = ({ title, description, tech, icon, details }: ExpertiseCardProps) => {
  useEffect(() => {
    const handleDialogOpen = () => {
      window.scrollTo(0, 0);
    };

    document.addEventListener('dialogopen', handleDialogOpen);
    return () => document.removeEventListener('dialogopen', handleDialogOpen);
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300 cursor-pointer group">
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
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-secondary/10">
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex items-center text-sm text-primary gap-1 group-hover:gap-2 transition-all">
              Learn more <ChevronRight className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {getIcon(icon)}
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="text-lg">{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <img 
              src={details.image} 
              alt={title} 
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">{details.longDescription}</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {details.benefits.map((benefit, index) => (
                  <li key={index} className="text-muted-foreground">{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
