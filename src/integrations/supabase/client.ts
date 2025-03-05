
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database.types';

const SUPABASE_URL = "https://mlkwgooqknkqhphdivot.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa3dnb29xa25rcWhwaGRpdm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjA2NDIsImV4cCI6MjA1MTU5NjY0Mn0.WlHsjZxpG8MkaPl03D-vNJ4RxN7qgJNIHO8U3UmnMmA";

// Create a custom fetch function that adds required headers for CORS
const customFetch = (url: RequestInfo | URL, options: RequestInit = {}) => {
  const headers = new Headers(options.headers);
  
  // Add origin header for CORS
  if (!headers.has('Origin')) {
    headers.set('Origin', window.location.origin);
  }
  
  return fetch(url, {
    ...options,
    headers,
  });
};

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    global: {
      fetch: customFetch
    }
  }
);
