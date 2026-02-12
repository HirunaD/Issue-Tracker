import { CreateIssueModal } from "./CreateIssueModal";
import { useEffect, useState, useCallback } from "react";
import { IssueTable } from "./IssueTable";
import { useIssueStore } from "./useIssueStore";
import { Search, Bug, Loader2, FolderOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { LogoutButton } from "@/components/layout/UserNav";
import { StatusStats } from "./StatusStats";
import { IssueFilters } from "./IssueFilters";
import { Pagination } from "./Pagination";
import { ExportButton } from "./ExportButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card } from "@/components/ui/card";

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
      <header className="sticky top-0 z-40 glass border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Bug className="h-6 w-6 text-primary" />
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg">Issue Tracker</h1>
                <p className="text-xs text-muted-foreground">Manage your projects</p>
              </div>
            </div>

            {/* Actions */}
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
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Page Title */}
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Monitor and manage all your issues in one place</p>
        </div>

        {/* Status Stats Cards */}
        <StatusStats stats={stats} />

        {/* Search and Filters Card */}
        <Card className="p-4 glass-card border-0">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search issues by title..."
                className="pl-10 h-10 bg-background/50"
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
        </Card>

        {/* Issues Table */}
        {loading ? (
          <Card className="p-12 glass-card border-0">
            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p>Loading issues...</p>
            </div>
          </Card>
        ) : issues.length === 0 ? (
          <Card className="p-12 glass-card border-0">
            <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <div className="p-4 bg-muted rounded-full">
                <FolderOpen className="h-8 w-8" />
              </div>
              <div className="text-center">
                <p className="font-medium">No issues found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            </div>
          </Card>
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
