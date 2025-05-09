import api from './api';

// Get all categories
export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

// Get a single category by ID
export const getCategoryById = async (id: string) => {
  const response = await api.get(`/categories/${id}`);
  return response.data;
};

// Get a category by slug
export const getCategoryBySlug = async (slug: string) => {
  const response = await api.get(`/categories/slug/${slug}`);
  return response.data;
};

// Get featured categories
export const getFeaturedCategories = async () => {
  const response = await api.get('/categories/featured');
  return response.data;
};

// Create a new category (admin only)
export const createCategory = async (categoryData: any) => {
  const response = await api.post('/categories', categoryData);
  return response.data;
};

// Update a category (admin only)
export const updateCategory = async (id: string, categoryData: any) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data;
};

// Delete a category (admin only)
export const deleteCategory = async (id: string) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};