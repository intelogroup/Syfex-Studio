import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-16 gradient-text"
        >
          Start Your Project
        </motion.h2>
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
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input 
                    placeholder="Name" 
                    className="bg-muted/50 border-primary/10 focus:border-primary/30"
                  />
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-muted/50 border-primary/10 focus:border-primary/30"
                  />
                </div>
                <Input 
                  placeholder="Project Type" 
                  className="bg-muted/50 border-primary/10 focus:border-primary/30"
                />
                <Textarea 
                  placeholder="Tell us about your project" 
                  className="bg-muted/50 border-primary/10 focus:border-primary/30 min-h-[150px]"
                />
                <Button className="w-full bg-primary hover:opacity-90 text-primary-foreground">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};