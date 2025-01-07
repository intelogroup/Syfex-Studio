import { ContentTable } from "./tables";
import type { TableInsert, TableUpdate } from "./tables";

export const isContentTable = (table: string): table is ContentTable => {
  return ["expertise", "services"].includes(table);
};

export const isValidTableData = <T extends ContentTable>(
  table: T,
  data: unknown
): data is TableInsert<T> | TableUpdate<T> => {
  if (!data || typeof data !== 'object') return false;

  const requiredFields: Record<ContentTable, string[]> = {
    expertise: ['title', 'key'],
    services: ['title', 'description', 'key']
  };

  return requiredFields[table].every(field => 
    field in data && 
    (data as any)[field] !== undefined && 
    (data as any)[field] !== null
  );
};