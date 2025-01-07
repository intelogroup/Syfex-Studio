export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      expertise: {
        Row: {
          benefits: string[] | null
          created_at: string
          created_by: string | null
          description: string | null
          icon: string | null
          id: string
          image_url: string | null
          key: string
          locale: string
          long_description: string | null
          published: boolean | null
          tech: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          benefits?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          key: string
          locale?: string
          long_description?: string | null
          published?: boolean | null
          tech?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          benefits?: string[] | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          image_url?: string | null
          key?: string
          locale?: string
          long_description?: string | null
          published?: boolean | null
          tech?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string
          details: string[] | null
          features: string[] | null
          icon: string
          id: string
          key: string
          locale: string
          published: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description: string
          details?: string[] | null
          features?: string[] | null
          icon?: string
          id?: string
          key: string
          locale?: string
          published?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string
          details?: string[] | null
          features?: string[] | null
          icon?: string
          id?: string
          key?: string
          locale?: string
          published?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Enums: {
      content_type: "expertise" | "portfolio" | "testimonial" | "service"
      user_role: "admin" | "user"
    }
  }
}