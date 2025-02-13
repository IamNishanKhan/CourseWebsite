import { create } from 'zustand';
import { authAPI } from './api';
import { User } from '../types/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<{ first_name: string; last_name: string; phone: string }>) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ error: null });
      const response = await authAPI.login({ email, password });
      
      if (response) {
        localStorage.setItem('token', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        set({
          user: response.user,
          isAuthenticated: true,
          token: response.access,
          refreshToken: response.refresh,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during login';
      set({ error: message });
      throw error;
    }
  },

  signup: async (firstName: string, lastName: string, email: string, phone: string, password: string) => {
    try {
      set({ error: null });
      const response = await authAPI.register({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        role: 'student',
      });
      
      if (response) {
        localStorage.setItem('token', response.access);
        localStorage.setItem('refreshToken', response.refresh);
        set({
          user: response.user,
          isAuthenticated: true,
          token: response.access,
          refreshToken: response.refresh,
        });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred during signup';
      set({ error: message });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ error: null });
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await authAPI.logout(refreshToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      set({ 
        user: null, 
        isAuthenticated: false, 
        token: null, 
        refreshToken: null,
        error: null 
      });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ error: null });
      const response = await authAPI.updateProfile(data);
      if (response) {
        set((state) => ({
          user: { ...state.user, ...response },
        }));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred while updating profile';
      set({ error: message });
      throw error;
    }
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    try {
      set({ error: null });
      await authAPI.changePassword({
        old_password: oldPassword,
        new_password: newPassword,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred while changing password';
      set({ error: message });
      throw error;
    }
  },

  clearError: () => set({ error: null }),
}));