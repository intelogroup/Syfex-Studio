
import * as React from "react";
import { BlockTimeAdmin } from "@/components/booking/admin/BlockTimeAdmin";
import { ViewBookingsPanel } from "@/components/booking/admin/ViewBookingsPanel";

export const BookingAdmin = () => {
  return (
    <div className="container max-w-6xl mx-auto py-16">
      <h1 className="text-3xl font-bold mb-8">Booking Administration</h1>
      
      <div className="grid gap-8 mb-8">
        <ViewBookingsPanel />
      </div>
      
      <BlockTimeAdmin />
    </div>
  );
};

export default BookingAdmin;
