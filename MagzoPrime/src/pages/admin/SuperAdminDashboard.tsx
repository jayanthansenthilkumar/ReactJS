import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getPlatformStats, getAdminSalesSummary, getProfitAnalysis, getPendingApprovalsCount } from '../../services/dashboardService';
import { BarChart, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, Line } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import SuperAdminLayout from '../../components/admin/SuperAdminLayout';

const SuperAdminDashboard = () => {
  const [platformStats, setPlatformStats] = useState<any>(null);
  const [adminSales, setAdminSales] = useState<any[]>([]);
  const [profitData, setProfitData] = useState<any[]>([]);
  const [pendingApprovals, setPendingApprovals] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch platform stats
        const stats = await getPlatformStats();
        setPlatformStats(stats);
        
        // Fetch admin sales data
        const salesData = await getAdminSalesSummary();
        setAdminSales(salesData);
        
        // Fetch profit analysis
        const profit = await getProfitAnalysis();
        setProfitData(profit);
        
        // Fetch pending approvals
        const { pendingBooks } = await getPendingApprovalsCount();
        setPendingApprovals(pendingBooks);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-screen">Loading...</div>
      </SuperAdminLayout>
    );
  }

  if (error) {
    return (
      <SuperAdminLayout>
        <Alert variant="destructive" className="m-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-8">Super Admin Dashboard</h1>

        {pendingApprovals > 0 && (
          <Alert className="mb-4 bg-amber-50">
            <AlertTitle>Action Required</AlertTitle>
            <AlertDescription>
              There are {pendingApprovals} books pending approval. 
              <a href="/superadmin/approvals" className="underline ml-2">Review now</a>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${platformStats?.sales?.totalRevenue?.toFixed(2) || '0.00'}</div>
              <p className="text-xs text-muted-foreground">
                From {platformStats?.orders?.paid || 0} paid orders
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats?.users?.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                {platformStats?.users?.totalCustomers || 0} customers, {platformStats?.users?.totalAdmins || 0} admins
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Books</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{platformStats?.books?.total || 0}</div>
              <p className="text-xs text-muted-foreground">
                Approval rate: {platformStats?.books?.approvalRate || '0%'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${platformStats?.sales?.averageOrderValue || '0.00'}</div>
              <p className="text-xs text-muted-foreground">
                Total items sold: {platformStats?.sales?.totalItems || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profits" className="mb-8">
          <TabsList>
            <TabsTrigger value="profits">Profit Analysis</TabsTrigger>
            <TabsTrigger value="admins">Admin Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="profits" className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Monthly Profit Analysis</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={profitData || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#8884d8" name="Revenue" />
                  <Line type="monotone" dataKey="profit" stroke="#82ca9d" name="Profit" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="admins" className="p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">Admin Sales Performance</h2>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={adminSales || []}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="adminName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalRevenue" fill="#8884d8" name="Revenue" />
                  <Bar dataKey="estimatedProfit" fill="#82ca9d" name="Profit" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              {adminSales?.map((admin) => (
                <Card key={admin.adminId}>
                  <CardHeader>
                    <CardTitle>{admin.adminName}</CardTitle>
                    <CardDescription>{admin.adminEmail}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Books Created:</span>
                        <span className="font-semibold">{admin.totalBooks}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Sales:</span>
                        <span className="font-semibold">{admin.totalSales} items</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue:</span>
                        <span className="font-semibold">${admin.totalRevenue.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Profit:</span>
                        <span className="font-semibold">${admin.estimatedProfit.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SuperAdminLayout>
  );
};

export default SuperAdminDashboard;