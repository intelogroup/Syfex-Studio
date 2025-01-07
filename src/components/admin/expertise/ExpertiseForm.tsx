import { useForm, FormProvider } from "react-hook-form";
import { ExpertiseItem } from "../../expertise/types";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./schema";
import { useToast } from "@/hooks/use-toast";
import { FormActions } from "./form/FormActions";

interface ExpertiseFormProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
}

export const ExpertiseForm = ({ item, onSave, onDelete, isLoading }: ExpertiseFormProps) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      title: item.title,
      description: item.description || '',
      tech: item.tech || [],
      icon: item.icon || 'code',
      long_description: item.long_description || '',
      benefits: item.benefits || [],
      image_url: item.image_url || '/placeholder.svg',
      published: item.published || false,
      key: item.key,
      locale: item.locale
    },
    mode: "onChange"
  });

  const handleSubmit = async (data: any) => {
    try {
      console.log('Form data before save:', data);
      
      const toastId = toast({
        title: "Saving changes...",
        description: "Your changes are being saved",
      });

      await onSave(item.id, {
        title: data.title,
        description: data.description,
        tech: data.tech,
        icon: data.icon,
        long_description: data.long_description,
        benefits: data.benefits,
        image_url: data.image_url,
        published: data.published,
        key: data.key,
        locale: data.locale
      });

      toast({
        title: "Success",
        description: "Expertise card has been updated",
        variant: "default"
      });
    } catch (error: any) {
      console.error('Form submission error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });

      toast({
        variant: "destructive",
        title: "Error saving changes",
        description: error.message || "Failed to update expertise card. Please try again.",
      });
    }
  };

  // Debug form state
  console.log('Form state:', {
    isDirty: form.formState.isDirty,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    dirtyFields: form.formState.dirtyFields,
    touchedFields: form.formState.touchedFields
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)} 
          className="space-y-6"
        >
          <BasicInfoFields id={item.id} />
          <TechnicalFields id={item.id} />
          <MediaFields id={item.id} />
          <FormActions 
            isLoading={isLoading} 
            onDelete={() => onDelete(item.id)}
            isValid={Object.keys(form.formState.dirtyFields).length > 0 && form.formState.isValid}
          />
        </form>
      </Form>
    </FormProvider>
  );
};