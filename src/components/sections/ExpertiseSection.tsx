import { useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ExpertiseCard } from "../expertise/ExpertiseCard";
import { container } from "../expertise/expertiseAnimations";
import { fetchExpertiseContent } from "../expertise/api";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const ExpertiseSection = () => {
  const queryClient = useQueryClient();
  const { data: expertise, isLoading, error } = useQuery({
    queryKey: ['expertise'],
    queryFn: fetchExpertiseContent,
    retry: 1
  });

  useEffect(() => {
    const channel = supabase
      .channel('expertise-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'expertise'
        },
        () => {
          console.log('Expertise table changed, invalidating query...');
          queryClient.invalidateQueries({ queryKey: ['expertise'] });
          toast({
            title: "Content Updated",
            description: "The expertise section has been updated.",
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading expertise",
      description: "Please try again later.",
    });
  }

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
        ) : expertise && expertise.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {expertise.filter(item => item.published).map((item) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <ExpertiseCard
                  title={item.title}
                  description={item.description || ''}
                  tech={item.tech || []}
                  icon={item.icon || 'code'}
                  longDescription={item.long_description || ''}
                  benefits={item.benefits || []}
                  imageUrl={item.image_url || '/placeholder.svg'}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-muted-foreground">
            No expertise data available
          </div>
        )}
      </div>
    </section>
  );
};