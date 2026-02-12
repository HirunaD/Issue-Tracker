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

const statusConfig: Record<"Resolved" | "Closed", { 
  icon: React.ElementType; 
  iconBg: string;
  iconColor: string;
  buttonColor: string;
  title: string; 
  description: string 
}> = {
  Resolved: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    buttonColor: "bg-emerald-600 hover:bg-emerald-700",
    title: "Mark as Resolved",
    description: "This will mark the issue as resolved, indicating that the problem has been fixed and verified.",
  },
  Closed: {
    icon: XCircle,
    iconBg: "bg-slate-500/10",
    iconColor: "text-slate-600 dark:text-slate-400",
    buttonColor: "bg-slate-600 hover:bg-slate-700",
    title: "Close Issue",
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
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2.5 ${config.iconBg} rounded-xl`}>
              <Icon className={`h-5 w-5 ${config.iconColor}`} />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">{config.title}</AlertDialogTitle>
            </div>
          </div>
          <AlertDialogDescription className="text-base">
            {config.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel disabled={isUpdating}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
            className={config.buttonColor}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <Icon className="mr-2 h-4 w-4" />
                {`Mark as ${targetStatus}`}
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
