
export type UserRole = "customer" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  address?: Address;
  phone?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  shopId: string;
  inStock: number;
  createdAt: string;
  updatedAt?: string;
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  logoUrl: string;
  approved: boolean;
  address?: Address;
  categories?: string[];
  rating?: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = 
  | "pending" 
  | "processing" 
  | "shipped" 
  | "delivered" 
  | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: "pending" | "paid" | "failed";
  shippingAddress: Address;
  createdAt: string;
  updatedAt?: string;
}
