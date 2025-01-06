import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";

interface TechnicalFieldsProps {
  id: string;
}

export const TechnicalFields = ({ id }: TechnicalFieldsProps) => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="tech"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Technologies</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                onChange={e => field.onChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="React, TypeScript, Node.js" 
              />
            </FormControl>
            <FormDescription>
              Enter technologies separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="details.longDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Long Description</FormLabel>
            <FormControl>
              <Textarea {...field} placeholder="Enter a detailed description" />
            </FormControl>
            <FormDescription>
              A detailed description that appears in the expanded view
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="details.benefits"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Benefits</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                onChange={e => field.onChange(e.target.value.split(',').map(b => b.trim()).filter(Boolean))}
                placeholder="Benefit 1, Benefit 2, Benefit 3" 
              />
            </FormControl>
            <FormDescription>
              Enter benefits separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};