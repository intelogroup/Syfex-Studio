import { useForm, FormProvider } from "react-hook-form";
import { ExpertiseItem } from "../../expertise/types";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./schema";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
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
      description: item.description,
      tech: item.tech || [],
      icon: item.icon || 'code',
      longDescription: item.longDescription || '',
      benefits: item.benefits || [],
      imageUrl: item.imageUrl || '/placeholder.svg',
      published: item.published || false,
      key: item.key,
      locale: item.locale
    }
  });

  const handleSubmit = async (data: any) => {
    try {
      await onSave(item.id, data);
      toast({
        title: "Success",
        description: "Expertise card has been updated",
      });
    } catch (error) {
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