
import { Book, findBookById } from './books';

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Load cart from localStorage or initialize empty cart
export const loadCart = (): Cart => {
  if (typeof window === 'undefined') return { items: [], total: 0 };
  
  const savedCart = localStorage.getItem('bookstore-cart');
  return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
};

// Save cart to localStorage
export const saveCart = (cart: Cart): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bookstore-cart', JSON.stringify(cart));
};

// Add a book to the cart
export const addToCart = (bookId: string, quantity: number = 1): Cart => {
  const cart = loadCart();
  const existingItem = cart.items.find(item => item.bookId === bookId);
  const book = findBookById(bookId);
  
  if (!book) return cart;
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ bookId, quantity });
  }
  
  // Calculate the new total
  cart.total = calculateCartTotal(cart);
  
  saveCart(cart);
  return cart;
};

// Remove a book from the cart
export const removeFromCart = (bookId: string): Cart => {
  const cart = loadCart();
  cart.items = cart.items.filter(item => item.bookId !== bookId);
  cart.total = calculateCartTotal(cart);
  
  saveCart(cart);
  return cart;
};

// Update quantity of a book in the cart
export const updateCartItemQuantity = (bookId: string, quantity: number): Cart => {
  const cart = loadCart();
  const item = cart.items.find(item => item.bookId === bookId);
  
  if (item) {
    item.quantity = quantity;
    if (item.quantity <= 0) {
      return removeFromCart(bookId);
    }
  }
  
  cart.total = calculateCartTotal(cart);
  
  saveCart(cart);
  return cart;
};

// Clear the entire cart
export const clearCart = (): Cart => {
  const emptyCart = { items: [], total: 0 };
  saveCart(emptyCart);
  return emptyCart;
};

// Calculate the total price of the cart
export const calculateCartTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => {
    const book = findBookById(item.bookId);
    return total + (book ? book.price * item.quantity : 0);
  }, 0);
};

// Get expanded cart items with book details
export const getCartWithDetails = (): {
  items: (CartItem & { book: Book })[];
  total: number;
} => {
  const cart = loadCart();
  
  const itemsWithDetails = cart.items
    .map(item => {
      const book = findBookById(item.bookId);
      return book ? { ...item, book } : null;
    })
    .filter((item): item is CartItem & { book: Book } => item !== null);
  
  return {
    items: itemsWithDetails,
    total: cart.total
  };
};
