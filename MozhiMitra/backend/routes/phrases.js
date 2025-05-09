const express = require('express');
const router = express.Router();
const Phrase = require('../models/Phrase');

router.get('/', async (req, res) => {
  const { language, category } = req.query;
  try {
    const phrases = await Phrase.findOne({});
    if (phrases) {
      const data = phrases[`${language}Phrases`][category];
      res.json(data);
    } else {
      res.status(404).json({ message: 'Phrases not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;