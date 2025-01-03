import { Code, Palette, Laptop } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const ServicesSection = () => {
  const services = [
    {
      title: "Logo & Brand Design",
      description: "Creating distinctive brand identities that leave lasting impressions",
      icon: Palette,
    },
    {
      title: "Website Design",
      description: "Crafting modern, responsive websites that engage and convert",
      icon: Laptop,
    },
    {
      title: "Website Development",
      description: "Building robust, scalable web applications with cutting-edge technology",
      icon: Code,
    },
  ];

  return (
    <section id="services" className="py-20 bg-dark-lighter">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="bg-dark border-primary/20 hover:border-primary/40 transition-all">
              <CardHeader>
                <service.icon className="w-12 h-12 text-primary mb-4" />
                <CardTitle className="text-white">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};