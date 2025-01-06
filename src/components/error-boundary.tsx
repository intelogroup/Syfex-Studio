import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { trackError } from "@/utils/analytics";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error);
    console.error("Component stack:", errorInfo.componentStack);
    
    // Track error with additional context
    trackError(error, errorInfo.componentStack);
    this.setState({ errorInfo });

    // Show error toast with more detailed message
    toast({
      variant: "destructive",
      title: "Something went wrong",
      description: this.getErrorMessage(error),
    });
  }

  private getErrorMessage(error: Error): string {
    if (error.message.includes("row level security")) {
      return "You don't have permission to perform this action. Please check your authentication status.";
    }
    if (error.message.includes("network")) {
      return "Network error occurred. Please check your internet connection.";
    }
    return error.message || "An unexpected error occurred while rendering the application.";
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  private handleReportError = () => {
    if (this.state.error) {
      trackError(this.state.error, this.state.errorInfo?.componentStack);
      toast({
        title: "Error Reported",
        description: "Thank you for helping us improve our application.",
      });
    }
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-4">
          <Card className="w-full max-w-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <CardTitle>Something went wrong</CardTitle>
              </div>
              <CardDescription>
                We apologize for the inconvenience. Our team has been notified of this issue.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm font-mono overflow-auto max-h-[200px]">
                  <div className="font-semibold mb-2">Error:</div>
                  {this.state.error.toString()}
                  {this.state.errorInfo && (
                    <>
                      <div className="font-semibold mt-4 mb-2">Component Stack:</div>
                      {this.state.errorInfo.componentStack}
                    </>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Button onClick={this.handleReset} variant="default" className="flex-1">
                  <RefreshCcw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
                <Button onClick={this.handleReportError} variant="outline" className="flex-1">
                  Report Issue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}