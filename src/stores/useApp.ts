import { useAppType } from "@/lib/types";
import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
export const useApp = create<useAppType>((set) => ({
  claimedUsername: "",
  setClaimedUsername: (username: string) => set({ claimedUsername: username }),
  user: null,
  signup: async (formData, redirectTo) => {
    try {
      const res = await axios.post("/api/signup", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        redirectTo("/login");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.msg ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
    }
  },
  searchUsername: async (username) => {
    const res = await axios.get(`/api/find-username?username=${username}`);
    if (res.data.isAvailable) {
      return true;
    } else {
      return false;
    }
  },
  login: async (formData, redirectTo) => {
    try {
      const res = await axios.post("/api/login", formData);
      if (res.status === 200) {
        toast.success("Login successful");
        set({user: res.data});
        redirectTo("/admin");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMsg =
          error.response?.data?.msg ||
          "Something went wrong. Please try again.";
        toast.error(errorMsg);
      }
    }
  },
}));
