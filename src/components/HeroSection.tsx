import { motion } from "framer-motion";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold mb-6 gradient-text tracking-tight"
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
          className="space-x-4"
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-3 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-all text-lg font-medium"
          >
            Start Your Project
          </a>
        </motion.div>
      </div>
    </section>
  );
};