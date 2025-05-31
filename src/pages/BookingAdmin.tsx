
import * as React from "react";
import { BlockTimeAdmin } from "@/components/booking/admin/BlockTimeAdmin";
import { ViewBookingsPanel } from "@/components/booking/admin/ViewBookingsPanel";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export const BookingAdmin = () => {
  return (
    <div className="container max-w-6xl mx-auto py-16">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold gradient-text mb-4">Booking Administration</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Manage your booking settings and test notification emails
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid gap-8 mb-12"
      >
        <Card className="border-primary/10 dark:bg-black/40 dark:backdrop-blur-sm light:shadow-lg overflow-hidden">
          <CardHeader className="border-b border-primary/10 bg-muted/30">
            <CardTitle className="text-2xl">Email Notifications</CardTitle>
            <CardDescription>Test and manage your booking email notifications</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ViewBookingsPanel />
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="grid gap-8"
      >
        <Card className="border-primary/10 dark:bg-black/40 dark:backdrop-blur-sm light:shadow-lg overflow-hidden">
          <CardHeader className="border-b border-primary/10 bg-muted/30">
            <CardTitle className="text-2xl">Manage Availability</CardTitle>
            <CardDescription>Block off times when you're not available for bookings</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <BlockTimeAdmin />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingAdmin;
