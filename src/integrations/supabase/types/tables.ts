export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      content: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          key: string
          locale: string
          long_description: string | null
          metadata: Json | null
          published: boolean | null
          title: string | null
          type: Database["public"]["Enums"]["content_type"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          key: string
          locale?: string
          long_description?: string | null
          metadata?: Json | null
          published?: boolean | null
          title?: string | null
          type: Database["public"]["Enums"]["content_type"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          key?: string
          locale?: string
          long_description?: string | null
          metadata?: Json | null
          published?: boolean | null
          title?: string | null
          type?: Database["public"]["Enums"]["content_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          user_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      content_type: "expertise" | "portfolio" | "testimonial" | "service"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}