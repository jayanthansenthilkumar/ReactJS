import api from './api';

// Get all orders (admin only)
export const getOrders = async () => {
  const response = await api.get('/orders');
  return response.data;
};

// Get order by ID
export const getOrderById = async (id: string) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

// Create a new order
export const createOrder = async (orderData: any) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

// Mark order as paid
export const updateOrderToPaid = async (id: string, paymentResult: any) => {
  const response = await api.put(`/orders/${id}/pay`, paymentResult);
  return response.data;
};

// Mark order as delivered (admin only)
export const updateOrderToDelivered = async (id: string) => {
  const response = await api.put(`/orders/${id}/deliver`);
  return response.data;
};

// Update order status (admin only)
export const updateOrderStatus = async (id: string, status: string) => {
  const response = await api.put(`/orders/${id}/status`, { status });
  return response.data;
};

// Get logged in user's orders
export const getMyOrders = async () => {
  const response = await api.get('/orders/myorders');
  return response.data;
};