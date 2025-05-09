
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useShop } from "@/contexts/ShopContext";
import { Link } from "react-router-dom";
import { Line, Bar } from "recharts";
import { 
  Package, 
  Store, 
  ShoppingBag, 
  Users, 
  TrendingUp, 
  PlusCircle,
  BarChart3,
  LineChart,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Sample data for the charts
const salesData = [
  { name: "Mon", sales: 1200 },
  { name: "Tue", sales: 1900 },
  { name: "Wed", sales: 800 },
  { name: "Thu", sales: 1600 },
  { name: "Fri", sales: 2300 },
  { name: "Sat", sales: 2800 },
  { name: "Sun", sales: 2100 },
];

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { shops, products, getShopProducts } = useShop();

  // Get shops owned by the current user
  const userShops = shops.filter((shop) => shop.ownerId === user?.id);
  const shopProducts = userShops.length > 0
    ? getShopProducts(userShops[0].id)
    : [];

  // Mock recent orders
  const recentOrders = [
    {
      id: "ORD-5678",
      customer: "John Smith",
      date: "2023-05-07",
      total: 45.90,
      status: "Pending",
    },
    {
      id: "ORD-5677",
      customer: "Sarah Wilson",
      date: "2023-05-06",
      total: 78.50,
      status: "Shipped",
    },
    {
      id: "ORD-5676",
      customer: "Michael Brown",
      date: "2023-05-06",
      total: 32.75,
      status: "Completed",
    },
    {
      id: "ORD-5675",
      customer: "Lisa Johnson",
      date: "2023-05-05",
      total: 124.30,
      status: "Pending",
    },
    {
      id: "ORD-5674",
      customer: "David Lee",
      date: "2023-05-05",
      total: 54.25,
      status: "Completed",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/admin/create-product">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Link>
            </Button>
            {userShops.length === 0 && (
              <Button asChild variant="outline" className="border-green-600 text-green-600">
                <Link to="/admin/create-shop">
                  <Store className="mr-2 h-4 w-4" />
                  Create Shop
                </Link>
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$4,235.89</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{shopProducts.length}</div>
              <p className="text-xs text-muted-foreground">
                {shopProducts.length > 0 ? '+2 added this week' : 'No products yet'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">149</div>
              <p className="text-xs text-muted-foreground">
                +4.6% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customers</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">573</div>
              <p className="text-xs text-muted-foreground">
                +12 new customers this week
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Weekly Sales</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {/* Component that would show a bar chart of sales data */}
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  Bar chart visualization would render here
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Overview</CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                {/* Component that would show a line chart of revenue data */}
                <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                  Line chart visualization would render here
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-2xl font-bold mt-10 mb-4">Recent Orders</h2>
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                      ${order.status === "Completed" ? "bg-green-100 text-green-800" : 
                        order.status === "Shipped" ? "bg-blue-100 text-blue-800" : 
                        "bg-amber-100 text-amber-800"}`}>
                      {order.status}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700">
                      View
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

export default AdminDashboard;
