import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "@/components/expertise/types";
import { logError, logOperation, logSuccess } from "../logger";

export const createExpertise = async (): Promise<ExpertiseItem> => {
  try {
    const key = 'expertise-' + Date.now();
    logOperation('Creating new expertise with key', key);
    
    const newExpertise = {
      key,
      title: 'New Expertise',
      description: null,
      locale: 'en',
      published: false,
      tech: [],
      icon: 'code',
      long_description: null,
      benefits: [],
      image_url: '/placeholder.svg'
    };

    logOperation('New expertise payload', newExpertise);

    const { data, error } = await supabase
      .from('expertise')
      .insert([newExpertise])
      .select()
      .maybeSingle();

    if (error) {
      logError('Create expertise', error);
      throw error;
    }

    if (!data) {
      throw new Error('Failed to create expertise record');
    }

    logSuccess('created expertise', data);
    return data;
  } catch (error) {
    logError('Create expertise', error);
    throw error;
  }
};