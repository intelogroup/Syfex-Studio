
import * as React from "react";
import { format, addDays, isBefore, startOfDay } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { BookingFormProps } from "../types";
import { useBlockedTimes } from "@/hooks/useBlockedTimes";
import { supabase } from "@/integrations/supabase/client";

// Define available time slots
const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

interface BookingFormComponentProps {
  formData: BookingFormProps;
  onComplete: (data: BookingFormProps) => void;
  onCancel: () => void;
}

export function BookingForm({ formData, onComplete, onCancel }: BookingFormComponentProps) {
  const { toast } = useToast();
  const [date, setDate] = React.useState<Date | undefined>(formData.date);
  const [time, setTime] = React.useState<string | null>(formData.time);
  const [name, setName] = React.useState(formData.name);
  const [email, setEmail] = React.useState(formData.email);
  const [phone, setPhone] = React.useState(formData.phone);
  const [companyName, setCompanyName] = React.useState(formData.companyName);
  const [comments, setComments] = React.useState(formData.comments);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string | null>(formData.time);
  
  // Fetch blocked time slots
  const { data: blockedTimes = [], isLoading: isLoadingBlockedTimes } = useBlockedTimes(date);
  
  // Calculate which time slots are blocked
  const blockedTimeSlots = React.useMemo(() => {
    return new Set(blockedTimes.map(bt => bt.time_slot));
  }, [blockedTimes]);

  // Calculate default date range (next 30 business days)
  const fromDate = startOfDay(new Date());
  const toDate = addDays(fromDate, 30);
  const defaultMonth = new Date();
  
  // Disable past dates and weekends
  const disabledDays = React.useCallback((date: Date) => {
    const today = startOfDay(new Date());
    return (
      isBefore(date, today) || 
      date.getDay() === 0 || 
      date.getDay() === 6
    );
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !time || !name || !email) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill out all required fields to book a meeting."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format date for the email notification
      const formattedDate = format(date, "MMMM d, yyyy");
      
      // Send email notification
      const notificationResponse = await supabase.functions.invoke("send-booking-email", {
        body: {
          date: formattedDate,
          time,
          name,
          email,
          phone,
          companyName,
          comments
        }
      });
      
      if (notificationResponse.error) {
        console.error("Email notification failed:", notificationResponse.error);
        // Continue with booking even if email fails
      } else {
        console.log("Email notification sent successfully");
      }
      
      // Show success message and pass data up
      toast({
        title: "Meeting scheduled!",
        description: `Your 15-minute discovery call is scheduled for ${formattedDate} at ${time}.`
      });
      
      onComplete({
        date,
        time,
        name,
        email,
        phone,
        companyName,
        comments
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        variant: "destructive",
        title: "Scheduling failed",
        description: "There was an error scheduling your meeting. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTimeSelection = (selectedTime: string) => {
    // Don't allow selection of blocked time slots
    if (blockedTimeSlots.has(selectedTime)) {
      toast({
        variant: "destructive",
        title: "Time slot unavailable",
        description: "This time slot is not available for booking. Please select another time."
      });
      return;
    }
    
    setTime(selectedTime);
    setSelectedTimeSlot(selectedTime);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogHeader>
        <DialogTitle>Schedule a 15-minute discovery call</DialogTitle>
        <DialogDescription>
          Select a date and time that works for you. All times are in your local timezone.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name <span className="text-destructive">*</span></Label>
          <Input
            id="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="focus:ring-primary/50"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="focus:ring-primary/50"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="focus:ring-primary/50"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="company">Company (optional)</Label>
            <Input
              id="company"
              placeholder="Company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="focus:ring-primary/50"
            />
          </div>
        </div>
        <div className="grid gap-2">
          <Label>Date <span className="text-destructive">*</span></Label>
          <div className="border rounded-md">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              disabled={disabledDays}
              defaultMonth={defaultMonth}
              fromDate={fromDate}
              toDate={toDate}
              className="p-3 pointer-events-auto"
            />
          </div>
        </div>
        {date && (
          <div className="grid gap-2 animate-in fade-in-50 duration-300">
            <Label>Time ({format(date, "EEEE, MMMM d")}) <span className="text-destructive">*</span></Label>
            {isLoadingBlockedTimes ? (
              <div className="flex items-center justify-center py-4">
                <div className="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"></div>
              </div>
            ) : (
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                {AVAILABLE_TIMES.map((timeSlot) => {
                  const isBlocked = blockedTimeSlots.has(timeSlot);
                  return (
                    <Button
                      key={timeSlot}
                      type="button"
                      variant={time === timeSlot ? "default" : "outline"}
                      onClick={() => handleTimeSelection(timeSlot)}
                      disabled={isBlocked}
                      className={cn(
                        "text-center transition-all",
                        selectedTimeSlot === timeSlot && "bg-primary text-primary-foreground ring-2 ring-primary/20 ring-offset-2",
                        isBlocked && "bg-muted/60 text-muted-foreground line-through"
                      )}
                    >
                      {timeSlot}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="comments">Additional Information (optional)</Label>
          <Textarea
            id="comments"
            placeholder="Tell us a bit about what you'd like to discuss"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="min-h-[100px] focus:ring-primary/50"
          />
        </div>
      </div>
      <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="relative overflow-hidden"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Confirm Meeting"
          )}
        </Button>
      </DialogFooter>
    </form>
  );
}
