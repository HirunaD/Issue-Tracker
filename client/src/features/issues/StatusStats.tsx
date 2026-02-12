import { Card, CardContent } from "@/components/ui/card";
import type { IssueStats, Status } from "@/types";

interface StatusStatsProps {
  stats: IssueStats[];
}

const statusColors: Record<Status, string> = {
  Open: "border-l-blue-500",
  "In Progress": "border-l-amber-500",
  Resolved: "border-l-green-500",
  Closed: "border-l-slate-400",
};

export const StatusStats = ({ stats }: StatusStatsProps) => {
  const getCount = (status: Status): number => {
    const stat = stats.find((s) => s._id === status);
    return stat?.count || 0;
  };

  const totalIssues = stats.reduce((acc, s) => acc + s.count, 0);
  const statuses: Status[] = ["Open", "In Progress", "Resolved", "Closed"];

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-5">
      <Card className="border-l-4 border-l-primary">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-semibold mt-1">{totalIssues}</p>
        </CardContent>
      </Card>

      {statuses.map((status) => (
        <Card key={status} className={`border-l-4 ${statusColors[status]}`}>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">{status}</p>
            <p className="text-2xl font-semibold mt-1">{getCount(status)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
