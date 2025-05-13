
export type UserRole = "customer" | "admin" | "superadmin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
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
}

export interface Shop {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  logoUrl: string;
  approved: boolean;
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
