import { Github, Twitter, Linkedin, Mail, Phone, MapPin, Instagram, Youtube } from "lucide-react";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20 border-t border-border/10 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">About Us</h3>
            <p className="text-sm text-muted-foreground">
              We are dedicated to creating exceptional digital experiences through innovative solutions and creative excellence.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="/services" className="text-sm text-muted-foreground hover:text-primary transition-colors">Services</a></li>
              <li><a href="#portfolio" className="text-sm text-muted-foreground hover:text-primary transition-colors">Portfolio</a></li>
              <li><a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2" />
                info@company.com
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-2" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                123 Innovation Street, Tech City
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 gradient-text">Follow Us</h3>
            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Github className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-border/10 pt-8">
          <p className="text-sm text-center text-muted-foreground">
            © 2024 All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
