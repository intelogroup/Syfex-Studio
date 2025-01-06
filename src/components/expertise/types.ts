export interface ExpertiseItem {
  id: string;
  title: string;
  description: string | null;
  long_description: string | null;
  icon: string | null;
  image_url: string | null;
  tech: string[];
  benefits: string[];
  published: boolean;
  key: string;
  locale: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string | null;
}