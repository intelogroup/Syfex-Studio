
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const targetEmail = "jimkalinov@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotificationRequest {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  comments: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Booking notification function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const bookingData: BookingNotificationRequest = await req.json();
    console.log("Booking data received:", bookingData);

    const { date, time, name, email, phone, companyName, comments } = bookingData;

    // Create formatted email content
    const emailHtml = `
      <h1>New Booking Notification</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <hr />
      <h2>Booking Details</h2>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
      <h3>Comments</h3>
      <p>${comments || 'No comments provided'}</p>
    `;

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "Booking Notifications <onboarding@resend.dev>",
      to: [targetEmail],
      subject: `New Booking: ${name} - ${date} at ${time}`,
      html: emailHtml,
      reply_to: email,
    });

    console.log("Email notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
