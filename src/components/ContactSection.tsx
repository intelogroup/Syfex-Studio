import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, Upload } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/20 via-background to-background" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
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
          <Button 
            variant="secondary" 
            size="lg"
            className="mt-4"
            onClick={() => window.open('https://calendly.com', '_blank')}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book a Discovery Call
          </Button>
        </motion.div>
        
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
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Your Name</label>
                    <Input 
                      placeholder="John Doe" 
                      className="bg-muted/50 border-primary/10 focus:border-primary/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-muted/50 border-primary/10 focus:border-primary/30"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Organization Type</label>
                  <Select>
                    <SelectTrigger className="bg-muted/50 border-primary/10 focus:border-primary/30">
                      <SelectValue placeholder="Select organization type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="nonprofit">Non-Profit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Project Type</label>
                  <Select>
                    <SelectTrigger className="bg-muted/50 border-primary/10 focus:border-primary/30">
                      <SelectValue placeholder="Select project type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                      <SelectItem value="design">UI/UX Design</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Project Description</label>
                  <Textarea 
                    placeholder="Tell us about your project goals, requirements, and timeline..." 
                    className="bg-muted/50 border-primary/10 focus:border-primary/30 min-h-[150px]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Project Files (Optional)</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-primary/10 bg-muted/50 hover:bg-muted/70 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, Images (MAX. 10MB)
                        </p>
                      </div>
                      <input type="file" className="hidden" multiple accept=".pdf,.doc,.docx,.png,.jpg,.jpeg" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Budget Range</label>
                  <Select>
                    <SelectTrigger className="bg-muted/50 border-primary/10 focus:border-primary/30">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">$5,000 - $10,000</SelectItem>
                      <SelectItem value="medium">$10,000 - $25,000</SelectItem>
                      <SelectItem value="large">$25,000 - $50,000</SelectItem>
                      <SelectItem value="enterprise">$50,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
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