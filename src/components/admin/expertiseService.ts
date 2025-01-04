import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "../expertise/types";
import { toast } from "@/hooks/use-toast";

export const createExpertise = async () => {
  const { error } = await supabase
    .from('content')
    .insert({
      type: 'expertise',
      key: 'expertise-' + Date.now(),
      title: 'New Expertise',
      description: 'Description here',
      metadata: {
        tech: '[]',
        icon: 'code',
        details: {
          longDescription: 'Long description here',
          benefits: '[]',
          image: '/placeholder.svg'
        }
      }
    });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error creating content",
      description: error.message,
    });
    throw error;
  }

  toast({
    title: "Content created",
    description: "New expertise card has been created.",
  });
};

export const updateExpertise = async (id: string, data: Partial<ExpertiseItem>) => {
  const { error } = await supabase
    .from('content')
    .update({
      title: data.title,
      description: data.description,
      metadata: {
        tech: JSON.stringify(data.tech || []),
        icon: data.icon,
        details: {
          longDescription: data.details?.longDescription || '',
          benefits: JSON.stringify(data.details?.benefits || []),
          image: data.details?.image || '/placeholder.svg'
        }
      }
    })
    .eq('id', id);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error updating content",
      description: error.message,
    });
    throw error;
  }

  toast({
    title: "Content updated",
    description: "The expertise card has been updated successfully.",
  });
};

export const deleteExpertise = async (id: string) => {
  const { error } = await supabase
    .from('content')
    .delete()
    .eq('id', id);

  if (error) {
    toast({
      variant: "destructive",
      title: "Error deleting content",
      description: error.message,
    });
    throw error;
  }

  toast({
    title: "Content deleted",
    description: "The expertise card has been deleted successfully.",
  });
};