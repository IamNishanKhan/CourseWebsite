import axios from 'axios';

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// Add Authorization header to requests
api.interceptors.request.use(
  async (config) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { accessToken } = JSON.parse(auth);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
        const auth = localStorage.getItem('auth');
        if (auth) {
          const { refreshToken } = JSON.parse(auth);
          const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
            refresh: refreshToken,
          });

          const { access } = response.data;
          const authData = JSON.parse(localStorage.getItem('auth') || '{}');
          localStorage.setItem('auth', JSON.stringify({ ...authData, accessToken: access }));

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('auth');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export { api };