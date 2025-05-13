import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrder } from "@/contexts/OrderContext";
import { formatPrice } from "@/utils/formatters";
import { toast } from "@/components/ui/sonner";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import { Address } from "@/types";

const Checkout: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrder();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Default address from user if available
  const defaultAddress: Address = user?.address || {
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA"
  };
  
  const [shippingAddress, setShippingAddress] = useState<Address>(defaultAddress);
  
  if (!user) {
    // Redirect to login if not authenticated
    navigate("/login?redirect=/checkout");
    return null;
  }
  
  if (cartItems.length === 0) {
    // Redirect to cart if empty
    navigate("/cart");
    return null;
  }
  
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      // Create the order
      const order = await createOrder(shippingAddress);
      
      toast.success("Order placed successfully!");
      
      // Redirect to order details
      navigate(`/orders/${order.id}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };
  
  const shippingFee = 5.99;
  const tax = cartTotal * 0.07; // 7% tax
  const orderTotal = cartTotal + shippingFee + tax;
  
  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping & Billing */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
              <CardDescription>Enter your shipping details</CardDescription>
            </CardHeader>
            <CardContent>
              <CheckoutForm 
                defaultAddress={defaultAddress}
                onAddressChange={setShippingAddress}
              />
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Order Items */}
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{formatPrice(cartTotal)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Shipping</p>
                  <p>{formatPrice(shippingFee)}</p>
                </div>
                <div className="flex justify-between">
                  <p>Tax (7%)</p>
                  <p>{formatPrice(tax)}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold">
                <p>Total</p>
                <p>{formatPrice(orderTotal)}</p>
              </div>
              
              <Button 
                className="w-full mt-6 bg-green-500 hover:bg-green-600" 
                size="lg"
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Checkout;