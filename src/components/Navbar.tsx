import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY <= lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      nav.style.setProperty('--cursor-x', `${x}px`);
      nav.style.setProperty('--cursor-y', `${y}px`);
    };

    nav.addEventListener('mousemove', handleMouseMove);
    return () => nav.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={navRef}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isVisible ? (isHovered ? 1 : 0.1) : 0, 
        y: isVisible ? 0 : -100 
      }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-background/80 backdrop-blur-sm"
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-12">
          {[
            { href: "/", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#services", label: "Services" },
            { href: "#projects", label: "Projects" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "#contact", label: "Contact" }
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-xl font-bold text-foreground/90 hover:text-primary transition-colors duration-200"
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
      </nav>
    </motion.div>
  );
};