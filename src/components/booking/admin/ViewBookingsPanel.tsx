
import * as React from "react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Mail } from "lucide-react";

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
    <Card className={className}>
      <CardHeader>
        <CardTitle>Email Notification Testing</CardTitle>
        <CardDescription>
          Test your booking notification email system
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Send a test notification email to verify your email setup is working correctly.
          The email will be sent to the configured target email address.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleTestEmail} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Mail className="mr-2 h-4 w-4" />
              Send Test Email
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
