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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import type { Status } from "@/types";

interface QuickStatusModalProps {
  id: string;
  targetStatus: "Resolved" | "Closed";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const QuickStatusModal = ({
  id,
  targetStatus,
  open,
  onOpenChange,
}: QuickStatusModalProps) => {
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateIssue(id, { status: targetStatus as Status });
      toast.success(`Marked as ${targetStatus}`);
      onOpenChange(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Mark as {targetStatus}?</AlertDialogTitle>
          <AlertDialogDescription>
            {targetStatus === "Resolved" 
              ? "This marks the issue as fixed." 
              : "This closes the issue."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className={targetStatus === "Resolved" ? "bg-green-600 hover:bg-green-700" : ""}
            disabled={isUpdating}
          >
            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
