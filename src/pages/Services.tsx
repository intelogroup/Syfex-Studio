import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Palette, Laptop, CheckCircle2, ArrowRight, Layers, PenTool, Globe, Cpu, Smartphone, ShieldCheck, Headphones } from "lucide-react";
import { useState } from "react";

const Services = () => {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const services = [
    {
      icon: Palette,
      secondaryIcon: PenTool,
      title: "Brand Design",
      description: "Creating distinctive brand identities that leave lasting impressions",
      features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Marketing Materials"]
    },
    {
      icon: Laptop,
      secondaryIcon: Globe,
      title: "Web Development",
      description: "Building modern, responsive websites that engage and convert",
      features: ["Custom Development", "E-commerce", "CMS Integration", "Performance Optimization"]
    },
    {
      icon: Smartphone,
      secondaryIcon: Layers,
      title: "Mobile Apps",
      description: "Crafting intuitive mobile experiences for iOS and Android",
      features: ["Native Development", "Cross-platform Apps", "UI/UX Design", "App Store Optimization"]
    },
    {
      icon: Code,
      secondaryIcon: Cpu,
      title: "Custom Software",
      description: "Developing tailored software solutions for your business needs",
      features: ["Enterprise Solutions", "Cloud Integration", "API Development", "Legacy System Updates"]
    },
    {
      icon: ShieldCheck,
      secondaryIcon: Globe,
      title: "Cybersecurity",
      description: "Protecting your digital assets with advanced security measures",
      features: ["Security Audits", "Penetration Testing", "Compliance", "Security Training"]
    },
    {
      icon: Headphones,
      secondaryIcon: Users,
      title: "24/7 Support",
      description: "Providing round-the-clock technical support and maintenance",
      features: ["Live Support", "Maintenance", "Updates", "Performance Monitoring"]
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <Navbar />
      <div className="relative">
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">Our Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive digital solutions tailored to your unique needs. We bring your vision to life with cutting-edge technology and creative excellence.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredService(index)}
                  onHoverEnd={() => setHoveredService(null)}
                >
                  <Card className="bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-4">
                        <service.icon className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <service.secondaryIcon className="w-8 h-8 text-secondary/60" />
                      </div>
                      <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ 
                              opacity: hoveredService === index ? 1 : 0.7,
                              x: hoveredService === index ? 0 : -10
                            }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                            className="flex items-center text-muted-foreground"
                          >
                            <CheckCircle2 className="w-5 h-5 mr-2 text-primary" />
                            {feature}
                          </motion.li>
                        ))}
                      </ul>
                      <Button 
                        className="w-full mt-6 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20"
                        variant="ghost"
                      >
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Services;