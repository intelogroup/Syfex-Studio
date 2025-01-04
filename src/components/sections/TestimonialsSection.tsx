import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, Company A",
    feedback: "This team transformed our digital presence and exceeded our expectations!",
  },
  {
    name: "Jane Smith",
    position: "CTO, Company B",
    feedback: "Their innovative solutions helped us streamline our processes significantly.",
  },
  {
    name: "Alice Johnson",
    position: "Marketing Director, Company C",
    feedback: "A fantastic experience from start to finish. Highly recommend!",
  },
  {
    name: "Bob Brown",
    position: "Product Manager, Company D",
    feedback: "Professional, dedicated, and results-driven. They truly care about their clients.",
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
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">What Our Clients Say</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from our satisfied clients about their experiences working with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Users className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-xl font-semibold mb-2">{testimonial.name}</h3>
                  <p className="text-muted-foreground">{testimonial.position}</p>
                  <p className="text-muted-foreground mt-2">{testimonial.feedback}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
