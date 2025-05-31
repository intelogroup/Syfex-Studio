
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner } from "../ui/loading-spinner";
import { supabase } from "@/integrations/supabase/client";
import { ServicesGrid } from "../services/ServicesGrid";

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
    <section id="services" className="py-32 relative overflow-hidden section-enhanced">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8"
          >
            <span className="text-sm font-medium text-primary">What We Offer</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Our Services
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium"
          >
            Comprehensive digital solutions tailored to elevate your business
          </motion.p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <ServicesGrid 
              services={services} 
              expandedCard={expandedCard}
              setExpandedCard={setExpandedCard}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};
