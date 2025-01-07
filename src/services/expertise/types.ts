import { ExpertiseItem } from "@/components/expertise/types";

export type ExpertiseServiceError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
};

export type ExpertiseCreatePayload = Omit<ExpertiseItem, 'id' | 'created_at' | 'updated_at' | 'created_by'>;