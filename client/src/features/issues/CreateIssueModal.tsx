import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIssueStore } from "./useIssueStore";
import { PlusCircle, Loader2, FileText, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { toast } from "react-toastify";
import type { Priority, Status } from "@/types";
import { getErrorMessage } from "@/lib/utils";

export const CreateIssueModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { createIssue } = useIssueStore();

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Open",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createIssue({
        ...formData,
        status: formData.status as Status,
        priority: formData.priority as Priority
      });
      toast.success("Issue created successfully!");
      setOpen(false);
      setFormData({ title: "", description: "", priority: "Medium", status: "Open" });
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const priorityIcons: Record<string, React.ReactNode> = {
    High: <ArrowUp className="h-4 w-4 text-red-500" />,
    Medium: <Minus className="h-4 w-4 text-amber-500" />,
    Low: <ArrowDown className="h-4 w-4 text-blue-500" />,
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
          <PlusCircle className="h-4 w-4" /> New Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Create New Issue</DialogTitle>
              <DialogDescription>Fill in the details to report a new issue</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Fix login button"
              className="h-11 bg-background/50"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the issue in detail..."
              className="min-h-30 bg-background/50 resize-none"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select
              value={formData.priority}
              onValueChange={(val) => setFormData({ ...formData, priority: val })}
              disabled={loading}
            >
              <SelectTrigger className="h-11 bg-background/50">
                <SelectValue placeholder="Select priority" />
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
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="min-w-30">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Issue
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
