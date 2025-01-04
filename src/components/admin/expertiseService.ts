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
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Create expertise error:', error);
    throw error;
  }
};

export const updateExpertise = async (id: string, data: Partial<ExpertiseItem>) => {
  try {
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
      .eq('id', id)
      .select('id, title, description, metadata, type, key, locale');

    if (error) {
      console.error('Update expertise error:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Update expertise error:', error);
    throw error;
  }
};

export const deleteExpertise = async (id: string) => {
  try {
    const { error } = await supabase
      .from('content')
      .delete()
      .eq('id', id)
      .select('id');

    if (error) {
      console.error('Delete expertise error:', error);
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Delete expertise error:', error);
    throw error;
  }
};