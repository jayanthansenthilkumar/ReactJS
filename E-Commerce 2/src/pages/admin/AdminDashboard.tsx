
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
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
import { Badge } from "@/components/ui/badge";
import apiService from "@/utils/api";
import { formatPrice, formatDate } from "@/utils/formatters";
import { Shop, Product, Order } from "@/types";

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  
  const [shops, setShops] = useState<Shop[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch shops owned by the current user (for admin)
        const userShops = await apiService.shops.getByOwner(user?.id || "");
        setShops(userShops);
        
        if (userShops.length > 0) {
          // Fetch products for the first shop
          const shopProducts = await apiService.products.getByShop(userShops[0].id);
          setProducts(shopProducts);
          
          // Fetch recent orders (in a real app, you'd filter by shop)
          const allOrders = await apiService.orders.getAll();
          // Show only 5 most recent orders
          const sortedOrders = allOrders.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ).slice(0, 5);
          setRecentOrders(sortedOrders);
          
          // Calculate statistics
          const totalRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);
          setStats({
            totalRevenue,
            totalOrders: allOrders.length,
            // In a real app, this would be calculated differently
            totalCustomers: new Set(allOrders.map(o => o.userId)).size
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [user]);
  
  // Get user shop products
  const userShops = shops;
  const shopProducts = products;

  return (
    <div className="container mx-auto py-8">
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
            <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              From {stats.totalOrders} orders
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
              {shopProducts.length > 0 ? 'Across all shops' : 'No products yet'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalOrders > 0 ? 'Processed orders' : 'No orders yet'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              Unique customers
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
      {loading ? (
        <div className="text-center py-8">Loading orders...</div>
      ) : recentOrders.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border">
          <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-medium mb-2">No Orders Yet</h3>
          <p className="text-gray-500">
            You haven't received any orders yet
          </p>
        </div>
      ) : (
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
                  <TableCell>{order.userId}</TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>{formatPrice(order.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge className={
                      order.status === "delivered" ? "bg-green-100 text-green-800" : 
                      order.status === "shipped" ? "bg-blue-100 text-blue-800" : 
                      order.status === "processing" ? "bg-amber-100 text-amber-800" :
                      order.status === "cancelled" ? "bg-red-100 text-red-800" :
                      "bg-gray-100 text-gray-800"
                    }>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="text-green-600 hover:text-green-700" asChild>
                      <Link to={`/orders/${order.id}`}>
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Quick links to admin pages */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/admin/manage-products">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <CardHeader className="flex flex-row items-center pb-2">
              <Package className="h-5 w-5 mr-2 text-green-600" />
              <CardTitle className="text-lg">Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Add, edit, or remove products from your inventory</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/manage-orders">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <CardHeader className="flex flex-row items-center pb-2">
              <ShoppingBag className="h-5 w-5 mr-2 text-green-600" />
              <CardTitle className="text-lg">Manage Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View and update the status of customer orders</p>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/admin/create-shop">
          <Card className="hover:bg-gray-50 cursor-pointer transition-colors duration-200">
            <CardHeader className="flex flex-row items-center pb-2">
              <Store className="h-5 w-5 mr-2 text-green-600" />
              <CardTitle className="text-lg">Shop Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Update your shop information and settings</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
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
