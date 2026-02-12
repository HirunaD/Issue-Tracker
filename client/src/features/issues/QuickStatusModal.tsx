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
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import type { Status } from "@/types";

interface QuickStatusModalProps {
  id: string;
  targetStatus: "Resolved" | "Closed";
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusConfig: Record<"Resolved" | "Closed", { icon: React.ElementType; color: string; title: string; description: string }> = {
  Resolved: {
    icon: CheckCircle2,
    color: "text-green-600",
    title: "Mark as Resolved?",
    description: "This will mark the issue as resolved, indicating that the problem has been fixed.",
  },
  Closed: {
    icon: XCircle,
    color: "text-gray-600",
    title: "Close this Issue?",
    description: "This will close the issue. Closed issues are typically ones that won't be addressed further.",
  },
};

export const QuickStatusModal = ({
  id,
  targetStatus,
  open,
  onOpenChange,
}: QuickStatusModalProps) => {
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const [isUpdating, setIsUpdating] = useState(false);

  const config = statusConfig[targetStatus];
  const Icon = config.icon;

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      await updateIssue(id, { status: targetStatus as Status });
      toast.success(`Issue marked as ${targetStatus}`);
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
          <div className={`flex items-center gap-2 ${config.color} mb-2`}>
            <Icon className="h-5 w-5" />
            <AlertDialogTitle>{config.title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription>{config.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className={targetStatus === "Resolved" ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              `Mark as ${targetStatus}`
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
