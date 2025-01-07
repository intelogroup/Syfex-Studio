import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  },
  hover: { 
    scale: 1.1,
    transition: { duration: 0.2 }
  }
};

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const lightSize = 150;

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

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

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
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={navVariants}
      className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-transform duration-300 ${
        !isVisible ? '-translate-y-full' : 'translate-y-0'
      }`}
      style={{
        '--light-size': `${lightSize}px`,
        maskImage: 'radial-gradient(circle var(--light-size) at var(--light-x) var(--light-y), black, transparent)',
        WebkitMaskImage: 'radial-gradient(circle var(--light-size) at var(--light-x) var(--light-y), black, transparent)',
      } as React.CSSProperties}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between backdrop-blur-sm bg-background/80">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              variants={linkVariants}
              whileHover="hover"
              className="text-xl font-bold gradient-text transition-colors duration-200"
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

        {/* Auth Buttons */}
        <motion.div 
          variants={linkVariants}
          className="flex items-center space-x-4"
        >
          {session ? (
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/auth")}
              variant="ghost"
              className="flex items-center space-x-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Login</span>
            </Button>
          )}
        </motion.div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-primary/10 md:hidden"
            >
              <div className="flex flex-col items-center py-4 space-y-4">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    variants={linkVariants}
                    whileHover="hover"
                    className="text-xl font-bold gradient-text transition-colors duration-200 py-2"
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