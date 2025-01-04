import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ContactHeader } from "./contact/ContactHeader";
import { ContactForm } from "./contact/ContactForm";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <ContactHeader />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-black/40 backdrop-blur-sm border-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Get in Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};