import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";

export const PortfolioSection = () => {
  const { data: portfolioItems, isLoading, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "Mobile App Development",
          description: "Cross-platform solutions",
          image: "/placeholder.svg"
        },
        {
          id: 2,
          title: "Web Applications",
          description: "Responsive web experiences",
          image: "/placeholder.svg"
        }
      ];
    }
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading portfolio",
      description: "Please try again later.",
    });
  }

  return (
    <section id="portfolio" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <h2 className="text-4xl font-bold gradient-text mb-6">Our Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioItems?.map(item => (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
