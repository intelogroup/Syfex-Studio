import { Tables } from "@/integrations/supabase/types";

export type ContentTableWithLocale = 'expertise' | 'services';

export type LocalizedContent<T extends ContentTableWithLocale> = Tables<T>;

export type ContentQueryParams = {
  locale?: string;
  published?: boolean;
};