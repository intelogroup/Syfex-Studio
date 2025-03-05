
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
const targetEmail = "jayveedz19@gmail.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormRequest {
  name: string;
  email: string;
  orgType: string;
  projectType: string;
  description: string;
  budget: string;
  files?: string[];
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Contact email function invoked");
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormRequest = await req.json();
    console.log("Form data received:", formData);

    const { name, email, orgType, projectType, description, budget, files } = formData;

    // Create formatted email content
    const emailHtml = `
      <h1>New Contact Form Submission</h1>
      <p><strong>From:</strong> ${name} (${email})</p>
      <hr />
      <h2>Project Details</h2>
      <p><strong>Organization Type:</strong> ${orgType || 'Not specified'}</p>
      <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
      <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
      <h3>Description</h3>
      <p>${description}</p>
      ${files && files.length > 0 ? `<p><strong>Files Attached:</strong> ${files.join(', ')}</p>` : ''}
    `;

    // Send the email using Resend
    const emailResponse = await resend.emails.send({
      from: "Syfex Studio <onboarding@resend.dev>",
      to: [targetEmail],
      subject: `New Contact Form: ${name} - ${projectType || 'Project Inquiry'}`,
      html: emailHtml,
      reply_to: email,
    });

    console.log("Email sent successfully:", emailResponse);

    // Send a confirmation email to the user
    const confirmationResponse = await resend.emails.send({
      from: "Syfex Studio <onboarding@resend.dev>",
      to: [email],
      subject: "We've received your message!",
      html: `
        <h1>Thank you for contacting Syfex Studio!</h1>
        <p>Hi ${name},</p>
        <p>We've received your inquiry about ${projectType || 'your project'} and will review it promptly.</p>
        <p>Our team will get back to you within 1-2 business days.</p>
        <p>Best regards,<br>The Syfex Studio Team</p>
      `,
    });

    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
