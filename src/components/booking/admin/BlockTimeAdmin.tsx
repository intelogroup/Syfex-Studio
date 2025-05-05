
import * as React from "react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useBlockedTimes, BlockedTime } from "@/hooks/useBlockedTimes";
import { X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

// Define available time slots - should match BookingForm
const AVAILABLE_TIMES = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

export function BlockTimeAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = React.useState<string | null>(null);
  const [reason, setReason] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const { data: blockedTimes = [], isLoading } = useBlockedTimes(selectedDate);
  
  // Create set of already blocked times
  const blockedTimeSlots = React.useMemo(() => {
    return new Set(blockedTimes.map(bt => bt.time_slot));
  }, [blockedTimes]);

  const handleBlockTime = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please select a date and time to block."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('blocked_times')
        .insert({
          date: format(selectedDate, "yyyy-MM-dd"),
          time_slot: selectedTime,
          reason: reason || null
        });
      
      if (error) {
        console.error("Error blocking time:", error);
        throw error;
      }
      
      toast({
        title: "Time slot blocked",
        description: `Successfully blocked ${format(selectedDate, "MMMM d, yyyy")} at ${selectedTime}.`
      });
      
      // Reset form
      setSelectedTime(null);
      setReason("");
      
      // Refetch blocked times
      queryClient.invalidateQueries({
        queryKey: ['blocked-times', format(selectedDate, "yyyy-MM-dd")]
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to block time",
        description: "There was an error blocking this time slot. Please try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnblockTime = async (blockedTime: BlockedTime) => {
    try {
      const { error } = await supabase
        .from('blocked_times')
        .delete()
        .eq('id', blockedTime.id);
      
      if (error) {
        console.error("Error unblocking time:", error);
        throw error;
      }
      
      toast({
        title: "Time slot unblocked",
        description: `Successfully unblocked ${format(new Date(blockedTime.date), "MMMM d, yyyy")} at ${blockedTime.time_slot}.`
      });
      
      // Refetch blocked times
      queryClient.invalidateQueries({
        queryKey: ['blocked-times', format(selectedDate as Date, "yyyy-MM-dd")]
      });
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to unblock time",
        description: "There was an error unblocking this time slot. Please try again."
      });
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Block Time Slots</CardTitle>
          <CardDescription>
            Block time slots to prevent users from booking meetings during those times.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleBlockTime}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Select Date</Label>
              <div className="border rounded-md">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="p-3"
                />
              </div>
            </div>
            
            {selectedDate && (
              <div className="space-y-2">
                <Label>Select Time ({format(selectedDate, "EEEE, MMMM d")})</Label>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                  {AVAILABLE_TIMES.map((timeSlot) => {
                    const isBlocked = blockedTimeSlots.has(timeSlot);
                    return (
                      <Button
                        key={timeSlot}
                        type="button"
                        variant={selectedTime === timeSlot ? "default" : "outline"}
                        onClick={() => setSelectedTime(timeSlot)}
                        disabled={isBlocked}
                        className={`text-center ${isBlocked ? "bg-muted/60 text-muted-foreground line-through" : ""}`}
                      >
                        {timeSlot}
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="reason">Reason (optional)</Label>
              <Textarea
                id="reason"
                placeholder="Reason for blocking this time slot"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting || !selectedDate || !selectedTime}
            >
              {isSubmitting ? "Blocking..." : "Block Time Slot"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Blocked Time Slots</CardTitle>
          <CardDescription>
            Manage your currently blocked time slots.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-6">
              <div className="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"></div>
            </div>
          ) : blockedTimes.length === 0 ? (
            <p className="text-center py-6 text-muted-foreground">
              No blocked time slots for {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "the selected date"}.
            </p>
          ) : (
            <ul className="space-y-2">
              {blockedTimes.map((blockedTime) => (
                <li 
                  key={blockedTime.id}
                  className="flex items-center justify-between rounded-md border p-3"
                >
                  <div>
                    <p className="font-medium">{blockedTime.time_slot}</p>
                    {blockedTime.reason && (
                      <p className="text-sm text-muted-foreground">{blockedTime.reason}</p>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleUnblockTime(blockedTime)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Unblock</span>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
