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
}

export interface ContentResponse {
  id: string;
  title: string;
  description: string;
  metadata: {
    tech: string;
    icon: string;
    details: {
      longDescription: string;
      benefits: string;
      image: string;
    };
  };
}