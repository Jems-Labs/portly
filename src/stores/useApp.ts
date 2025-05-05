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
        set({ user: res.data });
        const { fetchUser } = useApp.getState();
        fetchUser();
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

  logout: async (redirectTo) => {
    try {
      const res = await axios.post("/api/logout");
      if (res.status === 200) {
        toast.success(res.data.msg);
        set({ user: null });
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
  fetchUser: async () => {
    try {
      const res = await axios.get("/api/user");
      if (res.status === 200) {
        set({ user: res.data });
      } else {
        set({ user: null });
      }
    } catch {
      set({ user: null });
    }
  },
  updateProfile: async (formData) => {
    try {
      const res = await axios.put("/api/user/profile-update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  },
  addTag: async (tag) => {
    try {
      const res = await axios.post(`/api/user/profile-update?tag=${tag}`, {});
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to add tag. Please try again.");
    }
  },
  deleteTag: async (tagId) => {
    try {
      const res = await axios.delete(`/api/user/profile-update?tagId=${tagId}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch{
      toast.error("Failed to delete tag. Please try again.");
    }
  },
  addSocialLink: async (socialLinks) => {
    try {
      const res = await axios.post("/api/user/social-links", socialLinks);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to add social link. Please try again.");
    }
  },

  addProject: async (formData) => {
    try {
      const res = await axios.post("/api/user/projects", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to add project. Please try again.");
    }
  },
  deleteProject: async (id) => {
    try {
      const res = await axios.delete(`/api/user/projects?projectId=${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to delete project. Please try again.");
    }
  },
  getProject: async (projectId) => {
    try {
      const res = await axios.get(`/api/user/projects?projectId=${projectId}`);
      if (res.status === 200) {
        return res.data;
      }
    } catch{
      return null;
    }
  },
  updateProject: async (formData, projectId) => {
    try {
      const res = await axios.put(
        `/api/user/projects?projectId=${projectId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch {
      toast.error("Failed to update project. Please try again.");
    }
  },
  addExperience: async (formData) => {
    try {
      const res = await axios.post("/api/user/experience", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to add experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  addEducation: async (formData) => {
    try {
      const res = await axios.post("/api/user/education", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to add education. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  fetchExperience: async (expId) => {
    try {
      const res = await axios.get(`/api/user/experience?expId=${expId}`);
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  },
  editExperience: async (formData, expId) => {
    try {
      const res = await axios.put(
        `/api/user/experience?expId=${expId}`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to edit experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  deleteExperience: async (expId) => {
    try {
      const res = await axios.delete(`/api/user/experience?expId=${expId}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to delete experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  fetchEducation: async (eduId) => {
    try {
      const res = await axios.get(`/api/user/education?eduId=${eduId}`);
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  },
  editEducation: async (formData, eduId) => {
    try {
      const res = await axios.put(
        `/api/user/education?eduId=${eduId}`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to edit education. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  deleteEducation: async (eduId) => {
    try {
      const res = await axios.delete(`/api/user/education?eduId=${eduId}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to delete education. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  addCertification: async (formData) => {
    try {
      const res = await axios.post("/api/user/certification", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to add certification. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  fetchCertificate: async (cerId) => {
    try {
      const res = await axios.get(`/api/user/certification?cerId=${cerId}`);
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  },
  editCertificate: async (formData, cerId) => {
    try {
      const res = await axios.put(
        `/api/user/certification?cerId=${cerId}`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to edit certification. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  deleteCertificate: async (cerId) => {
    try {
      const res = await axios.delete(`/api/user/certification?cerId=${cerId}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to delete certification. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  addVolunteering: async (formData) => {
    try {
      const res = await axios.post("/api/user/volunteering", formData);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to add volunteer experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  fetchVolunteerExperience: async (id) => {
    try {
      const res = await axios.get(`/api/user/volunteering?volId=${id}`);
      if (res.status === 200) {
        return res.data;
      } else {
        return null;
      }
    } catch {
      return null;
    }
  },
  editVolunteerExperience: async (formData, id) => {
    try {
      const res = await axios.put(
        `/api/user/volunteering?volId=${id}`,
        formData
      );
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to edit volunteer experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },
  deleteVolunteerExperience: async (id) => {
    try {
      const res = await axios.delete(`/api/user/volunteering?volId=${id}`);
      if (res.status === 200) {
        toast.success(res.data.msg);
        const { fetchUser } = useApp.getState();
        fetchUser();
      }
    } catch (error) {
      let message = "Failed to delete volunteer experience. Please try again.";

      if (axios.isAxiosError(error)) {
        message =
          error.response?.data?.msg ||
          error.response?.data?.error ||
          error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  },

  getUser: async (username) => {
    try {
      const res = await axios.get(`/api/profile/get-user?username=${username}`);
      if (res.status === 200) {
        return res.data || null;
      }
    } catch {
      return null;
    }
  },
  viewProfile: async (profileId) => {
    if (!profileId) return;
    await axios.post("/api/profile/analytics/profile-view", { profileId });
  },

  clickLink: async (id) => {
    if(!id) return;
    await axios.put("/api/profile/analytics/clicks", {id});
    
  },
  clickProject: async (id) => {
    if(!id) return;
    await axios.put("/api/profile/analytics/clicks/project", {id});
    
  }
}));
