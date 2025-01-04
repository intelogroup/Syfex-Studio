import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { ExpertiseCard } from "../expertise/ExpertiseCard";
import { container, item } from "../expertise/expertiseAnimations";
import { fetchExpertiseContent } from "../expertise/api";

export const ExpertiseSection = () => {
  const { data: expertise, isLoading, error } = useQuery({
    queryKey: ['expertise'],
    queryFn: fetchExpertiseContent,
    retry: 1
  });

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
            {expertise.map((expertiseItem) => (
              <motion.div key={expertiseItem.id} variants={item}>
                <ExpertiseCard
                  title={expertiseItem.title}
                  description={expertiseItem.description}
                  tech={expertiseItem.tech}
                  icon={expertiseItem.icon}
                  details={expertiseItem.details}
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