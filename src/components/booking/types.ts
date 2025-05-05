
export interface BookingFormProps {
  date: Date | undefined;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  comments: string;
}

// Define the notification request data type
export interface BookingNotificationRequest {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  comments: string;
}
