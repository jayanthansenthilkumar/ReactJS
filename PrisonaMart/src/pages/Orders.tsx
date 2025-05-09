
import React from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { FileText, Truck, PackageCheck } from "lucide-react";

const Orders: React.FC = () => {
  const { user } = useAuth();
  
  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-05-07",
      total: 89.94,
      status: "Delivered",
      items: 5,
    },
    {
      id: "ORD-1235",
      date: "2023-05-03",
      total: 34.50,
      status: "Processing",
      items: 2,
    },
    {
      id: "ORD-1236",
      date: "2023-04-28",
      total: 56.75,
      status: "Shipped",
      items: 3,
    },
    {
      id: "ORD-1237",
      date: "2023-04-20",
      total: 124.30,
      status: "Delivered",
      items: 7,
    },
    {
      id: "ORD-1238",
      date: "2023-04-15",
      total: 45.99,
      status: "Cancelled",
      items: 1,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-green-500">Delivered</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500">Processing</Badge>;
      case "Shipped":
        return <Badge className="bg-amber-500">Shipped</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border p-6 flex items-start">
            <div className="mr-4 bg-green-100 p-3 rounded-full">
              <PackageCheck className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-medium">Total Orders</h3>
              <p className="text-2xl font-bold">{orders.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border p-6 flex items-start">
            <div className="mr-4 bg-amber-100 p-3 rounded-full">
              <Truck className="h-6 w-6 text-amber-500" />
            </div>
            <div>
              <h3 className="font-medium">In Transit</h3>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === "Shipped").length}</p>
            </div>
          </div>
          
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
