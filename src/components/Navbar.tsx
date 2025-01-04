import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const lightSize = 150; // Adjustable light radius in pixels

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update CSS custom properties for the light position
      nav.style.setProperty('--light-x', `${x}px`);
      nav.style.setProperty('--light-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      // Instead of moving light off-screen, keep it at last known position
      // Removed the code that moves light off-screen
    };

    nav.addEventListener('mousemove', handleMouseMove);
    nav.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      nav.removeEventListener('mousemove', handleMouseMove);
      nav.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

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
      <nav className="max-w-7xl mx-auto flex items-center justify-center backdrop-blur-sm">
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
              className="text-xl font-bold gradient-text transition-colors duration-200"
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
