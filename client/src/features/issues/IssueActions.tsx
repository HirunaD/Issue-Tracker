import { useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Issue } from "@/types";

import { ViewIssueModal } from "./ViewIssueModal";
import { EditIssueModal } from "./EditIssueModal";
import { DeleteIssueModal } from "./DeleteIssueModal";

export const IssueActions = ({ issue }: { issue: Issue }) => {
  const [activeModal, setActiveModal] = useState<'view' | 'edit' | 'delete' | null>(null);

  const closeModals = () => setActiveModal(null);

  return (
    <div className="flex items-center justify-end gap-1">
      {/* 1. View Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('view')} 
        className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
      >
        <Eye className="h-4 w-4" />
      </Button>

      {/* 2. Edit Button (Now handles status too) */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('edit')} 
        className="h-8 w-8 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
      >
        <Pencil className="h-4 w-4" />
      </Button>

      {/* 3. Delete Button */}
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => setActiveModal('delete')} 
        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
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
    </div>
  );
};