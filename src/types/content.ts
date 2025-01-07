import { Database } from "@/integrations/supabase/types";

type DatabaseTables = Database['public']['Tables'];
export type ContentTableWithLocale = keyof Pick<DatabaseTables, 'expertise' | 'services'>;

export type LocalizedContent<T extends ContentTableWithLocale> = DatabaseTables[T]['Row'];

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTableWithLocale> {
  id?: string;
  type: T;
  data: Partial<DatabaseTables[T]['Insert']>;
}

export type ContentError = {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}