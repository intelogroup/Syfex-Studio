import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ExpertiseHeader } from "./expertise/ExpertiseHeader";
import { NewExpertiseCard } from "./expertise/NewExpertiseCard";
import { ExpertiseList } from "./expertise/ExpertiseList";
import { ErrorBoundary } from "../error-boundary";
import { ExpertiseError } from "./expertise/error/ExpertiseError";
import { useExpertiseState } from "./expertise/state/useExpertiseState";
import { useExpertiseHandlers } from "./expertise/handlers/useExpertiseHandlers";
import { ExpertiseFormData } from "./expertise/schema";

export const ExpertiseManager = () => {
  const {
    newCard,
    setNewCard,
    content,
    isLoading,
    error,
  } = useExpertiseState();

  const {
    handleCreate,
    handleSave,
    handleDelete,
    isPending
  } = useExpertiseHandlers();

  const onCreateSuccess = async (formData: ExpertiseFormData) => {
    console.log('[ExpertiseManager] Attempting to create new expertise with data:', formData);
    const success = await handleCreate(formData);
    if (success) {
      console.log('[ExpertiseManager] Creation successful, hiding new card form');
      setNewCard(false);
    } else {
      console.log('[ExpertiseManager] Creation failed or was cancelled');
    }
  };

  const onDelete = async (id: string) => {
    try {
      console.log('[ExpertiseManager] Delete requested for expertise:', id);
      await handleDelete(id);
      console.log('[ExpertiseManager] Delete operation completed successfully');
    } catch (error: any) {
      console.error('[ExpertiseManager] Delete operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      throw error; // Re-throw to be handled by error boundary
    }
  };

  if (error) {
    console.error('[ExpertiseManager] Error state:', error);
    return <ExpertiseError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ExpertiseHeader 
          onNewCard={() => setNewCard(true)} 
          isNewCardDisabled={newCard || isPending} 
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
            onDelete={onDelete}
            isLoading={isPending}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};