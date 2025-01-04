import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormFieldProps {
  control: any;
  name: string;
  label: string;
  type?: "input" | "textarea" | "select";
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string; }[];
}

export const CustomFormField = ({
  control,
  name,
  label,
  type = "input",
  placeholder,
  required,
  options,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-2">
          <FormLabel className="text-sm font-medium text-muted-foreground">
            {label} {required && <span className="text-red-500">*</span>}
          </FormLabel>
          <FormControl>
            {type === "textarea" ? (
              <Textarea
                {...field}
                placeholder={placeholder}
                className="bg-muted/50 border-primary/10 focus:border-primary/30 min-h-[150px]"
              />
            ) : type === "select" ? (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="bg-muted/50 border-primary/10 focus:border-primary/30">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                {...field}
                placeholder={placeholder}
                className="bg-muted/50 border-primary/10 focus:border-primary/30"
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};