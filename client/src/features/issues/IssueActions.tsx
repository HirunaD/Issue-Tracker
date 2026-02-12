import { useState } from "react";
import { Eye, Pencil, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Issue } from "@/types";

import { ViewIssueModal } from "./ViewIssueModal";
import { EditIssueModal } from "./EditIssueModal";
import { DeleteIssueModal } from "./DeleteIssueModal";
import { QuickStatusModal } from "./QuickStatusModal";

export const IssueActions = ({ issue }: { issue: Issue }) => {
  const [activeModal, setActiveModal] = useState<'view' | 'edit' | 'delete' | 'resolve' | 'close' | null>(null);

  const closeModals = () => setActiveModal(null);

  const showResolveButton = issue.status !== "Resolved" && issue.status !== "Closed";
  const showCloseButton = issue.status !== "Closed";

  return (
    <div className="flex items-center justify-end gap-1">
      {/* 1. View Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('view')} 
        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
        title="View details"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {/* 2. Edit Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('edit')} 
        className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
        title="Edit issue"
      >
        <Pencil className="h-4 w-4" />
      </Button>

      {/* 3. Quick Resolve Button */}
      {showResolveButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveModal('resolve')} 
          className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
          title="Mark as resolved"
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
      )}

      {/* 4. Quick Close Button */}
      {showCloseButton && (
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setActiveModal('close')} 
          className="h-8 w-8 text-gray-500 hover:text-gray-600 hover:bg-gray-100"
          title="Close issue"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}

      {/* 5. Delete Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('delete')} 
        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
        title="Delete issue"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <ViewIssueModal 
        issue={issue} 
        open={activeModal === 'view'} 
        onOpenChange={closeModals} 
      />
      
      <EditIssueModal 
        issue={issue} 
        open={activeModal === 'edit'} 
        onOpenChange={closeModals} 
      />
      
      <DeleteIssueModal 
        id={issue._id} 
        open={activeModal === 'delete'} 
        onOpenChange={closeModals} 
      />

      <QuickStatusModal
        id={issue._id}
        targetStatus="Resolved"
        open={activeModal === 'resolve'}
        onOpenChange={closeModals}
      />

      <QuickStatusModal
        id={issue._id}
        targetStatus="Closed"
        open={activeModal === 'close'}
        onOpenChange={closeModals}
      />
    </div>
  );
};