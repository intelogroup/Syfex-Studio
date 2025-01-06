import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Form } from "../ui/form";
import { ContactFormFields } from "./ContactFormFields";
import { ContactSubmitButton } from "./ContactSubmitButton";
import { useContactForm } from "@/hooks/useContactForm";
import type { ContactFormSchema } from "./schema";

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
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", {
        ...data,
        files: files ? Array.from(files).map(f => f.name) : [],
      });

      toast({
        title: "Success!",
        description: "Your message has been sent. We'll get back to you soon!",
      });

      form.reset();
      setFiles(null);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
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