import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IssueStats, Status } from "@/types";
import { AlertCircle, Clock, CheckCircle2, XCircle } from "lucide-react";

interface StatusStatsProps {
  stats: IssueStats[];
}

const statusConfig: Record<Status, { label: string; icon: React.ElementType; color: string; bgColor: string }> = {
  Open: {
    label: "Open",
    icon: AlertCircle,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  "In Progress": {
    label: "In Progress",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  Resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  Closed: {
    label: "Closed",
    icon: XCircle,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
};

export const StatusStats = ({ stats }: StatusStatsProps) => {
  const getCount = (status: Status): number => {
    const stat = stats.find((s) => s._id === status);
    return stat?.count || 0;
  };

  const totalIssues = stats.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalIssues}</div>
        </CardContent>
      </Card>

      {(Object.keys(statusConfig) as Status[]).map((status) => {
        const config = statusConfig[status];
        const Icon = config.icon;
        const count = getCount(status);

        return (
          <Card key={status} className={config.bgColor}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${config.color}`}>
                {config.label}
              </CardTitle>
              <Icon className={`h-4 w-4 ${config.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${config.color}`}>{count}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
