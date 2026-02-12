import { Card, CardContent } from "@/components/ui/card";
import type { IssueStats, Status } from "@/types";
import { AlertCircle, Clock, CheckCircle2, XCircle, LayoutGrid } from "lucide-react";

interface StatusStatsProps {
  stats: IssueStats[];
}

const statusConfig: Record<Status, { 
  label: string; 
  icon: React.ElementType; 
  gradient: string;
  iconBg: string;
  textColor: string;
}> = {
  Open: {
    label: "Open",
    icon: AlertCircle,
    gradient: "from-blue-500/20 to-blue-600/5 dark:from-blue-500/30 dark:to-blue-600/10",
    iconBg: "bg-blue-500/20 dark:bg-blue-500/30",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  "In Progress": {
    label: "In Progress",
    icon: Clock,
    gradient: "from-amber-500/20 to-amber-600/5 dark:from-amber-500/30 dark:to-amber-600/10",
    iconBg: "bg-amber-500/20 dark:bg-amber-500/30",
    textColor: "text-amber-600 dark:text-amber-400",
  },
  Resolved: {
    label: "Resolved",
    icon: CheckCircle2,
    gradient: "from-emerald-500/20 to-emerald-600/5 dark:from-emerald-500/30 dark:to-emerald-600/10",
    iconBg: "bg-emerald-500/20 dark:bg-emerald-500/30",
    textColor: "text-emerald-600 dark:text-emerald-400",
  },
  Closed: {
    label: "Closed",
    icon: XCircle,
    gradient: "from-slate-500/20 to-slate-600/5 dark:from-slate-500/30 dark:to-slate-600/10",
    iconBg: "bg-slate-500/20 dark:bg-slate-500/30",
    textColor: "text-slate-600 dark:text-slate-400",
  },
};

export const StatusStats = ({ stats }: StatusStatsProps) => {
  const getCount = (status: Status): number => {
    const stat = stats.find((s) => s._id === status);
    return stat?.count || 0;
  };

  const totalIssues = stats.reduce((acc, s) => acc + s.count, 0);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {/* Total Card */}
      <Card className="glass-card border-0 bg-linear-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10 overflow-hidden">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
              <p className="text-3xl font-bold">{totalIssues}</p>
            </div>
            <div className="p-3 bg-primary/20 dark:bg-primary/30 rounded-xl">
              <LayoutGrid className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Status Cards */}
      {(Object.keys(statusConfig) as Status[]).map((status) => {
        const config = statusConfig[status];
        const Icon = config.icon;
        const count = getCount(status);

        return (
          <Card 
            key={status} 
            className={`glass-card border-0 bg-linear-to-br ${config.gradient} overflow-hidden transition-transform hover:scale-[1.02]`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className={`text-sm font-medium ${config.textColor}`}>{config.label}</p>
                  <p className={`text-3xl font-bold ${config.textColor}`}>{count}</p>
                </div>
                <div className={`p-3 ${config.iconBg} rounded-xl`}>
                  <Icon className={`h-6 w-6 ${config.textColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
