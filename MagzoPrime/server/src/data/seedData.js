const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Models
const User = require('../models/userModel');
const Category = require('../models/categoryModel');
const Book = require('../models/bookModel');
const Order = require('../models/orderModel');

// Config
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const connectDB = require('../config/db');

// Sample data
const users = [
  {
    name: 'Admin User',
    email: 'admin@magzoprime.com',
    password: 'admin123',
    isAdmin: true,
    address: {
      street: '123 Admin Street',
      city: 'Admin City',
      state: 'AS',
      postalCode: '12345',
      country: 'USA'
    },
    phone: '555-123-4567'
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    address: {
      street: '456 Main St',
      city: 'Boston',
      state: 'MA',
      postalCode: '02108',
      country: 'USA'
    },
    phone: '555-987-6543'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'jane123',
    address: {
      street: '789 Elm St',
      city: 'Chicago',
      state: 'IL',
      postalCode: '60601',
      country: 'USA'
    },
    phone: '555-555-5555'
  }
];

const categories = [
  {
    name: 'Fiction',
    description: 'Stories from the imagination',
    slug: 'fiction',
    featured: true,
    image: '/images/categories/fiction.jpg'
  },
  {
    name: 'Non-Fiction',
    description: 'Facts, true stories, and knowledge',
    slug: 'non-fiction',
    featured: true,
    image: '/images/categories/non-fiction.jpg'
  },
  {
    name: 'Children\'s Books',
    description: 'Books for young readers',
    slug: 'children',
    featured: true,
    image: '/images/categories/children.jpg'
  },
  {
    name: 'Academic',
    description: 'Educational and scholarly works',
    slug: 'academic',
    featured: false,
    image: '/images/categories/academic.jpg'
  },
  {
    name: 'Poetry',
    description: 'Artistic arrangement of words expressing feelings and ideas',
    slug: 'poetry',
    featured: false,
    image: '/images/categories/poetry.jpg'
  },
  {
    name: 'Comics & Graphic Novels',
    description: 'Stories told through sequential art and illustrations',
    slug: 'comics-graphic-novels',
    featured: false,
    image: '/images/categories/comics.jpg'
  }
];

