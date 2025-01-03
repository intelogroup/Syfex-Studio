import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

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
      animate={{ opacity: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-transparent"
      style={{
        maskImage: 'radial-gradient(circle 100px at var(--cursor-x, 0) var(--cursor-y, 0), black 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(circle 100px at var(--cursor-x, 0) var(--cursor-y, 0), black 20%, transparent 80%)'
      }}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-12">
          {[
            { href: "#", label: "Home" },
            { href: "#about", label: "About" },
            { href: "#services", label: "Services" },
            { href: "#projects", label: "Projects" },
            { href: "#portfolio", label: "Portfolio" },
            { href: "#blog", label: "Blog" },
            { href: "#contact", label: "Contact" }
          ].map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-xl font-bold text-foreground/90 hover:text-primary transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </nav>
    </motion.div>
  );
};