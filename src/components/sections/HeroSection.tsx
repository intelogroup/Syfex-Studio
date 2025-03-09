
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-6 md:p-8 lg:p-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 gradient-text tracking-tight leading-[1.15] overflow-visible"
        >
          Syfex Studio
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto"
        >
          Crafting Digital Experiences with Purpose
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-x-4 flex flex-wrap justify-center gap-4"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 md:px-8 py-3 rounded-full bg-background border-2 border-primary/20 gradient-border-new text-primary-foreground hover:bg-accent/10 transition-colors text-lg font-medium relative overflow-hidden group"
          >
            <span className="gradient-text">Start Your Project</span>
          </a>
          <button
            onClick={() => window.open('https://calendly.com/d/yg8-q7g-pmd/15-minute-discovery-call', '_blank')}
            className="inline-flex items-center px-6 md:px-8 py-3 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary/60 transition-colors text-lg font-medium"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book a 15-min Call
          </button>
        </motion.div>
      </div>
    </section>
  );
};
