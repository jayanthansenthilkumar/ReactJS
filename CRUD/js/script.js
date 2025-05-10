// Task Management CRUD Application

// DOM Elements
const taskForm = document.getElementById('task-form');
const tasksList = document.getElementById('tasks-list');
const taskTitle = document.getElementById('task-title');
const taskDescription = document.getElementById('task-description');
const taskPriority = document.getElementById('task-priority');
const taskDate = document.getElementById('task-date');
const submitBtn = document.getElementById('submit-btn');
const updateBtn = document.getElementById('update-btn');
const cancelBtn = document.getElementById('cancel-btn');
const searchTasks = document.getElementById('search-tasks');
const filterPriority = document.getElementById('filter-priority');
const sortTasks = document.getElementById('sort-tasks');
const themeToggle = document.querySelector('.theme-toggle');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const confirmDialog = document.getElementById('confirm-dialog');
const confirmDelete = document.getElementById('confirm-delete');
const cancelDelete = document.getElementById('cancel-delete');

// Global variables
let tasks = [];
let currentTaskId = null;
let taskToDelete = null;

// Initialize the application
function init() {
    loadTasksFromStorage();
    renderTasks();
    setupEventListeners();
    setupTheme();
    setDefaultDate();
}

// Set today's date as the default date in the date picker
function setDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    taskDate.value = `${year}-${month}-${day}`;
}

// Load tasks from localStorage
function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
}

// Save tasks to localStorage
function saveTasksToStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Setup event listeners
function setupEventListeners() {
    // Form submission for adding a task
    taskForm.addEventListener('submit', handleSubmit);
    
    // Update and cancel buttons
    updateBtn.addEventListener('click', handleUpdate);
    cancelBtn.addEventListener('click', cancelUpdate);
    
    // Search, filter, and sort functionality
    searchTasks.addEventListener('input', renderTasks);
    filterPriority.addEventListener('change', renderTasks);
    sortTasks.addEventListener('change', renderTasks);
    
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Confirmation dialog
    confirmDelete.addEventListener('click', confirmDeleteTask);
    cancelDelete.addEventListener('click', closeConfirmDialog);
}

// Setup theme based on user preference
function setupTheme() {
    const isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    if (isDarkTheme) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle between light and dark theme
function toggleTheme() {
    const isDarkTheme = document.body.classList.toggle('dark-theme');
    localStorage.setItem('darkTheme', isDarkTheme);
    
    if (isDarkTheme) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    showNotification('Theme updated', 'info');
}

// Handle form submission for adding a task
function handleSubmit(e) {
    e.preventDefault();
    
    if (!taskTitle.value.trim()) {
        showNotification('Task title is required', 'error');
        return;
    }
    
    const newTask = {
        id: Date.now().toString(),
        title: taskTitle.value.trim(),
        description: taskDescription.value.trim(),
        priority: taskPriority.value,
        date: taskDate.value || formatDate(new Date()),
        createdAt: new Date().toISOString()
    };
    
    tasks.push(newTask);
    saveTasksToStorage();
    resetForm();
    renderTasks();
    
    showNotification('Task added successfully', 'success');
}

// Handle updating a task
function handleUpdate() {
    if (!taskTitle.value.trim()) {
        showNotification('Task title is required', 'error');
        return;
    }
    
    const taskIndex = tasks.findIndex(task => task.id === currentTaskId);
    
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            title: taskTitle.value.trim(),
            description: taskDescription.value.trim(),
            priority: taskPriority.value,
            date: taskDate.value || formatDate(new Date())
        };
        
        saveTasksToStorage();
        resetForm();
        renderTasks();
        
        showNotification('Task updated successfully', 'success');
    }
}

// Reset the form and UI state
function resetForm() {
    taskForm.reset();
    setDefaultDate();
    currentTaskId = null;
    submitBtn.style.display = 'block';
    updateBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    taskTitle.focus();
}

// Cancel the update operation
function cancelUpdate() {
    resetForm();
}

// Edit a task
function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    
    if (task) {
        currentTaskId = task.id;
        taskTitle.value = task.title;
        taskDescription.value = task.description || '';
        taskPriority.value = task.priority;
        taskDate.value = task.date;
        
        submitBtn.style.display = 'none';
        updateBtn.style.display = 'inline-block';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll to the form
        taskForm.scrollIntoView({ behavior: 'smooth' });
    }
}

// Delete a task
function deleteTask(taskId) {
    taskToDelete = taskId;
    openConfirmDialog();
}

// Open the confirmation dialog
function openConfirmDialog() {
    confirmDialog.style.display = 'flex';
}

// Close the confirmation dialog
function closeConfirmDialog() {
    confirmDialog.style.display = 'none';
}

// Confirm task deletion
function confirmDeleteTask() {
    if (taskToDelete) {
        tasks = tasks.filter(task => task.id !== taskToDelete);
        saveTasksToStorage();
        renderTasks();
        closeConfirmDialog();
        showNotification('Task deleted successfully', 'info');
        taskToDelete = null;
    }
}

// Render all tasks with filtering and sorting
function renderTasks() {
    let filteredTasks = [...tasks];
    
    // Apply search filter
    const searchTerm = searchTasks.value.toLowerCase().trim();
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task => 
            task.title.toLowerCase().includes(searchTerm) || 
            (task.description && task.description.toLowerCase().includes(searchTerm))
        );
    }
    
    // Apply priority filter
    const priorityValue = filterPriority.value;
    if (priorityValue !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.priority === priorityValue);
    }
    
    // Apply sorting
    const sortValue = sortTasks.value;
    filteredTasks.sort((a, b) => {
        if (sortValue === 'date-asc') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortValue === 'date-desc') {
            return new Date(a.date) - new Date(b.date);
        } else if (sortValue === 'priority') {
            const priorityOrder = { high: 1, medium: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return 0;
    });
    
    // Render to the DOM
    if (filteredTasks.length === 0) {
        tasksList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <p>No tasks found. Add a new task to get started!</p>
            </div>
        `;
    } else {
        tasksList.innerHTML = filteredTasks.map(task => `
            <div class="task-item priority-${task.priority}">
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
                    <div class="task-actions">
                        <button class="action-btn edit-btn" onclick="editTask('${task.id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn delete-btn" onclick="deleteTask('${task.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="task-metadata">
                    <span><i class="far fa-calendar"></i> ${formatDisplayDate(task.date)}</span>
                    <span class="task-priority ${task.priority}">${capitalizeFirstLetter(task.priority)} Priority</span>
                </div>
                ${task.description ? `<div class="task-description">${task.description}</div>` : ''}
            </div>
        `).join('');
    }
}

// Format date for display
function formatDisplayDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Format date to YYYY-MM-DD
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Show notification
function showNotification(message, type = 'success') {
    notificationMessage.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);