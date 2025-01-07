import { useContent } from "@/hooks/useContent";

export const useServiceState = () => {
  const [newCard, setNewCard] = useState(false);
  const { data: content, isLoading, error } = useContent('services');

  return {
    newCard,
    setNewCard,
    content,
    isLoading,
    error
  };
};