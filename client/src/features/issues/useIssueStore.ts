import { create } from "zustand";
import type { IssueState } from "@/types";
import api from "@/lib/axios";

interface FetchParams {
  search?: string;
  status?: string;
  priority?: string;
  page?: number;
}

interface ExtendedIssueState extends IssueState {
  lastFetchParams: FetchParams;
}

export const useIssueStore = create<ExtendedIssueState>((set, get) => ({
  issues: [],
  stats: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,
  lastFetchParams: {},

  fetchIssues: async (params) => {
    set({ loading: true, lastFetchParams: params });
    try {
      const response = await api.get("/issues", { params });

      set({
        issues: response.data?.issues || [],
        stats: response.data?.stats || [],
        totalPages: response.data?.totalPages || 1,
        currentPage: response.data?.currentPage || 1,
        loading: false,
      });
    } catch (error) {
      set({ loading: false, issues: [] });
      console.error("Error fetching issues:", error);
    }
  },

  createIssue: async (issueData) => {
    set({ loading: true });
    try {
      await api.post("/issues", issueData);
      // Refetch to update stats and list
      const { lastFetchParams } = get();
      await get().fetchIssues({ ...lastFetchParams, page: 1 });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  updateIssue: async (id, updates) => {
    try {
      await api.patch(`/issues/${id}`, updates);
      // Refetch to update stats and list
      const { lastFetchParams } = get();
      await get().fetchIssues(lastFetchParams);
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  },

  deleteIssue: async (id) => {
    try {
      await api.delete(`/issues/${id}`);
      // Refetch to update stats and list
      const { lastFetchParams } = get();
      await get().fetchIssues(lastFetchParams);
    } catch (err) {
      console.error("Delete failed:", err);
      throw err;
    }
  },
}));
