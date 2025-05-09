const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Fetch all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quizzes', error });
    }
});

// Fetch a specific quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz', error });
    }
});

// Create a new quiz
router.post('/', async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        res.status(400).json({ message: 'Error creating quiz', error });
    }
});

// Update an existing quiz by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedQuiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json(updatedQuiz);
    } catch (error) {
        res.status(400).json({ message: 'Error updating quiz', error });
    }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!deletedQuiz) return res.status(404).json({ message: 'Quiz not found' });
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting quiz', error });
    }
});

// Fetch a specific quiz task by category and task slug
router.get('/:category/:task', async (req, res) => {
    const { category, task } = req.params;
    try {
        const quiz = await Quiz.findOne({ category });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const taskData = quiz.tasks.find((t) => t.slug === task);
        if (!taskData) return res.status(404).json({ message: 'Task not found' });

        res.json({ questions: taskData.questions });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching quiz task', error });
    }
});

// Verify an answer and unlock the next task
router.post('/verify', async (req, res) => {
    const { category, taskSlug, questionIndex, answer } = req.body;
    try {
        const quiz = await Quiz.findOne({ category });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const taskData = quiz.tasks.find((t) => t.slug === taskSlug);
        if (!taskData) return res.status(404).json({ message: 'Task not found' });

        const question = taskData.questions[questionIndex];
        if (!question) return res.status(404).json({ message: 'Question not found' });

        const isCorrect = question.correctAnswer === answer;

        res.json({ isCorrect });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying answer', error });
    }
});

// Unlock the next task
router.post('/:category/unlock-next/:task', async (req, res) => {
    const { category, task } = req.params;
    try {
        const quiz = await Quiz.findOne({ category });
        if (!quiz) return res.status(404).json({ message: 'Quiz not found' });

        const currentTaskIndex = quiz.tasks.findIndex((t) => t.slug === task);
        if (currentTaskIndex === -1 || currentTaskIndex === quiz.tasks.length - 1) {
            return res.status(400).json({ message: 'No next task to unlock' });
        }

        quiz.tasks[currentTaskIndex + 1].isUnlocked = true;
        await quiz.save();

        res.json({ message: 'Next task unlocked' });
    } catch (error) {
        res.status(500).json({ message: 'Error unlocking next task', error });
    }
});

module.exports = router;