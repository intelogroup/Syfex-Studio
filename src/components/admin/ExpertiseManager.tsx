import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ErrorBoundary } from "../error-boundary";
import { ExpertiseFilterSection } from "./expertise/filters/ExpertiseFilterSection";
import { ExpertiseError } from "./expertise/error/ExpertiseError";
import { useExpertiseState } from "./expertise/state/useExpertiseState";
import { useExpertiseHandlers } from "./expertise/handlers/useExpertiseHandlers";

export const ExpertiseManager = () => {
  const {
    newCard,
    setNewCard,
    searchTerm,
    setSearchTerm,
    selectedTech,
    setSelectedTech,
    content,
    isLoading,
    error,
    availableTech
  } = useExpertiseState();

  const {
    handleCreate,
    handleSave,
    handleDelete,
    isPending
  } = useExpertiseHandlers();

  const onCreateSuccess = async () => {
    const success = await handleCreate();
    if (success) {
      setNewCard(false);
    }
  };

  if (error) {
    return <ExpertiseError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ExpertiseHeader 
          onNewCard={() => setNewCard(true)} 
          isNewCardDisabled={newCard || isPending} 
        />

        <ExpertiseFilterSection
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTech={selectedTech}
          availableTech={availableTech}
          onTechSelect={(tech) => setSelectedTech([...selectedTech, tech])}
          onTechRemove={(tech) => setSelectedTech(selectedTech.filter(t => t !== tech))}
          isDisabled={isLoading || isPending}
        />

        {newCard && (
          <NewExpertiseCard
            onCreate={onCreateSuccess}
            onCancel={() => setNewCard(false)}
            isLoading={isPending}
          />
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : (
          <ExpertiseList
            content={content || []}
            onSave={handleSave}
            onDelete={handleDelete}
            isLoading={isPending}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};