import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpertiseManager } from "@/components/admin/ExpertiseManager";
import { ServicesManager } from "@/components/admin/ServicesManager";
import { TooltipProvider } from "@/components/ui/tooltip";

const Admin = () => {
  const navigate = useNavigate();
  const { data: isAdmin, isLoading: checkingAdmin } = useAdmin();

  useEffect(() => {
    if (!checkingAdmin && !isAdmin) {
      navigate('/');
    }
  }, [checkingAdmin, isAdmin, navigate]);

  if (checkingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8">Content Management</h1>
        
        <Tabs defaultValue="expertise">
          <TabsList>
            <TabsTrigger value="expertise">Expertise</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="expertise">
            <ExpertiseManager />
          </TabsContent>

          <TabsContent value="services">
            <ServicesManager />
          </TabsContent>

          <TabsContent value="portfolio">
            Portfolio management coming soon...
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  );
};

export default Admin;