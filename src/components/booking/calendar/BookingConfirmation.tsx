
import * as React from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingFormProps } from "../types";

interface BookingConfirmationProps {
  formData: BookingFormProps;
  onBookAnother: () => void;
}

export function BookingConfirmation({ formData, onBookAnother }: BookingConfirmationProps) {
  const { date, time } = formData;

  return (
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
      <Button onClick={onBookAnother} variant="default" className="mt-4">
        Book Another Meeting
      </Button>
    </div>
  );
}
