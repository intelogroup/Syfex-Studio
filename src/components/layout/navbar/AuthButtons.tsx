import { motion } from "framer-motion";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const linkVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3 }
  }
};

interface AuthButtonsProps {
  session: any;
}

export const AuthButtons = ({ session }: AuthButtonsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/");
  };

  return (
    <motion.div variants={linkVariants} className="flex items-center space-x-4">
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
  );
};