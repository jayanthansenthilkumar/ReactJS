const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');
const path = require('path');

// @desc    Upload an image
// @route   POST /api/upload
// @access  Private/Admin
router.post('/', protect, admin, upload.single('image'), (req, res) => {
  try {
    res.json({
      message: 'Image uploaded successfully',
      image: `/${req.file.path.replace(/\\/g, '/')}`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;