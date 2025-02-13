import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
}

// Dummy user data
const dummyUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  enrolledCourses: ['web-development', 'data-science']
};

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (email: string, password: string) => {
    // Simulate API call
    if (email === 'demo@example.com' && password === 'password') {
      set({ user: dummyUser, isAuthenticated: true });
    }
  },
  signup: (name: string, email: string, password: string) => {
    // Simulate API call
    const newUser = {
      id: Math.random().toString(),
      name,
      email,
      enrolledCourses: []
    };
    set({ user: newUser, isAuthenticated: true });
  },
  logout: () => set({ user: null, isAuthenticated: false })
}));