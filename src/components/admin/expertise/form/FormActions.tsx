import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormActionsProps {
  isLoading?: boolean;
  onDelete: () => void;
  isValid?: boolean;
}

export const FormActions = ({ isLoading, onDelete, isValid = true }: FormActionsProps) => {
  const handleDeleteClick = () => {
    console.log('[FormActions] Delete button clicked');
    console.log('[FormActions] Current loading state:', isLoading);
    console.log('[FormActions] Form validity state:', isValid);
  };

  const handleConfirmDelete = () => {
    console.log('[FormActions] Delete confirmed by user');
    console.log('[FormActions] Starting delete operation...');
    
    try {
      onDelete();
      console.log('[FormActions] Delete handler called successfully');
    } catch (error) {
      console.error('[FormActions] Error in delete confirmation:', error);
      throw error; // Re-throw to be caught by error boundary
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button 
                type="submit" 
                size="sm"
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <LoadingSpinner className="mr-2 h-4 w-4" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {isLoading ? "Saving changes..." : "Click to save changes"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isLoading}
            onClick={handleDeleteClick}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              expertise card and remove all of its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};