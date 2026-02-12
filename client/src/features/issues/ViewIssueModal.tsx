import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Issue } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, FileText } from "lucide-react";

interface ViewProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewIssueModal = ({ issue, open, onOpenChange }: ViewProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 text-blue-600 mb-1">
            <FileText className="h-5 w-5" />
            <DialogTitle>Issue Details</DialogTitle>
          </div>
          <DialogDescription>
            Full overview of the reported issue and its current status.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div>
            <h3 className="text-lg font-bold leading-none mb-2">{issue.title}</h3>
            <div className="flex gap-2">
              <Badge variant={issue.priority === 'High' ? 'destructive' : 'secondary'}>
                {issue.priority}
              </Badge>
              <Badge variant="outline">{issue.status}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Description</h4>
            <p className="text-sm bg-muted p-4 rounded-md min-h-25 whitespace-pre-wrap border">
              {issue.description || "No description provided."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-wider text-muted-foreground pt-4 border-t">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" /> Created: {new Date(issue.createdAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Updated: {new Date(issue.updatedAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};