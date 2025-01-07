import { Tables } from "@/integrations/supabase/types";

export type ContentTableWithLocale = keyof Pick<Tables, 'expertise' | 'services'>;

export type LocalizedContent<T extends ContentTableWithLocale> = Tables[T]['Row'];

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTableWithLocale> {
  id?: string;
  type: T;
  [key: string]: any;
}