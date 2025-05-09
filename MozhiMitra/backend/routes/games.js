const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// Get all game categories
router.get('/', async (req, res) => {
  try {
    const games = await Game.findOne();
    if (!games) {
      return res.status(404).json({ message: 'No games found' });
    }
    res.json(games.gameCategories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching games', error: error.message });
  }
});

// Get specific game category
router.get('/:category', async (req, res) => {
  try {
    const games = await Game.findOne();
    if (!games) {
      return res.status(404).json({ message: 'No games found' });
    }

    const category = games.gameCategories.find(cat => cat.id === req.params.category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category', error: error.message });
  }
});

// Get specific task in a category
router.get('/:category/:task', async (req, res) => {
  try {
    const games = await Game.findOne();
    if (!games) {
      return res.status(404).json({ message: 'No games found' });
    }

    const category = games.gameCategories.find(cat => cat.id === req.params.category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const task = category.tasks.find(t => t.slug === req.params.task);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error: error.message });
  }
});

// Update task unlock status
router.put('/:category/:taskId/unlock', async (req, res) => {
  try {
    const result = await Game.updateOne(
      { 'gameCategories.id': req.params.category, 'gameCategories.tasks.id': req.params.taskId },
      { $set: { 'gameCategories.$[cat].tasks.$[task].isUnlocked': true } },
      {
        arrayFilters: [
          { 'cat.id': req.params.category },
          { 'task.id': req.params.taskId }
        ]
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task unlocked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error unlocking task', error: error.message });
  }
});

module.exports = router;