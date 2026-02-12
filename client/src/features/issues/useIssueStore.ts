import { create } from "zustand";
import axios from "axios";
import type { Issue, IssueStats } from "@/types";

interface IssueState {
  issues: Issue[];
  stats: IssueStats[];
  loading: boolean;
  totalPages: number;
  currentPage: number;

  // Actions
  fetchIssues: (params: {
    search?: string;
    status?: string;
    priority?: string;
    page?: number;
  }) => Promise<void>;
  createIssue: (issueData: Partial<Issue>) => Promise<void>;
  updateIssue: (id: string, updates: Partial<Issue>) => Promise<void>;
  deleteIssue: (id: string) => Promise<void>;
}

export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  stats: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,

  fetchIssues: async (params) => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/issues", { params });
      set({
        issues: response.data.issues,
        stats: response.data.stats,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        loading: false,
      });
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching issues:", error);
    }
  },

  createIssue: async (issueData) => {
    const response = await axios.post("/api/issues", issueData);
    set((state) => ({ issues: [response.data, ...state.issues] }));
  },

  updateIssue: async (id, updates) => {
    const response = await axios.patch(`/api/issues/${id}`, updates);
    set((state) => ({
      issues: state.issues.map((i) => (i._id === id ? response.data : i)),
    }));
  },

  deleteIssue: async (id) => {
    await axios.delete(`/api/issues/${id}`);
    set((state) => ({
      issues: state.issues.filter((i) => i._id !== id),
    }));
  },
}));
