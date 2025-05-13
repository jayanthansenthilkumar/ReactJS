import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Create an axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    // In a real app, you'd make a POST request to /auth/login
    // For JSON Server, we'll search the users directly
    const response = await api.get(`/users?email=${email}`);
    const user = response.data[0];
    
    if (user && user.password === password) {
      // In a real app, the server would generate and return a token
      // For our mock server, we'll create a simple token
      const token = btoa(`${user.id}:${user.email}:${Date.now()}`);
      return { user, token };
    }
    
    throw new Error('Invalid credentials');
  },
  
  register: async (userData) => {
    // Check if email already exists
    const existingUsers = await api.get(`/users?email=${userData.email}`);
    if (existingUsers.data.length > 0) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const response = await api.post('/users', newUser);
    const token = btoa(`${response.data.id}:${response.data.email}:${Date.now()}`);
    return { user: response.data, token };
  },
  
  getCurrentUser: async () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      // In a real app, you'd have a /me endpoint
      // For our mock server, we'll decode the token to get the user ID
      const [userId] = atob(token).split(':');
      const response = await api.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },
};

// User APIs
export const userAPI = {
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
  
  update: async (id: string, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data;
  },
  
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },
};

// Shop APIs
export const shopAPI = {
  getAll: async (approved = true) => {
    const query = approved ? '?approved=true' : '';
    const response = await api.get(`/shops${query}`);
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/shops/${id}`);
    return response.data;
  },
  
  getByOwner: async (ownerId: string) => {
    const response = await api.get(`/shops?ownerId=${ownerId}`);
    return response.data;
  },
  
  create: async (shopData) => {
    const newShop = {
      ...shopData,
      id: `shop_${Date.now()}`,
      approved: false, // Shops need approval by default
      createdAt: new Date().toISOString(),
    };
    
    const response = await api.post('/shops', newShop);
    return response.data;
  },
  
  update: async (id: string, shopData) => {
    const response = await api.patch(`/shops/${id}`, shopData);
    return response.data;
  },
  
  approve: async (id: string) => {
    const response = await api.patch(`/shops/${id}`, { approved: true });
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/shops/${id}`);
    return true;
  },
  
  getPendingApprovals: async () => {
    const response = await api.get('/shops?approved=false');
    return response.data;
  },
};

// Product APIs
export const productAPI = {
  getAll: async () => {
    const response = await api.get('/products');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  getByShop: async (shopId: string) => {
    const response = await api.get(`/products?shopId=${shopId}`);
    return response.data;
  },
  
  getByCategory: async (categoryId: string) => {
    const response = await api.get(`/products?category=${categoryId}`);
    return response.data;
  },
  
  create: async (productData) => {
    const newProduct = {
      ...productData,
      id: `product_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const response = await api.post('/products', newProduct);
    return response.data;
  },
  
  update: async (id: string, productData) => {
    const updatedProduct = {
      ...productData,
      updatedAt: new Date().toISOString(),
    };
    
    const response = await api.patch(`/products/${id}`, updatedProduct);
    return response.data;
  },
  
  delete: async (id: string) => {
    await api.delete(`/products/${id}`);
    return true;
  },
};

// Category APIs
export const categoryAPI = {
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
};

// Order APIs
export const orderAPI = {
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },
  
  getByUser: async (userId: string) => {
    const response = await api.get(`/orders?userId=${userId}`);
    return response.data;
  },
  
  create: async (orderData) => {
    const newOrder = {
      ...orderData,
      id: `order_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const response = await api.post('/orders', newOrder);
    return response.data;
  },
  
  updateStatus: async (id: string, status) => {
    const response = await api.patch(`/orders/${id}`, { 
      status, 
      updatedAt: new Date().toISOString() 
    });
    return response.data;
  },
  
  updatePaymentStatus: async (id: string, paymentStatus) => {
    const response = await api.patch(`/orders/${id}`, { 
      paymentStatus, 
      updatedAt: new Date().toISOString() 
    });
    return response.data;
  },
};

// Exposed API object with all services
const apiService = {
  auth: authAPI,
  users: userAPI,
  shops: shopAPI,
  products: productAPI,
  categories: categoryAPI,
  orders: orderAPI,
};

export default apiService;