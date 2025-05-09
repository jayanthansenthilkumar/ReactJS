const mongoose = require('mongoose');

const wordPairSchema = new mongoose.Schema({
  word: String,
  translation: String,
  imageUrl: String
});

const sentenceSchema = new mongoose.Schema({
  words: [String],
  translation: String
});

const wordSetSchema = new mongoose.Schema({
  word: String,
  translation: String,
  synonyms: [String]
});

const gridSizeSchema = new mongoose.Schema({
  rows: Number,
  cols: Number
});

const taskSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  isUnlocked: Boolean,
  category: String,
  slug: String,
  wordPairs: [wordPairSchema],
  sentences: [sentenceSchema],
  wordSets: [wordSetSchema],
  gridSize: gridSizeSchema
});

const gameCategorySchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  tasks: [taskSchema]
});

const gameSchema = new mongoose.Schema({
  gameCategories: [gameCategorySchema]
});

module.exports = mongoose.model('Game', gameSchema);