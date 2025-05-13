// Simple Express server for CRUD operations
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'tasks.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..')));

// Helper function to read tasks from file
async function readTasks() {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty array
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
}

// Helper function to write tasks to file
async function writeTasks(tasks) {
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

// API Routes

// Get all tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve tasks' });
    }
});

// Get a single task by ID
app.get('/api/tasks/:id', async (req, res) => {
    try {
        const tasks = await readTasks();
        const task = tasks.find(task => task.id === req.params.id);
        
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve task' });
    }
});

// Create a new task
app.post('/api/tasks', async (req, res) => {
    try {
        const tasks = await readTasks();
        const newTask = {
            id: Date.now().toString(),
            title: req.body.title,
            description: req.body.description || '',
            priority: req.body.priority || 'medium',
            date: req.body.date || new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString()
        };
        
        tasks.push(newTask);
        await writeTasks(tasks);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task' });
    }
});

// Update an existing task
app.put('/api/tasks/:id', async (req, res) => {
    try {
        let tasks = await readTasks();
        const taskIndex = tasks.findIndex(task => task.id === req.params.id);
        
        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                title: req.body.title || tasks[taskIndex].title,
                description: req.body.description !== undefined ? req.body.description : tasks[taskIndex].description,
                priority: req.body.priority || tasks[taskIndex].priority,
                date: req.body.date || tasks[taskIndex].date
            };
            
            await writeTasks(tasks);
            res.json(tasks[taskIndex]);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

// Delete a task
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        let tasks = await readTasks();
        const filteredTasks = tasks.filter(task => task.id !== req.params.id);
        
        if (tasks.length !== filteredTasks.length) {
            await writeTasks(filteredTasks);
            res.json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});