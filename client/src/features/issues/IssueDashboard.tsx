import { CreateIssueModal } from "./CreateIssueModal";
import { useEffect, useState } from "react";
import { IssueTable } from "./IssueTable";
import { useIssueStore } from "./useIssueStore";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";

export const IssueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { fetchIssues, issues, loading } = useIssueStore();

  useEffect(() => {
    fetchIssues({ search: debouncedSearch });
  }, [debouncedSearch, fetchIssues]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Issue Management</h1>
        <CreateIssueModal />

        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10 text-muted-foreground">
          Updating list...
        </div>
      ) : (
        <IssueTable issues={issues} />
      )}
    </div>
  );
};
