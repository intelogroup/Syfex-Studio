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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";

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
        longDescription: item.details?.longDescription || '',
        benefits: item.details?.benefits || [],
        image: item.details?.image || '/placeholder.svg'
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
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update expertise card",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(item.id);
      toast({
        title: "Success",
        description: "Expertise card has been deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to delete expertise card",
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

          <div className="flex justify-end gap-2">
            <Button 
              type="submit" 
              size="sm"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <LoadingSpinner />
                  <span className="ml-2">Saving...</span>
                </div>
              ) : (
                'Save Changes'
              )}
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  disabled={isLoading}
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the
                    expertise card and remove all of its data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};