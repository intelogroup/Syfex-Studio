
import { motion } from "framer-motion";
import { Calendar, Sparkles } from "lucide-react";
import { BookingCalendar } from "../booking/BookingCalendar";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-6 md:p-8 lg:p-12 relative overflow-hidden section-enhanced">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full floating animation-delay-0"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-secondary/20 rounded-full floating animation-delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-8 h-8 bg-accent/20 rounded-full floating animation-delay-2000"></div>
      
      <div className="max-w-6xl mx-auto text-center relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Digital Experience Agency</span>
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 gradient-text tracking-tight leading-[1.15] overflow-visible"
        >
          Syfex Studio
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium"
        >
          Crafting Digital Experiences with Purpose
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-x-4 flex flex-wrap justify-center gap-6"
        >
          <motion.a 
            href="#contact" 
            className="inline-flex items-center px-8 md:px-10 py-4 rounded-2xl btn-glass text-primary-foreground hover:text-primary transition-colors text-lg font-semibold interactive-element group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="gradient-text">Start Your Project</span>
            <motion.div
              className="ml-2 transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </motion.div>
          </motion.a>
          
          <BookingCalendar
            buttonText="Book a 15-min Call"
            buttonIcon={<Calendar className="mr-2 h-5 w-5" />}
            buttonClassName="inline-flex items-center px-8 md:px-10 py-4 rounded-2xl btn-glass text-secondary-foreground hover:text-secondary transition-colors text-lg font-semibold interactive-element"
            buttonVariant="secondary"
            buttonSize="lg"
          />
        </motion.div>
        
        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Available for new projects</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>15+ years experience</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>100+ projects delivered</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
