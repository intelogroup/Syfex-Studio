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
          <ServicesGrid 
            services={services} 
            expandedCard={expandedCard}
            setExpandedCard={setExpandedCard}
          />
        )}
      </div>
    </section>
  );
};