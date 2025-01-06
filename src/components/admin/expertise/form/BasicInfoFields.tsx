import { PublishField } from "./basic-info/PublishField";
import { LocalizationFields } from "./basic-info/LocalizationFields";
import { ContentFields } from "./basic-info/ContentFields";

interface BasicInfoFieldsProps {
  id: string;
}

export const BasicInfoFields = ({ id }: BasicInfoFieldsProps) => {
  return (
    <div className="space-y-4">
      <PublishField />
      <LocalizationFields />
      <ContentFields />
    </div>
  );
};