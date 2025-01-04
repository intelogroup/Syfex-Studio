import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, Github } from "lucide-react";

interface PortfolioItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink?: string;
  category: "web" | "mobile" | "desktop" | "all";
}

const portfolioItems: PortfolioItem[] = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management and secure payment processing. Built with scalability in mind.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=2400&q=80",
    tags: ["React", "Node.js", "MongoDB", "AWS"],
    link: "#",
    githubLink: "https://github.com",
    category: "web"
  },
  {
    title: "Healthcare App",
    description: "Mobile application for patient care management with real-time notifications and secure data handling.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=2400&q=80",
    tags: ["React Native", "Firebase", "HIPAA Compliant"],
    link: "#",
    category: "mobile"
  },
  {
    title: "Financial Dashboard",
    description: "Real-time financial data visualization platform with advanced analytics and reporting features.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=2400&q=80",
    tags: ["Vue.js", "D3.js", "Python", "Docker"],
    link: "#",
    githubLink: "https://github.com",
    category: "desktop"
  },
  {
    title: "Social Network",
    description: "Community platform with real-time messaging and content sharing capabilities.",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2400&q=80",
    tags: ["Next.js", "GraphQL", "PostgreSQL"],
    link: "#",
    category: "web"
  }
];

export const PortfolioSection = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile" | "desktop">("all");
  const { toast } = useToast();

  const filteredItems = portfolioItems.filter(
    item => activeCategory === "all" || item.category === activeCategory
  );

  const handleVisit = (title: string, link: string) => {
    if (link === "#") {
      toast({
        title: "Demo Unavailable",
        description: "This project's demo is currently unavailable. Please check back later.",
        variant: "destructive",
      });
      return;
    }
    window.open(link, "_blank");
  };

  const categories = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "mobile", label: "Mobile Apps" },
    { value: "desktop", label: "Desktop Apps" },
  ];

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Our Portfolio</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Showcasing our best work and successful project deliveries
          </p>

          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={activeCategory === category.value ? "secondary" : "outline"}
                onClick={() => setActiveCategory(category.value as typeof activeCategory)}
                className="transition-all duration-300"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={() => handleVisit(item.title, item.link)}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Visit Project
                    </Button>
                    {item.githubLink && (
                      <Button
                        variant="outline"
                        onClick={() => handleVisit(item.title, item.githubLink!)}
                      >
                        <Github className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};