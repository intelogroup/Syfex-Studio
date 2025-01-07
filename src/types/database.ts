import { Database } from "@/integrations/supabase/types";
import { Tables as SupabaseTables } from "@/integrations/supabase/types/helpers";

export type Tables = Database["public"]["Tables"];
export type ContentTable = keyof Pick<Tables, "expertise" | "services">;

export type TableRow<T extends ContentTable> = SupabaseTables[T]["Row"];
export type TableInsert<T extends ContentTable> = SupabaseTables[T]["Insert"];
export type TableUpdate<T extends ContentTable> = SupabaseTables[T]["Update"];

// Type guard to check if a table name is a valid content table
export const isContentTable = (table: string): table is ContentTable => {
  return ["expertise", "services"].includes(table);
};