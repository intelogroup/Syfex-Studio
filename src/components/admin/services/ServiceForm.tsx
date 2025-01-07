import { useForm, FormProvider } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema } from "./schema";
import { useToast } from "@/hooks/use-toast";
import { FormActions } from "../expertise/form/FormActions";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { IconFields } from "./form/IconFields";
import { FeaturesFields } from "./form/FeaturesFields";
import { Tables } from "@/integrations/supabase/types";

interface ServiceFormProps {
  item: Tables<"services">;
  onSave: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ServiceForm = ({ item, onSave, onDelete, isLoading }: ServiceFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: item.title || '',
      description: item.description || '',
      icon: item.icon || 'code',
      secondary_icon: item.secondary_icon || 'code',
      features: item.features || [],
      details: item.details || [],
      published: item.published || false,
      key: item.key || '',
      locale: item.locale || 'en'
    }
  });

  console.log('[ServiceForm] Rendering form with data:', item);

  const handleSubmit = async (data: any) => {
    try {
      console.log('[ServiceForm] Submitting form data:', data);
      await onSave(item.id, data);
      toast({
        title: "Success",
        description: "Service card has been updated",
      });
    } catch (error: any) {
      console.error('[ServiceForm] Error saving form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update service card",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <BasicInfoFields />
          <IconFields />
          <FeaturesFields />
          <FormActions 
            isLoading={isLoading} 
            onDelete={() => onDelete(item.id)}
            isValid={form.formState.isValid}
          />
        </form>
      </Form>
    </FormProvider>
  );
};