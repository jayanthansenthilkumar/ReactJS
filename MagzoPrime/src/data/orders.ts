
import { CartItem } from './cart';

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export const getOrders = (): Order[] => {
  if (typeof window === 'undefined') return [];
  
  const savedOrders = localStorage.getItem('bookstore-orders');
  return savedOrders ? JSON.parse(savedOrders) : [];
};

export const saveOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem('bookstore-orders', JSON.stringify(orders));
};

export const getOrdersByUserId = (userId: string): Order[] => {
  return getOrders().filter(order => order.userId === userId);
};

export const getOrderById = (orderId: string): Order | undefined => {
  return getOrders().find(order => order.id === orderId);
};

export const updateOrderStatus = (orderId: string, status: Order['status']): boolean => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex === -1) return false;
  
  orders[orderIndex].status = status;
  orders[orderIndex].updatedAt = new Date().toISOString();
  
  localStorage.setItem('bookstore-orders', JSON.stringify(orders));
  return true;
};
