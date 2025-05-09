const Category = require('../models/categoryModel');

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Fetch category by slug
// @route   GET /api/categories/slug/:slug
// @access  Public
const getCategoryBySlug = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (category) {
      res.json(category);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete a category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (category) {
      await category.deleteOne();
      res.json({ message: 'Category removed' });
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, description, image, slug, featured, parentCategory } = req.body;

    const categoryExists = await Category.findOne({ slug });

    if (categoryExists) {
      res.status(400);
      throw new Error('Category with this slug already exists');
    }

    const category = new Category({
      name,
      description,
      image: image || '/placeholder.svg',
      slug,
      featured: featured || false,
      parentCategory: parentCategory || null,
    });

    const createdCategory = await category.save();
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name, description, image, slug, featured, parentCategory } = req.body;

    const category = await Category.findById(req.params.id);

    if (category) {
      // Check if the new slug already exists and is not the current category
      if (slug !== category.slug) {
        const categoryExists = await Category.findOne({ slug });
        if (categoryExists) {
          res.status(400);
          throw new Error('Category with this slug already exists');
        }
      }

      category.name = name || category.name;
      category.description = description || category.description;
      category.image = image || category.image;
      category.slug = slug || category.slug;
      category.featured = featured !== undefined ? featured : category.featured;
      category.parentCategory = parentCategory !== undefined ? parentCategory : category.parentCategory;

      const updatedCategory = await category.save();
      res.json(updatedCategory);
    } else {
      res.status(404);
      throw new Error('Category not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Get featured categories
// @route   GET /api/categories/featured
// @access  Public
const getFeaturedCategories = async (req, res) => {
  try {
    const categories = await Category.find({ featured: true });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  deleteCategory,
  createCategory,
  updateCategory,
  getFeaturedCategories,
};