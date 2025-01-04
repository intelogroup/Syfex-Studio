import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: "An error occurred while rendering the application.",
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-4">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold mb-2">Oops, something went wrong!</h2>
          <p className="text-muted-foreground mb-4 text-center max-w-md">
            We apologize for the inconvenience. Please try refreshing the page.
          </p>
          <Button onClick={this.handleReset} variant="default">
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}