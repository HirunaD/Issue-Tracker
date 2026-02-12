import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Issue } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText, ArrowUp, ArrowDown, Minus } from "lucide-react";

interface ViewProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getPriorityConfig = (priority: string) => {
  const configs: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
    High: { icon: ArrowUp, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-500/20" },
    Medium: { icon: Minus, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-100 dark:bg-amber-500/20" },
    Low: { icon: ArrowDown, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-100 dark:bg-blue-500/20" },
  };
  return configs[priority] || configs.Medium;
};

const getStatusConfig = (status: string) => {
  const configs: Record<string, { color: string; bg: string }> = {
    Open: { color: "text-blue-700 dark:text-blue-300", bg: "bg-blue-100 dark:bg-blue-500/20" },
    "In Progress": { color: "text-amber-700 dark:text-amber-300", bg: "bg-amber-100 dark:bg-amber-500/20" },
    Resolved: { color: "text-emerald-700 dark:text-emerald-300", bg: "bg-emerald-100 dark:bg-emerald-500/20" },
    Closed: { color: "text-slate-700 dark:text-slate-300", bg: "bg-slate-100 dark:bg-slate-500/20" },
  };
  return configs[status] || configs.Open;
};

export const ViewIssueModal = ({ issue, open, onOpenChange }: ViewProps) => {
  const priorityConfig = getPriorityConfig(issue.priority);
  const statusConfig = getStatusConfig(issue.status);
  const PriorityIcon = priorityConfig.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">Issue Details</DialogTitle>
              <DialogDescription>Full overview of the reported issue</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-5 pt-2">
          {/* Title Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold leading-tight">{issue.title}</h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className={`${priorityConfig.bg} ${priorityConfig.color} font-medium`}>
                <PriorityIcon className="h-3 w-3 mr-1" />
                {issue.priority} Priority
              </Badge>
              <Badge variant="outline" className={`${statusConfig.bg} ${statusConfig.color} font-medium`}>
                {issue.status}
              </Badge>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <p className="text-sm whitespace-pre-wrap leading-relaxed">
                {issue.description || "No description provided."}
              </p>
            </div>
          </div>

          {/* Timestamps */}
          <div className="flex flex-wrap gap-6 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Created: {new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>Updated: {new Date(issue.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};