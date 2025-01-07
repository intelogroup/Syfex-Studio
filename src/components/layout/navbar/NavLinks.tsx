import { motion } from "framer-motion";

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

interface NavLinksProps {
  isMobile?: boolean;
  onMobileClick?: () => void;
}

export const NavLinks = ({ isMobile = false, onMobileClick }: NavLinksProps) => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#expertise", label: "Expertise" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      {navLinks.map((link) => (
        <motion.a
          key={link.label}
          href={link.href}
          variants={linkVariants}
          whileHover="hover"
          className={`text-xl font-bold gradient-text transition-colors duration-200 ${
            isMobile ? 'py-2' : ''
          }`}
          onClick={(e) => {
            if (link.href.startsWith('#')) {
              e.preventDefault();
              document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
              if (isMobile && onMobileClick) onMobileClick();
            }
          }}
        >
          {link.label}
        </motion.a>
      ))}
    </>
  );
};