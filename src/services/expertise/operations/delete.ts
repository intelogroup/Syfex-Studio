import { supabase } from "@/integrations/supabase/client";
import { logError, logOperation, logSuccess } from "../logger";

export const deleteExpertise = async (id: string): Promise<boolean> => {
  try {
    logOperation('Attempting to delete expertise with ID', id);
    
    const { error } = await supabase
      .from('expertise')
      .delete()
      .eq('id', id);

    if (error) {
      logError('Delete expertise', error);
      throw error;
    }

    logSuccess('deleted expertise with ID', id);
    return true;
  } catch (error) {
    logError('Delete expertise', error);
    throw error;
  }
};