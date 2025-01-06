import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchExpertise } from "../../expertiseService";

export const useExpertiseState = () => {
  const [newCard, setNewCard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  
  const { data: content, isLoading, error } = useQuery({
    queryKey: ['expertise'],
    queryFn: fetchExpertise
  });

  const availableTech = Array.from(
    new Set(content?.flatMap((item) => item.tech || []) || [])
  );

  const filteredContent = content?.filter(item => {
    const matchesSearch = 
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTech = selectedTech.length === 0 || 
      selectedTech.every(tech => item.tech?.includes(tech));

    return matchesSearch && matchesTech;
  });

  return {
    newCard,
    setNewCard,
    searchTerm,
    setSearchTerm,
    selectedTech,
    setSelectedTech,
    content: filteredContent,
    isLoading,
    error,
    availableTech
  };
};