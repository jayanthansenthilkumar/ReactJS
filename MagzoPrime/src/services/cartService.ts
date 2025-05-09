import { Book } from '../data/books';

// Cart item interface
export interface CartItem {
  bookId: string;
  quantity: number;
}

// Cart interface
export interface Cart {
  items: CartItem[];
}

// Load cart from localStorage
export const loadCart = (): Cart => {
  const cartJSON = localStorage.getItem('cart');
  return cartJSON ? JSON.parse(cartJSON) : { items: [] };
};

// Save cart to localStorage
export const saveCart = (cart: Cart): void => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Add item to cart
export const addToCart = (bookId: string, quantity: number): void => {
  const cart = loadCart();
  const existingItem = cart.items.find(item => item.bookId === bookId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ bookId, quantity });
  }

  saveCart(cart);
};

// Remove item from cart
export const removeFromCart = (bookId: string): void => {
  const cart = loadCart();
  cart.items = cart.items.filter(item => item.bookId !== bookId);
  saveCart(cart);
};

// Update cart item quantity
export const updateCartItemQuantity = (bookId: string, quantity: number): void => {
  const cart = loadCart();
  const item = cart.items.find(item => item.bookId === bookId);

  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      removeFromCart(bookId);
    } else {
      saveCart(cart);
    }
  }
};

// Clear cart
export const clearCart = (): void => {
  saveCart({ items: [] });
};

// Get cart count
export const getCartCount = (): number => {
  const cart = loadCart();
  return cart.items.reduce((total, item) => total + item.quantity, 0);
};