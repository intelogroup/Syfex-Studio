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
  key: string;
  locale: string;
  longDescription: string;
  benefits: string[];
  imageUrl: string;
  published?: boolean;
}