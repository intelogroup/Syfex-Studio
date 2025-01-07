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

  const onCreateSuccess = async (formData: ExpertiseFormData): Promise<boolean> => {
    try {
      console.log('[ExpertiseManager] Attempting to create new expertise with data:', formData);
      const success = await handleCreate(formData);
      if (success) {
        console.log('[ExpertiseManager] Creation successful, hiding new card form');
        setNewCard(false);
        return true;
      } else {
        console.log('[ExpertiseManager] Creation failed or was cancelled');
        return false;
      }
    } catch (error: any) {
      console.error('[ExpertiseManager] Create operation failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        stack: error.stack
      });
      throw error;
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
      throw error;
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

        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <LoadingSpinner className="h-8 w-8 mx-auto" />
              <p className="text-muted-foreground">Loading expertise cards...</p>
            </div>
          </div>
        ) : (
          <>
            {newCard && (
              <NewExpertiseCard
                onCreate={onCreateSuccess}
                onCancel={() => setNewCard(false)}
                isLoading={isPending}
              />
            )}

            <ExpertiseList
              content={content || []}
              onSave={handleSave}
              onDelete={onDelete}
              isLoading={isPending}
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};