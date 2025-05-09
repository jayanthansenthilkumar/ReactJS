import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  loadCart, 
  removeFromCart, 
  updateCartItemQuantity,
  clearCart
} from '../services/cartService';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { getCurrentUser } from '../services/userService';
import { getBookById } from '../services/bookService';

// Cart item type with book details
interface CartItemWithDetails {
  bookId: string;
  quantity: number;
  book: any; // Book details from API
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItemWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartTotal, setCartTotal] = useState(0);
  const currentUser = getCurrentUser();

  // Load cart data when component mounts
  useEffect(() => {
    loadCartDetails();
  }, []);

  // Calculate total items in cart
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const loadCartDetails = async () => {
    setLoading(true);
    try {
      const cart = loadCart();
      
      // Fetch details for each book in the cart
      const cartWithDetails = await Promise.all(
        cart.items.map(async (item) => {
          try {
            const bookDetails = await getBookById(item.bookId);
            return {
              bookId: item.bookId,
              quantity: item.quantity,
              book: bookDetails
            };
          } catch (err) {
            console.error(`Failed to fetch details for book ${item.bookId}`, err);
            // Return item with minimal book details if we can't fetch from API
            return {
              bookId: item.bookId,
              quantity: item.quantity,
              book: { _id: item.bookId, title: 'Book not found', price: 0 }
            };
          }
        })
      );
      
      setCartItems(cartWithDetails);
      
      // Calculate total price
      const total = cartWithDetails.reduce(
        (sum, item) => sum + (item.book.price * item.quantity), 
        0
      );
      setCartTotal(total);
    } catch (err) {
      console.error('Error loading cart details:', err);
      toast.error('Failed to load cart details');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (bookId: string, change: number) => {
    const item = cartItems.find(item => item.bookId === bookId);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity > 0) {
        updateCartItemQuantity(bookId, newQuantity);
        loadCartDetails(); // Reload cart details
        toast.success("Cart updated");
      }
    }
  };

  const handleRemoveItem = (bookId: string) => {
    removeFromCart(bookId);
    loadCartDetails(); // Reload cart details
    toast.success("Item removed from cart");
  };

  const handleClearCart = () => {
    clearCart();
    setCartItems([]);
    setCartTotal(0);
    toast.success("Cart cleared");
  };

  // Calculate shipping, tax, and total
  const shipping = cartTotal > 35 ? 0 : 4.99;
  const tax = cartTotal * 0.1;
  const orderTotal = cartTotal + shipping + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold mb-8">Your Shopping Cart</h1>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-muted/30 rounded-lg p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any books to your cart yet.
              </p>
              <Button asChild>
                <Link to="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-lg border mb-6">
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium">
                        Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                      </h2>
                      <Button variant="ghost" size="sm" onClick={handleClearCart}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    {cartItems.map((item) => (
                      <div key={item.bookId} className="p-6 border-b last:border-0 flex">
                        <Link to={`/book/${item.bookId}`} className="flex-shrink-0 mr-4">
                          <div className="w-20 h-28 bg-muted rounded overflow-hidden">
                            <img 
                              src={item.book.image || '/placeholder.svg'} 
                              alt={item.book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </Link>
                        
                        <div className="flex-grow">
                          <Link to={`/book/${item.bookId}`} className="font-medium hover:text-primary">
                            {item.book.title}
                          </Link>
                          <p className="text-sm text-muted-foreground">by {item.book.author}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            <div className="text-sm text-muted-foreground">
                              ${item.book.price?.toFixed(2)} each
                            </div>
                            {item.book.discountPercentage > 0 && (
                              <div className="text-xs text-muted-foreground line-through">
                                ${(item.book.price / (1 - item.book.discountPercentage/100)).toFixed(2)}
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center border rounded-md">
                              <button
                                onClick={() => handleQuantityChange(item.bookId, -1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 py-1 w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => handleQuantityChange(item.bookId, 1)}
                                className="px-2 py-1 text-muted-foreground hover:text-foreground"
                                disabled={item.quantity >= (item.book.countInStock || 0)}
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <div className="flex items-center">
                              <div className="font-medium mr-4">
                                ${(item.book.price * item.quantity).toFixed(2)}
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.bookId)}
                              >
                                <Trash2 className="w-4 h-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-lg border p-6 sticky top-8">
                  <h2 className="text-xl font-medium mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${orderTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link to={currentUser ? "/checkout" : "/login?redirect=checkout"}>
                      Checkout
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center mt-4">
                    Free shipping on orders over $35
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
