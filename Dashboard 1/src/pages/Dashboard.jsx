import React from 'react';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaChartLine 
} from 'react-icons/fa';

import StatCard from '../components/dashboard/StatCard';
import ChartCard from '../components/dashboard/ChartCard';
import Card from '../components/dashboard/Card';

const Dashboard = () => {
  // Sample data for charts
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4000 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5000 },
  ];
  
  const trafficData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  // Recent orders for the table
  const recentOrders = [
    { id: '#ORD-001', customer: 'John Doe', status: 'Completed', total: '$356.00' },
    { id: '#ORD-002', customer: 'Jane Smith', status: 'Processing', total: '$125.50' },
    { id: '#ORD-003', customer: 'Robert Brown', status: 'Pending', total: '$542.75' },
    { id: '#ORD-004', customer: 'Emma Wilson', status: 'Completed', total: '$211.25' },
    { id: '#ORD-005', customer: 'Michael Davis', status: 'Cancelled', total: '$89.00' },
  ];

  // Top selling products
  const topProducts = [
    { name: 'Wireless Headphones', sold: 142, revenue: '$12,500' },
    { name: 'Smart Watch', sold: 115, revenue: '$9,200' },
    { name: 'Bluetooth Speaker', sold: 95, revenue: '$5,700' },
    { name: 'Laptop Stand', sold: 76, revenue: '$3,800' },
  ];

  return (
    <div className="dashboard-page">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <StatCard 
          title="Total Users" 
          value="12,493" 
          icon={<FaUsers size={24} />} 
          color="#4e73df" 
        />
        <StatCard 
          title="Total Orders" 
          value="643" 
          icon={<FaShoppingCart size={24} />} 
          color="#1cc88a" 
        />
        <StatCard 
          title="Total Revenue" 
          value="$45,291" 
          icon={<FaDollarSign size={24} />} 
          color="#f6c23e" 
        />
        <StatCard 
          title="Growth Rate" 
          value="+24%" 
          icon={<FaChartLine size={24} />} 
          color="#36b9cc" 
        />
      </div>
      
      <div className="charts-grid">
        <ChartCard 
          title="Revenue Overview" 
          data={revenueData} 
          dataKey="value" 
          stroke="#4e73df" 
          fill="#4e73df33" 
        />
        <ChartCard 
          title="Weekly Traffic" 
          data={trafficData} 
          dataKey="value" 
          stroke="#1cc88a" 
          fill="#1cc88a33" 
        />
      </div>
      
      <div className="tables-grid">
        <Card title="Recent Orders">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        
        <Card title="Top Selling Products">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>{product.sold}</td>
                  <td>{product.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;