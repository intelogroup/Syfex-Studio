import { HeroSection } from "@/components/sections/HeroSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Helmet } from "react-helmet";

const Index = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Syfex Studio",
    "description": "Digital experience agency specializing in web development and design services",
    "image": "/og-image.png",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "serviceType": ["Web Development", "UI/UX Design", "Digital Transformation"],
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="relative">
        <Navbar />
        <main>
          <HeroSection />
          <ServicesSection />
          <ExpertiseSection />
          <PortfolioSection />
          <AboutSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;