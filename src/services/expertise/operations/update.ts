import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "@/components/expertise/types";
import { logError, logOperation, logSuccess } from "../logger";
import { validateExpertiseUpdate } from "../validation";

export const updateExpertise = async (id: string, updates: Partial<ExpertiseItem>): Promise<ExpertiseItem> => {
  try {
    logOperation('Starting expertise update for ID', id);
    logOperation('Update payload received', updates);
    
    const validUpdates = validateExpertiseUpdate(updates);
    logOperation('Sanitized update payload', validUpdates);

    const { data, error } = await supabase
      .from('expertise')
      .update(validUpdates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      logError('Update expertise', error);
      throw error;
    }

    if (!data) {
      throw new Error('Record not found');
    }

    logSuccess('updated expertise', data);
    return data;
  } catch (error) {
    logError('Update expertise', error);
    throw error;
  }
};