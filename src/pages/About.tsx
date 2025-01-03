import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart, Lightbulb } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Users,
      title: "Collaborative Spirit",
      description: "We believe in the power of teamwork and open communication."
    },
    {
      icon: Target,
      title: "Excellence Driven",
      description: "Committed to delivering outstanding results in every project."
    },
    {
      icon: Heart,
      title: "Client Focused",
      description: "Your success is our priority. We build lasting partnerships."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "Pushing boundaries with creative solutions and fresh ideas."
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">About Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We are a passionate team of creators, innovators, and problem solvers dedicated to crafting exceptional digital experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
            >
              <div className="space-y-6">
                <h2 className="text-3xl font-bold gradient-text">Our Story</h2>
                <p className="text-muted-foreground">
                  Founded with a vision to transform digital landscapes, we've grown into a dynamic studio that combines creativity with technical excellence. Our journey is marked by continuous innovation and a commitment to delivering exceptional results.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold gradient-text">Our Mission</h2>
                <p className="text-muted-foreground">
                  To empower businesses through innovative digital solutions that drive growth, enhance user experience, and create lasting impact. We strive to be at the forefront of technological advancement while maintaining our commitment to quality and client satisfaction.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Our Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                  >
                    <Card className="bg-black/40 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300 group">
                      <CardContent className="p-6 text-center">
                        <value.icon className="w-12 h-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                        <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;