
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ThemeToggle } from "../theme/ThemeToggle";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeToggle, setShowThemeToggle] = useState(false);
  const lightSize = 150;

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nav.style.setProperty('--light-x', `${x}px`);
      nav.style.setProperty('--light-y', `${y}px`);
      setShowThemeToggle(true);
    };

    const handleMouseLeave = () => {
      nav.style.setProperty('--light-x', '-999px');
      nav.style.setProperty('--light-y', '-999px');
      setShowThemeToggle(false);
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#expertise", label: "Expertise" },
    { href: "#portfolio", label: "Portfolio" },
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

        {/* Desktop Navigation with flashlight effect - now centered */}
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

        {/* Theme Toggle - now appears on hover */}
        <AnimatePresence>
          {showThemeToggle && (
            <motion.div 
              className="hidden md:flex items-center absolute right-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
            >
              <ThemeToggle />
            </motion.div>
          )}
        </AnimatePresence>

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
              <div className="flex flex-col items-center py-4 space-y-4 navbar-links">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    className="text-xl font-bold gradient-text transition-colors duration-200 py-2 navbar-link"
                    whileHover={{ scale: 1.1 }}
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
