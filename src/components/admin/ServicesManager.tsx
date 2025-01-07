import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { ServicesHeader } from "./services/ServicesHeader";
import { NewServiceCard } from "./services/NewServiceCard";
import { ServicesList } from "./services/ServicesList";
import { ErrorBoundary } from "../error-boundary";
import { ServiceError } from "./services/error/ServiceError";
import { useServiceState } from "./services/state/useServiceState";
import { useServiceHandlers } from "./services/handlers/useServiceHandlers";
import { ServiceFormData } from "./services/schema";
import { ServicePreview } from "./services/ServicePreview";
import { useState } from "react";

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

  const [showPreview, setShowPreview] = useState(false);

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
    } catch (error) {
      console.error('[ServicesManager] Create operation failed:', error);
      throw error;
    }
  };

  const onDelete = async (id: string) => {
    try {
      await handleDelete(id);
    } catch (error) {
      console.error('[ServicesManager] Delete operation failed:', error);
      throw error;
    }
  };

  if (error) {
    return <ServiceError error={error} />;
  }

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <ServicesHeader 
          onNewCard={() => setNewCard(true)} 
          onPreview={() => setShowPreview(!showPreview)}
          isNewCardDisabled={newCard || isPending} 
        />

        {isLoading ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="text-center space-y-4">
              <LoadingSpinner className="h-8 w-8 mx-auto" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          </div>
        ) : (
          <>
            {!showPreview && newCard && (
              <NewServiceCard
                onCreate={onCreateSuccess}
                onCancel={() => setNewCard(false)}
                isLoading={isPending}
              />
            )}

            {showPreview && content ? (
              <ServicePreview services={content} />
            ) : !showPreview && (
              <ServicesList
                content={content || []}
                onSave={handleSave}
                onDelete={onDelete}
                isLoading={isPending}
              />
            )}
          </>
        )}
      </div>
    </ErrorBoundary>
  );
};