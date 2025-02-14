import React, { createContext, useContext, useState, useEffect } from 'react';

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
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load stored auth state on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      const { user, accessToken, refreshToken, isAuthenticated } = JSON.parse(storedAuth);
      setUser(user);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      setIsAuthenticated(isAuthenticated);
    }
  }, []);

  // Save auth state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify({
      user,
      accessToken,
      refreshToken,
      isAuthenticated
    }));
  }, [user, accessToken, refreshToken, isAuthenticated]);

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
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, phone: string) => {
    try {
      const [first_name, ...lastNameParts] = name.trim().split(' ');
      const last_name = lastNameParts.join(' ') || ''; // Provide empty string if no last name

      const payload = {
        first_name,
        last_name,
        email,
        password,
        phone,
        role: "student"
      };

      console.log('Registration payload:', payload); // Debug log

      const registerResponse = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await registerResponse.json();
      console.log('Server response:', responseData); // Debug log

      if (!registerResponse.ok) {
        // Extract specific error message from response
        const errorMessage = responseData.detail || 
                           Object.values(responseData).flat().join(', ') ||
                           "Registration failed";
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
      setUser(null);
      setAccessToken(null);
      setRefreshToken(null);
      setIsAuthenticated(false);
      localStorage.removeItem('auth');
    }
  };

  const refreshAccessToken = async () => {
    try {
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) throw new Error("Token refresh failed");

      const { access } = await response.json();
      setAccessToken(access);

      const profileResponse = await fetch("http://127.0.0.1:8000/api/accounts/profile/", {
        headers: { Authorization: `Bearer ${access}` },
      });

      if (profileResponse.ok) {
        const userData = await profileResponse.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Token refresh error:", error);
      await logout();
      throw error;
    }
  };

  const value = {
    user,
    accessToken,
    refreshToken,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};