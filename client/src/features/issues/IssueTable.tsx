import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Issue, Priority, Status } from "@/types";
import { ArrowUp, ArrowDown, Minus, Calendar } from "lucide-react";
import { IssueActions } from "./IssueActions";

const getPriorityConfig = (priority: Priority) => {
  const configs: Record<Priority, { icon: React.ElementType; color: string; bg: string }> = {
    High: {
      icon: ArrowUp,
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-100 dark:bg-red-500/20",
    },
    Medium: {
      icon: Minus,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-100 dark:bg-amber-500/20",
    },
    Low: {
      icon: ArrowDown,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-100 dark:bg-blue-500/20",
    },
  };
  return configs[priority];
};

const getStatusConfig = (status: Status) => {
  const configs: Record<Status, { color: string; bg: string; border: string }> = {
    Open: {
      color: "text-blue-700 dark:text-blue-300",
      bg: "bg-blue-100 dark:bg-blue-500/20",
      border: "border-blue-200 dark:border-blue-500/30",
    },
    "In Progress": {
      color: "text-amber-700 dark:text-amber-300",
      bg: "bg-amber-100 dark:bg-amber-500/20",
      border: "border-amber-200 dark:border-amber-500/30",
    },
    Resolved: {
      color: "text-emerald-700 dark:text-emerald-300",
      bg: "bg-emerald-100 dark:bg-emerald-500/20",
      border: "border-emerald-200 dark:border-emerald-500/30",
    },
    Closed: {
      color: "text-slate-700 dark:text-slate-300",
      bg: "bg-slate-100 dark:bg-slate-500/20",
      border: "border-slate-200 dark:border-slate-500/30",
    },
  };
  return configs[status];
};

export const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <Card className="glass-card border-0 overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Priority</TableHead>
              <TableHead className="font-semibold">Created</TableHead>
              <TableHead className="text-right font-semibold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues?.map((issue, index) => {
              const priorityConfig = getPriorityConfig(issue.priority);
              const statusConfig = getStatusConfig(issue.status);
              const PriorityIcon = priorityConfig.icon;
              
              return (
                <TableRow 
                  key={issue._id}
                  className="group transition-colors hover:bg-muted/30"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TableCell className="font-medium max-w-75">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${statusConfig.bg}`} />
                      <span className="truncate">{issue.title}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={`${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} font-medium`}
                    >
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`p-1 rounded ${priorityConfig.bg}`}>
                        <PriorityIcon className={`h-3 w-3 ${priorityConfig.color}`} />
                      </div>
                      <span className={`text-sm font-medium ${priorityConfig.color}`}>
                        {issue.priority}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span className="text-sm">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <IssueActions issue={issue} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
