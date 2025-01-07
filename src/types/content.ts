import { ContentTable, TableRow, TableInsert, TableUpdate } from "./database";

export type { ContentTable };

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTable> {
  id?: string;
  type: T;
  data: T extends any ? TableInsert<T> | TableUpdate<T> : never;
}

export type LocalizedContent<T extends ContentTable> = TableRow<T>;