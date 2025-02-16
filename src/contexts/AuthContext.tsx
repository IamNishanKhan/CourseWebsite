import React, { createContext, useContext, useState, useEffect } from "react";

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

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: (refreshToken: string | null) => Promise<string | null>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          setUser(authData.user);
          setAccessToken(authData.accessToken);
          setRefreshToken(authData.refreshToken);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const signup = async (
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password: string
  ) => {
    try {
      const payload = {
        first_name,
        last_name,
        email,
        phone,
        password,
      };

      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/register/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Registration failed");
      }

      await login(email, password);
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/login/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) throw new Error("Login failed");

      const { access, refresh } = await response.json();

      setAccessToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);

      const profileResponse = await fetch(
        "http://127.0.0.1:8000/api/accounts/profile/",
        {
          headers: { Authorization: `Bearer ${access}` },
        }
      );

      if (!profileResponse.ok) throw new Error("Failed to fetch user profile");

      const userData = await profileResponse.json();
      setUser(userData);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: userData,
          accessToken: access,
          refreshToken: refresh,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem("auth");
    }
  };

  const refreshAccessToken = async (refreshToken: string | null) => {
    if (!refreshToken) return null;
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/accounts/token/refresh/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh: refreshToken }),
        }
      );
      if (!response.ok) throw new Error("Failed to refresh access token");
      const { access } = await response.json();
      setAccessToken(access);
      return access;
    } catch (error) {
      console.error("Refresh token error:", error);
      return null;
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshAccessToken,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
