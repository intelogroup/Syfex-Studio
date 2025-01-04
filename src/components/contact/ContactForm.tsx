import { useState, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { CustomFormField } from "./FormField";
import { FileUpload } from "./FileUpload";
import { contactFormSchema, type ContactFormSchema } from "./schema";
import { Loader2 } from "lucide-react";

// Throttle configuration
const THROTTLE_DELAY = 2000; // 2 seconds between submissions
const MAX_SUBMISSIONS = 5; // Maximum submissions in timeframe
const SUBMISSION_TIMEFRAME = 300000; // 5 minutes in milliseconds

export const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  
  // Throttling state
  const lastSubmissionTime = useRef<number>(0);
  const submissionCount = useRef<number>(0);
  const submissionResetTimeout = useRef<NodeJS.Timeout>();

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      orgType: "",
      projectType: "",
      description: "",
      budget: "",
    },
    mode: "onChange",
  });

  // Reset submission count after timeframe
  const resetSubmissionCount = useCallback(() => {
    submissionCount.current = 0;
    if (submissionResetTimeout.current) {
      clearTimeout(submissionResetTimeout.current);
    }
  }, []);

  const checkThrottling = useCallback((): boolean => {
    const now = Date.now();
    
    // Check if enough time has passed since last submission
    if (now - lastSubmissionTime.current < THROTTLE_DELAY) {
      toast({
        title: "Please wait",
        description: "Please wait a few seconds before submitting again.",
        variant: "destructive",
      });
      return true;
    }

    // Check submission count
    if (submissionCount.current >= MAX_SUBMISSIONS) {
      toast({
        title: "Too many submissions",
        description: "You've reached the maximum number of submissions. Please try again later.",
        variant: "destructive",
      });
      return true;
    }

    // Update throttling state
    lastSubmissionTime.current = now;
    submissionCount.current += 1;

    // Set timeout to reset submission count
    if (submissionCount.current === 1) {
      submissionResetTimeout.current = setTimeout(resetSubmissionCount, SUBMISSION_TIMEFRAME);
    }

    return false;
  }, [toast, resetSubmissionCount]);

  const onSubmit = async (data: ContactFormSchema) => {
    // Check throttling before proceeding
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomFormField
            control={form.control}
            name="name"
            label="Your Name"
            placeholder="John Doe"
            required
            description="Enter your full name"
          />
          <CustomFormField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="john@example.com"
            required
            description="We'll never share your email"
          />
        </div>

        <CustomFormField
          control={form.control}
          name="orgType"
          label="Organization Type"
          type="select"
          placeholder="Select organization type"
          description="Tell us about your organization"
          options={[
            { value: "startup", label: "Startup" },
            { value: "enterprise", label: "Enterprise" },
            { value: "individual", label: "Individual" },
            { value: "nonprofit", label: "Non-Profit" },
          ]}
        />

        <CustomFormField
          control={form.control}
          name="projectType"
          label="Project Type"
          type="select"
          placeholder="Select project type"
          description="What kind of project do you need help with?"
          options={[
            { value: "web", label: "Web Development" },
            { value: "mobile", label: "Mobile App" },
            { value: "design", label: "UI/UX Design" },
            { value: "consulting", label: "Consulting" },
            { value: "other", label: "Other" },
          ]}
        />

        <CustomFormField
          control={form.control}
          name="description"
          label="Project Description"
          type="textarea"
          placeholder="Tell us about your project goals, requirements, and timeline..."
          required
          description="Provide as much detail as possible to help us understand your needs"
        />

        <FileUpload onFileChange={setFiles} />

        <CustomFormField
          control={form.control}
          name="budget"
          label="Budget Range"
          type="select"
          placeholder="Select budget range"
          description="This helps us tailor our solution to your budget"
          options={[
            { value: "small", label: "$5,000 - $10,000" },
            { value: "medium", label: "$10,000 - $25,000" },
            { value: "large", label: "$25,000 - $50,000" },
            { value: "enterprise", label: "$50,000+" },
          ]}
        />

        <Button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </Form>
  );
};