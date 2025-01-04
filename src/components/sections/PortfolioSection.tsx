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
          title: "E-commerce Platform Revolution",
          description: "Complete online shopping solution with advanced features",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A comprehensive e-commerce platform that revolutionizes online shopping. Built with scalability in mind, this solution incorporates advanced features like real-time inventory management, AI-powered product recommendations, and sophisticated analytics dashboards. The platform handles thousands of concurrent users while maintaining sub-second response times.",
            technologies: ["React", "Node.js", "PostgreSQL", "Redis", "Stripe", "ElasticSearch", "Docker", "AWS"],
            features: [
              "Real-time inventory tracking across multiple warehouses",
              "AI-powered product recommendations",
              "Advanced analytics dashboard with custom reporting",
              "Multi-currency and multi-language support",
              "Integrated payment processing with fraud detection",
              "Mobile-first responsive design",
              "Advanced search with faceted filtering"
            ],
            results: "Increased sales by 150% within first 3 months, reduced cart abandonment by 45%, and improved customer satisfaction scores by 60%",
            link: "https://example.com/ecommerce"
          }
        },
        {
          id: 2,
          title: "Corporate Brand Evolution",
          description: "Comprehensive brand identity transformation",
          image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A complete brand identity overhaul for a Fortune 500 company, including digital presence, marketing materials, and internal communications. The project involved extensive market research, competitor analysis, and stakeholder interviews to develop a cohesive brand strategy that resonates with modern audiences while maintaining corporate values.",
            technologies: ["Adobe Creative Suite", "Figma", "Brand Strategy", "Motion Design", "Digital Marketing"],
            features: [
              "Comprehensive brand guidelines documentation",
              "Digital-first design system",
              "Custom icon and illustration library",
              "Responsive web design templates",
              "Social media toolkit",
              "Marketing collateral templates",
              "Internal communication materials"
            ],
            results: "Successfully launched new brand identity across 12 countries, resulting in 40% increase in brand recognition and 25% improvement in employee satisfaction",
            link: "https://example.com/brand"
          }
        },
        {
          id: 3,
          title: "Fitness Tracking Revolution",
          description: "AI-powered fitness companion application",
          image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "An innovative fitness tracking application that combines artificial intelligence with personalized workout planning. The app learns from user behavior and performance to create adaptive workout plans, while incorporating social features for community engagement and motivation.",
            technologies: ["React Native", "TensorFlow", "Firebase", "Node.js", "MongoDB", "AWS"],
            features: [
              "AI-powered workout recommendations",
              "Real-time exercise form analysis",
              "Personalized nutrition planning",
              "Social community features",
              "Progress tracking with 3D body scanning",
              "Integration with wearable devices",
              "Virtual coaching sessions"
            ],
            results: "Over 100k downloads in first month, 85% user retention rate, and average user fitness goal achievement improved by 73%",
            link: "https://example.com/fitness-app"
          }
        },
        {
          id: 4,
          title: "Digital Marketing Transformation",
          description: "Data-driven marketing campaign platform",
          image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A comprehensive digital marketing campaign platform that leverages data analytics and machine learning to optimize marketing efforts across multiple channels. The solution includes advanced targeting capabilities, automated A/B testing, and real-time performance monitoring.",
            technologies: ["Google Analytics", "Facebook Ads API", "HubSpot", "Mailchimp", "Python", "TensorFlow"],
            features: [
              "Multi-channel campaign management",
              "AI-powered audience segmentation",
              "Automated A/B testing",
              "Real-time performance analytics",
              "Predictive ROI modeling",
              "Custom attribution modeling",
              "Automated reporting system"
            ],
            results: "300% ROI on marketing spend, 45% reduction in customer acquisition cost, and 80% improvement in campaign efficiency",
            link: "https://example.com/marketing"
          }
        },
        {
          id: 5,
          title: "AI Recommendation Engine",
          description: "Advanced machine learning solution",
          image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A sophisticated recommendation engine powered by machine learning algorithms, designed to enhance user engagement and drive conversions. The system processes vast amounts of user behavior data to deliver highly personalized recommendations in real-time.",
            technologies: ["Python", "TensorFlow", "AWS SageMaker", "Apache Kafka", "ElasticSearch", "Docker"],
            features: [
              "Real-time recommendation processing",
              "Multi-factor analysis system",
              "Behavioral pattern recognition",
              "A/B testing framework",
              "Custom algorithm development",
              "Scalable processing pipeline",
              "Advanced analytics dashboard"
            ],
            results: "25% increase in average order value, 40% improvement in user engagement, and 60% higher conversion rate",
            link: "https://example.com/ai-solution"
          }
        },
        {
          id: 6,
          title: "Enterprise Project Hub",
          description: "Next-generation project management platform",
          image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
          details: {
            fullDescription: "A comprehensive project management platform designed for enterprise-scale operations. The system integrates advanced resource management, real-time collaboration features, and predictive analytics to optimize project delivery and team productivity.",
            technologies: ["React", "GraphQL", "MongoDB", "Redis", "Kubernetes", "Elasticsearch"],
            features: [
              "Advanced resource allocation algorithms",
              "Real-time collaboration tools",
              "Predictive project analytics",
              "Custom workflow automation",
              "Integration with enterprise systems",
              "Advanced reporting capabilities",
              "Time tracking and forecasting"
            ],
            results: "Adopted by 50+ enterprise clients, resulting in 35% improvement in project delivery times and 40% reduction in resource conflicts",
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