import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface ExpertiseErrorProps {
  error: Error;
}

export const ExpertiseError = ({ error }: ExpertiseErrorProps) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        Error loading expertise cards: {error.message}
      </AlertDescription>
    </Alert>
  );
};