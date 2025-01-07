import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const ICON_OPTIONS = [
  { value: 'code', label: 'Code' },
  { value: 'laptop', label: 'Laptop' },
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'palette', label: 'Palette' },
  { value: 'cpu', label: 'CPU' },
  { value: 'shield-check', label: 'Shield Check' },
  { value: 'headphones', label: 'Headphones' },
  { value: 'users', label: 'Users' },
];

export const IconFields = () => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Primary Icon</FormLabel>
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

      <FormField
        control={form.control}
        name="secondary_icon"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Secondary Icon</FormLabel>
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
    </div>
  );
};