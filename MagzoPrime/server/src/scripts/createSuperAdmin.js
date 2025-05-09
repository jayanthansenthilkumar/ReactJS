const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/userModel');

// Load environment variables - try both possible locations
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

// Check if MONGO_URI or MONGODB_URI is available
let connectionString = process.env.MONGO_URI || process.env.MONGODB_URI;

if (!connectionString) {
  console.error('Error: Neither MONGO_URI nor MONGODB_URI environment variable is defined.');
  console.error('Please create a .env file in the server directory with your MongoDB connection string:');
  console.error('MONGO_URI=mongodb://your-connection-string');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(connectionString).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});

// Function to create a super admin user
const createSuperAdmin = async () => {
  try {
    // Check if a superAdmin already exists
    const superAdminExists = await User.findOne({ role: 'superAdmin' });
    
    if (superAdminExists) {
      console.log('A Super Admin already exists in the database:');
      console.log(`Email: ${superAdminExists.email}`);
      console.log(`Name: ${superAdminExists.name}`);
      process.exit(0);
    }
    
    // Create a new superAdmin user
    const superAdmin = await User.create({
      name: process.env.SUPER_ADMIN_NAME || 'Super Admin',
      email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@magzoprime.com',
      password: process.env.SUPER_ADMIN_PASSWORD || 'password123',
      role: 'superAdmin'
    });
    
    console.log(`Super Admin created: ${superAdmin.email}`);
    console.log('Please change the default password immediately after logging in!');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating Super Admin:', error.message);
    process.exit(1);
  }
};

// Run the function
createSuperAdmin();