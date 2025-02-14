import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

// Define User Interface
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: string;
  profile_picture?: string | null;
  bio?: string;
  enrolledCourses?: string[];
}

// Define Authentication State
interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

// Create Zustand Auth Store
export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,

      // 🔹 LOGIN FUNCTION
      login: async (email: string, password: string) => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) throw new Error("Login failed");

          const { access, refresh } = await response.json();

          // ✅ Fetch user profile after login
          const profileResponse = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
            headers: { Authorization: `Bearer ${access}` },
          });

          if (!profileResponse.ok) throw new Error("Failed to fetch user profile");

          const userData = await profileResponse.json();

          set({
            accessToken: access,
            refreshToken: refresh,
            isAuthenticated: true,
            user: {
              id: userData.id,
              first_name: userData.first_name,
              last_name: userData.last_name,
              email: userData.email,
              phone: userData.phone || "",
              role: userData.role,
              profile_picture: userData.profile_picture || null,
              bio: userData.bio || "",
            },
          });
        } catch (error) {
          console.error("Login error:", error);
          throw error;
        }
      },

      // 🔹 SIGNUP FUNCTION
      signup: async (name: string, email: string, password: string) => {
        try {
          const registerResponse = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
          });

          if (!registerResponse.ok) throw new Error("Registration failed");

          await get().login(email, password);
        } catch (error) {
          console.error("Signup error:", error);
          throw error;
        }
      },

      // 🔹 LOGOUT FUNCTION
      logout: async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
            method: "POST",
            headers: { Authorization: `Bearer ${get().accessToken}` },
          });

          if (!response.ok) console.error("Logout failed on server");
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
        }
      },

      // 🔹 REFRESH TOKEN FUNCTION
      refreshAccessToken: async () => {
        try {
          const refreshToken = get().refreshToken;
          if (!refreshToken) throw new Error("No refresh token available");

          const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh: refreshToken }),
          });

          if (!response.ok) throw new Error("Token refresh failed");

          const { access } = await response.json();
          set({ accessToken: access });

          // ✅ Fetch updated profile after token refresh
          const profileResponse = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
            headers: { Authorization: `Bearer ${access}` },
          });

          if (profileResponse.ok) {
            const userData = await profileResponse.json();
            set({ user: userData });
          }
        } catch (error) {
          console.error("Token refresh error:", error);
          await get().logout();
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
    }
  )
);

// 🔹 AXIOS INTERCEPTORS FOR AUTOMATIC TOKEN REFRESH
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add Authorization header to requests
api.interceptors.request.use(
  async (config) => {
    const { accessToken } = useAuth.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 Unauthorized and refresh token automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuth.getState().refreshAccessToken();
        const { accessToken } = useAuth.getState();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };
