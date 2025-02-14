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
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true); // Start loading
      try {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
          const authData = JSON.parse(storedAuth);
          const { accessToken, refreshToken, user } = authData;

          if (accessToken) {
            try {
              const response = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
                headers: { Authorization: `Bearer ${accessToken}` },
              });

              if (response.ok) {
                setUser(user);
                setAccessToken(accessToken);
                setRefreshToken(refreshToken);
                setIsAuthenticated(true);
                setIsLoading(false);
                return;
              }
              // Token is invalid, attempt refresh
              else {
                try {
                  const newAccessToken = await refreshAccessToken(refreshToken);
                  if (newAccessToken) {
                    // Fetch user data again with the new token
                    const profileResponse = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
                      headers: { Authorization: `Bearer ${newAccessToken}` },
                    });

                    if (profileResponse.ok) {
                      const userData = await profileResponse.json();

                      setUser(userData);
                      setAccessToken(newAccessToken);
                      setRefreshToken(refreshToken);
                      setIsAuthenticated(true);

                      // Update local storage
                      localStorage.setItem(
                        "auth",
                        JSON.stringify({
                          user: userData,
                          accessToken: newAccessToken,
                          refreshToken: refreshToken,
                        })
                      );
                    } else {
                      clearAuthData();
                    }
                  } else {
                    clearAuthData();
                  }
                } catch (refreshError) {
                  console.error("Token refresh failed during initialization:", refreshError);
                  clearAuthData();
                }
              }
            } catch (error) {
              console.error("Error verifying token:", error);
              clearAuthData();
            }
          } else {
            clearAuthData();
          }
        } else {
          clearAuthData();
        }
      } finally {
        setIsLoading(false); // End loading whether successful or not
      }
    };

    initializeAuth();
  }, []);

  const clearAuthData = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Login failed");

      const { access, refresh } = await response.json();

      const profileResponse = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      if (!profileResponse.ok) throw new Error("Failed to fetch user profile");

      const userData = await profileResponse.json();

      setAccessToken(access);
      setRefreshToken(refresh);
      setIsAuthenticated(true);
      setUser({
        id: userData.id,
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        phone: userData.phone || "",
        role: userData.role,
        profile_picture: userData.profile_picture || null,
        bio: userData.bio || "",
      });

      localStorage.setItem(
        "auth",
        JSON.stringify({
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
          accessToken: access,
          refreshToken: refresh,
        })
      );
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    try {
      const [first_name, ...lastNameParts] = name.trim().split(" ");
      const last_name = lastNameParts.join(" ") || ""; // Provide empty string if no last name

      const payload = {
        first_name,
        last_name,
        email,
        password,
        phone,
        role: "student",
      };

      const registerResponse = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await registerResponse.json();

      if (!registerResponse.ok) {
        // Extract specific error message from response
        const errorMessage = responseData.detail || Object.values(responseData).flat().join(", ") || "Registration failed";
        throw new Error(errorMessage);
      }

      // After successful registration, login the user
      await login(email, password);
    } catch (error: any) {
      console.error("Signup error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/logout/", {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) console.error("Logout failed on server");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearAuthData();
    }
  };

  const refreshAccessToken = async (refreshToken: string | null): Promise<string | null> => {
    try {
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        console.error("Token refresh failed:", response.statusText);
        throw new Error("Token refresh failed");
      }

      const { access } = await response.json();
      setAccessToken(access);

      // Optionally fetch and update user details here if needed
      // (Example: fetchUserProfileAndUpdateState(access));

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: user,
          accessToken: access,
          refreshToken: refreshToken,
        })
      );

      return access;
    } catch (error) {
      console.error("Token refresh error:", error);
      clearAuthData();
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

  if (isLoading) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
