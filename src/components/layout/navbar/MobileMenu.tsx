import { motion, AnimatePresence } from "framer-motion";
import { NavLinks } from "./NavLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-primary/10 md:hidden"
        >
          <div className="flex flex-col items-center py-4 space-y-4">
            <NavLinks isMobile onMobileClick={onClose} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};