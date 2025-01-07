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
      expertise: {
        Row: {
          id: string
          title: string
          description: string | null
          long_description: string | null
          icon: string | null
          image_url: string | null
          tech: string[] | null
          benefits: string[] | null
          published: boolean | null
          created_at: string
          updated_at: string
          created_by: string | null
          key: string
          locale: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          long_description?: string | null
          icon?: string | null
          image_url?: string | null
          tech?: string[] | null
          benefits?: string[] | null
          published?: boolean | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          key: string
          locale?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          long_description?: string | null
          icon?: string | null
          image_url?: string | null
          tech?: string[] | null
          benefits?: string[] | null
          published?: boolean | null
          created_at?: string
          updated_at?: string
          created_by?: string | null
          key?: string
          locale?: string
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          created_at: string | null
          updated_at: string | null
          published: boolean | null
          created_by: string | null
          features: string[] | null
          details: string[] | null
          key: string
          locale: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string
          created_at?: string | null
          updated_at?: string | null
          published?: boolean | null
          created_by?: string | null
          features?: string[] | null
          details?: string[] | null
          key: string
          locale?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string
          created_at?: string | null
          updated_at?: string | null
          published?: boolean | null
          created_by?: string | null
          features?: string[] | null
          details?: string[] | null
          key?: string
          locale?: string
        }
      }
    }
    Enums: {
      content_type: "expertise" | "portfolio" | "testimonial" | "service"
      user_role: "admin" | "user"
    }
  }
}