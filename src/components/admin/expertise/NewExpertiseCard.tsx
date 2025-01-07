import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./schema";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useToast } from "@/hooks/use-toast";

interface NewExpertiseCardProps {
  onCreate: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const NewExpertiseCard = ({ onCreate, onCancel, isLoading }: NewExpertiseCardProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      title: "",
      description: "",
      tech: [],
      icon: "code",
      details: {
        longDescription: "",
        benefits: [],
        image: "/placeholder.svg"
      }
    }
  });

  const handleCreate = async () => {
    try {
      console.log('[NewExpertiseCard] Starting create operation');
      console.log('[NewExpertiseCard] Form state:', form.getValues());
      
      await onCreate();
      
      console.log('[NewExpertiseCard] Create operation completed successfully');
      toast({
        title: "Success",
        description: "New expertise card created successfully",
      });
    } catch (error: any) {
      console.error('[NewExpertiseCard] Create operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create expertise card",
      });
    }
  };

  const handleCancel = () => {
    console.log('[NewExpertiseCard] Cancelling create operation');
    onCancel();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Expertise Card</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form className="space-y-6">
              <BasicInfoFields id="new" />
              <TechnicalFields id="new" />
              <MediaFields id="new" />

              <div className="flex gap-4">
                <Button 
                  onClick={handleCreate}
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
                  variant="outline" 
                  onClick={handleCancel}
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