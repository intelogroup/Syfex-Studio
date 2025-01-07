import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface ServiceErrorProps {
  error: Error;
}

export const ServiceError = ({ error }: ServiceErrorProps) => {
  const queryClient = useQueryClient();

  const handleRetry = () => {
    queryClient.invalidateQueries({ queryKey: ['services'] });
  };

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error Loading Services</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">{error.message}</p>
        <Button onClick={handleRetry} variant="outline" size="sm">
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );
};