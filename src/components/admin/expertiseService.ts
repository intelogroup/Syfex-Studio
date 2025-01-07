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
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Fetch expertise error:', error);
    throw error;
  }
};

export const createExpertise = async () => {
  try {
    const key = 'expertise-' + Date.now();
    const { data, error } = await supabase
      .from('expertise')
      .insert([{
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
      }])
      .select()
      .single();

    if (error) {
      console.error('Create expertise error:', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Create expertise error:', error);
    throw error;
  }
};

export const updateExpertise = async (id: string, updates: Partial<ExpertiseItem>) => {
  try {
    console.log('Updating expertise:', id, updates);
    
    // Ensure we're only sending valid columns
    const validUpdates = {
      title: updates.title,
      description: updates.description,
      key: updates.key,
      locale: updates.locale,
      published: updates.published,
      tech: updates.tech || [],
      icon: updates.icon,
      long_description: updates.long_description,
      benefits: updates.benefits || [],
      image_url: updates.image_url
    };

    const { data, error } = await supabase
      .from('expertise')
      .update(validUpdates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Update expertise error:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Update expertise error:', error);
    throw error;
  }
};

export const deleteExpertise = async (id: string) => {
  try {
    console.log('Deleting expertise:', id);
    const { error } = await supabase
      .from('expertise')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete expertise error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Delete expertise error:', error);
    throw error;
  }
};