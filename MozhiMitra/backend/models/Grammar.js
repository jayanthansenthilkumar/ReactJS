const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  example: String,
  transliteration: String,
  translation: String,
});

const grammarCategorySchema = new mongoose.Schema({
  description: String,
  examples: [exampleSchema],
});

const grammarSchema = new mongoose.Schema({
  tamilGrammar: {
    sentenceStructure: grammarCategorySchema,
    nouns: {
      cases: grammarCategorySchema,
    },
    pronouns: {
      possessive: grammarCategorySchema,
    },
    verbs: {
      passiveVoice: grammarCategorySchema,
      causative: grammarCategorySchema,
    },
    adjectives: {
      comparativeSuperlative: grammarCategorySchema,
    },
    adverbs: {
      frequency: grammarCategorySchema,
    },
    interjections: {
      expressive: grammarCategorySchema,
    },
    numbers: grammarCategorySchema,
  },
  malayalamGrammar: {
    sentenceStructure: grammarCategorySchema,
    nouns: {
      cases: grammarCategorySchema,
    },
    pronouns: {
      possessive: grammarCategorySchema,
    },
    verbs: {
      passiveVoice: grammarCategorySchema,
      causative: grammarCategorySchema,
    },
    adjectives: {
      comparativeSuperlative: grammarCategorySchema,
    },
    adverbs: {
      frequency: grammarCategorySchema,
    },
    interjections: {
      expressive: grammarCategorySchema,
    },
    numbers: grammarCategorySchema,
  },
});

const Grammar = mongoose.model('Grammar', grammarSchema);

module.exports = Grammar;