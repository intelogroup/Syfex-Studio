
import * as React from "react";
import { format, addDays, isBefore, startOfDay, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";
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

const AVAILABLE_TIMES = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
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
  const [comments, setComments] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

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
      
      toast({
        title: "Meeting scheduled!",
        description: `Your 15-minute discovery call is scheduled for ${formattedDate} at ${time}.`
      });
      
      // Reset form and close dialog
      setDate(undefined);
      setTime(null);
      setName("");
      setEmail("");
      setPhone("");
      setComments("");
      setOpen(false);
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
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
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
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
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
              <div className="grid gap-2">
                <Label>Time ({format(date, "EEEE, MMMM d")}) <span className="text-destructive">*</span></Label>
                <div className="grid grid-cols-3 gap-2">
                  {AVAILABLE_TIMES.map((timeSlot) => (
                    <Button
                      key={timeSlot}
                      type="button"
                      variant={time === timeSlot ? "default" : "outline"}
                      onClick={() => handleTimeSelection(timeSlot)}
                      className={cn(
                        "text-center",
                        time === timeSlot && "bg-primary text-primary-foreground"
                      )}
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="comments">Comments (optional)</Label>
              <Input
                id="comments"
                placeholder="Any additional information"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Scheduling..." : "Book Meeting"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
