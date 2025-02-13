import axios from 'axios';

const BASE_URL = 'https://academy.backend.big-matrix.com';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Changed to false since we're handling tokens manually
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle network errors
    if (!error.response) {
      console.error('Network error occurred:', error.message);
      throw new Error('Network error occurred. Please check your internet connection.');
    }

    // Handle 401 errors
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // Clear tokens and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';
      
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (data: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    try {
      const response = await api.post('/api/accounts/register/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  login: async (data: { email: string; password: string }) => {
    try {
      const response = await api.post('/api/accounts/login/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  updateProfile: async (data: Partial<{
    first_name: string;
    last_name: string;
    phone: string;
  }>) => {
    try {
      const response = await api.put('/api/accounts/update/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  changePassword: async (data: { old_password: string; new_password: string }) => {
    try {
      const response = await api.post('/api/accounts/change-password/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  logout: async (refreshToken: string) => {
    try {
      const response = await api.post('/api/accounts/logout/', { refresh: refreshToken });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Categories API
export const categoriesAPI = {
  getCategories: async () => {
    try {
      const response = await api.get('/api/categories/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createCategory: async (data: {
    category_name: string;
  }) => {
    try {
      const response = await api.post('/api/categories/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Courses API
export const coursesAPI = {
  getCourses: async () => {
    try {
      const response = await api.get('/api/courses/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createCourse: async (data: {
    title: string;
    description: string;
    price: string;
    thumbnail?: File;
    category: number;
  }) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, value);
        }
      });
      const response = await api.post('/api/courses/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Enrollments API
export const enrollmentsAPI = {
  getEnrollments: async () => {
    try {
      const response = await api.get('/api/enrollments/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createEnrollment: async (courseId: number) => {
    try {
      const response = await api.post('/api/enrollments/', { course: courseId });
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Modules API
export const modulesAPI = {
  getModules: async () => {
    try {
      const response = await api.get('/api/modules/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createModule: async (data: {
    title: string;
    order: number;
    course_id: number;
  }) => {
    try {
      const response = await api.post('/api/modules/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Lessons API
export const lessonsAPI = {
  getLessons: async () => {
    try {
      const response = await api.get('/api/lessons/');
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },

  createLesson: async (data: {
    title: string;
    video_url: string;
    duration: number;
    order: number;
    module: number;
  }) => {
    try {
      const response = await api.post('/api/lessons/', data);
      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  },
};

// Error handling utility
const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      throw new Error('Network error occurred. Please check your internet connection.');
    }
    
    const errorMessage = error.response.data?.detail || error.message;
    throw new Error(errorMessage);
  }
  
  throw error;
};

export default api;