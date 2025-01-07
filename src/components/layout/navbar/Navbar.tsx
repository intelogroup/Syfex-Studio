import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { NavLinks } from "./NavLinks";
import { MobileMenu } from "./MobileMenu";
import { AuthButtons } from "./AuthButtons";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const lightSize = 250;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = nav.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      nav.style.setProperty('--light-x', `${x}px`);
      nav.style.setProperty('--light-y', `${y}px`);
    };

    const handleMouseLeave = () => {
      nav.style.setProperty('--light-x', '-999px');
      nav.style.setProperty('--light-y', '-999px');
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
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={navVariants}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        !isVisible ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        '--light-size': `${lightSize}px`,
        background: 'radial-gradient(circle var(--light-size) at var(--light-x) var(--light-y), rgba(255,255,255,0.15), transparent)',
      } as React.CSSProperties}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border-b border-border/40">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        <div className="hidden md:flex items-center space-x-12">
          <NavLinks />
        </div>

        <AuthButtons session={session} />

        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      </nav>
    </motion.div>
  );
};