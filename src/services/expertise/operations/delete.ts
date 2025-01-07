import { supabase } from "@/integrations/supabase/client";
import { logError, logOperation, logSuccess } from "../logger";

export const deleteExpertise = async (id: string): Promise<boolean> => {
  try {
    logOperation('Attempting to delete expertise with ID', id);
    
    const { error, count } = await supabase
      .from('expertise')
      .delete()
      .eq('id', id)
      .select('id')
      .single();

    if (error) {
      logError('Delete expertise', error);
      throw error;
    }

    // Verify that a row was actually deleted
    const success = count === 1;
    
    if (success) {
      logSuccess('deleted expertise with ID', id);
    } else {
      logError('Delete expertise', new Error(`No expertise found with ID: ${id}`));
      return false;
    }

    return true;
  } catch (error) {
    logError('Delete expertise', error);
    throw error;
  }
};