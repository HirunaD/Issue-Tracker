import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIssueStore } from "./useIssueStore";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/utils";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteProps {
  id: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DeleteIssueModal = ({ id, open, onOpenChange }: DeleteProps) => {
  const deleteIssue = useIssueStore((state) => state.deleteIssue);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteIssue(id);
      toast.success("Issue deleted successfully");
      onOpenChange(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-red-500/10 rounded-xl">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Delete Issue</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-base">
            Are you sure you want to delete this issue? This action cannot be undone
            and will permanently remove it from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Issue
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};