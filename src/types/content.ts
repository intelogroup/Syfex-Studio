import { Database } from "@/integrations/supabase/types";

type Tables = Database['public']['Tables'];
export type ContentTableWithLocale = keyof Pick<Tables, 'expertise' | 'services'>;

export type LocalizedContent<T extends ContentTableWithLocale> = Tables[T]['Row'];
export type InsertContent<T extends ContentTableWithLocale> = Tables[T]['Insert'];
export type UpdateContent<T extends ContentTableWithLocale> = Tables[T]['Update'];

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTableWithLocale> {
  id?: string;
  type: T;
  data: UpdateContent<T>;
}

export type ContentError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}