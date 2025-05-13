
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useShop } from "@/contexts/ShopContext";
import { Link } from "react-router-dom";
import {
  Store,
  Users,
  Package,
  ShoppingBag,
  AlertTriangle,
  CheckCircle,
  BarChart2
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

const SuperAdminDashboard: React.FC = () => {
  const { shops, products, approveShop, rejectShop } = useShop();
  
  // Platform statistics
  const totalShops = shops.length;
  const pendingShops = shops.filter(shop => !shop.approved).length;
  const approvedShops = shops.filter(shop => shop.approved).length;
  const totalProducts = products.length;
  
  // Mock data for recent activity
  const recentActivity = [
    {
      id: "1",
      type: "shop_approval",
      shopName: "Organic Paradise",
      timestamp: "2023-05-07 14:23",
      status: "Approved",
    },
    {
      id: "2",
      type: "product_flag",
      productName: "Red Wine",
      shopName: "Urban Spirits",
      timestamp: "2023-05-07 13:45",
      status: "Flagged",
    },
    {
      id: "3",
      type: "user_report",
      userName: "customer456",
      timestamp: "2023-05-07 11:12",
      status: "Resolved",
    },
    {
      id: "4",
      type: "shop_approval",
      shopName: "Tech Gadgets",
      timestamp: "2023-05-06 15:30",
      status: "Rejected",
    },
    {
      id: "5",
      type: "user_ban",
      userName: "spammer123",
      timestamp: "2023-05-06 09:22",
      status: "Banned",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link to="/superadmin/approvals">
                <CheckCircle className="mr-2 h-4 w-4" />
                Manage Approvals
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
              <Store className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShops}</div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-green-500">{approvedShops} Approved</Badge>
                <Badge className="bg-amber-500">{pendingShops} Pending</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              <Package className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Across all shops
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
              <ShoppingBag className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58</div>
              <p className="text-xs text-muted-foreground">
                +12% from yesterday
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,874</div>
              <p className="text-xs text-muted-foreground">
                157 currently online
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Pending Approvals
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingShops > 0 ? (
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground mb-2">
                    {pendingShops} shops waiting for approval
                  </div>
                  <div className="bg-white rounded-lg border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Shop Name</TableHead>
                          <TableHead>Owner</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {shops
                          .filter(shop => !shop.approved)
                          .map((shop) => (
                            <TableRow key={shop.id}>
                              <TableCell className="font-medium">{shop.name}</TableCell>
                              <TableCell>ID: {shop.ownerId}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end space-x-2">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-green-600 hover:text-green-700"
                                    onClick={() => approveShop(shop.id)}
                                  >
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => rejectShop(shop.id)}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No Pending Approvals</h3>
                  <p className="text-muted-foreground">
                    All shop requests have been processed.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart2 className="h-5 w-5 text-green-600 mr-2" />
                Platform Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="text-sm font-medium">Daily Orders</div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>75% (58/80 Target)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">User Engagement</div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>60% (3.4k/5.5k Target)</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Shop Growth</div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>45% (9/20 Weekly Target)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <h2 className="text-2xl font-bold mt-10 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    {activity.type === "shop_approval" ? "Shop Approval" :
                     activity.type === "product_flag" ? "Product Flag" :
                     activity.type === "user_report" ? "User Report" :
                     activity.type === "user_ban" ? "User Ban" : "Other"}
                  </TableCell>
                  <TableCell>
                    {activity.type === "shop_approval" ? `Shop: ${activity.shopName}` :
                     activity.type === "product_flag" ? `Product: ${activity.productName} (${activity.shopName})` :
                     activity.type === "user_report" || activity.type === "user_ban" ? `User: ${activity.userName}` : ""}
                  </TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        activity.status === "Approved" || activity.status === "Resolved" ? "bg-green-500" :
                        activity.status === "Rejected" || activity.status === "Banned" ? "bg-red-500" :
                        activity.status === "Flagged" ? "bg-amber-500" : "bg-gray-500"
                      }
                    >
                      {activity.status}
                    </Badge>
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

export default SuperAdminDashboard;
