const mongoose = require('mongoose');
const Phrase = require('./models/Phrase');
const Grammar = require('./models/Grammar');
const Quiz = require('./models/Quiz'); // Import Quiz model
const phrasesData = require('./data/pharses.json');
const grammarData = require('./data/grammar.json');
const quizzesData = require('./data/quizzes.json'); // Import quiz data

mongoose.connect('mongodb://localhost:27017/languageLearning', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const seedDB = async () => {
    try {
        await Phrase.deleteMany({});
        await Grammar.deleteMany({});
        await Quiz.deleteMany({}); // Clear quiz collection
        await Phrase.create(phrasesData);
        await Grammar.create(grammarData);
        await Quiz.create(quizzesData); // Seed quiz data
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();