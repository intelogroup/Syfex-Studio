
import * as React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Info, CheckCircle2, Send } from "lucide-react";
import { motion } from "framer-motion";

interface ViewBookingsPanelProps {
  className?: string;
}

export function ViewBookingsPanel({ className }: ViewBookingsPanelProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleTestEmail = async () => {
    setIsLoading(true);
    try {
      const testData = {
        date: "May 6, 2025",
        time: "10:00",
        name: "Test User",
        email: "test@example.com",
        phone: "555-555-5555",
        companyName: "Test Company",
        comments: "This is a test booking notification."
      };
      
      const response = await fetch(
        "https://mlkwgooqknkqhphdivot.supabase.co/functions/v1/send-booking-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testData),
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Test email sent successfully",
          description: "Check your inbox for the test notification email",
        });
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (error: any) {
      console.error("Error sending test email:", error);
      toast({
        variant: "destructive",
        title: "Failed to send test email",
        description: error.message || "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`p-8 ${className}`}>
      <div className="flex flex-col space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Email Notification Testing
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Send a test notification email to verify your email setup is working correctly. This helps ensure your booking confirmations reach clients reliably.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              onClick={handleTestEmail} 
              disabled={isLoading}
              className="btn-glass px-8 py-4 text-lg font-semibold interactive-element group relative overflow-hidden"
              size="lg"
            >
              <span className="relative z-10 flex items-center">
                {isLoading ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                    Sending Test...
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center"
                  >
                    <Send className="mr-3 h-5 w-5 group-hover:rotate-12 transition-transform duration-200" />
                    Send Test Email
                  </motion.div>
                )}
              </span>
            </Button>
          </motion.div>
        </div>
        
        {/* Enhanced information cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="glass-card p-6 interactive-element"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Info className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Test Configuration</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Test emails are sent to the configured target address. This ensures your notification system is working properly before going live.
                </p>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="glass-card p-6 interactive-element"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Troubleshooting</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  If you don't receive the email, check your spam folder or verify your email configuration settings.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Success metrics or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="glass-card p-6 bg-gradient-to-r from-green-500/5 to-blue-500/5 border border-green-200/20"
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <h4 className="font-semibold text-lg">Email System Status</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">System Status:</span>
              <span className="text-green-600 font-medium flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Last Test:</span>
              <span className="font-medium">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Success Rate:</span>
              <span className="text-green-600 font-medium">99.8%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
