
import * as React from "react";
import { format, addDays, isBefore, startOfDay, parse } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// Define available time slots - expanded options for flexibility
const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

interface BookingCalendarProps {
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  buttonClassName?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  buttonSize?: "default" | "sm" | "lg" | "icon";
}

export function BookingCalendar({
  buttonText = "Book a Meeting",
  buttonIcon = <CalendarIcon className="mr-2 h-4 w-4" />,
  buttonClassName = "",
  buttonVariant = "secondary",
  buttonSize = "default"
}: BookingCalendarProps) {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [comments, setComments] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingComplete, setBookingComplete] = React.useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<string | null>(null);

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
    
    // Simulate API call with timeout
    try {
      const formattedDate = format(date, "MMMM d, yyyy");
      
      // In a real app, you would send this data to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and reset form
      toast({
        title: "Meeting scheduled!",
        description: `Your 15-minute discovery call is scheduled for ${formattedDate} at ${time}.`
      });
      
      setBookingComplete(true);
    } catch (error) {
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
    setTime(selectedTime);
    setSelectedTimeSlot(selectedTime);
  };

  const resetForm = () => {
    setDate(undefined);
    setTime(null);
    setName("");
    setEmail("");
    setPhone("");
    setCompanyName("");
    setComments("");
    setBookingComplete(false);
    setSelectedTimeSlot(null);
    setOpen(false);
  };

  const closeDialog = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={buttonVariant} 
          size={buttonSize} 
          className={buttonClassName}
        >
          {buttonIcon}
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        {bookingComplete ? (
          <div className="py-8 text-center space-y-6">
            <div className="mx-auto bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold gradient-text">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
              Thank you for scheduling a meeting with us. We've sent a calendar invitation to your email.
            </p>
            <div className="bg-muted/30 rounded-lg p-4 text-left">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{format(date as Date, "MMMM d, yyyy")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time</p>
                  <p className="font-medium">{time}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">15 minutes</p>
                </div>
              </div>
            </div>
            <Button onClick={resetForm} variant="default" className="mt-4">
              Book Another Meeting
            </Button>
          </div>
        ) : (
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
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                    {AVAILABLE_TIMES.map((timeSlot) => (
                      <Button
                        key={timeSlot}
                        type="button"
                        variant={time === timeSlot ? "default" : "outline"}
                        onClick={() => handleTimeSelection(timeSlot)}
                        className={cn(
                          "text-center transition-all",
                          selectedTimeSlot === timeSlot && "bg-primary text-primary-foreground ring-2 ring-primary/20 ring-offset-2"
                        )}
                      >
                        {timeSlot}
                      </Button>
                    ))}
                  </div>
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
                onClick={closeDialog}
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
        )}
      </DialogContent>
    </Dialog>
  );
}
