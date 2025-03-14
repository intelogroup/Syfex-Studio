import { Database } from './database.types';

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];

export type UserRole = Enums['user_role'];

// Define content tables that support localization
export type ContentTableWithLocale = keyof Pick<Tables, 'expertise' | 'services'>;
export type LocalizedContent<T extends ContentTableWithLocale> = Tables[T]['Row'];

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTableWithLocale> {
  id?: string;
  type: T;
  data: Tables[T]['Update'] | Tables[T]['Insert'];
}

export type ContentError = {
  message: string;
  details?: string;
  code?: string;
  hint?: string;
}