import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "../expertise/types";

export const fetchExpertise = async (): Promise<ExpertiseItem[]> => {
  try {
    console.log('Fetching expertise content from Supabase...');
    const { data, error } = await supabase
      .from('expertise')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch expertise error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint
      });
      throw error;
    }

    console.log('Successfully fetched expertise:', data?.length, 'items');
    return data || [];
  } catch (error) {
    console.error('Fetch expertise error:', error);
    throw error;
  }
};

export const createExpertise = async () => {
  try {
    const key = 'expertise-' + Date.now();
    console.log('Creating new expertise with key:', key);
    
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

    console.log('New expertise payload:', newExpertise);

    const { data, error } = await supabase
      .from('expertise')
      .insert([newExpertise])
      .select()
      .maybeSingle();

    if (error) {
      console.error('Create expertise error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    console.log('Successfully created expertise:', data);
    return data;
  } catch (error) {
    console.error('Create expertise error:', error);
    throw error;
  }
};

export const updateExpertise = async (id: string, updates: Partial<ExpertiseItem>) => {
  try {
    console.log('Starting expertise update for ID:', id);
    console.log('Update payload received:', updates);
    
    if (!updates.title || !updates.key) {
      console.error('Update validation failed: Missing required fields');
      throw new Error('Title and key are required fields');
    }

    const validUpdates = {
      title: updates.title,
      description: updates.description,
      key: updates.key,
      locale: updates.locale || 'en',
      published: updates.published,
      tech: Array.isArray(updates.tech) ? updates.tech : [],
      icon: updates.icon,
      long_description: updates.long_description,
      benefits: Array.isArray(updates.benefits) ? updates.benefits : [],
      image_url: updates.image_url
    };

    console.log('Sanitized update payload:', validUpdates);

    const { data, error } = await supabase
      .from('expertise')
      .update(validUpdates)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) {
      console.error('Update expertise error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    if (!data) {
      throw new Error('Record not found');
    }

    console.log('Successfully updated expertise:', data);
    return data;
  } catch (error) {
    console.error('Update expertise error:', error);
    throw error;
  }
};

export const deleteExpertise = async (id: string) => {
  try {
    console.log('Attempting to delete expertise with ID:', id);
    
    const { error } = await supabase
      .from('expertise')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete expertise error:', error);
      console.error('Error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      throw error;
    }

    console.log('Successfully deleted expertise with ID:', id);
    return true;
  } catch (error) {
    console.error('Delete expertise error:', error);
    throw error;
  }
};