import { create } from "zustand";
import api from "@/lib/axios";

interface AuthState {
  token: string | null;
  loading: boolean;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  loading: false,

  register: async (email, password) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/register", { email, password });
      const { token } = res.data;
      localStorage.setItem("token", token);
      set({ token, loading: false });
    } catch (err) {
      set({ loading: false });
      throw err;
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      set({ token: res.data.token, loading: false });
      return true;
    } catch (err) {
      if (err instanceof Error) {
        console.error("Login error:", err.message);
      }
      set({ loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));
