import { CustomFormField } from "./FormField";
import { FileUpload } from "./FileUpload";
import { Control } from "react-hook-form";
import { ContactFormSchema } from "./schema";

interface ContactFormFieldsProps {
  control: Control<ContactFormSchema>;
  onFileChange: (files: FileList | null) => void;
}

export const ContactFormFields = ({ control, onFileChange }: ContactFormFieldsProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CustomFormField
          control={control}
          name="name"
          label="Your Name"
          placeholder="John Doe"
          required
          description="Enter your full name"
        />
        <CustomFormField
          control={control}
          name="email"
          label="Email Address"
          placeholder="john@example.com"
          required
          description="We'll never share your email"
        />
      </div>

      <CustomFormField
        control={control}
        name="orgType"
        label="Organization Type"
        type="select"
        placeholder="Select organization type"
        description="Tell us about your organization"
        options={[
          { value: "startup", label: "Startup" },
          { value: "enterprise", label: "Enterprise" },
          { value: "individual", label: "Individual" },
          { value: "nonprofit", label: "Non-Profit" },
        ]}
      />

      <CustomFormField
        control={control}
        name="projectType"
        label="Project Type"
        type="select"
        placeholder="Select project type"
        description="What kind of project do you need help with?"
        options={[
          { value: "web", label: "Web Development" },
          { value: "mobile", label: "Mobile App" },
          { value: "design", label: "UI/UX Design" },
          { value: "consulting", label: "Consulting" },
          { value: "other", label: "Other" },
        ]}
      />

      <CustomFormField
        control={control}
        name="description"
        label="Project Description"
        type="textarea"
        placeholder="Tell us about your project goals, requirements, and timeline..."
        required
        description="Provide as much detail as possible to help us understand your needs"
      />

      <FileUpload onFileChange={onFileChange} />

      <CustomFormField
        control={control}
        name="budget"
        label="Budget Range"
        type="select"
        placeholder="Select budget range"
        description="This helps us tailor our solution to your budget"
        options={[
          { value: "small", label: "$5,000 - $10,000" },
          { value: "medium", label: "$10,000 - $25,000" },
          { value: "large", label: "$25,000 - $50,000" },
          { value: "enterprise", label: "$50,000+" },
        ]}
      />
    </>
  );
};