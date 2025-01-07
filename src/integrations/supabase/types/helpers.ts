import { Database } from "./tables";

export type Tables<
  T extends keyof Database["public"]["Tables"],
  R = Database["public"]["Tables"][T]
> = R;

export type Row<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Row"];

export type Insert<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Insert"];

export type Update<T extends keyof Database["public"]["Tables"]> = 
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> = 
  Database["public"]["Enums"][T];