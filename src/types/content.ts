import { Tables } from "@/integrations/supabase/types";

export type ContentTableWithLocale = 'expertise' | 'services';

export type LocalizedContent<T extends ContentTableWithLocale> = Tables<T>;

export type ContentQueryParams = {
  locale?: string;
  published?: boolean;
};

export type ContentMutationParams<T extends ContentTableWithLocale = ContentTableWithLocale> = {
  id?: string;
  type: T;
} & Partial<Tables<T>>;