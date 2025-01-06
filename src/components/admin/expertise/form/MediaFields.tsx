import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface MediaFieldsProps {
  id: string;
}

export const MediaFields = ({ id }: MediaFieldsProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <Input {...field} placeholder="code" />
            </FormControl>
            <FormDescription>
              Icon name from Lucide icons (e.g., code, database, globe)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL</FormLabel>
            <FormControl>
              <Input {...field} placeholder="/placeholder.svg" />
            </FormControl>
            <FormDescription>
              URL of the image to display
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};