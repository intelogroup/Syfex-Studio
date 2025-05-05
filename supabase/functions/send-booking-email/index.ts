
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const targetEmail = "jimkalinov@gmail.com";
const webhookSecret = Deno.env.get("RESEND_WEBHOOK_SECRET") || "whsec_OQh5WOH9I9nvGA9SBUvYqc0GHZ2gDl8E";

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

interface WebhookEvent {
  data: {
    id: string;
    object: string;
    created_at: string;
    type: string;
    to: string;
    status: string;
  };
  type: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  // Handle webhook events from Resend
  if (req.url.includes("/webhook")) {
    try {
      const payload = await req.json() as WebhookEvent;
      console.log("Webhook event received:", JSON.stringify(payload));
      
      // Process the webhook event
      if (payload.type === "email.delivered") {
        console.log(`Email delivered to ${payload.data.to} with ID ${payload.data.id}`);
      } else if (payload.type === "email.bounced") {
        console.error(`Email bounced for ${payload.data.to} with ID ${payload.data.id}`);
      }
      
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error: any) {
      console.error("Error processing webhook:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  
  // Handle booking notifications
  try {
    console.log("Booking notification function invoked");
    
    const bookingData: BookingNotificationRequest = await req.json();
    console.log("Booking data received:", bookingData);

    const { date, time, name, email, phone, companyName, comments } = bookingData;

    // Create formatted email content with improved styling
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Booking Notification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          h1 { color: #2563eb; margin-bottom: 15px; }
          h2 { color: #4338ca; margin-top: 25px; margin-bottom: 10px; }
          h3 { color: #6366f1; }
          p { margin-bottom: 10px; }
          hr { border: 0; height: 1px; background-color: #e2e8f0; margin: 20px 0; }
          .highlight { background-color: #f8fafc; padding: 15px; border-left: 4px solid #2563eb; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>New Booking Notification</h1>
        <div class="highlight">
          <p><strong>From:</strong> ${name} (${email})</p>
        </div>
        <hr />
        <h2>Booking Details</h2>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
        <h3>Comments</h3>
        <p>${comments || 'No comments provided'}</p>
      </body>
      </html>
    `;

    console.log("Attempting to send email with Resend API...");
    console.log("API Key status:", Deno.env.get("RESEND_API_KEY") ? "Set" : "Not set");
    
    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "Booking Notifications <onboarding@resend.dev>",
      to: [targetEmail],
      subject: `New Booking: ${name} - ${date} at ${time}`,
      html: emailHtml,
      reply_to: email,
      text: `New Booking from ${name} (${email})\n\nDate: ${date}\nTime: ${time}\nPhone: ${phone || 'Not provided'}\nCompany: ${companyName || 'Not provided'}\n\nComments:\n${comments || 'No comments provided'}`,
    });

    console.log("Email notification response:", JSON.stringify(emailResponse));

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-email function:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    return new Response(
      JSON.stringify({ 
        error: error.message || "Failed to send email notification",
        details: error.details || {},
        stack: error.stack || "No stack trace available"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
