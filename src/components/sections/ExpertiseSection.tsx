import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, Database, Globe, Laptop, Smartphone, Palette } from "lucide-react";
import { motion } from "framer-motion";

// Define animation variants separately from data
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const ExpertiseSection = () => {
  const { data: expertise, isLoading, error } = useQuery({
    queryKey: ['expertise'],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "Web Development",
          description: "Creating responsive, performant web applications with modern frameworks",
          tech: ["React", "Next.js", "TypeScript"],
          icon: "code"
        },
        {
          id: 2,
          title: "Backend Systems",
          description: "Building scalable server architectures and database solutions",
          tech: ["Node.js", "PostgreSQL", "Redis"],
          icon: "database"
        },
        {
          id: 3,
          title: "Mobile Development",
          description: "Crafting native and cross-platform mobile experiences",
          tech: ["React Native", "iOS", "Android"],
          icon: "smartphone"
        },
        {
          id: 4,
          title: "UI/UX Design",
          description: "Creating intuitive and beautiful user interfaces",
          tech: ["Figma", "Adobe XD", "Prototyping"],
          icon: "palette"
        },
        {
          id: 5,
          title: "Cloud Solutions",
          description: "Deploying and managing cloud infrastructure",
          tech: ["AWS", "Docker", "Kubernetes"],
          icon: "globe"
        },
        {
          id: 6,
          title: "Desktop Applications",
          description: "Developing cross-platform desktop software",
          tech: ["Electron", "Tauri", "C++"],
          icon: "laptop"
        }
      ];
    }
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading expertise",
      description: "Please try again later.",
    });
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

  return (
    <section id="expertise" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold gradient-text mb-6">Our Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leveraging cutting-edge technologies to deliver exceptional digital solutions
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {expertise?.map((expertiseItem) => (
              <motion.div key={expertiseItem.id} variants={item}>
                <Card className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(expertiseItem.icon)}
                      </div>
                      <CardTitle className="text-xl">{expertiseItem.title}</CardTitle>
                    </div>
                    <CardDescription className="mt-3">{expertiseItem.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {expertiseItem.tech.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-secondary/10">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};