import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrder } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatPrice, formatDate } from "@/utils/formatters";
import { Order } from "@/types";
import { ArrowLeft, Package, Truck, CheckCircle, Clock } from "lucide-react";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrder();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const orderData = await getOrderById(orderId);
        
        if (!orderData) {
          navigate("/orders");
          return;
        }
        
        // Ensure the user can only see their own orders unless they're an admin/superadmin
        if (
          user?.role !== "admin" && 
          user?.role !== "superadmin" && 
          orderData.userId !== user?.id
        ) {
          navigate("/orders");
          return;
        }
        
        setOrder(orderData);
      } catch (error) {
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadOrder();
  }, [orderId, getOrderById, user, navigate]);
  
  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex justify-center items-center h-48">
          <p className="text-lg">Loading order details...</p>
        </div>
      </div>
    );
  }
  
  if (!order) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-4">The order you're looking for doesn't exist or you don't have permission to view it.</p>
          <Button asChild>
            <Link to="/orders">View Your Orders</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  // Helper function to get status icon
  const getStatusIcon = () => {
    switch (order.status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "processing":
        return <Package className="h-5 w-5 text-blue-500" />;
      case "shipped":
        return <Truck className="h-5 w-5 text-purple-500" />;
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };
  
  // Helper function to get status color
  const getStatusColor = () => {
    switch (order.status) {
      case "pending": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "processing": return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "shipped": return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "delivered": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "cancelled": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "";
    }
  };
  
  // Calculate subtotal, shipping, tax, and total
  const subtotal = order.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice, 
    0
  );
  const shipping = 5.99;
  const tax = subtotal * 0.07; // 7% tax
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" className="mr-4" asChild>
          <Link to="/orders">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Orders
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Order #{orderId}</h1>
      </div>
      
      <div className="grid gap-6">
        {/* Order Summary Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Order Summary</CardTitle>
              <Badge className={getStatusColor()}>
                <span className="flex items-center">
                  {getStatusIcon()}
                  <span className="ml-1 capitalize">{order.status}</span>
                </span>
              </Badge>
            </div>
            <CardDescription>
              Placed on {formatDate(order.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Order Items */}
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-md bg-gray-100 overflow-hidden">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity} x {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <div className="font-medium">
                    {formatPrice(item.quantity * item.unitPrice)}
                  </div>
                </div>
              ))}
            </div>
            
            <Separator className="my-6" />
            
            {/* Order Totals */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Shipping & Payment Info */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <address className="not-italic">
                <p>{user?.name}</p>
                <p>{order.shippingAddress.street}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </address>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <span>Credit Card</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Status</span>
                  <Badge variant={order.paymentStatus === "paid" ? "default" : "destructive"}>
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;