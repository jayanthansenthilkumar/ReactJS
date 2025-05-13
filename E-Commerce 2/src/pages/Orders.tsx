
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useOrder } from "@/contexts/OrderContext";
import { Badge } from "@/components/ui/badge";
import { FileText, Truck, PackageCheck, ShoppingBag } from "lucide-react";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/utils/formatters";

const Orders: React.FC = () => {
  const { user } = useAuth();
  const { getUserOrders, isLoading } = useOrder();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    const loadOrders = async () => {
      if (!user) return;
      
      try {
        const userOrders = await getUserOrders(user.id);
        setOrders(userOrders);
      } catch (error) {
        console.error("Error loading orders:", error);
      }
    };
    
    loadOrders();
  }, [user, getUserOrders]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "shipped":
        return <Badge className="bg-amber-500">Shipped</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      case "pending":
        return <Badge className="bg-gray-500">Pending</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Calculate order statistics
  const totalOrders = orders.length;
  const inTransitOrders = orders.filter(o => o.status === "shipped").length;
  const deliveredOrders = orders.filter(o => o.status === "delivered").length;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border p-6 flex items-start">
          <div className="mr-4 bg-green-100 p-3 rounded-full">
            <PackageCheck className="h-6 w-6 text-green-500" />
          </div>
          <div>
            <h3 className="font-medium">Total Orders</h3>
            <p className="text-2xl font-bold">{totalOrders}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 flex items-start">
          <div className="mr-4 bg-amber-100 p-3 rounded-full">
            <Truck className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium">In Transit</h3>
            <p className="text-2xl font-bold">{inTransitOrders}</p>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border p-6 flex items-start">
          <div className="mr-4 bg-blue-100 p-3 rounded-full">
            <ShoppingBag className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium">Delivered</h3>
            <p className="text-2xl font-bold">{deliveredOrders}</p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center p-8">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Button asChild>
            <Link to="/products">Shop Now</Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{order.items.length}</TableCell>
                  <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/orders/${order.id}`}>
                        <FileText className="h-4 w-4 mr-2" /> Details
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Orders;
          
          <div className="bg-white rounded-lg border p-6 flex items-start">
            <div className="mr-4 bg-blue-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-medium">Processing</h3>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "Processing").length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items} items</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
