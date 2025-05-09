import api from './api';

// Key for storing user data in localStorage
const USER_STORAGE_KEY = 'bookstore-current-user';
const REFRESH_TOKEN_KEY = 'bookstore-refresh-token';

// User login
export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login', { email, password });
  if (response.data) {
    // Transform the data to match application's expected structure
    const userData = {
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role || (response.data.isAdmin ? 'admin' : 'customer'),
      token: response.data.token,
      tokenExpiry: calculateTokenExpiry()
    };
    
    // Store user data in localStorage
    storeUserData(userData);
    
    // Store refresh token separately
    if (response.data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    }
    
    return userData;
  }
  return response.data;
};

// Calculate token expiry (default to 24 hours from now)
const calculateTokenExpiry = () => {
  // JWT token typically expires in 24 hours (set on server)
  return Date.now() + 24 * 60 * 60 * 1000;
};

// Store user data in localStorage
const storeUserData = (userData: any) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
};

// User registration
export const register = async (name: string, email: string, password: string) => {
  const response = await api.post('/users', { name, email, password });
  if (response.data) {
    // Transform the data to match application's expected structure
    const userData = {
      id: response.data._id,
      name: response.data.name,
      email: response.data.email,
      role: response.data.role || (response.data.isAdmin ? 'admin' : 'customer'),
      token: response.data.token,
      tokenExpiry: calculateTokenExpiry()
    };
    
    // Store user data in localStorage
    storeUserData(userData);
    
    // Store refresh token separately
    if (response.data.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
    }
    
    return userData;
  }
  return response.data;
};

// User logout - now calls the server logout endpoint
export const logout = async () => {
  try {
    // Try to call the server logout endpoint to invalidate the refresh token
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.token) {
      await api.post('/users/logout');
    }
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    // Always clear local storage even if the API call fails
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

// Refresh the access token using the refresh token
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await api.post('/users/refreshtoken', { refreshToken });
    
    if (response.data && response.data.token) {
      // Get the current user data
      const currentUser = getCurrentUser();
      
      if (currentUser) {
        // Update with new token and expiry
        const updatedUser = {
          ...currentUser,
          token: response.data.token,
          tokenExpiry: calculateTokenExpiry()
        };
        
        // Store the updated user data
        storeUserData(updatedUser);
        
        // Store the new refresh token
        if (response.data.refreshToken) {
          localStorage.setItem(REFRESH_TOKEN_KEY, response.data.refreshToken);
        }
        
        return updatedUser;
      }
    }
    
    throw new Error('Failed to refresh token');
  } catch (error) {
    console.error('Token refresh failed:', error);
    // If refresh fails, log the user out
    await logout();
    return null;
  }
};

// Get current user from local storage with validation
export const getCurrentUser = () => {
  const userJson = localStorage.getItem(USER_STORAGE_KEY);
  if (userJson) {
    try {
      const userData = JSON.parse(userJson);
      
      // Check if token is expired
      if (userData.tokenExpiry && userData.tokenExpiry < Date.now()) {
        // Token expired, try to refresh it
        return null;
      }
      
      return userData;
    } catch (error) {
      // Invalid JSON - clear and return null
      logout();
      return null;
    }
  }
  return null;
};

// Validate current session and refresh token if needed
export const validateSession = async () => {
  const user = getCurrentUser();
  
  // If no user, return null
  if (!user) {
    // Try to refresh the token if we have a refresh token
    if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
      return await refreshAccessToken();
    }
    return null;
  }
  
  // If we have a user but the token might expire soon (within 5 minutes)
  const fiveMinutes = 5 * 60 * 1000;
  if (user.tokenExpiry && user.tokenExpiry - Date.now() < fiveMinutes) {
    // Try to refresh the token
    return await refreshAccessToken();
  }
  
  return user;
};

// Get user profile
export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: any) => {
  const response = await api.put('/users/profile', userData);
  
  // Update the stored user data with the new information
  const currentUser = getCurrentUser();
  if (currentUser) {
    const updatedUser = {
      ...currentUser,
      name: response.data.name,
      email: response.data.email,
      // Use the role from response if available
      role: response.data.role || currentUser.role
    };
    
    // If a new token is provided, update it and its expiry
    if (response.data.token) {
      updatedUser.token = response.data.token;
      updatedUser.tokenExpiry = calculateTokenExpiry();
    }
    
    storeUserData(updatedUser);
  }
  
  return response.data;
};

// SuperAdmin: Create an admin user
export const createAdminUser = async (userData: any) => {
  const response = await api.post('/users/create-admin', userData);
  return response.data;
};

// Get filtered users (for admins and superAdmins)
export const getFilteredUsers = async (role?: string) => {
  let url = '/users';
  if (role) {
    url += `?role=${role}`;
  }
  const response = await api.get(url);
  return response.data;
};

// Admin: Get all users
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

// Admin: Delete a user
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

// Admin: Update a user
export const updateUser = async (id: string, userData: any) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};