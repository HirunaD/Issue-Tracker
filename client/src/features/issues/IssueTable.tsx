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
import { IssueActions } from "./IssueActions";

const priorityStyles: Record<Priority, string> = {
  High: "text-red-600 dark:text-red-400",
  Medium: "text-amber-600 dark:text-amber-400",
  Low: "text-slate-500 dark:text-slate-400",
};

const statusStyles: Record<Status, string> = {
  Open: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
  "In Progress":
    "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  Resolved:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800",
  Closed:
    "bg-slate-200 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700",
};

export const IssueTable = ({ issues }: { issues: Issue[] }) => {
  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead>Issue</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues?.map((issue) => (
            <TableRow key={issue._id} className="hover:bg-muted/20">
              <TableCell className="max-w-xs">
                <span className="font-medium truncate block">
                  {issue.title}
                </span>
              </TableCell>
              <TableCell className="max-w-xs text-muted-foreground">
                <span className="truncate block text-sm">
                  {issue.description || "-"}
                </span>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusStyles[issue.status]}>
                  {issue.status}
                </Badge>
              </TableCell>
              <TableCell>
                <span
                  className={`text-sm font-medium ${priorityStyles[issue.priority]}`}
                >
                  {issue.priority}
                </span>
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {formatDate(issue.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <IssueActions issue={issue} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
