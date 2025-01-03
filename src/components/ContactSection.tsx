import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-dark">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Start Your Project</h2>
        <Card className="bg-dark-lighter border-primary/20">
          <CardHeader>
            <CardTitle className="text-white text-center">Get in Touch</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  placeholder="Name" 
                  className="bg-dark border-primary/20 text-white"
                />
                <Input 
                  type="email" 
                  placeholder="Email" 
                  className="bg-dark border-primary/20 text-white"
                />
              </div>
              <Input 
                placeholder="Project Type" 
                className="bg-dark border-primary/20 text-white"
              />
              <Textarea 
                placeholder="Tell us about your project" 
                className="bg-dark border-primary/20 text-white min-h-[150px]"
              />
              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};