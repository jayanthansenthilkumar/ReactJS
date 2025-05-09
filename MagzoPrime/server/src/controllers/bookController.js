const Book = require('../models/bookModel');

// @desc    Fetch all books
// @route   GET /api/books
// @access  Public
const getBooks = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    
    const keyword = req.query.keyword
      ? {
          title: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = req.query.category
      ? { category: req.query.category }
      : {};

    const bestseller = req.query.bestseller
      ? { isBestseller: true }
      : {};

    const newRelease = req.query.newRelease
      ? { isNewRelease: true }
      : {};

    const specialOffer = req.query.specialOffer
      ? { isSpecialOffer: true }
      : {};
      
    // Only show approved books to public unless user is admin or superAdmin
    const approvedFilter = req.user && ['admin', 'superAdmin'].includes(req.user.role) 
      ? {} 
      : { approved: true };

    const count = await Book.countDocuments({
      ...keyword,
      ...category,
      ...bestseller,
      ...newRelease,
      ...specialOffer,
      ...approvedFilter,
    });

    const books = await Book.find({
      ...keyword,
      ...category,
      ...bestseller,
      ...newRelease,
      ...specialOffer,
      ...approvedFilter,
    })
      .populate('category', 'name')
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ books, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Fetch single book
// @route   GET /api/books/:id
// @access  Public
const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('category', 'name');

    if (book) {
      res.json(book);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await book.deleteOne();
      res.json({ message: 'Book removed' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create a book
// @route   POST /api/books
// @access  Private/Admin
const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      price,
      countInStock,
      publisher,
      publicationDate,
      isbn,
      language,
      pages,
      format,
      isBestseller,
      isNewRelease,
      isSpecialOffer,
      discountPercentage,
      genres,
    } = req.body;
    
    const book = new Book({
      title,
      author,
      price,
      user: req.user._id,
      image: req.body.image || '/placeholder.svg',
      category,
      description,
      countInStock,
      publisher,
      publicationDate,
      isbn,
      language,
      pages,
      format,
      isBestseller,
      isNewRelease,
      isSpecialOffer,
      discountPercentage,
      genres,
    });

    const createdBook = await book.save();
    res.status(201).json(createdBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a book
// @route   PUT /api/books/:id
// @access  Private/Admin
const updateBook = async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      description,
      image,
      category,
      countInStock,
      publisher,
      publicationDate,
      isbn,
      language,
      pages,
      format,
      isBestseller,
      isNewRelease,
      isSpecialOffer,
      discountPercentage,
      genres,
    } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
      book.title = title || book.title;
      book.author = author || book.author;
      book.price = price || book.price;
      book.description = description || book.description;
      book.image = image || book.image;
      book.category = category || book.category;
      book.countInStock = countInStock !== undefined ? countInStock : book.countInStock;
      book.publisher = publisher || book.publisher;
      book.publicationDate = publicationDate || book.publicationDate;
      book.isbn = isbn || book.isbn;
      book.language = language || book.language;
      book.pages = pages || book.pages;
      book.format = format || book.format;
      book.isBestseller = isBestseller !== undefined ? isBestseller : book.isBestseller;
      book.isNewRelease = isNewRelease !== undefined ? isNewRelease : book.isNewRelease;
      book.isSpecialOffer = isSpecialOffer !== undefined ? isSpecialOffer : book.isSpecialOffer;
      book.discountPercentage = discountPercentage !== undefined ? discountPercentage : book.discountPercentage;
      book.genres = genres || book.genres;

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Create new review
// @route   POST /api/books/:id/reviews
// @access  Private
const createBookReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.id);

    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error('Book already reviewed');
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      book.reviews.push(review);

      book.numReviews = book.reviews.length;

      book.rating =
        book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length;

      await book.save();
      res.status(201).json({ message: 'Review added' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get top rated books
// @route   GET /api/books/top
// @access  Public
const getTopBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ rating: -1 }).limit(5);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get books pending approval
// @route   GET /api/books/pending-approval
// @access  Private/SuperAdmin
const getPendingApprovalBooks = async (req, res) => {
  try {
    const books = await Book.find({ approved: false })
      .populate('category', 'name')
      .populate('user', 'name email');
    
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve a book
// @route   PUT /api/books/:id/approve
// @access  Private/SuperAdmin
const approveBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      book.approved = true;
      book.approvedBy = req.user._id;
      book.approvedAt = Date.now();

      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// @desc    Reject a book
// @route   PUT /api/books/:id/reject
// @access  Private/SuperAdmin
const rejectBook = async (req, res) => {
  try {
    const { reason } = req.body;
    const book = await Book.findById(req.params.id);

    if (book) {
      // Delete the book or you could set a rejected flag if you want to keep track
      await book.deleteOne();
      res.json({ message: 'Book rejected and removed' });
    } else {
      res.status(404);
      throw new Error('Book not found');
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBookById,
  deleteBook,
  createBook,
  updateBook,
  createBookReview,
  getTopBooks,
  getPendingApprovalBooks,
  approveBook,
  rejectBook,
};