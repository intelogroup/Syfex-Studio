import { ContentTable, TableRow, TableInsert, TableUpdate } from "./database";

export type { ContentTable };

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTable> {
  id?: string;
  type: T;
  data: Partial<TableInsert<T>> | Partial<TableUpdate<T>>;
}

export type LocalizedContent<T extends ContentTable> = TableRow<T>;

export type ContentData<T extends ContentTable> = {
  [K in T]: TableRow<K>;
};