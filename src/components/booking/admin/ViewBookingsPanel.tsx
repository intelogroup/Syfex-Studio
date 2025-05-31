
import * as React from "react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Info } from "lucide-react";
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
    <div className={`p-6 ${className}`}>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Email Notification Testing</h3>
            <p className="text-sm text-muted-foreground">
              Send a test notification email to verify your email setup is working correctly.
            </p>
          </div>
          
          <Button 
            onClick={handleTestEmail} 
            disabled={isLoading}
            className="self-start md:self-center relative overflow-hidden group"
            size="lg"
          >
            <span className="absolute inset-0 w-full h-full light:bg-gradient-to-r light:from-blue-600/20 light:via-transparent light:to-blue-600/20 light:opacity-0 light:group-hover:opacity-100 light:transition-opacity light:duration-1000 light:group-hover:translate-x-full"></span>
            {isLoading ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center"
              >
                <Mail className="mr-2 h-5 w-5" />
                Send Test Email
              </motion.div>
            )}
          </Button>
        </div>
        
        <div className="text-sm p-4 rounded-md bg-muted/50 border border-primary/10 flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="mb-1">
              <span className="font-medium">Note:</span> Test emails are sent to the configured target address.
            </p>
            <p className="text-muted-foreground">
              If you don't receive the email, check your spam folder or verify your email configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
