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
      
      const toastId = toast({
        title: "Saving changes...",
        description: "Your changes are being saved",
      });

      await onSave(item.id, {
        title: data.title,
        description: data.description,
        icon: data.icon,
        features: data.features,
        details: data.details,
        published: data.published,
        key: data.key,
        locale: data.locale
      });

      toast({
        title: "Success",
        description: "Service card has been updated",
        variant: "default"
      });
    } catch (error: any) {
      console.error('[ServiceForm] Form submission error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });

      toast({
        variant: "destructive",
        title: "Error saving changes",
        description: error.message || "Failed to update service card. Please try again.",
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