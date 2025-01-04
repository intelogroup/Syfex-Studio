import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechVision Inc.",
    feedback: "Their expertise in React and modern web technologies transformed our digital presence. The team delivered beyond our expectations, creating a seamless and engaging user experience.",
    rating: 5,
    company: "TechVision Inc."
  },
  {
    name: "Michael Chen",
    position: "CTO, InnovateLabs",
    feedback: "Working with this team was a game-changer. Their deep understanding of full-stack development and attention to detail resulted in a robust, scalable solution that perfectly met our needs.",
    rating: 5,
    company: "InnovateLabs"
  },
  {
    name: "Emily Rodriguez",
    position: "Marketing Director, GrowthFirst",
    feedback: "The team's ability to blend beautiful design with powerful functionality is remarkable. Our conversion rates increased by 150% after the website redesign.",
    rating: 5,
    company: "GrowthFirst"
  },
  {
    name: "David Kim",
    position: "Product Manager, FutureScale",
    feedback: "Outstanding technical expertise and project management. They not only delivered a fantastic product but also provided valuable insights throughout the development process.",
    rating: 5,
    company: "FutureScale"
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">Client Success Stories</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how we've helped businesses achieve their digital transformation goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
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
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                    <Users className="w-6 h-6 text-secondary/60" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};