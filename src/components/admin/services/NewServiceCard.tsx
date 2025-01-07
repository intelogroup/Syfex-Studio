import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "./schema";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { IconFields } from "./form/IconFields";
import { FeaturesFields } from "./form/FeaturesFields";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import { ServiceFormData } from "./schema";

interface NewServiceCardProps {
  onCreate: (data: ServiceFormData) => Promise<boolean>;
  onCancel: () => void;
  isLoading?: boolean;
}

export const NewServiceCard = ({ onCreate, onCancel, isLoading }: NewServiceCardProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "code",
      features: [],
      details: [],
      published: false,
      key: "",
      locale: "en"
    }
  });

  const handleCreate = async () => {
    try {
      const formData = form.getValues();
      const success = await onCreate(formData);
      
      if (success) {
        toast({
          title: "Success",
          description: "New service card created successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create service card",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Service Card</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              handleCreate();
            }}>
              <BasicInfoFields />
              <IconFields />
              <FeaturesFields />
              
              <div className="flex gap-4">
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <LoadingSpinner className="h-4 w-4 mr-2" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Card'
                  )}
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};