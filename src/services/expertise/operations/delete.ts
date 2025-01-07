import { supabase } from "@/integrations/supabase/client";
import { logError, logOperation, logSuccess } from "../logger";

export const deleteExpertise = async (id: string): Promise<boolean> => {
  try {
    console.log('[deleteExpertise] Starting delete operation for ID:', id);
    console.log('[deleteExpertise] Checking authentication status...');
    
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error('[deleteExpertise] No active session found');
      throw new Error('Authentication required');
    }
    
    console.log('[deleteExpertise] User authenticated, proceeding with delete');
    logOperation('Attempting to delete expertise with ID', id);
    
    const { error, data } = await supabase
      .from('expertise')
      .delete()
      .eq('id', id)
      .select('id')
      .maybeSingle();

    if (error) {
      console.error('[deleteExpertise] Database error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      logError('Delete expertise', error);
      throw error;
    }

    // Verify that a row was actually deleted
    const success = !!data;
    
    if (success) {
      console.log('[deleteExpertise] Successfully deleted expertise:', id);
      logSuccess('deleted expertise with ID', id);
    } else {
      console.error('[deleteExpertise] No expertise found with ID:', id);
      logError('Delete expertise', new Error(`No expertise found with ID: ${id}`));
      return false;
    }

    return true;
  } catch (error) {
    console.error('[deleteExpertise] Unexpected error:', error);
    logError('Delete expertise', error);
    throw error;
  }
};