import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileJson, FileSpreadsheet } from "lucide-react";
import type { Issue } from "@/types";
import { toast } from "react-toastify";

interface ExportButtonProps {
  issues: Issue[];
}

export const ExportButton = ({ issues }: ExportButtonProps) => {
  const exportToJSON = () => {
    if (issues.length === 0) {
      toast.warning("No issues to export");
      return;
    }

    const dataStr = JSON.stringify(issues, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    downloadFile(blob, "issues.json");
    toast.success("Issues exported to JSON");
  };

  const exportToCSV = () => {
    if (issues.length === 0) {
      toast.warning("No issues to export");
      return;
    }

    const headers = ["ID", "Title", "Description", "Status", "Priority", "Severity", "Created At", "Updated At"];
    const rows = issues.map((issue) => [
      issue._id,
      `"${issue.title.replace(/"/g, '""')}"`,
      `"${(issue.description || "").replace(/"/g, '""')}"`,
      issue.status,
      issue.priority,
      issue.severity || "",
      new Date(issue.createdAt).toLocaleDateString(),
      new Date(issue.updatedAt).toLocaleDateString(),
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadFile(blob, "issues.csv");
    toast.success("Issues exported to CSV");
  };

  const downloadFile = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportToJSON}>
          <FileJson className="h-4 w-4 mr-2" />
          Export as JSON
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportToCSV}>
          <FileSpreadsheet className="h-4 w-4 mr-2" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
