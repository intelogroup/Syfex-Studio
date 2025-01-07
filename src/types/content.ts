import { Tables } from "@/integrations/supabase/types";

export type ContentTableWithLocale = 'expertise' | 'services';

export type LocalizedContent<T extends ContentTableWithLocale> = Tables<T>;

export type ContentQueryParams = {
  locale?: 'en' | string;
  published?: boolean;
};

export type ContentMutationParams = {
  id?: string;
  type?: ContentTableWithLocale;
  [key: string]: any;
};