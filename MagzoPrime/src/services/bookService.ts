import api from './api';
import { Book } from '../data/books';

// Get all books with optional filter parameters
export const getBooks = async (params = {}) => {
  const response = await api.get('/books', { params });
  return response.data;
};

// Get a single book by ID
export const getBookById = async (id: string) => {
  const response = await api.get(`/books/${id}`);
  return response.data;
};

// Create a new book (admin only)
export const createBook = async (bookData: Partial<Book>) => {
  const response = await api.post('/books', bookData);
  return response.data;
};

// Update an existing book (admin only)
export const updateBook = async (id: string, bookData: Partial<Book>) => {
  const response = await api.put(`/books/${id}`, bookData);
  return response.data;
};

// Delete a book (admin only)
export const deleteBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};

// Get top-rated books
export const getTopBooks = async () => {
  const response = await api.get('/books/top');
  return response.data;
};

// Add a review to a book
export const addBookReview = async (bookId: string, reviewData: { rating: number; comment: string }) => {
  const response = await api.post(`/books/${bookId}/reviews`, reviewData);
  return response.data;
};

// Get books by category
export const getBooksByCategory = async (categoryId: string) => {
  const response = await api.get('/books', { params: { category: categoryId } });
  return response.data;
};

// Get new releases
export const getNewReleases = async () => {
  const response = await api.get('/books', { params: { newRelease: true } });
  return response.data;
};

// Get bestsellers
export const getBestsellers = async () => {
  const response = await api.get('/books', { params: { bestseller: true } });
  return response.data;
};

// Get special offers
export const getSpecialOffers = async () => {
  const response = await api.get('/books', { params: { specialOffer: true } });
  return response.data;
};

// SuperAdmin: Get books pending approval
export const getPendingApprovalBooks = async () => {
  const response = await api.get('/books/pending-approval');
  return response.data;
};

// SuperAdmin: Approve a book
export const approveBook = async (id: string) => {
  const response = await api.put(`/books/${id}/approve`);
  return response.data;
};

// SuperAdmin: Reject a book
export const rejectBook = async (id: string, reason: string) => {
  const response = await api.put(`/books/${id}/reject`, { reason });
  return response.data;
};