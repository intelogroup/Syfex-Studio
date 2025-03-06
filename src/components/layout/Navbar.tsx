
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(true); // Show theme toggle by default
  const lightSize = 150;

  useEffect(() => {
    // Initialize the light position in the center of the navbar
    const nav = navRef.current;
    if (!nav) return;

    // Set initial values for the light position
    const rect = nav.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    nav.style.setProperty('--light-x', `${centerX}px`);
    nav.style.setProperty('--light-y', `${centerY}px`);

    // Automatic animation of the light position
    let animationFrameId: number;
    let angle = 0;
    const radius = 30; // Radius of circular movement
    
    const animateLight = () => {
      angle += 0.01;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      
      nav.style.setProperty('--light-x', `${x}px`);
      nav.style.setProperty('--light-y', `${y}px`);
      
      animationFrameId = requestAnimationFrame(animateLight);
    };
    
    animateLight();
    
    // Optional: Still allow manual control when user moves mouse
    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nav.style.setProperty('--light-x', `${x}px`);
      nav.style.setProperty('--light-y', `${y}px`);
    };

    nav.addEventListener('mousemove', handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      nav.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#expertise", label: "Expertise" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4"
      style={{
        '--light-size': `${lightSize}px`,
        maskImage: 'radial-gradient(circle var(--light-size) at var(--light-x) var(--light-y), black, transparent)',
        WebkitMaskImage: 'radial-gradient(circle var(--light-size) at var(--light-x) var(--light-y), black, transparent)',
      } as React.CSSProperties}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-center relative backdrop-blur-sm">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden absolute left-0"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Desktop Navigation with auto-animated effect - now centered */}
        <div className="hidden md:flex items-center space-x-12 navbar-links py-2 px-6 rounded-full">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-xl font-bold gradient-text transition-colors duration-200 navbar-link"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                if (link.href.startsWith('#')) {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* Theme Toggle - now always visible */}
        <div className="hidden md:flex items-center absolute right-0">
          <ThemeToggle />
        </div>

        {/* Always visible theme toggle on mobile */}
        <div className="md:hidden flex items-center absolute right-0">
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
                    onClick={(e) => {
                      if (link.href.startsWith('#')) {
                        e.preventDefault();
                        document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                        setIsMenuOpen(false);
                      }
                    }}
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
