
import * as React from "react";
import { BookingFormProps } from "../types";
import { BookingForm } from "./BookingForm";
import { BookingConfirmation } from "./BookingConfirmation";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingCalendarDialogProps {
  buttonText: string;
  buttonIcon: React.ReactNode;
  buttonClassName: string;
  buttonVariant: "default" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  buttonSize: "default" | "sm" | "lg" | "icon";
}

export function BookingCalendarDialog({
  buttonText,
  buttonIcon,
  buttonClassName,
  buttonVariant,
  buttonSize
}: BookingCalendarDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [bookingComplete, setBookingComplete] = React.useState(false);
  const [formData, setFormData] = React.useState<BookingFormProps>({
    date: undefined,
    time: null,
    name: "",
    email: "",
    phone: "",
    companyName: "",
    comments: "",
  });

  const resetForm = () => {
    setFormData({
      date: undefined,
      time: null,
      name: "",
      email: "",
      phone: "",
      companyName: "",
      comments: "",
    });
    setBookingComplete(false);
    setOpen(false);
  };

  const handleBookingComplete = (data: BookingFormProps) => {
    setFormData(data);
    setBookingComplete(true);
  };

  const handleBookAnother = () => {
    resetForm();
    setBookingComplete(false);
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
          <BookingConfirmation 
            formData={formData} 
            onBookAnother={handleBookAnother} 
          />
        ) : (
          <BookingForm 
            formData={formData}
            onComplete={handleBookingComplete}
            onCancel={() => setOpen(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
