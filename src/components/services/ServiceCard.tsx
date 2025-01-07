import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { iconMap } from "./iconMap";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    icon: string;
    details: string[];
    features: string[];
  };
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export const ServiceCard = ({ service, index, isExpanded, onToggle }: ServiceCardProps) => {
  const { toast } = useToast();
  const IconComponent = iconMap[service.icon] || Code;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="cursor-pointer"
    >
      <Dialog>
        <DialogTrigger asChild>
          <Card className={`bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 ${
            isExpanded ? 'scale-105' : ''
          }`}>
            <CardHeader>
              <IconComponent className="w-12 h-12 text-primary mb-4" />
              <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
              <CardDescription className="text-muted-foreground text-base">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: isExpanded ? 'auto' : 0,
                  opacity: isExpanded ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">What we offer:</h4>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <ArrowRight className="w-4 h-4 mr-2 text-primary" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-primary mb-2">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <IconComponent className="w-8 h-8 text-primary" />
              {service.title}
            </DialogTitle>
            <DialogDescription className="text-lg">
              {service.description}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">What we offer:</h4>
                <ul className="space-y-3">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <ArrowRight className="w-5 h-5 mr-3 text-primary" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">Key Features:</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 mr-3 text-secondary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 pt-4">
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toast({
                      title: "Service Request Received",
                      description: `Thank you for your interest in our ${service.title} service. We'll contact you soon!`,
                    });
                  }}
                  className="w-full"
                  variant="default"
                >
                  Request Service
                </Button>
                <Button 
                  onClick={(e) => {
                    e.stopPropagation();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full"
                  variant="secondary"
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};