import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect } from "react";

interface PortfolioItemDetails {
  fullDescription: string;
  technologies: string[];
  features: string[];
  results: string;
  link: string;
}

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  details: PortfolioItemDetails;
}

export const PortfolioCard = ({ item }: { item: PortfolioItem }) => {
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
        <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300 overflow-hidden cursor-pointer group">
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AspectRatio ratio={16 / 9}>
              <img 
                src={item.image} 
                alt={`${item.title} project showcase`} 
                className="object-cover w-full h-full rounded-lg"
                loading="lazy"
              />
            </AspectRatio>
            <p className="text-muted-foreground">{item.description}</p>
            <div className="flex items-center text-sm text-primary gap-1 group-hover:gap-2 transition-all">
              View details <ChevronRight className="h-4 w-4" />
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
          <DialogTitle>{item.title}</DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
            <p className="text-muted-foreground">
              {item.details.fullDescription}
            </p>
            <div className="space-y-2">
              <h4 className="font-semibold">Technologies Used:</h4>
              <div className="flex flex-wrap gap-2">
                {item.details.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Key Features:</h4>
              <ul className="list-disc list-inside space-y-1">
                {item.details.features.map((feature, index) => (
                  <li key={index} className="text-muted-foreground">{feature}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Results:</h4>
              <p className="text-muted-foreground">{item.details.results}</p>
            </div>
            <Button asChild className="w-full">
              <a href={item.details.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                Visit Project <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};