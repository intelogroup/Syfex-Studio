import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/ContactSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Home | Your Website</title>
        <meta name="description" content="Welcome to our website" />
      </Helmet>
      <main>
        <HeroSection />
        <AboutSection />
        <ExpertiseSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default Index;