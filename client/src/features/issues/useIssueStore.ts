import { create } from "zustand";
import type { IssueState } from "@/types";
import api from "@/lib/axios";



export const useIssueStore = create<IssueState>((set) => ({
  issues: [],
  stats: [],
  loading: false,
  totalPages: 1,
  currentPage: 1,

  fetchIssues: async (params) => {
    set({ loading: true });
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
      const res = await api.post("/issues", issueData);

      set((state) => ({
        issues: [
          ...(Array.isArray(state.issues) ? state.issues : []),
          res.data,
        ],
        loading: false,
      }));
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  updateIssue: async (id, updates) => {
    try {
      const response = await api.patch(`/issues/${id}`, updates);
      set((state) => ({
        issues: state.issues.map((i) => (i._id === id ? response.data : i)),
      }));
    } catch (err) {
      console.error("Update failed:", err);
      throw err;
    }
  },

  deleteIssue: async (id) => {
    try {
      await api.delete(`/issues/${id}`);
      set((state) => ({
        issues: state.issues.filter((i) => i._id !== id),
      }));
    } catch (err) {
      console.error("Delete failed:", err);
      throw err;
    }
  },
}));
