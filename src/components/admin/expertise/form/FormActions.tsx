import { Button } from "@/components/ui/button";
import { Trash, AlertCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface FormActionsProps {
  isLoading?: boolean;
  onDelete: () => void;
  isValid?: boolean;
}

export const FormActions = ({ isLoading, onDelete, isValid }: FormActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <Button 
                type="submit" 
                size="sm"
                disabled={isLoading || !isValid}
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
                {!isValid && !isLoading && (
                  <AlertCircle className="h-4 w-4 ml-2 text-destructive" />
                )}
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            {!isValid && "Make changes and ensure all fields are valid"}
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
              onClick={onDelete}
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