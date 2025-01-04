import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const PortfolioSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((item) => (
      <Card key={item} className="bg-card/50 backdrop-blur-sm border-muted">
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Skeleton className="h-4 w-1/2 mt-4" />
        </CardContent>
      </Card>
    ))}
  </div>
);

export const PortfolioSection = () => {
  const { data: portfolioItems, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "Mobile App Development",
          description: "Cross-platform solutions for modern businesses",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 2,
          title: "Web Applications",
          description: "Responsive and scalable web experiences",
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 3,
          title: "Brand Design",
          description: "Creating memorable brand identities",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 4,
          title: "UI/UX Design",
          description: "Intuitive user interfaces and experiences",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 5,
          title: "AI Integration",
          description: "Smart solutions powered by artificial intelligence",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80"
        },
        {
          id: 6,
          title: "Digital Marketing",
          description: "Comprehensive digital marketing campaigns",
          image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80"
        }
      ];
    },
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  if (error) {
    return (
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load portfolio items. Please try again later.
            </AlertDescription>
          </Alert>
          <Button onClick={() => refetch()} variant="outline" className="w-full">
            Retry Loading
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Our Portfolio</h2>
        {isLoading ? (
          <PortfolioSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems?.map(item => (
              <Card key={item.id} className="bg-card/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-colors duration-300 overflow-hidden">
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={item.image} 
                      alt={`${item.title} project showcase`} 
                      className="object-cover w-full h-full rounded-lg"
                      loading="lazy"
                    />
                  </AspectRatio>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};