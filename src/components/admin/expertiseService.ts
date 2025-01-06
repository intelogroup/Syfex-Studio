import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "../expertise/types";

export const createExpertise = async () => {
  try {
    const { data, error } = await supabase
      .from('content')
      .insert({
        type: 'expertise',
        key: 'expertise-' + Date.now(),
        title: 'New Expertise',
        description: 'Description here',
        locale: 'en',
        metadata: {
          tech: [],
          icon: 'code',
          details: {
            longDescription: '',
            benefits: [],
            image: '/placeholder.svg'
          }
        }
      })
      .select('id, title, description, metadata, type, key, locale')
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

export const updateExpertise = async (id: string, data: Partial<ExpertiseItem>) => {
  try {
    console.log('Updating expertise:', id, data);
    const { error } = await supabase
      .from('content')
      .update({
        title: data.title,
        description: data.description,
        metadata: {
          tech: data.tech || [],
          icon: data.icon || 'code',
          details: {
            longDescription: data.details?.longDescription || '',
            benefits: data.details?.benefits || [],
            image: data.details?.image || '/placeholder.svg'
          }
        }
      })
      .eq('id', id);

    if (error) {
      console.error('Update expertise error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Update expertise error:', error);
    throw error;
  }
};

export const deleteExpertise = async (id: string) => {
  try {
    console.log('Deleting expertise:', id);
    const { error } = await supabase
      .from('content')
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