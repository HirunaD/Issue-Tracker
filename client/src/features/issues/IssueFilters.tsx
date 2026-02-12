import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { Status, Priority } from "@/types";

interface IssueFiltersProps {
  statusFilter: string;
  priorityFilter: string;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onClearFilters: () => void;
}

const statuses: Status[] = ["Open", "In Progress", "Resolved", "Closed"];
const priorities: Priority[] = ["Low", "Medium", "High"];

export const IssueFilters = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
  onClearFilters,
}: IssueFiltersProps) => {
  const hasFilters = statusFilter || priorityFilter;

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Select value={statusFilter} onValueChange={onStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status} value={status}>
              {status}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={priorityFilter} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>
        <SelectContent>
          {priorities.map((priority) => (
            <SelectItem key={priority} value={priority}>
              {priority}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-1" />
          Clear filters
        </Button>
      )}
    </div>
  );
};
