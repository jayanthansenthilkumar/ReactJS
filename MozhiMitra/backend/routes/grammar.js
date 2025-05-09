const express = require('express');
const router = express.Router();
const Grammar = require('../models/Grammar');

router.get('/', async (req, res) => {
  const { language, category, subcategory } = req.query;

  try {
    const grammar = await Grammar.findOne();

    if (!grammar) {
      return res.status(404).json({ message: 'Grammar data not found' });
    }

    const languageData = grammar[`${language}Grammar`];
    if (!languageData) {
      return res.status(404).json({ message: `No data found for language: ${language}` });
    }

    if (category) {
      const categoryData = languageData[category];
      if (!categoryData) {
        return res.status(404).json({ message: `No data found for category: ${category}` });
      }

      // Check if the category has subcategories or directly contains content
      if (subcategory) {
        const subcategoryData = categoryData[subcategory];
        if (!subcategoryData) {
          return res.status(404).json({ message: `No data found for subcategory: ${subcategory}` });
        }
        return res.json({
          ...subcategoryData, // Exclude _id
        });
      }

      // If no subcategory is provided, check if the category directly contains content
      if (categoryData.description || categoryData.examples) {
        return res.json({
          description: categoryData.description || null,
          examples: categoryData.examples || [],
        });
      }

      // If the category has subcategories but no direct content
      return res.json({
        ...categoryData, // Exclude _id
      });
    }

    // If no category is provided, return the entire language data
    res.json({
      ...languageData, // Exclude _id
    });
  } catch (error) {
    console.error('Error fetching grammar data:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;