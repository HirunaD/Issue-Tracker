import { CreateIssueModal } from "./CreateIssueModal";
import { useEffect, useState, useCallback } from "react";
import { IssueTable } from "./IssueTable";
import { useIssueStore } from "./useIssueStore";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { LogoutButton } from "@/components/layout/UserNav";
import { StatusStats } from "./StatusStats";
import { IssueFilters } from "./IssueFilters";
import { Pagination } from "./Pagination";
import { ExportButton } from "./ExportButton";
import { ThemeToggle } from "@/components/theme-toggle";

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <h1 className="font-semibold text-lg">Issue Tracker</h1>
            <div className="flex items-center gap-2">
              <ExportButton issues={issues} />
              <CreateIssueModal />
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Status Stats */}
        <StatusStats stats={stats} />

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search issues..."
              className="pl-9"
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
          <div className="flex items-center justify-center py-12 text-muted-foreground">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            Loading...
          </div>
        ) : issues.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No issues found</p>
            <p className="text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            <IssueTable issues={issues} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </main>
    </div>
  );
};
