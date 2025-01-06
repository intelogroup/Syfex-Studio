import { ContentFields } from "./basic-info/ContentFields";
import { LocalizationFields } from "./basic-info/LocalizationFields";
import { PublishField } from "./basic-info/PublishField";

interface BasicInfoFieldsProps {
  id: string;
}

export const BasicInfoFields = ({ id }: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-6">
      <ContentFields />
      <LocalizationFields />
      <PublishField />
    </div>
  );
};