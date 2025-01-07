import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Icons } from "@/components/icons";

const ICON_OPTIONS = Object.keys(Icons).map(key => ({
  value: key,
  label: key.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}));

export const IconFields = () => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="icon"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Icon</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select an icon" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {ICON_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};