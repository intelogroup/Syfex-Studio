import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-start justify-center p-4 relative">
      {/* Background layers with lower z-index */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="absolute inset-0 z-[2] bg-grid opacity-30" />
      <div className="absolute inset-0 z-[3] bg-dots opacity-40" />
      
      <div className="max-w-6xl mx-auto text-center relative z-[100] pt-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="floating space-y-24"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold gradient-text tracking-tight text-glow relative z-[100]"
          >
            Syfex Studio
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto"
          >
            Crafting Digital Experiences with Purpose
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-x-4 pt-12"
          >
            <a 
              href="#contact" 
              className="inline-flex items-center px-8 py-3 rounded-full bg-background border-2 border-primary/20 gradient-border-new text-primary-foreground hover:bg-accent/10 transition-colors text-lg font-medium relative overflow-hidden group hover-glow"
            >
              <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
              <span className="gradient-text">Start Your Project</span>
            </a>
            <button
              onClick={() => window.open('https://calendly.com', '_blank')}
              className="inline-flex items-center px-8 py-3 rounded-full bg-secondary/80 text-secondary-foreground hover:bg-secondary/60 transition-colors text-lg font-medium hover-glow"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Call
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated background elements with lower z-index */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{
              x: ["0vw", "100vw"],
              y: [Math.random() * 100 + "vh", Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: i * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
};