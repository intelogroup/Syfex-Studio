import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "@/components/expertise/types";
import { logError, logOperation, logSuccess } from "../logger";

export const createExpertise = async (formData: Partial<ExpertiseItem>): Promise<ExpertiseItem> => {
  try {
    const key = 'expertise-' + Date.now();
    logOperation('Creating new expertise with key', key);
    
    // Create expertise payload from form data
    const expertisePayload = {
      key: formData.key || key,
      title: formData.title || 'New Expertise',
      description: formData.description,
      locale: formData.locale || 'en',
      published: formData.published || false,
      tech: Array.isArray(formData.tech) ? formData.tech : [],
      icon: formData.icon || 'code',
      long_description: formData.long_description,
      benefits: Array.isArray(formData.benefits) ? formData.benefits : [],
      image_url: formData.image_url || '/placeholder.svg'
    };
    
    logOperation('New expertise payload', expertisePayload);

    const { data: session } = await supabase.auth.getSession();
    logOperation('Checking authentication for create operation', { authenticated: !!session });

    if (!session) {
      const authError = new Error('Authentication required to create expertise');
      logError('Create expertise authentication', authError);
      throw authError;
    }

    const { data, error } = await supabase
      .from('expertise')
      .insert([expertisePayload])
      .select('*')
      .maybeSingle();

    if (error) {
      logError('Create expertise database operation', error);
      throw error;
    }

    if (!data) {
      const noDataError = new Error('Failed to create expertise record');
      logError('Create expertise', noDataError);
      throw noDataError;
    }

    logSuccess('Created expertise', data);
    return data;
  } catch (error: any) {
    logError('Create expertise operation', error);
    // Add more context to the error
    if (error.message === 'Failed to fetch') {
      error.message = 'Failed to connect to Supabase. Please check your internet connection.';
      error.hint = 'This might be a temporary connection issue. Please try again.';
    }
    throw error;
  }
};