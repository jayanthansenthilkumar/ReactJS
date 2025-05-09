const Book = require('../models/bookModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');

// @desc    Get dashboard statistics
// @route   GET /api/dashboard/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    // Get total counts
    const bookCount = await Book.countDocuments();
    const userCount = await User.countDocuments();
    const orderCount = await Order.countDocuments();
    
    // Calculate total revenue from all paid orders
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

    // Calculate monthly growth percentages (placeholder, can be replaced with actual calculations)
    const bookGrowth = '+2% from last month';
    const userGrowth = '+5% from last month';
    const orderGrowth = '+12% from last month';
    const revenueGrowth = '+8% from last month';

    res.json({
      books: {
        count: bookCount,
        change: bookGrowth
      },
      users: {
        count: userCount,
        change: userGrowth
      },
      orders: {
        count: orderCount,
        change: orderGrowth
      },
      revenue: {
        total: totalRevenue,
        change: revenueGrowth
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent orders
// @route   GET /api/dashboard/recent-orders
// @access  Private/Admin
const getRecentOrders = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;
    
    const recentOrders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('user', 'name');
    
    res.json(recentOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get low stock books
// @route   GET /api/dashboard/low-stock
// @access  Private/Admin
const getLowStockBooks = async (req, res) => {
  try {
    const threshold = Number(req.query.threshold) || 10;
    const limit = Number(req.query.limit) || 5;
    
    const lowStockBooks = await Book.find({ countInStock: { $lt: threshold } })
      .sort({ countInStock: 1 })
      .limit(limit);
    
    res.json(lowStockBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue statistics
// @route   GET /api/dashboard/revenue
// @access  Private/Admin
const getRevenueStats = async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    
    let revenueData = [];
    const currentDate = new Date();
    
    if (period === 'monthly') {
      // Get monthly revenue for the last 6 months
      for (let i = 0; i < 6; i++) {
        const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        
        const orders = await Order.find({
          isPaid: true,
          paidAt: { $gte: month, $lte: nextMonth }
        });
        
        const monthlyRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        revenueData.push({
          period: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
          revenue: monthlyRevenue
        });
      }
    } else if (period === 'weekly') {
      // Get weekly revenue for the last 6 weeks
      for (let i = 0; i < 6; i++) {
        const weekStart = new Date(currentDate);
        weekStart.setDate(currentDate.getDate() - (7 * i + currentDate.getDay()));
        weekStart.setHours(0, 0, 0, 0);
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        weekEnd.setHours(23, 59, 59, 999);
        
        const orders = await Order.find({
          isPaid: true,
          paidAt: { $gte: weekStart, $lte: weekEnd }
        });
        
        const weeklyRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        revenueData.push({
          period: `Week ${i + 1}`,
          revenue: weeklyRevenue
        });
      }
    }
    
    // Reverse to get chronological order
    revenueData.reverse();
    
    res.json(revenueData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin sales summary
// @route   GET /api/dashboard/admin-sales
// @access  Private/SuperAdmin
const getAdminSalesSummary = async (req, res) => {
  try {
    // Get all admin users
    const adminUsers = await User.find({ role: 'admin' });
    
    const adminSalesData = [];
    
    // For each admin, calculate their sales stats
    for (const admin of adminUsers) {
      // Find books created by this admin
      const adminBooks = await Book.find({ user: admin._id });
      const bookIds = adminBooks.map(book => book._id);
      
      // Find orders containing these books
      const orders = await Order.find({ 
        'orderItems.book': { $in: bookIds },
        isPaid: true
      });
      
      // Calculate total sales and revenue
      let totalSales = 0;
      let totalRevenue = 0;
      
      orders.forEach(order => {
        order.orderItems.forEach(item => {
          if (bookIds.some(id => id.equals(item.book))) {
            totalSales += item.quantity;
            totalRevenue += item.price * item.quantity;
          }
        });
      });
      
      // Get the count of books created by this admin
      const totalBooks = adminBooks.length;
      
      // Calculate profit (simplified - just using a 30% profit margin on revenue)
      const estimatedProfit = totalRevenue * 0.3;
      
      adminSalesData.push({
        adminId: admin._id,
        adminName: admin.name,
        adminEmail: admin.email,
        totalBooks,
        totalSales,
        totalRevenue,
        estimatedProfit
      });
    }
    
    res.json(adminSalesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get detailed profit analysis
// @route   GET /api/dashboard/profit-analysis
// @access  Private/SuperAdmin
const getProfitAnalysis = async (req, res) => {
  try {
    const period = req.query.period || 'monthly';
    const currentDate = new Date();
    
    let profitData = [];
    
    if (period === 'monthly') {
      // Get monthly profit for the last 12 months
      for (let i = 0; i < 12; i++) {
        const month = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - i + 1, 0);
        
        const orders = await Order.find({
          isPaid: true,
          paidAt: { $gte: month, $lte: nextMonth }
        });
        
        const monthlyRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        
        // Calculate estimated costs (assume 70% of revenue goes to costs)
        const estimatedCost = monthlyRevenue * 0.7;
        const estimatedProfit = monthlyRevenue - estimatedCost;
        
        profitData.push({
          period: month.toLocaleString('default', { month: 'short', year: 'numeric' }),
          revenue: monthlyRevenue,
          cost: estimatedCost,
          profit: estimatedProfit,
          margin: (estimatedProfit / monthlyRevenue * 100).toFixed(2) + '%'
        });
      }
    }
    
    // Reverse to get chronological order
    profitData.reverse();
    
    res.json(profitData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get pending approval books count
// @route   GET /api/dashboard/pending-approvals
// @access  Private/SuperAdmin
const getPendingApprovalsCount = async (req, res) => {
  try {
    const pendingBooks = await Book.countDocuments({ approved: false });
    
    res.json({ pendingBooks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get overall platform stats
// @route   GET /api/dashboard/platform-stats
// @access  Private/SuperAdmin
const getPlatformStats = async (req, res) => {
  try {
    // Count users by role
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalAdmins = await User.countDocuments({ role: 'admin' });
    const totalSuperAdmins = await User.countDocuments({ role: 'superAdmin' });
    
    // Count books and approved vs unapproved
    const totalBooks = await Book.countDocuments();
    const approvedBooks = await Book.countDocuments({ approved: true });
    const pendingBooks = await Book.countDocuments({ approved: false });
    
    // Count orders and payment status
    const totalOrders = await Order.countDocuments();
    const paidOrders = await Order.countDocuments({ isPaid: true });
    const unpaidOrders = await Order.countDocuments({ isPaid: false });
    const deliveredOrders = await Order.countDocuments({ isDelivered: true });
    
    // Calculate sales and revenue metrics
    const orders = await Order.find({ isPaid: true });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
    const totalItems = orders.reduce((sum, order) => {
      return sum + order.orderItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);
    
    // Calculate average order value
    const averageOrderValue = paidOrders > 0 ? (totalRevenue / paidOrders).toFixed(2) : 0;
    
    res.json({
      users: {
        totalCustomers,
        totalAdmins,
        totalSuperAdmins,
        total: totalCustomers + totalAdmins + totalSuperAdmins
      },
      books: {
        total: totalBooks,
        approved: approvedBooks,
        pending: pendingBooks,
        approvalRate: totalBooks > 0 ? ((approvedBooks / totalBooks) * 100).toFixed(2) + '%' : '0%'
      },
      orders: {
        total: totalOrders,
        paid: paidOrders,
        unpaid: unpaidOrders,
        delivered: deliveredOrders,
        conversionRate: totalOrders > 0 ? ((paidOrders / totalOrders) * 100).toFixed(2) + '%' : '0%'
      },
      sales: {
        totalRevenue,
        totalItems,
        averageOrderValue
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getLowStockBooks,
  getRevenueStats,
  getAdminSalesSummary,
  getProfitAnalysis,
  getPendingApprovalsCount,
  getPlatformStats
};
