const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  deleteCategory,
  createCategory,
  updateCategory,
  getFeaturedCategories,
} = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getCategories);
router.get('/featured', getFeaturedCategories);
router.get('/slug/:slug', getCategoryBySlug);
router.route('/:id').get(getCategoryById);

// Admin routes
router.route('/')
  .post(protect, admin, createCategory);

router.route('/:id')
  .delete(protect, admin, deleteCategory)
  .put(protect, admin, updateCategory);

module.exports = router;