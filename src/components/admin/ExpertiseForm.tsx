import { useForm, FormProvider } from "react-hook-form";
import { ExpertiseItem } from "../expertise/types";
import { BasicInfoFields } from "./expertise/form/BasicInfoFields";
import { TechnicalFields } from "./expertise/form/TechnicalFields";
import { MediaFields } from "./expertise/form/MediaFields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./expertise/schema";
import { useToast } from "@/hooks/use-toast";
import { FormActions } from "./expertise/form/FormActions";

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
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      console.log('[ExpertiseForm] Form data before save:', data);
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
      });
    } catch (error: any) {
      console.error('[ExpertiseForm] Form submission error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update expertise card",
      });
    }
  };

  const handleDelete = async () => {
    try {
      console.log('[ExpertiseForm] Starting delete operation for item:', item.id);
      await onDelete(item.id);
      console.log('[ExpertiseForm] Delete operation completed successfully');
    } catch (error: any) {
      console.error('[ExpertiseForm] Delete operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      throw error; // Re-throw to be handled by error boundary
    }
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <BasicInfoFields id={item.id} />
          <TechnicalFields id={item.id} />
          <MediaFields id={item.id} />
          <FormActions 
            isLoading={isLoading} 
            onDelete={handleDelete}
          />
        </form>
      </Form>
    </FormProvider>
  );
};