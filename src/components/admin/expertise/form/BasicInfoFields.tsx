import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface BasicInfoFieldsProps {
  id: string;
}

export const BasicInfoFields = ({ id }: BasicInfoFieldsProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Enter title" />
            </FormControl>
            <FormDescription>
              The title of your expertise card
            </FormDescription>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Enter a brief description" />
            </FormControl>
            <FormDescription>
              A short description that appears on the card
            </FormDescription>
          </FormItem>
        )}
      />
    </div>
  );
};