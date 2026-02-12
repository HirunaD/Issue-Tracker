import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Issue } from "@/types";
import { Badge } from "@/components/ui/badge";

interface ViewProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusStyles: Record<string, string> = {
  Open: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  "In Progress": "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Resolved: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  Closed: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
};

const priorityStyles: Record<string, string> = {
  High: "text-red-600 dark:text-red-400",
  Medium: "text-amber-600 dark:text-amber-400",
  Low: "text-slate-500",
};

export const ViewIssueModal = ({ issue, open, onOpenChange }: ViewProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{issue.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="secondary" className={statusStyles[issue.status]}>
              {issue.status}
            </Badge>
            <span className={`text-sm font-medium ${priorityStyles[issue.priority]}`}>
              {issue.priority}
            </span>
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Description</p>
            <p className="text-sm">{issue.description || "No description"}</p>
          </div>

          <div className="text-xs text-muted-foreground pt-2 border-t">
            Created {formatDate(issue.createdAt)} · Updated {formatDate(issue.updatedAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};