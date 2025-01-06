import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface ContactSubmitButtonProps {
  isSubmitting: boolean;
}

export const ContactSubmitButton = ({ isSubmitting }: ContactSubmitButtonProps) => {
  return (
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
  );
};