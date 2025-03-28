import { Tables } from "@/integrations/supabase/types";
import { ReactNode } from "react";

export type ServicePreviewData = Pick<
  Tables<"services">,
  "title" | "description" | "icon" | "features" | "details" | "published" | "key" | "locale"
>;

export type ServiceFormProps = {
  item: Tables<"services">;
  onSave: (id: string, data: any) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isLoading?: boolean;
};

export type ServicePreviewProps = {
  services: ServicePreviewData[];
};