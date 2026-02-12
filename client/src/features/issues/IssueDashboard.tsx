import { CreateIssueModal } from "./CreateIssueModal";
import { useEffect, useState, useCallback } from "react";
import { IssueTable } from "./IssueTable";
import { useIssueStore } from "./useIssueStore";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { LogoutButton } from "@/components/layout/UserNav";
import { StatusStats } from "./StatusStats";
import { IssueFilters } from "./IssueFilters";
import { Pagination } from "./Pagination";
import { ExportButton } from "./ExportButton";

export const IssueDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const { fetchIssues, issues, stats, loading, totalPages, currentPage } = useIssueStore();

  const loadIssues = useCallback(() => {
    fetchIssues({
      search: debouncedSearch,
      status: statusFilter || undefined,
      priority: priorityFilter || undefined,
      page,
    });
  }, [debouncedSearch, statusFilter, priorityFilter, page, fetchIssues]);

  useEffect(() => {
    loadIssues();
  }, [loadIssues]);

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handlePriorityChange = (value: string) => {
    setPriorityFilter(value);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setSearchTerm("");
    setPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Issue Management</h1>
        <div className="flex items-center gap-2">
          <ExportButton issues={issues} />
          <CreateIssueModal />
          <LogoutButton />
        </div>
      </div>

      {/* Status Stats Cards */}
      <StatusStats stats={stats} />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title..."
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <IssueFilters
          statusFilter={statusFilter}
          priorityFilter={priorityFilter}
          onStatusChange={handleStatusChange}
          onPriorityChange={handlePriorityChange}
          onClearFilters={handleClearFilters}
        />
      </div>

      {/* Issues Table */}
      {loading ? (
        <div className="text-center py-10 text-muted-foreground">
          Updating list...
        </div>
      ) : issues.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No issues found. Try adjusting your search or filters.
        </div>
      ) : (
        <>
          <IssueTable issues={issues} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};
