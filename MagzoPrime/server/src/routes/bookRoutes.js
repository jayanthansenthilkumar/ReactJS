const express = require('express');
const router = express.Router();
const {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
  getPendingApprovalBooks,
  approveBook,
  rejectBook,
} = require('../controllers/bookController');
const { protect, admin, superAdmin } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getBooks);
router.get('/top', getTopBooks);
router.route('/:id').get(getBookById);

// Private routes
router.route('/:id/reviews').post(protect, createBookReview);

// Admin routes
router.route('/')
  .post(protect, admin, createBook);

router.route('/:id')
  .delete(protect, admin, deleteBook)
  .put(protect, admin, updateBook);

// SuperAdmin routes
router.get('/pending-approval', protect, superAdmin, getPendingApprovalBooks);
router.put('/:id/approve', protect, superAdmin, approveBook);
router.put('/:id/reject', protect, superAdmin, rejectBook);

module.exports = router;