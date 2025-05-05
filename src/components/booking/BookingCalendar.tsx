
import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { BookingCalendarDialog } from "./calendar/BookingCalendarDialog";

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
  return (
    <BookingCalendarDialog
      buttonText={buttonText}
      buttonIcon={buttonIcon}
      buttonClassName={buttonClassName}
      buttonVariant={buttonVariant}
      buttonSize={buttonSize}
    />
  );
}
