import { Database } from "@/integrations/supabase/types/tables";

export type Tables = Database["public"]["Tables"];
export type ContentTable = keyof Pick<Tables, "expertise" | "services">;

export type TableRow<T extends ContentTable> = Tables[T]["Row"];
export type TableInsert<T extends ContentTable> = Tables[T]["Insert"];
export type TableUpdate<T extends ContentTable> = Tables[T]["Update"];

export const isContentTable = (table: string): table is ContentTable => {
  return ["expertise", "services"].includes(table);
};

// Type guard to check if data matches table schema
export const isValidTableData = <T extends ContentTable>(
  table: T,
  data: any
): data is TableInsert<T> | TableUpdate<T> => {
  if (!data || typeof data !== 'object') return false;

  // Required fields for each table
  const requiredFields: Record<ContentTable, string[]> = {
    expertise: ['title', 'key'],
    services: ['title', 'description', 'key']
  };

  return requiredFields[table].every(field => field in data);
};