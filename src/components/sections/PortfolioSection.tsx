import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../ui/loading-spinner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PortfolioCard } from "../portfolio/PortfolioCard";
import { PortfolioSkeleton } from "../portfolio/PortfolioSkeleton";

export const PortfolioSection = () => {
  const { data: portfolioItems, isLoading, error, refetch } = useQuery({
    queryKey: ['portfolio'],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return [
        {
          id: 1,
          title: "E-commerce Platform",
          description: "Complete online shopping solution",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A comprehensive e-commerce platform built with modern technologies, featuring real-time inventory management, secure payments, and analytics dashboard.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            features: ["Real-time inventory", "Payment processing", "Admin dashboard", "Analytics"],
            results: "Increased sales by 150% within first 3 months",
            link: "https://example.com/ecommerce"
          }
        },
        {
          id: 2,
          title: "Brand Identity Design",
          description: "Complete brand identity package",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Comprehensive brand identity design including logo, color palette, typography, and brand guidelines.",
            technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy"],
            features: ["Logo design", "Color system", "Typography", "Guidelines"],
            results: "Successfully launched new brand identity across all channels",
            link: "https://example.com/brand"
          }
        },
        {
          id: 3,
          title: "Mobile App Development",
          description: "Cross-platform fitness application",
          image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A feature-rich fitness tracking application with social features and personalized workout plans.",
            technologies: ["React Native", "Firebase", "Node.js"],
            features: ["Workout tracking", "Social sharing", "Progress analytics"],
            results: "Over 100k downloads in first month",
            link: "https://example.com/fitness-app"
          }
        },
        {
          id: 4,
          title: "Marketing Campaign",
          description: "Integrated digital marketing",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Comprehensive digital marketing campaign including social media, email marketing, and PPC advertising.",
            technologies: ["Google Ads", "Facebook Ads", "Email Marketing"],
            features: ["Social media strategy", "Email campaigns", "PPC optimization"],
            results: "300% ROI on marketing spend",
            link: "https://example.com/marketing"
          }
        },
        {
          id: 5,
          title: "AI Integration",
          description: "Machine learning solution",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Implementation of AI-powered recommendation system for e-commerce platform.",
            technologies: ["Python", "TensorFlow", "AWS"],
            features: ["Product recommendations", "User behavior analysis", "A/B testing"],
            results: "25% increase in average order value",
            link: "https://example.com/ai-solution"
          }
        },
        {
          id: 6,
          title: "Web Application",
          description: "Cloud-based project management",
          image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "Modern project management platform with real-time collaboration features and resource management.",
            technologies: ["React", "GraphQL", "MongoDB"],
            features: ["Task management", "Resource allocation", "Reports"],
            results: "Adopted by 50+ enterprise clients",
            link: "https://example.com/project-management"
          }
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
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
