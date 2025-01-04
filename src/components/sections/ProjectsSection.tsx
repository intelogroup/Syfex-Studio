import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { toast } from "@/hooks/use-toast";

export const ProjectsSection = () => {
  const { data: projects, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Modern online shopping experience",
          tech: ["React", "Node.js", "MongoDB"]
        },
        {
          id: 2,
          title: "Healthcare Dashboard",
          description: "Patient management system",
          tech: ["React", "TypeScript", "GraphQL"]
        }
      ];
    }
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error loading projects",
      description: "Please try again later.",
    });
  }

  return (
    <section id="projects" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-background to-background" />
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map((project) => (
                <div key={project.id} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <div className="mt-2">
                    <span className="font-medium">Technologies:</span> {project.tech.join(', ')}
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
