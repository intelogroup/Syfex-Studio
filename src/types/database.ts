import { Database } from "@/integrations/supabase/types";

export type Tables = Database["public"]["Tables"];
export type ContentTable = keyof Pick<Tables, "expertise" | "services">;

// Helper type to get the row type for a specific table
export type TableRow<T extends ContentTable> = Tables[T]["Row"];

// Helper type to get the insert type for a specific table
export type TableInsert<T extends ContentTable> = Tables[T]["Insert"];

// Helper type to get the update type for a specific table
export type TableUpdate<T extends ContentTable> = Tables[T]["Update"];