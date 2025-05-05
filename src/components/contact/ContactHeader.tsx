
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { BookingCalendar } from "../booking/BookingCalendar";

export const ContactHeader = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center space-y-4 mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold gradient-text">Start Your Project</h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Ready to bring your vision to life? We're here to help transform your ideas into reality. 
        Tell us about your project, and let's create something amazing together.
      </p>
      <BookingCalendar
        buttonText="Book a 15-min Discovery Call"
        buttonIcon={<Calendar className="mr-2 h-4 w-4" />}
        buttonVariant="secondary"
        buttonSize="lg"
        buttonClassName="mt-4"
      />
    </motion.div>
  );
};
