import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "./types";

export const fetchExpertiseContent = async (): Promise<ExpertiseItem[]> => {
  console.log('Fetching expertise content from Supabase...');
  
  const { data, error } = await supabase
    .from('expertise')
    .select('*')
    .eq('locale', 'en');

  if (error) {
    console.error('Error fetching expertise content:', error);
    throw error;
  }

  console.log('Raw data from Supabase:', data);

  if (!data) return [];

  return data;
};