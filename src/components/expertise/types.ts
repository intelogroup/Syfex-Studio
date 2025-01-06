import { Json } from "@/integrations/supabase/types";

export interface ExpertiseDetails {
  longDescription: string;
  benefits: string[];
  image: string;
}

export interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  icon: string;
  details: ExpertiseDetails;
  published?: boolean;
}

export interface ContentResponse {
  id: string;
  title: string | null;
  description: string | null;
  metadata: Json;
  created_at: string;
  updated_at: string;
  created_by: string | null;
  published: boolean | null;
  type: "expertise" | "portfolio" | "testimonial" | "service";
  key: string;
  locale: string;
  long_description: string | null;
}