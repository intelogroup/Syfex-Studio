
import { StrictMode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary";
import { ThemeProvider } from "./contexts/theme-context";
import Index from "./pages/Index";
import Services from "./pages/Services";
import { sendToAnalytics } from "./utils/analytics";
import { onCLS, onFID, onLCP } from 'web-vitals';
import "./i18n/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Route change tracker
const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view
    console.log(`Page view: ${location.pathname}`);
  }, [location]);

  return null;
};

const App = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
  }, []);

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <ThemeProvider defaultTheme="dark">
            <TooltipProvider>
              <BrowserRouter>
                <RouteChangeTracker />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                </Routes>
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </TooltipProvider>
          </ThemeProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;
