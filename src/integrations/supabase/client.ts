// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mlkwgooqknkqhphdivot.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1sa3dnb29xa25rcWhwaGRpdm90Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwMjA2NDIsImV4cCI6MjA1MTU5NjY0Mn0.WlHsjZxpG8MkaPl03D-vNJ4RxN7qgJNIHO8U3UmnMmA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);