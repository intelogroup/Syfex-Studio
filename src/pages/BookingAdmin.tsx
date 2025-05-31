
import * as React from "react";
import { BlockTimeAdmin } from "@/components/booking/admin/BlockTimeAdmin";
import { ViewBookingsPanel } from "@/components/booking/admin/ViewBookingsPanel";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Settings, Mail } from "lucide-react";

export const BookingAdmin = () => {
  return (
    <div className="min-h-screen bg-background relative section-enhanced">
      <div className="container max-w-6xl mx-auto py-16 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-card mb-8"
          >
            <Settings className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Administration Panel</span>
          </motion.div>
          
          <h1 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Booking Administration
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
            Manage your booking settings and test notification emails with our enhanced admin interface
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid gap-8 mb-12"
        >
          <Card className="glass-card interactive-element overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Email Notifications</CardTitle>
                  <CardDescription className="text-base">Test and manage your booking email notifications with enhanced interface</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ViewBookingsPanel />
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid gap-8"
        >
          <Card className="glass-card interactive-element overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-b border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl">Manage Availability</CardTitle>
                  <CardDescription className="text-base">Block off times when you're not available for bookings with our intuitive interface</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <BlockTimeAdmin />
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Additional admin stats or quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { label: "Active Bookings", value: "12", color: "from-blue-500 to-cyan-500" },
            { label: "Blocked Times", value: "5", color: "from-purple-500 to-pink-500" },
            { label: "Email Success Rate", value: "99.8%", color: "from-green-500 to-emerald-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="glass-card p-6 text-center interactive-element"
            >
              <div className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BookingAdmin;
