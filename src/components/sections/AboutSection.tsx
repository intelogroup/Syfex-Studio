
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

export const AboutSection = () => {
  const values = [
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and open communication.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Target,
      title: "Excellence Driven",
      description: "Committed to delivering outstanding results in every project.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Heart,
      title: "Client Focused",
      description: "Your success is our priority. We build lasting partnerships.",
      gradient: "from-pink-500 to-red-600"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Pushing boundaries with creative solutions and fresh ideas.",
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  return (
    <section id="about" className="py-32 relative overflow-hidden section-enhanced">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      
      {/* Decorative background elements */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-200/20 to-yellow-200/20 rounded-full blur-3xl"></div>
      
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
            <span className="text-sm font-medium text-primary">Our Story</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">About Us</h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium"
          >
            We are a passionate team dedicated to crafting exceptional digital experiences that drive real business results.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <Card className="glass-card interactive-element group-hover:pulse-glow h-full">
                <CardContent className="p-8 text-center h-full flex flex-col">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="w-full h-full text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold mb-4 group-hover:gradient-text transition-all duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-muted-foreground flex-1 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        {/* Additional content section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text mb-6">
              Ready to Transform Your Digital Presence?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Our team is here to turn your vision into reality.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-glass px-8 py-4 rounded-2xl font-semibold text-lg interactive-element"
            >
              Start Your Project
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
