import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export const FeaturesFields = () => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="features"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Features</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                onChange={e => field.onChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="Feature 1, Feature 2, Feature 3, Feature 4" 
              />
            </FormControl>
            <FormDescription>
              Enter up to 4 features, separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="details"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Details</FormLabel>
            <FormControl>
              <Input 
                {...field} 
                value={Array.isArray(field.value) ? field.value.join(', ') : ''} 
                onChange={e => field.onChange(e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                placeholder="Detail 1, Detail 2, Detail 3, Detail 4" 
              />
            </FormControl>
            <FormDescription>
              Enter up to 4 details, separated by commas
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};