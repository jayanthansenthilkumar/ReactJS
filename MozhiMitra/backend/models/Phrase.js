const mongoose = require('mongoose');

const phraseSchema = new mongoose.Schema({
  phrase: String,
  transliteration: String,
  meaning: String
});

const categoriesSchema = new mongoose.Schema({
  greetings: [phraseSchema],
  basics: [phraseSchema],
  travel: [phraseSchema],
  commonGreetings: [phraseSchema],
  informalGreetings: [phraseSchema],
  festivalGreetings: [phraseSchema],
  meetingAfterLongTime: [phraseSchema],
  departureGreetings: [phraseSchema],
  respectfulGreetings: [phraseSchema],
  basicConversations: [phraseSchema],
  casualConversations: [phraseSchema],
  askingForHelp: [phraseSchema],
  basicRequests: [phraseSchema],
  endingConversation: [phraseSchema]
});

const languageSchema = new mongoose.Schema({
  tamilPhrases: categoriesSchema,
  malayalamPhrases: categoriesSchema
});

module.exports = mongoose.model('Phrase', languageSchema);