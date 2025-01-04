import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExpertiseManager } from "@/components/admin/ExpertiseManager";

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
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Content Management</h1>
      
      <Tabs defaultValue="expertise">
        <TabsList>
          <TabsTrigger value="expertise">Expertise</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="expertise">
          <ExpertiseManager />
        </TabsContent>

        <TabsContent value="portfolio">
          Portfolio management coming soon...
        </TabsContent>

        <TabsContent value="services">
          Services management coming soon...
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;