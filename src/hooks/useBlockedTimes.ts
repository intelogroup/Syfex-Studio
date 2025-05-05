
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

export interface BlockedTime {
  id: string;
  date: string;
  time_slot: string;
  reason: string | null;
}

/**
 * Custom hook to fetch blocked time slots for a specific date
 */
export const useBlockedTimes = (date: Date | undefined) => {
  const formattedDate = date ? format(date, "yyyy-MM-dd") : null;

  return useQuery({
    queryKey: ['blocked-times', formattedDate],
    queryFn: async () => {
      if (!formattedDate) return [];

      const { data, error } = await supabase
        .from('blocked_times')
        .select('*')
        .eq('date', formattedDate);

      if (error) {
        console.error("Error fetching blocked times:", error);
        throw error;
      }

      return data as BlockedTime[];
    },
    enabled: !!formattedDate,
    refetchOnWindowFocus: false,
  });
};
