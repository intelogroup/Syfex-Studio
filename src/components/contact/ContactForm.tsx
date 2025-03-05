
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form } from "../ui/form";
import { ContactFormFields } from "./ContactFormFields";
import { ContactSubmitButton } from "./ContactSubmitButton";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormSchema } from "./schema";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const { form, checkThrottling } = useContactForm();

  const onSubmit = async (data: ContactFormSchema) => {
    if (checkThrottling()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare the files data (just file names for now)
      const fileNames = files ? Array.from(files).map(f => f.name) : [];
      
      // Send the form data to our edge function
      const { data: emailResponse, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...data,
          files: fileNames
        },
      });
      
      if (error) {
        throw new Error(`Failed to send email: ${error.message}`);
      }

      console.log("Form submitted with email response:", emailResponse);

      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. We'll get back to you soon!",
      });

      form.reset();
      setFiles(null);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContactFormFields 
          control={form.control}
          onFileChange={setFiles}
        />
        <ContactSubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};
