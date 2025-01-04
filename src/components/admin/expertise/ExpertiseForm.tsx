import { useForm, FormProvider } from "react-hook-form";
import { ExpertiseItem } from "../../expertise/types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./schema";

interface ExpertiseFormProps {
  item: ExpertiseItem;
  onSave: (id: string, data: Partial<ExpertiseItem>) => void;
  onDelete: (id: string) => void;
}

export const ExpertiseForm = ({ item, onSave, onDelete }: ExpertiseFormProps) => {
  const form = useForm({
    resolver: zodResolver(expertiseSchema),
    defaultValues: {
      title: item.title,
      description: item.description,
      tech: item.tech || [],
      icon: item.icon || 'code',
      details: {
        longDescription: item.details?.longDescription || '',
        benefits: item.details?.benefits || [],
        image: item.details?.image || '/placeholder.svg'
      }
    }
  });

  const handleSubmit = (data: any) => {
    onSave(item.id, data);
  };

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <BasicInfoFields id={item.id} />
          <TechnicalFields id={item.id} />
          <MediaFields id={item.id} />

          <div className="flex justify-end gap-2">
            <Button type="submit" size="sm">
              Save Changes
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={() => onDelete(item.id)}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};