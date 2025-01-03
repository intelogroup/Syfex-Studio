import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

export const PortfolioSection = () => {
  const portfolioItems = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution with real-time inventory management",
      image: "https://placehold.co/600x400/1a1a1a/ffffff?text=E-Commerce",
      tags: ["React", "Node.js", "MongoDB", "AWS"],
      link: "#"
    },
    {
      title: "Healthcare App",
      description: "Mobile application for patient care management",
      image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Healthcare",
      tags: ["React Native", "Firebase", "HIPAA Compliant"],
      link: "#"
    },
    {
      title: "Financial Dashboard",
      description: "Real-time financial data visualization platform",
      image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Finance",
      tags: ["Vue.js", "D3.js", "Python", "Docker"],
      link: "#"
    },
    {
      title: "Social Network",
      description: "Community platform with real-time messaging",
      image: "https://placehold.co/600x400/1a1a1a/ffffff?text=Social",
      tags: ["Next.js", "GraphQL", "PostgreSQL"],
      link: "#"
    }
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
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Showcasing our best work and successful project deliveries
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
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
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/20">
                        {tag}
                      </Badge>
                    ))}
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