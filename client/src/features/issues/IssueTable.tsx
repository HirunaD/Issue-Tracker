import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Issue, Priority, Status } from "@/types";
import { AlertCircle, ArrowUpCircle } from "lucide-react";
import { IssueActions } from "./IssueActions";

const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case "High":
      return <AlertCircle className="text-destructive h-4 w-4" />;
    case "Medium":
      return <ArrowUpCircle className="text-amber-500 h-4 w-4" />;
    case "Low":
      return <ArrowUpCircle className="text-blue-500 h-4 w-4" rotate={180} />;
  }
};

const getStatusBadge = (status: Status) => {
  const styles: Record<Status, string> = {
    Open: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    "In Progress": "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    Resolved: "bg-green-100 text-green-800 hover:bg-green-100",
    Closed: "bg-gray-100 text-gray-800 hover:bg-gray-100",
  };
  return <Badge className={styles[status]}>{status}</Badge>;
};

export const IssueTable = ({ issues }: { issues: Issue[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues?.map((issue) => (
            <TableRow key={issue._id}>
              <TableCell className="font-medium">{issue.title}</TableCell>
              <TableCell>{getStatusBadge(issue.status)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getPriorityIcon(issue.priority)}
                  {issue.priority}
                </div>
              </TableCell>
              <TableCell>
                {new Date(issue.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <IssueActions issue={issue} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
