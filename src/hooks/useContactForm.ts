import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactFormSchema } from "@/components/contact/schema";

// Throttle configuration
const THROTTLE_DELAY = 2000;
const MAX_SUBMISSIONS = 5;
const SUBMISSION_TIMEFRAME = 300000;

export const useContactForm = () => {
  const { toast } = useToast();
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

  const resetSubmissionCount = useCallback(() => {
    submissionCount.current = 0;
    if (submissionResetTimeout.current) {
      clearTimeout(submissionResetTimeout.current);
    }
  }, []);

  const checkThrottling = useCallback((): boolean => {
    const now = Date.now();
    
    if (now - lastSubmissionTime.current < THROTTLE_DELAY) {
      toast({
        title: "Please wait",
        description: "Please wait a few seconds before submitting again.",
        variant: "destructive",
      });
      return true;
    }

    if (submissionCount.current >= MAX_SUBMISSIONS) {
      toast({
        title: "Too many submissions",
        description: "You've reached the maximum number of submissions. Please try again later.",
        variant: "destructive",
      });
      return true;
    }

    lastSubmissionTime.current = now;
    submissionCount.current += 1;

    if (submissionCount.current === 1) {
      submissionResetTimeout.current = setTimeout(resetSubmissionCount, SUBMISSION_TIMEFRAME);
    }

    return false;
  }, [toast, resetSubmissionCount]);

  return { form, checkThrottling };
};