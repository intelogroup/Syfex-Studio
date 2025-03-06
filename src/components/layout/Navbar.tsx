
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";

type NavLink = {
  href: string;
  label: string;
};

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeToggle] = useState(true);

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#expertise", label: "Expertise" },
    { href: "#contact", label: "Contact" }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between relative backdrop-blur-sm">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Logo placeholder */}
        <div className="hidden md:flex"></div>

        {/* Desktop Navigation with centered links */}
        <div className="hidden md:flex items-center justify-center space-x-12 navbar-links py-2 px-6 rounded-full mx-auto">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-xl font-bold gradient-text transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Theme Toggle */}
        <AnimatePresence>
          {showThemeToggle && (
            <motion.div 
              className="hidden md:flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ThemeToggle />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile theme toggle */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-primary/10 md:hidden"
            >
              <div className="flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-foreground font-medium text-lg py-2"
                    onClick={(e) => handleLinkClick(e, link.href)}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
};
