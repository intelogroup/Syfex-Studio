import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface FormActionsProps {
  isLoading?: boolean;
  onDelete: () => void;
}

export const FormActions = ({ isLoading, onDelete }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button 
        type="submit" 
        size="sm"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center">
            <LoadingSpinner />
            <span className="ml-2">Saving...</span>
          </div>
        ) : (
          'Save Changes'
        )}
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            disabled={isLoading}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              expertise card and remove all of its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};