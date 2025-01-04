import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, MonitorSmartphone, Palette, PenTool, Layout, Image } from "lucide-react";

export const ProjectsSection = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "A modern online shopping experience built with cutting-edge technologies",
          tech: ["React", "Node.js", "MongoDB"],
          icon: "code"
        },
        {
          id: 2,
          title: "Healthcare Dashboard",
          description: "Comprehensive patient management system with real-time analytics",
          tech: ["React", "TypeScript", "GraphQL"],
          icon: "monitor"
        },
        {
          id: 3,
          title: "Brand Identity Design",
          description: "Complete brand identity package including logo, color palette, and typography",
          tech: ["Illustrator", "Photoshop", "Branding"],
          icon: "palette"
        },
        {
          id: 4,
          title: "Marketing Collateral",
          description: "Suite of marketing materials including brochures, flyers, and social media assets",
          tech: ["InDesign", "Photoshop", "Print Design"],
          icon: "penTool"
        },
        {
          id: 5,
          title: "UI/UX Design System",
          description: "Comprehensive design system for a large-scale web application",
          tech: ["Figma", "Design Systems", "UI/UX"],
          icon: "layout"
        },
        {
          id: 6,
          title: "Logo Collection",
          description: "Series of logo designs for various industries and businesses",
          tech: ["Illustrator", "Logo Design", "Branding"],
          icon: "image"
        }
      ];
    }
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading projects",
      description: "Please try again later.",
    });
  }

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "code":
        return <Code2 className="h-6 w-6 text-primary" />;
      case "monitor":
        return <MonitorSmartphone className="h-6 w-6 text-primary" />;
      case "palette":
        return <Palette className="h-6 w-6 text-primary" />;
      case "penTool":
        return <PenTool className="h-6 w-6 text-primary" />;
      case "layout":
        return <Layout className="h-6 w-6 text-primary" />;
      case "image":
        return <Image className="h-6 w-6 text-primary" />;
      default:
        return <Code2 className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Projects</h2>
        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project) => (
              <Card key={project.id} className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {getIcon(project.icon)}
                    <CardTitle>{project.title}</CardTitle>
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};