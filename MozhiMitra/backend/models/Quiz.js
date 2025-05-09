const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    options: [String],
    correctAnswer: String,
    explanation: String,
});

const taskSchema = new mongoose.Schema({
    id: String,
    title: String,
    description: String,
    isUnlocked: Boolean,
    slug: String,
    questions: [questionSchema],
});

const quizSchema = new mongoose.Schema({
    category: String,
    title: String,
    description: String,
    tasks: [taskSchema],
});

module.exports = mongoose.model('Quiz', quizSchema);