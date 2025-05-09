import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Book as BookIcon, Users, ShoppingCart, DollarSign } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { getDashboardStats, getRecentOrders, getLowStockBooks } from '../../services/dashboardService';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    stats: {
      books: { count: 0, change: '' },
      users: { count: 0, change: '' },
      orders: { count: 0, change: '' },
      revenue: { total: 0, change: '' }
    },
    recentOrders: [],
    lowStockBooks: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch all dashboard data in parallel
        const [statsData, ordersData, booksData] = await Promise.all([
          getDashboardStats(),
          getRecentOrders(5),
          getLowStockBooks(10, 5)
        ]);
        
        setDashboardData({
          stats: statsData,
          recentOrders: ordersData,
          lowStockBooks: booksData
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  
  const stats = [
    {
      name: 'Total Books',
      value: dashboardData.stats.books.count,
      icon: <BookIcon className="h-8 w-8 text-blue-500" />,
      change: dashboardData.stats.books.change,
    },
    {
      name: 'Total Users',
      value: dashboardData.stats.users.count,
      icon: <Users className="h-8 w-8 text-green-500" />,
      change: dashboardData.stats.users.change,
    },
    {
      name: 'Total Orders',
      value: dashboardData.stats.orders.count,
      icon: <ShoppingCart className="h-8 w-8 text-amber-500" />,
      change: dashboardData.stats.orders.change,
    },
    {
      name: 'Total Revenue',
      value: `$${dashboardData.stats.revenue.total.toFixed(2)}`,
      icon: <DollarSign className="h-8 w-8 text-red-500" />,
      change: dashboardData.stats.revenue.change,
    },
  ];
  
  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg font-medium">Loading dashboard data...</div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="bg-red-100 p-4 rounded-md mb-6 text-red-700">
          {error}
        </div>
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-serif font-bold">Dashboard</h1>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full p-2 bg-muted">
                  {stat.icon}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2 mt-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {dashboardData.recentOrders.length > 0 ? (
              <div className="divide-y">
                {dashboardData.recentOrders.map((order) => (
                  <div key={order._id} className="py-3 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{`Order #${order._id.slice(-5)}`}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                      <p className="text-xs px-2 py-1 rounded-full bg-muted inline-block capitalize">
                        {order.orderStatus || (order.isPaid ? 'Paid' : 'Pending')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center py-4 text-muted-foreground">No orders yet</p>
            )}
          </CardContent>
        </Card>
        
        {/* Low Stock Books */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {dashboardData.lowStockBooks.map((book) => (
                <div key={book._id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-10 h-14 bg-muted mr-4">
                      <img 
                        src={book.image} 
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{book.title}</p>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${book.countInStock < 5 ? 'text-red-500' : 'text-amber-500'}`}>
                      {book.countInStock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
