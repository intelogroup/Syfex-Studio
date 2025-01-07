import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "@/components/expertise/types";
import { logError, logOperation, logSuccess } from "../logger";

export const fetchExpertise = async (): Promise<ExpertiseItem[]> => {
  try {
    logOperation('Fetching expertise content from Supabase');
    
    const { data, error } = await supabase
      .from('expertise')
      .select()
      .order('created_at', { ascending: false });

    if (error) {
      logError('Fetch expertise', error);
      throw error;
    }

    logSuccess('fetched expertise', `${data?.length} items`);
    return data || [];
  } catch (error) {
    logError('Fetch expertise', error);
    throw error;
  }
};