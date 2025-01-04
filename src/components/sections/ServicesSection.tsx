import { Code, Palette, Laptop, CheckCircle2, ArrowRight, PenTool, Globe, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { toast } = useToast();

  const services = [
    {
      title: "Logo & Brand Design",
      description: "Creating distinctive brand identities that leave lasting impressions",
      icon: Palette,
      details: [
        "Custom Logo Design",
        "Brand Identity Guidelines",
        "Business Card & Stationery",
        "Social Media Branding",
      ],
      features: [
        "Unique & Memorable Designs",
        "Multiple Concept Options",
        "Unlimited Revisions",
        "Full Brand Guidelines",
      ],
      secondaryIcon: PenTool,
    },
    {
      title: "Website Design",
      description: "Crafting modern, responsive websites that engage and convert",
      icon: Laptop,
      details: [
        "UI/UX Design",
        "Responsive Layouts",
        "Interactive Prototypes",
        "Design Systems",
      ],
      features: [
        "Mobile-First Approach",
        "User-Centric Design",
        "Conversion Optimization",
        "Modern Aesthetics",
      ],
      secondaryIcon: Globe,
    },
    {
      title: "Website Development",
      description: "Building robust, scalable web applications with cutting-edge technology",
      icon: Code,
      details: [
        "Frontend Development",
        "Backend Integration",
        "CMS Implementation",
        "Performance Optimization",
      ],
      features: [
        "Clean, Efficient Code",
        "SEO Best Practices",
        "Security Measures",
        "Ongoing Support",
      ],
      secondaryIcon: Cpu,
    },
  ];

  const handleServiceRequest = (serviceTitle: string) => {
    // In a real app, this could send data to a backend or open a form
    toast({
      title: "Service Request Received",
      description: `Thank you for your interest in our ${serviceTitle} service. We'll contact you soon!`,
      duration: 5000,
    });
    
    // Simulate sending to backend
    console.log("Service requested:", {
      service: serviceTitle,
      timestamp: new Date().toISOString(),
    });
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      toast({
        title: "Navigation Error",
        description: "Contact form not found. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="services" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Our Services
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
              className="cursor-pointer"
            >
              <Card className={`bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 ${
                expandedCard === index ? 'scale-105' : ''
              }`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <service.icon className="w-12 h-12 text-primary mb-4" />
                    <service.secondaryIcon className="w-8 h-8 text-secondary/60" />
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: expandedCard === index ? 'auto' : 0,
                      opacity: expandedCard === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 space-y-6">
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2">What we offer:</h4>
                        <ul className="space-y-2">
                          {service.details.map((detail, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleServiceRequest(service.title);
                          }}
                          className="w-full"
                          variant="default"
                        >
                          Request Service
                        </Button>
                        <Button 
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToContact();
                          }}
                          className="w-full"
                          variant="secondary"
                        >
                          Contact Us
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};