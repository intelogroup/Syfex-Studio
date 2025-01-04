import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { AlertCircle, ChevronRight, ExternalLink } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const PortfolioSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((item) => (
      <Card key={item} className="bg-card/50 backdrop-blur-sm border-muted">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Skeleton className="h-4 w-1/2 mt-4" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export const PortfolioSection = () => {
  const { data: portfolioItems, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Complete online shopping solution",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A comprehensive e-commerce platform built with modern technologies, featuring real-time inventory management, secure payments, and analytics dashboard.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            features: ["Real-time inventory", "Payment processing", "Admin dashboard", "Analytics"],
            results: "Increased sales by 150% within first 3 months",
            link: "https://example.com/ecommerce"
          }
        },
        {
          id: 2,
          title: "Brand Identity Design",
          description: "Complete brand identity package",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Comprehensive brand identity design including logo, color palette, typography, and brand guidelines.",
            technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy"],
            features: ["Logo design", "Color system", "Typography", "Guidelines"],
            results: "Successfully launched new brand identity across all channels",
            link: "https://example.com/brand"
          }
        },
        {
          id: 3,
          title: "Mobile App Development",
          description: "Cross-platform fitness application",
          image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A feature-rich fitness tracking application with social features and personalized workout plans.",
            technologies: ["React Native", "Firebase", "Node.js"],
            features: ["Workout tracking", "Social sharing", "Progress analytics"],
            results: "Over 100k downloads in first month",
            link: "https://example.com/fitness-app"
          }
        },
        {
          id: 4,
          title: "Marketing Campaign",
          description: "Integrated digital marketing",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Comprehensive digital marketing campaign including social media, email marketing, and PPC advertising.",
            technologies: ["Google Ads", "Facebook Ads", "Email Marketing"],
            features: ["Social media strategy", "Email campaigns", "PPC optimization"],
            results: "300% ROI on marketing spend",
            link: "https://example.com/marketing"
          }
        },
        {
          id: 5,
          title: "AI Integration",
          description: "Machine learning solution",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Implementation of AI-powered recommendation system for e-commerce platform.",
            technologies: ["Python", "TensorFlow", "AWS"],
            features: ["Product recommendations", "User behavior analysis", "A/B testing"],
            results: "25% increase in average order value",
            link: "https://example.com/ai-solution"
          }
        },
        {
          id: 6,
          title: "Web Application",
          description: "Cloud-based project management",
          image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Modern project management platform with real-time collaboration features and resource management.",
            technologies: ["React", "GraphQL", "MongoDB"],
            features: ["Task management", "Resource allocation", "Reports"],
            results: "Adopted by 50+ enterprise clients",
            link: "https://example.com/project-management"
          }
        }
      ];
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (error) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load portfolio items. Please try again later.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} variant="outline" className="w-full">
            Retry Loading
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Portfolio</h2>
        {isLoading ? (
          <PortfolioSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems?.map(item => (
              <Dialog key={item.id}>
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
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{item.title}</DialogTitle>
                    <DialogDescription>{item.description}</DialogDescription>
                  </DialogHeader>
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
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};