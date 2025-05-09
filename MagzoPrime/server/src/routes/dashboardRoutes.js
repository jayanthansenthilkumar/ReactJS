const express = require('express');
const router = express.Router();
const { 
  getDashboardStats, 
  getRecentOrders, 
  getLowStockBooks, 
  getRevenueStats,
  getAdminSalesSummary,
  getProfitAnalysis,
  getPendingApprovalsCount,
  getPlatformStats 
} = require('../controllers/dashboardController');
const { protect, admin, superAdmin } = require('../middleware/authMiddleware');

// Regular admin routes
router.route('/stats').get(protect, admin, getDashboardStats);
router.route('/recent-orders').get(protect, admin, getRecentOrders);
router.route('/low-stock').get(protect, admin, getLowStockBooks);
router.route('/revenue').get(protect, admin, getRevenueStats);

// SuperAdmin routes
router.route('/admin-sales').get(protect, superAdmin, getAdminSalesSummary);
router.route('/profit-analysis').get(protect, superAdmin, getProfitAnalysis);
router.route('/pending-approvals').get(protect, superAdmin, getPendingApprovalsCount);
router.route('/platform-stats').get(protect, superAdmin, getPlatformStats);

module.exports = router;