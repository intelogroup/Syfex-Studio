import { useState } from "react";
import { useContent } from "@/hooks/useContent";
import { Tables } from "@/integrations/supabase/types";

export const useServiceState = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading, error } = useContent<'services'>('services');

  return {
    newCard,
    setNewCard,
    content,
    isLoading,
    error
  };
};