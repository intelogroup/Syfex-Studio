import { motion } from "framer-motion";
import { Code, Laptop, Globe, GanttChart, Boxes, Braces } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const ProjectsSection = () => {
  const projects = [
    {
      title: "Web Development",
      description: "Full-stack web applications built with modern technologies",
      icon: Globe,
      stats: "50+ Projects Delivered",
      tech: "React, Node.js, TypeScript"
    },
    {
      title: "Mobile Solutions",
      description: "Cross-platform mobile applications for iOS and Android",
      icon: Laptop,
      stats: "30+ Apps Launched",
      tech: "React Native, Flutter"
    },
    {
      title: "Enterprise Software",
      description: "Custom enterprise solutions and legacy system modernization",
      icon: Boxes,
      stats: "20+ Enterprise Clients",
      tech: "Java, .NET, Cloud Services"
    },
    {
      title: "API Development",
      description: "Scalable and secure API architectures",
      icon: Braces,
      stats: "100+ APIs Built",
      tech: "REST, GraphQL, Microservices"
    },
    {
      title: "DevOps Solutions",
      description: "Automated deployment and infrastructure management",
      icon: Code,
      stats: "40+ CI/CD Pipelines",
      tech: "Docker, Kubernetes, AWS"
    },
    {
      title: "Project Management",
      description: "Agile project management and team coordination",
      icon: GanttChart,
      stats: "150+ Projects Managed",
      tech: "Agile, Scrum, Kanban"
    }
  ];

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Our Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delivering innovative solutions across various domains with cutting-edge technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <project.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm text-muted-foreground">{project.stats}</span>
                  </div>
                  <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-primary/80">{project.tech}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
