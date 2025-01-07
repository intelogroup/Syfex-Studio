import { Database } from "@/integrations/supabase/types/tables";
import { Row, Insert, Update } from "@/integrations/supabase/types/helpers";

export type Tables = Database["public"]["Tables"];
export type ContentTable = keyof Pick<Tables, "expertise" | "services">;

export type TableRow<T extends ContentTable> = Row<T>;
export type TableInsert<T extends ContentTable> = Insert<T>;
export type TableUpdate<T extends ContentTable> = Update<T>;

export const isContentTable = (table: string): table is ContentTable => {
  return ["expertise", "services"].includes(table);
};