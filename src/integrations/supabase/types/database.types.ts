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
          tech: string[]
          benefits: string[]
          published: boolean | null
          created_at: string
          updated_at: string
          created_by: string | null
          key: string
          locale: string
        }
        Insert: {
          title: string
          description?: string | null
          long_description?: string | null
          icon?: string | null
          image_url?: string | null
          tech?: string[]
          benefits?: string[]
          published?: boolean | null
          key: string
          locale?: string
          created_by?: string | null
        }
        Update: {
          title?: string
          description?: string | null
          long_description?: string | null
          icon?: string | null
          image_url?: string | null
          tech?: string[]
          benefits?: string[]
          published?: boolean | null
          key?: string
          locale?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expertise_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string
          created_at: string
          updated_at: string
          published: boolean | null
          created_by: string | null
          features: string[]
          details: string[]
          key: string
          locale: string
        }
        Insert: {
          title: string
          description: string
          icon?: string
          published?: boolean
          features?: string[]
          details?: string[]
          key: string
          locale?: string
          created_by?: string | null
        }
        Update: {
          title?: string
          description?: string
          icon?: string
          published?: boolean
          features?: string[]
          details?: string[]
          key?: string
          locale?: string
          created_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "services_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
          username?: string | null
          avatar_url?: string | null
        }
        Update: {
          username?: string | null
          avatar_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_roles: {
        Row: {
          id: string
          user_id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          created_at: string
        }
        Insert: {
          user_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          user_id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Enums: {
      user_role: "admin" | "user"
    }
  }
}