// Import data function
const importData = async () => {
  try {
    // Connect to DB
    await connectDB();
    
    // Clear all existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Book.deleteMany();
    await Order.deleteMany();
    
    console.log('Data cleared...');
    
    // Create users with hashed passwords
    const createdUsers = await User.insertMany(
      users.map(user => ({
        ...user,
        password: bcrypt.hashSync(user.password, 10)
      }))
    );
    
    const adminUser = createdUsers[0]._id;
    
    console.log('Users added...');
    
    // Create categories
    const createdCategories = await Category.insertMany(categories);
    
    console.log('Categories added...');
    
    // Prepare books data with references to categories and admin user
    const sampleBooks = [
      {
        title: 'The Midnight Library',
        author: 'Matt Haig',
        image: '/images/books/midnight-library.jpg',
        category: createdCategories[0]._id, // Fiction
        user: adminUser,
        description: 'Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret.',
        price: 16.99,
        countInStock: 25,
        rating: 4.5,
        numReviews: 12,
        publisher: 'Viking',
        publicationDate: '2020-08-13',
        isbn: '978-0525559474',
        language: 'English',
        pages: 304,
        format: 'Hardcover',
        isBestseller: true,
        isNewRelease: false,
        genres: ['Literary Fiction', 'Fantasy', 'Science Fiction'],
      },
      {
        title: 'Educated',
        author: 'Tara Westover',
        image: '/images/books/educated.jpg',
        category: createdCategories[1]._id, // Non-Fiction
        user: adminUser,
        description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
        price: 14.99,
        countInStock: 27,
        rating: 4.7,
        numReviews: 18,
        publisher: 'Random House',
        publicationDate: '2018-02-20',
        isbn: '978-0399590504',
        language: 'English',
        pages: 352,
        format: 'Paperback',
        isBestseller: true,
        isNewRelease: false,
        isSpecialOffer: true,
        discountPercentage: 20,
        genres: ['Biography', 'Memoir', 'Education'],
      },
      {
        title: 'The House in the Cerulean Sea',
        author: 'TJ Klune',
        image: '/images/books/cerulean-sea.jpg',
        category: createdCategories[0]._id, // Fiction
        user: adminUser,
        description: 'A magical island. A dangerous task. A burning secret. Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records.',
        price: 18.99,
        countInStock: 15,
        rating: 4.8,
        numReviews: 22,
        publisher: 'Tor Books',
        publicationDate: '2020-03-17',
        isbn: '978-1250217288',
        language: 'English',
        pages: 400,
        format: 'Hardcover',
        isBestseller: false,
        isNewRelease: false,
        isSpecialOffer: false,
        genres: ['Fantasy', 'LGBT', 'Fiction'],
      },
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        image: '/images/books/atomic-habits.jpg',
        category: createdCategories[1]._id, // Non-Fiction
        user: adminUser,
        description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies.',
        price: 11.99,
        countInStock: 54,
        rating: 4.9,
        numReviews: 42,
        publisher: 'Avery',
        publicationDate: '2018-10-16',
        isbn: '978-0735211292',
        language: 'English',
        pages: 320,
        format: 'Hardcover',
        isBestseller: true,
        isNewRelease: false,
        isSpecialOffer: true,
        discountPercentage: 25,
        genres: ['Self-Help', 'Personal Development', 'Psychology'],
      },
      {
        title: 'The Very Hungry Caterpillar',
        author: 'Eric Carle',
        image: '/images/books/hungry-caterpillar.jpg',
        category: createdCategories[2]._id, // Children's Books
        user: adminUser,
        description: 'The classic children\'s book featuring a caterpillar eating his way through the week.',
        price: 8.99,
        countInStock: 67,
        rating: 4.9,
        numReviews: 56,
        publisher: 'Philomel Books',
        publicationDate: '1969-03-20',
        isbn: '978-0399226908',
        language: 'English',
        pages: 26,
        format: 'Hardcover',
        isBestseller: false,
        isNewRelease: false,
        isSpecialOffer: false,
        genres: ['Picture Book', 'Early Learning', 'Classics'],
      },
      {
        title: 'Principles of Economics',
        author: 'N. Gregory Mankiw',
        image: '/images/books/economics.jpg',
        category: createdCategories[3]._id, // Academic
        user: adminUser,
        description: 'Now you can master the principles of economics with the help of the most popular, widely-used economics textbook by students worldwide -- Mankiw\'s PRINCIPLES OF ECONOMICS, 9E.',
        price: 169.99,
        countInStock: 12,
        rating: 4.5,
        numReviews: 8,
        publisher: 'Cengage Learning',
        publicationDate: '2020-01-01',
        isbn: '978-0357038314',
        language: 'English',
        pages: 912,
        format: 'Hardcover',
        isBestseller: false,
        isNewRelease: false,
        isSpecialOffer: true,
        discountPercentage: 15,
        genres: ['Textbook', 'Economics', 'Business'],
      },
      {
        title: 'The Sun and Her Flowers',
        author: 'Rupi Kaur',
        image: '/images/books/sun-flowers.jpg',
        category: createdCategories[4]._id, // Poetry
        user: adminUser,
        description: 'From Rupi Kaur, the bestselling author of milk and honey, comes her long-awaited second collection of poetry.',
        price: 13.99,
        countInStock: 29,
        rating: 4.6,
        numReviews: 15,
        publisher: 'Andrews McMeel Publishing',
        publicationDate: '2017-10-03',
        isbn: '978-1449486792',
        language: 'English',
        pages: 256,
        format: 'Paperback',
        isBestseller: false,
        isNewRelease: true,
        isSpecialOffer: false,
        genres: ['Modern Poetry', 'Women\'s Poetry', 'Love Poems'],
      },
      {
        title: 'Batman: Year One',
        author: 'Frank Miller',
        image: '/images/books/batman.jpg',
        category: createdCategories[5]._id, // Comics & Graphic Novels
        user: adminUser,
        description: 'In 1986, Frank Miller and David Mazzucchelli produced this groundbreaking reinterpretation of the origin of Batman—who he is, and how he came to be.',
        price: 14.99,
        countInStock: 23,
        rating: 4.8,
        numReviews: 32,
        publisher: 'DC Comics',
        publicationDate: '1988-01-01',
        isbn: '978-1401207526',
        language: 'English',
        pages: 144,
        format: 'Paperback',
        isBestseller: false,
        isNewRelease: false,
        isSpecialOffer: false,
        genres: ['Superhero', 'Graphic Novel', 'DC Comics'],
      },
    ];
    
    // Create books
    const createdBooks = await Book.insertMany(sampleBooks);
    
    console.log('Books added...');
    
    // Create sample orders
    const sampleOrders = [
      {
        user: createdUsers[1]._id, // John Doe
        orderItems: [
          {
            title: createdBooks[0].title,
            qty: 2,
            image: createdBooks[0].image,
            price: createdBooks[0].price,
            book: createdBooks[0]._id,
          },
          {
            title: createdBooks[3].title,
            qty: 1,
            image: createdBooks[3].image,
            price: createdBooks[3].price,
            book: createdBooks[3]._id,
          },
        ],
        shippingAddress: {
          address: '456 Main St',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA',
        },
        paymentMethod: 'Credit Card',
        paymentResult: {
          id: 'sample_payment_id_1',
          status: 'Completed',
          update_time: new Date().toISOString(),
          email_address: 'john@example.com',
        },
        taxPrice: 4.64,
        shippingPrice: 5.99,
        totalPrice: 57.60,
        isPaid: true,
        paidAt: new Date(),
        isDelivered: false,
        orderStatus: 'Processing',
        trackingNumber: 'TRK12345678',
      },
      {
        user: createdUsers[2]._id, // Jane Smith
        orderItems: [
          {
            title: createdBooks[1].title,
            qty: 1,
            image: createdBooks[1].image,
            price: createdBooks[1].price,
            book: createdBooks[1]._id,
          },
          {
            title: createdBooks[4].title,
            qty: 3,
            image: createdBooks[4].image,
            price: createdBooks[4].price,
            book: createdBooks[4]._id,
          },
        ],
        shippingAddress: {
          address: '789 Elm St',
          city: 'Chicago',
          postalCode: '60601',
          country: 'USA',
        },
        paymentMethod: 'PayPal',
        paymentResult: {
          id: 'sample_payment_id_2',
          status: 'Completed',
          update_time: new Date().toISOString(),
          email_address: 'jane@example.com',
        },
        taxPrice: 3.37,
        shippingPrice: 5.99,
        totalPrice: 47.95,
        isPaid: true,
        paidAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        isDelivered: true,
        deliveredAt: new Date(),
        orderStatus: 'Delivered',
        trackingNumber: 'TRK87654321',
      },
      {
        user: createdUsers[1]._id, // John Doe (another order)
        orderItems: [
          {
            title: createdBooks[2].title,
            qty: 1,
            image: createdBooks[2].image,
            price: createdBooks[2].price,
            book: createdBooks[2]._id,
          },
        ],
        shippingAddress: {
          address: '456 Main St',
          city: 'Boston',
          postalCode: '02108',
          country: 'USA',
        },
        paymentMethod: 'Credit Card',
        taxPrice: 1.90,
        shippingPrice: 5.99,
        totalPrice: 26.88,
        isPaid: false,
        isDelivered: false,
        orderStatus: 'Processing',
      },
    ];
    
    await Order.insertMany(sampleOrders);
    
    console.log('Orders added...');
    console.log('Data Import Success!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Delete all data function
const destroyData = async () => {
  try {
    // Connect to DB
    await connectDB();
    
    // Clear all existing data
    await User.deleteMany();
    await Category.deleteMany();
    await Book.deleteMany();
    await Order.deleteMany();
    
    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Determine which function to run based on command line argument
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}