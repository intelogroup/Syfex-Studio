import { useState, useEffect, useRef } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const [flashlightPosition, setFlashlightPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [sweepPosition, setSweepPosition] = useState(0);
  const sweepAnimationRef = useRef<number>();

  const navLinks: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#expertise", label: "Expertise" },
    { href: "#contact", label: "Contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Automatic sweeping animation
  useEffect(() => {
    if (!isHovering && navLinksRef.current) {
      const startSweep = () => {
        const containerWidth = navLinksRef.current?.offsetWidth || 400;
        const startTime = Date.now();
        const duration = 4000; // 4 seconds for full sweep
        
        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = (elapsed % duration) / duration;
          
          // Smooth easing function
          const easedProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI);
          const newPosition = easedProgress * containerWidth;
          
          setSweepPosition(newPosition);
          
          sweepAnimationRef.current = requestAnimationFrame(animate);
        };
        
        sweepAnimationRef.current = requestAnimationFrame(animate);
      };

      startSweep();
    } else {
      // Cancel animation when hovering
      if (sweepAnimationRef.current) {
        cancelAnimationFrame(sweepAnimationRef.current);
      }
    }

    return () => {
      if (sweepAnimationRef.current) {
        cancelAnimationFrame(sweepAnimationRef.current);
      }
    };
  }, [isHovering]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (navLinksRef.current) {
      const rect = navLinksRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setFlashlightPosition({ x, y });
    }
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        y: isVisible ? 0 : -100
      }}
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

        {/* Desktop Navigation with flashlight effect */}
        <div 
          ref={navLinksRef}
          className="hidden md:flex items-center justify-center space-x-12 navbar-flashlight-container py-2 px-6 rounded-full mx-auto relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            '--flashlight-x': isHovering ? `${flashlightPosition.x}px` : `${sweepPosition}px`,
            '--flashlight-y': `${flashlightPosition.y}px`,
            '--is-hovering': isHovering ? '1' : '0',
            '--sweep-position': `${sweepPosition}px`
          } as React.CSSProperties}
        >
          {navLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-xl font-bold navbar-link-hidden transition-colors duration-200 relative z-10"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => handleLinkClick(e, link.href)}
              data-link-index={index}
            >
              {link.label}
            </motion.a>
          ))}
          
          {/* Flashlight reveal mask */}
          <div className="navbar-flashlight-mask absolute inset-0 pointer-events-none" />
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
