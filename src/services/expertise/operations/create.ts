import { supabase } from "@/integrations/supabase/client";
import { ExpertiseItem } from "@/components/expertise/types";
import { logError, logOperation, logSuccess } from "../logger";

export const createExpertise = async (): Promise<ExpertiseItem> => {
  try {
    const key = 'expertise-' + Date.now();
    logOperation('Creating new expertise with key', key);
    
    // Create an array of predefined expertise cards
    const expertiseCards = [
      {
        key: `${key}-1`,
        title: 'Frontend Development',
        description: 'Building responsive and interactive user interfaces',
        locale: 'en',
        published: false,
        tech: ['React', 'TypeScript', 'Tailwind CSS'],
        icon: 'code',
        long_description: 'Specializing in modern frontend development with a focus on performance and user experience',
        benefits: ['Responsive Design', 'Cross-browser Compatibility', 'Performance Optimization'],
        image_url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
      },
      {
        key: `${key}-2`,
        title: 'Backend Architecture',
        description: 'Designing scalable and secure server-side solutions',
        locale: 'en',
        published: false,
        tech: ['Node.js', 'PostgreSQL', 'Docker'],
        icon: 'server',
        long_description: 'Creating robust backend systems that power modern web applications',
        benefits: ['High Scalability', 'Security', 'Performance'],
        image_url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'
      },
      {
        key: `${key}-3`,
        title: 'Full Stack Development',
        description: 'End-to-end development solutions',
        locale: 'en',
        published: false,
        tech: ['React', 'Node.js', 'AWS'],
        icon: 'layers',
        long_description: 'Comprehensive development services covering both frontend and backend',
        benefits: ['End-to-end Solutions', 'Unified Architecture', 'Rapid Development'],
        image_url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d'
      }
    ];

    // Randomly select one of the predefined cards
    const newExpertise = expertiseCards[Math.floor(Math.random() * expertiseCards.length)];
    logOperation('New expertise payload', newExpertise);

    const { data, error } = await supabase
      .from('expertise')
      .insert([newExpertise])
      .select('*')
      .single();

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