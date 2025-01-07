import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ServicesHeader } from "./services/ServicesHeader";
import { NewServiceCard } from "./services/NewServiceCard";
import { ServicesList } from "./services/ServicesList";
import { ErrorBoundary } from "../error-boundary";
import { ServiceError } from "./services/error/ServiceError";
import { useServiceState } from "./services/state/useServiceState";
import { useServiceHandlers } from "./services/handlers/useServiceHandlers";
import { ServiceFormData } from "./services/schema";

export const ServicesManager = () => {
  const {
    newCard,
    setNewCard,
    content,
    isLoading,
    error,
  } = useServiceState();

  const {
    handleCreate,
    handleSave,
    handleDelete,
    isPending
  } = useServiceHandlers();

  const onCreateSuccess = async (formData: ServiceFormData): Promise<boolean> => {
    try {
      console.log('[ServicesManager] Attempting to create new service with data:', formData);
      const success = await handleCreate(formData);
      if (success) {
        console.log('[ServicesManager] Creation successful, hiding new card form');
        setNewCard(false);
        return true;
      } else {
        console.log('[ServicesManager] Creation failed or was cancelled');
        return false;
      }
    } catch (error: any) {
      console.error('[ServicesManager] Create operation failed:', error);
      throw error;
    }
  };

  const onDelete = async (id: string) => {
    try {
      await handleDelete(id);
    } catch (error) {
      console.error('[ServicesManager] Delete operation failed:', error);
    }
  };

  if (error) {
    console.error('[ServicesManager] Error state:', error);
    return <ServiceError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ServicesHeader 
          onNewCard={() => setNewCard(true)} 
          isNewCardDisabled={newCard || isPending} 
        />

        {newCard && (
          <NewServiceCard
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
          <ServicesList
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