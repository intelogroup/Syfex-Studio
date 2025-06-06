import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and open communication."
    },
    {
      icon: Target,
      title: "Excellence Driven",
      description: "Committed to delivering outstanding results in every project."
    },
    {
      icon: Heart,
      title: "Client Focused",
      description: "Your success is our priority. We build lasting partnerships."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Pushing boundaries with creative solutions and fresh ideas."
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">About Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are a passionate team dedicated to crafting exceptional digital experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
