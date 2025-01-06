import { ExpertiseItem } from "./types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, X } from "lucide-react";
import { motion } from "framer-motion";

interface ExpertiseCardProps {
  title: string;
  description: string;
  tech: string[];
  icon: string;
  longDescription: string;
  benefits: string[];
  imageUrl: string;
}

export const ExpertiseCard = ({ title, description, tech, icon, longDescription, benefits, imageUrl }: ExpertiseCardProps) => {
  const Icon = Icons[icon as keyof typeof Icons] || Icons.code;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300 cursor-pointer group">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
            </div>
            <DialogDescription className="mt-3">{description}</DialogDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((item) => (
                <Badge key={item} variant="secondary" className="bg-secondary/10">
                  {item}
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
              <Icon className="h-6 w-6" />
            </div>
            {title}
          </DialogTitle>
          <DialogDescription className="text-lg">{description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {imageUrl && imageUrl !== '/placeholder.svg' && (
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-48 object-cover rounded-lg"
              />
            )}
            <p className="text-muted-foreground">{longDescription}</p>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Benefits:</h4>
              <ul className="list-disc list-inside space-y-1">
                {benefits.map((benefit, index) => (
                  <li key={index} className="text-muted-foreground">{benefit}</li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2">
              {tech.map((item) => (
                <Badge key={item} variant="secondary">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};