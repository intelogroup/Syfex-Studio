import { useForm, FormProvider } from "react-hook-form";
import { ExpertiseItem } from "../expertise/types";
import { Button } from "@/components/ui/button";
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
      description: item.description,
      tech: item.tech || [],
      icon: item.icon || 'code',
      details: {
        longDescription: item.details.longDescription,
        benefits: item.details.benefits,
        image: item.details.image
      }
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSave(item.id, data);
      toast({
        title: "Success",
        description: "Expertise card has been updated",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update expertise card",
      });
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
            onDelete={() => onDelete(item.id)}
          />
        </form>
      </Form>
    </FormProvider>
  );
};