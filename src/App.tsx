import { StrictMode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "./components/error-boundary";
import { supabase } from "./integrations/supabase/client";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import { sendToAnalytics } from "./utils/analytics";
import { onCLS, onFID, onLCP } from 'web-vitals';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Route change tracker and auth protection
const RouteChangeTracker = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Track page view
    console.log(`Page view: ${location.pathname}`);

    // Check auth status for protected routes
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const isAuthPage = location.pathname === "/auth";

      if (!session && !isAuthPage && location.pathname !== "/") {
        navigate("/auth");
      } else if (session && isAuthPage) {
        navigate("/");
      }
    };

    checkAuth();
  }, [location, navigate]);

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
          <TooltipProvider>
            <BrowserRouter>
              <RouteChangeTracker />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
              <Toaster />
              <Sonner />
            </BrowserRouter>
          </TooltipProvider>
        </ErrorBoundary>
      </QueryClientProvider>
    </StrictMode>
  );
};

export default App;