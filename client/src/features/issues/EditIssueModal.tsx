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
import { Textarea } from "@/components/ui/textarea";
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
import { Pencil, Loader2, ArrowUp, ArrowDown, Minus, AlertCircle, Clock, CheckCircle2, XCircle, Save } from "lucide-react";

interface EditProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusIcons: Record<string, React.ReactNode> = {
  Open: <AlertCircle className="h-4 w-4 text-blue-500" />,
  "In Progress": <Clock className="h-4 w-4 text-amber-500" />,
  Resolved: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  Closed: <XCircle className="h-4 w-4 text-slate-500" />,
};

const priorityIcons: Record<string, React.ReactNode> = {
  High: <ArrowUp className="h-4 w-4 text-red-500" />,
  Medium: <Minus className="h-4 w-4 text-amber-500" />,
  Low: <ArrowDown className="h-4 w-4 text-blue-500" />,
};

export const EditIssueModal = ({ issue, open, onOpenChange }: EditProps) => {
  const updateIssue = useIssueStore((state) => state.updateIssue);
  const [loading, setLoading] = useState(false);
  
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
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/10 rounded-xl">
              <Pencil className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <DialogTitle className="text-xl">Edit Issue</DialogTitle>
              <DialogDescription>Update the details of this issue</DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              disabled={loading}
              className="h-11 bg-background/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({ ...formData, status: v as Status })}
                disabled={loading}
              >
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Open", "In Progress", "Resolved", "Closed"].map((s) => (
                    <SelectItem key={s} value={s}>
                      <div className="flex items-center gap-2">
                        {statusIcons[s]}
                        <span>{s}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select 
                value={formData.priority} 
                onValueChange={(v) => setFormData({ ...formData, priority: v as Priority })}
                disabled={loading}
              >
                <SelectTrigger className="h-11 bg-background/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Low", "Medium", "High"].map((p) => (
                    <SelectItem key={p} value={p}>
                      <div className="flex items-center gap-2">
                        {priorityIcons[p]}
                        <span>{p}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={loading}
              className="min-h-30 bg-background/50 resize-none"
            />
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-30">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};