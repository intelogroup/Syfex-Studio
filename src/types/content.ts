import { ContentTable, TableRow } from "./database";

export type { ContentTable };

export interface ContentQueryParams {
  locale?: string;
  published?: boolean;
}

export interface ContentMutationParams<T extends ContentTable> {
  id?: string;
  type: T;
  data: Partial<TableRow<T>>;
}

export type LocalizedContent<T extends ContentTable> = TableRow<T>;