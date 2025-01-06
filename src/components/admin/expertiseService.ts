import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "../expertise/types";

export const createExpertise = async () => {
  try {
    const key = 'expertise-' + Date.now();
    const { data, error } = await supabase
      .from('expertise')
      .insert({
        key: key,
        title: 'New Expertise',
        description: 'Description here',
        locale: 'en',
        published: false,
        tech: [],
        icon: 'code',
        long_description: '',
        benefits: [],
        image_url: '/placeholder.svg'
      })
      .select()
      .maybeSingle();

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
      .from('expertise')
      .update({
        title: data.title,
        description: data.description,
        key: data.key,
        locale: data.locale,
        published: data.published,
        tech: data.tech || [],
        icon: data.icon || 'code',
        long_description: data.longDescription || '',
        benefits: data.benefits || [],
        image_url: data.imageUrl || '/placeholder.svg'
      })
      .eq('id', id)
      .maybeSingle();

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
      .from('expertise')
      .delete()
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Delete expertise error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Delete expertise error:', error);
    throw error;
  }
};