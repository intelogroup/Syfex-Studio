import { motion } from "framer-motion";
import { Code, Laptop, Globe, GanttChart, Boxes, Braces, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProjectsSection = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      title: "Web Development",
      description: "Full-stack web applications built with modern technologies",
      icon: Globe,
      stats: "50+ Projects Delivered",
      tech: "React, Node.js, TypeScript",
      details: [
        "Single Page Applications (SPA) with React and TypeScript",
        "RESTful API development with Node.js and Express",
        "Real-time applications using WebSocket",
        "Progressive Web Apps (PWA) implementation"
      ]
    },
    {
      title: "Mobile Solutions",
      description: "Cross-platform mobile applications for iOS and Android",
      icon: Laptop,
      stats: "30+ Apps Launched",
      tech: "React Native, Flutter",
      details: [
        "Native-like performance with React Native",
        "Cross-platform compatibility",
        "Push notification integration",
        "Offline-first architecture"
      ]
    },
    {
      title: "Enterprise Software",
      description: "Custom enterprise solutions and legacy system modernization",
      icon: Boxes,
      stats: "20+ Enterprise Clients",
      tech: "Java, .NET, Cloud Services",
      details: [
        "Legacy system modernization",
        "Microservices architecture",
        "Cloud migration strategies",
        "Enterprise-grade security"
      ]
    },
    {
      title: "API Development",
      description: "Scalable and secure API architectures",
      icon: Braces,
      stats: "100+ APIs Built",
      tech: "REST, GraphQL, Microservices",
      details: [
        "RESTful API design and implementation",
        "GraphQL schema development",
        "API security and authentication",
        "Performance optimization"
      ]
    },
    {
      title: "DevOps Solutions",
      description: "Automated deployment and infrastructure management",
      icon: Code,
      stats: "40+ CI/CD Pipelines",
      tech: "Docker, Kubernetes, AWS",
      details: [
        "Containerization with Docker",
        "Kubernetes orchestration",
        "CI/CD pipeline automation",
        "Infrastructure as Code (IaC)"
      ]
    },
    {
      title: "Project Management",
      description: "Agile project management and team coordination",
      icon: GanttChart,
      stats: "150+ Projects Managed",
      tech: "Agile, Scrum, Kanban",
      details: [
        "Agile methodology implementation",
        "Sprint planning and execution",
        "Team collaboration frameworks",
        "Project tracking and metrics"
      ]
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Technical Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Delivering innovative solutions across various domains with cutting-edge technology and proven methodologies
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
              <Card className="h-full bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
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
                <CardContent className="space-y-4">
                  <div className="text-sm text-primary/80 font-medium">{project.tech}</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {project.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="w-4 h-4 mr-2 mt-0.5 text-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/services")}
            className="group"
          >
            View All Services
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};