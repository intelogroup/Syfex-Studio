import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Star, Quote, AlertCircle, RefreshCw } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const TestimonialSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {[1, 2, 3, 4].map((item) => (
      <Card key={item} className="h-full bg-black/40 backdrop-blur-sm border-primary/10">
        <CardContent className="p-6">
          <div className="flex justify-between items-start mb-4">
            <Skeleton className="w-10 h-10 rounded" />
            <Skeleton className="w-24 h-5" />
          </div>
          <Skeleton className="h-20 w-full mb-6" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const { data: testimonials, isLoading, error, refetch } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          name: "Sarah Johnson",
          position: "CEO, TechVision Inc.",
          feedback: "Their expertise in React and modern web technologies transformed our digital presence. The team delivered beyond our expectations, creating a seamless and engaging user experience.",
          rating: 5,
          company: "TechVision Inc.",
          avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop"
        },
        {
          name: "Michael Chen",
          position: "CTO, InnovateLabs",
          feedback: "Working with this team was a game-changer. Their deep understanding of full-stack development and attention to detail resulted in a robust, scalable solution that perfectly met our needs.",
          rating: 5,
          company: "InnovateLabs",
          avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop"
        },
        {
          name: "Emily Rodriguez",
          position: "Marketing Director, GrowthFirst",
          feedback: "The team's ability to blend beautiful design with powerful functionality is remarkable. Our conversion rates increased by 150% after the website redesign.",
          rating: 5,
          company: "GrowthFirst",
          avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop"
        },
        {
          name: "David Kim",
          position: "Product Manager, FutureScale",
          feedback: "Outstanding technical expertise and project management. They not only delivered a fantastic product but also provided valuable insights throughout the development process.",
          rating: 5,
          company: "FutureScale",
          avatar: "https://images.unsplash.com/photo-1501286353178-1ec871214838?w=150&h=150&fit=crop"
        },
      ];
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    meta: {
      onError: (error: Error) => {
        toast({
          variant: "destructive",
          title: "Error loading testimonials",
          description: error.message || "Please try again later.",
        });
      }
    }
  });

  if (error) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error Loading Testimonials</AlertTitle>
            <AlertDescription>
              We couldn't load the testimonials at this time. Please try again later.
            </AlertDescription>
          </Alert>
          <Button 
            onClick={() => refetch()} 
            variant="outline" 
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry Loading
          </Button>
        </div>
      </section>
    );
  }

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

        {isLoading ? (
          <TestimonialSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials?.map((testimonial, index) => (
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
