import { ContentTable, TableRow } from "./database";

export type LocalizedContent<T extends ContentTable> = TableRow<T>;

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTable> {
  id?: string;
  type: T;
  data: Partial<TableRow<T>>;
}