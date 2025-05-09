import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { ShoppingBag, User, LogOut } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getCurrentUser, setCurrentUser } from '../data/users';
import { getOrders, Order } from '../data/orders';
import { toast } from 'sonner';

const Account = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Redirect if user is not logged in
    if (!currentUser) {
      toast.error('Please login to view your account');
      navigate('/login');
      return;
    }
    
    // Fetch user's orders
    // In a real app, this would be an API call filtered by user ID
    const allOrders = getOrders();
    setOrders(allOrders.filter(order => order.userId === currentUser.id));
  }, [currentUser, navigate]);
  
  const handleLogout = () => {
    setCurrentUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  if (!currentUser) return null;
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  // Status badge color map
  const statusColorMap: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-green-100 text-green-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Account sidebar */}
            <div className="md:w-1/4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <Avatar className="h-20 w-20 mb-4">
                      <AvatarFallback className="text-xl">{getInitials(currentUser.name)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-medium">{currentUser.name}</h2>
                    <p className="text-sm text-muted-foreground">{currentUser.email}</p>
                    <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                      {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    
                    <Button className="w-full justify-start" variant="outline">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Orders
                    </Button>
                    
                    <Button className="w-full justify-start" variant="outline" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Account main content */}
            <div className="md:w-3/4">
              <Tabs defaultValue="profile">
                <TabsList className="mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>
                        Manage your personal information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <div className="mt-1 p-2 border rounded-md bg-muted/30">
                              {currentUser.name}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Email</label>
                            <div className="mt-1 p-2 border rounded-md bg-muted/30">
                              {currentUser.email}
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Role</label>
                            <div className="mt-1 p-2 border rounded-md bg-muted/30">
                              {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button disabled className="mr-2">
                        Edit Profile
                      </Button>
                      <Button variant="outline" disabled>
                        Change Password
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>
                        View your previous orders
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map(order => (
                            <div key={order.id} className="border rounded-md p-4">
                              <div className="flex flex-col md:flex-row justify-between mb-2">
                                <div>
                                  <p className="font-medium">{`Order #${order.id.slice(-5)}`}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className="mt-2 md:mt-0 md:text-right">
                                  <p className="font-medium">${order.total.toFixed(2)}</p>
                                  <p className={`text-xs px-2 py-1 rounded-full inline-block ${statusColorMap[order.status]}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 pt-2 border-t">
                                <p className="text-sm">{order.items.length} item(s)</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-muted-foreground">You haven't placed any orders yet</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
