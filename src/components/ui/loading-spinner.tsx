import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export const LoadingSpinner = ({ size, className }: LoadingSpinnerProps) => {
  return (
    <Loader2 
      className={cn("animate-spin", className)} 
      style={{ width: size, height: size }}
    />
  );
};