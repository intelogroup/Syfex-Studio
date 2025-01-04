import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expertiseSchema } from "./schema";
import { Form } from "@/components/ui/form";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { TechnicalFields } from "./form/TechnicalFields";
import { MediaFields } from "./form/MediaFields";

interface NewExpertiseCardProps {
  onCreate: () => void;
  onCancel: () => void;
}

export const NewExpertiseCard = ({ onCreate, onCancel }: NewExpertiseCardProps) => {
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
                <Button onClick={onCreate}>Create Card</Button>
                <Button variant="outline" onClick={onCancel}>
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