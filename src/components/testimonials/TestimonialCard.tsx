import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    position: string;
    feedback: string;
    rating: number;
    company: string;
    avatar: string;
  };
  index: number;
}

export const TestimonialCard = ({ testimonial, index }: TestimonialCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="h-full bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Quote className="w-10 h-10 text-primary opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 text-yellow-500 fill-yellow-500"
                />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground mb-6 italic">"{testimonial.feedback}"</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage 
                  src={testimonial.avatar} 
                  alt={`${testimonial.name}'s profile picture`}
                  loading="lazy"
                />
                <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.position}</p>
              </div>
            </div>
            <Users className="w-6 h-6 text-secondary/60" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};