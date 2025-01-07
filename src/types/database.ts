import { Database } from "@/integrations/supabase/types";

export type Tables = Database["public"]["Tables"];
export type ContentTable = keyof Pick<Tables, "expertise" | "services">;
export type TableRow<T extends ContentTable> = Tables[T]["Row"];
export type TableInsert<T extends ContentTable> = Tables[T]["Insert"];
export type TableUpdate<T extends ContentTable> = Tables[T]["Update"];