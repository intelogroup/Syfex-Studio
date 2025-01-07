import { Code, Palette, Laptop, CheckCircle2, ArrowRight, PenTool, Globe, Cpu, Smartphone, ShieldCheck, Headphones, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { supabase } from "@/integrations/supabase/client";

// Map string icon names to Lucide icon components
const iconMap: { [key: string]: any } = {
  code: Code,
  palette: Palette,
  laptop: Laptop,
  "pen-tool": PenTool,
  globe: Globe,
  cpu: Cpu,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
  headphones: Headphones,
  users: Users
};

export const ServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: services, isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      console.log('[ServicesSection] Fetching services from Supabase');
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('[ServicesSection] Error fetching services:', error);
        throw error;
      }

      console.log('[ServicesSection] Successfully fetched services:', data);
      return data || [];
    }
  });

  if (error) {
    console.error('[ServicesSection] Error in services query:', error);
    toast({
      variant: "destructive",
      title: "Error loading services",
      description: "Please try again later.",
    });
    return null;
  }

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

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services?.map((service, index) => {
              // Get the icon components from the map, fallback to Code icon
              const IconComponent = iconMap[service.icon] || Code;
              const SecondaryIconComponent = iconMap[service.secondary_icon] || Code;

              return (
                <motion.div
                  key={service.id}
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
                        <IconComponent className="w-12 h-12 text-primary mb-4" />
                        <SecondaryIconComponent className="w-8 h-8 text-secondary/60" />
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
                                toast({
                                  title: "Service Request Received",
                                  description: `Thank you for your interest in our ${service.title} service. We'll contact you soon!`,
                                });
                              }}
                              className="w-full"
                              variant="default"
                            >
                              Request Service
                            </Button>
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                const contactSection = document.getElementById('contact');
                                if (contactSection) {
                                  contactSection.scrollIntoView({ behavior: 'smooth' });
                                }
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
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};