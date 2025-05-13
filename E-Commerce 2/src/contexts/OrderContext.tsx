import React, { createContext, useContext, useState } from "react";
import { Order, OrderStatus, Address } from "@/types";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import { toast } from "@/components/ui/sonner";
import apiService from "@/utils/api";

interface OrderContextType {
  orders: Order[];
  createOrder: (shippingAddress: Address) => Promise<Order>;
  getOrderById: (orderId: string) => Promise<Order | undefined>;
  getUserOrders: (userId: string) => Promise<Order[]>;
  getAllOrders: () => Promise<Order[]>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<Order>;
  updatePaymentStatus: (orderId: string, paymentStatus: "pending" | "paid" | "failed") => Promise<Order>;
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const { cartItems, clearCart } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createOrder = async (shippingAddress: Address): Promise<Order> => {
    if (!user) throw new Error("You must be logged in to create an order");
    if (cartItems.length === 0) throw new Error("Your cart is empty");

    try {
      setIsLoading(true);
      
      // Calculate the total amount
      const totalAmount = cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0
      );

      // Prepare order items
      const items = cartItems.map(item => ({
        productId: item.productId,
        product: item.product,
        quantity: item.quantity,
        unitPrice: item.product.price
      }));

      // Create the order
      const newOrder = await apiService.orders.create({
        userId: user.id,
        items,
        totalAmount,
        status: "pending",
        paymentStatus: "pending",
        shippingAddress,
      });
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      
      // Clear cart after successful order
      clearCart();
      
      toast.success("Order placed successfully!");
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to place order");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getOrderById = async (orderId: string): Promise<Order | undefined> => {
    try {
      return await apiService.orders.getById(orderId);
    } catch (error) {
      console.error("Error getting order:", error);
      return undefined;
    }
  };

  const getUserOrders = async (userId: string): Promise<Order[]> => {
    try {
      setIsLoading(true);
      const userOrders = await apiService.orders.getByUser(userId);
      setOrders(userOrders);
      return userOrders;
    } catch (error) {
      console.error("Error getting user orders:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getAllOrders = async (): Promise<Order[]> => {
    try {
      setIsLoading(true);
      const allOrders = await apiService.orders.getAll();
      setOrders(allOrders);
      return allOrders;
    } catch (error) {
      console.error("Error getting all orders:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus): Promise<Order> => {
    try {
      setIsLoading(true);
      const updatedOrder = await apiService.orders.updateStatus(orderId, status);
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? updatedOrder : order
        )
      );
      
      toast.success(`Order status updated to ${status}`);
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePaymentStatus = async (orderId: string, paymentStatus: "pending" | "paid" | "failed"): Promise<Order> => {
    try {
      setIsLoading(true);
      const updatedOrder = await apiService.orders.updatePaymentStatus(orderId, paymentStatus);
      
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? updatedOrder : order
        )
      );
      
      toast.success(`Payment status updated to ${paymentStatus}`);
      return updatedOrder;
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        getUserOrders,
        getAllOrders,
        updateOrderStatus,
        updatePaymentStatus,
        isLoading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};