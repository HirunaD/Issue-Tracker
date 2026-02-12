import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIssueStore } from "./useIssueStore";
import type { Issue, Status, Priority } from "@/types";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/lib/utils";
import { Pencil, Loader2 } from "lucide-react";

interface EditProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditIssueModal = ({ issue, open, onOpenChange }: EditProps) => {
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const [loading, setLoading] = useState(false);
  
  // Local state managing all fields
  const [formData, setFormData] = useState({
    title: issue.title,
    description: issue.description || "",
    status: issue.status,
    priority: issue.priority,
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: issue.title,
        description: issue.description || "",
        status: issue.status,
        priority: issue.priority,
      });
    }
  }, [issue, open]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateIssue(issue._id, formData);
      toast.success("Issue updated successfully");
      onOpenChange(false);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-137.5">
        <DialogHeader>
          <div className="flex items-center gap-2 text-amber-600 mb-1">
            <Pencil className="h-5 w-5" />
            <DialogTitle>Edit Issue</DialogTitle>
          </div>
          <DialogDescription>
            Update the details, status, or priority of this issue.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 py-4">
          {/* Title Field */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          {/* Status and Priority Row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({ ...formData, status: v as Status })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Open">Open</SelectItem>
                  <SelectItem value="InProgress">In Progress</SelectItem>
                  <SelectItem value="Resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={formData.priority} 
                onValueChange={(v) => setFormData({ ...formData, priority: v as Priority })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description Field */}
          <div className="grid gap-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-25 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};