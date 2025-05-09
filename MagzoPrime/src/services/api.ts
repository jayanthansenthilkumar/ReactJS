import axios from 'axios';
import { refreshAccessToken, logout, getCurrentUser } from './userService';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Flag to prevent multiple concurrent refresh token requests
let isRefreshing = false;
// Store pending requests
let failedQueue = [];

// Process the queue of failed requests
const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    // Get current user from local storage
    const currentUser = getCurrentUser();
    
    // Add token to request if available
    if (currentUser && currentUser.token) {
      config.headers.Authorization = `Bearer ${currentUser.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handling authentication errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Check if the error is due to token issues
      const errorMessage = error.response.data?.message || '';
      const errorCode = error.response.data?.code || '';
      const isAuthError = errorMessage.includes('token') || 
                          errorMessage.includes('auth') || 
                          errorCode === 'TOKEN_EXPIRED' ||
                          errorCode === 'INVALID_TOKEN';
      
      // Don't try to refresh if this is a login/register request or already retried
      if (isAuthError && !originalRequest._retry && 
          !originalRequest.url.includes('/login') && 
          !originalRequest.url.includes('/refreshtoken')) {
        
        // If we're already refreshing, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => Promise.reject(err));
        }
        
        // Set refresh flag and retry flag
        originalRequest._retry = true;
        isRefreshing = true;
        
        try {
          // Attempt to refresh the token
          const refreshedUser = await refreshAccessToken();
          
          if (refreshedUser && refreshedUser.token) {
            // Update the authorization header with new token
            originalRequest.headers.Authorization = `Bearer ${refreshedUser.token}`;
            
            // Process any queued requests with the new token
            processQueue(null, refreshedUser.token);
            
            // Retry the original request with the new token
            return axios(originalRequest);
          } else {
            // If refresh failed, reject all queued requests
            processQueue(new Error('Token refresh failed'));
            
            // Redirect to login page with the current URL as redirect target
            const currentPath = window.location.pathname;
            if (currentPath !== '/login') {
              window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
            }
            return Promise.reject(error);
          }
        } catch (refreshError) {
          // If refresh fails, reject all queued requests
          processQueue(refreshError);
          
          // Clear user session and redirect
          await logout();
          
          // Redirect to login
          const currentPath = window.location.pathname;
          if (currentPath !== '/login') {
            window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
          }
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }
      
      // For other auth errors that aren't token related or can't be refreshed
      if (isAuthError && (originalRequest._retry || 
                          originalRequest.url.includes('/login') ||
                          originalRequest.url.includes('/refreshtoken'))) {
        console.error('Authentication error:', errorMessage);
        
        // Clear the user session
        await logout();
        
        // Redirect to login page with the current URL as redirect target
        const currentPath = window.location.pathname;
        if (currentPath !== '/login') {
          window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
        }
      }
    }
    
    const message = 
      error.response?.data?.message || 
      error.message || 
      'An unexpected error occurred';
    
    console.error('API Error:', message);
    return Promise.reject(error);
  }
);

export default api;