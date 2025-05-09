import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, ChevronRight, Minus, Plus, ShoppingCart, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { toast } from 'sonner';
import { addToCart } from '../services/cartService';
import { getBookById, getBooks, addBookReview } from '../services/bookService';
import { getCategoryById } from '../services/categoryService';
import { getCurrentUser } from '../services/userService';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [category, setCategory] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [reviewFormVisible, setReviewFormVisible] = useState(false);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });
  const [submittingReview, setSubmittingReview] = useState(false);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (id) {
      fetchBookDetails();
    }
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      setLoading(true);
      const bookData = await getBookById(id);
      setBook(bookData);
      
      // Fetch category if available
      if (bookData.category) {
        try {
          const categoryId = typeof bookData.category === 'object' 
            ? bookData.category._id 
            : bookData.category;
          const categoryData = await getCategoryById(categoryId);
          setCategory(categoryData);
        } catch (err) {
          console.error('Failed to fetch category:', err);
        }
      }
      
      // Fetch related books from the same category
      try {
        const categoryId = typeof bookData.category === 'object' 
          ? bookData.category._id 
          : bookData.category;
        
        const relatedData = await getBooks({ 
          category: categoryId,
          limit: 5
        });
        
        // Filter out the current book from related books
        const filteredBooks = relatedData.books 
          ? relatedData.books.filter(relBook => relBook._id !== id)
          : [];
          
        setRelatedBooks(filteredBooks.slice(0, 5));
      } catch (err) {
        console.error('Failed to fetch related books:', err);
      }
      
    } catch (err) {
      toast.error('Failed to load book details');
      navigate('/not-found');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (book) {
      addToCart(book._id, quantity);
      toast.success(`${quantity} ${quantity === 1 ? 'copy' : 'copies'} of "${book.title}" added to cart`);
    }
  };
  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to leave a review');
      navigate('/login?redirect=/book/' + id);
      return;
    }
    
    if (!reviewData.comment.trim()) {
      toast.error('Please enter a comment for your review');
      return;
    }
    
    try {
      setSubmittingReview(true);
      await addBookReview(id, reviewData);
      toast.success('Review submitted successfully');
      setReviewFormVisible(false);
      setReviewData({ rating: 5, comment: '' });
      
      // Refresh book data to include the new review
      fetchBookDetails();
    } catch (err) {
      toast.error('Failed to submit review');
    } finally {
      setSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p>Loading book details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Book not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Calculate discount percentage if original price is available
  const discountPercentage = book.discountPercentage || 0;
  const originalPrice = discountPercentage > 0 
    ? (book.price / (1 - discountPercentage/100)).toFixed(2) 
    : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            {category && (
              <>
                <Link to={`/category/${category.slug}`} className="hover:text-foreground">
                  {category.name}
                </Link>
                <ChevronRight className="w-4 h-4 mx-2" />
              </>
            )}
            <span className="text-foreground">{book.title}</span>
          </div>
          
          {/* Book info section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Book cover */}
            <div className="md:col-span-1">
              <div className="bg-muted rounded-lg overflow-hidden aspect-[2/3] relative">
                <img 
                  src={book.image || '/placeholder.svg'} 
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  {book.isBestseller && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Bestseller
                    </Badge>
                  )}
                  {book.isNewRelease && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      New Release
                    </Badge>
                  )}
                  {book.isSpecialOffer && (
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      Special Offer
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            
            {/* Book details */}
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{book.title}</h1>
              <p className="text-xl mb-4">by <span className="font-medium">{book.author}</span></p>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(book.rating || 0) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm">
                  {book.rating?.toFixed(1) || "No ratings"} 
                  {book.numReviews > 0 && ` (${book.numReviews} review${book.numReviews !== 1 ? 's' : ''})`}
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold">${book.price?.toFixed(2)}</span>
                  {originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through ml-3">
                        ${originalPrice}
                      </span>
                      <Badge variant="outline" className="ml-3 text-red-600 border-red-200 bg-red-50">
                        {discountPercentage}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {book.countInStock > 0 ? (
                    <>
                      <span className="text-green-600 font-medium">In Stock</span>
                      {book.countInStock < 10 && ` - Only ${book.countInStock} left`}
                    </>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </p>
              </div>
              
              {/* Add to cart section */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center border rounded-md">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-2 w-10 text-center">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="flex-grow max-w-xs"
                  disabled={book.countInStock === 0}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              {/* Book metadata */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publisher:</span>
                  <span className="font-medium">{book.publisher || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Publication Date:</span>
                  <span className="font-medium">{book.publicationDate || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pages:</span>
                  <span className="font-medium">{book.pages || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language:</span>
                  <span className="font-medium">{book.language || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-medium">{book.isbn || 'Not specified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">
                    {category?.name || 
                     (typeof book.category === 'object' ? book.category.name : 'Not specified')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Format:</span>
                  <span className="font-medium capitalize">{book.format || 'Not specified'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Book description and details tabs */}
          <Tabs defaultValue="description" className="mb-12">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="py-6">
              <h2 className="text-xl font-serif font-bold mb-4">About the Book</h2>
              <p className="text-muted-foreground whitespace-pre-line">{book.description || 'No description available.'}</p>
            </TabsContent>
            
            <TabsContent value="details" className="py-6">
              <h2 className="text-xl font-serif font-bold mb-4">Book Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Product Information</h3>
                  <table className="w-full text-sm">
                    <tbody>
                      <tr>
                        <td className="py-2 text-muted-foreground">Publisher</td>
                        <td className="py-2">{book.publisher || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Publication Date</td>
                        <td className="py-2">{book.publicationDate || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">ISBN</td>
                        <td className="py-2">{book.isbn || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Language</td>
                        <td className="py-2">{book.language || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Pages</td>
                        <td className="py-2">{book.pages || 'Not specified'}</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-muted-foreground">Format</td>
                        <td className="py-2 capitalize">{book.format || 'Not specified'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="bg-muted/50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Categories</h3>
                  <p className="mb-2 text-sm">
                    {category && (
                      <Link to={`/category/${category.slug}`} className="inline-block mr-2 mb-2">
                        <Badge variant="secondary" className="text-sm">
                          {category.name}
                        </Badge>
                      </Link>
                    )}
                    {book.genres && book.genres.map(genre => (
                      <Badge key={genre} variant="secondary" className="inline-block mr-2 mb-2 text-sm">
                        {genre}
                      </Badge>
                    ))}
                  </p>
                  <h3 className="font-medium mb-2 mt-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-sm">Books</Badge>
                    {category && (
                      <Badge variant="outline" className="text-sm">{category.name}</Badge>
                    )}
                    <Badge variant="outline" className="text-sm">{book.author}</Badge>
                    {book.isBestseller && <Badge variant="outline" className="text-sm">Bestseller</Badge>}
                    {book.isNewRelease && <Badge variant="outline" className="text-sm">New Release</Badge>}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews" className="py-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif font-bold">Customer Reviews</h2>
                {!reviewFormVisible && (
                  <Button onClick={() => setReviewFormVisible(true)}>
                    Write a Review
                  </Button>
                )}
              </div>
              
              {reviewFormVisible && (
                <div className="bg-muted/30 p-6 rounded-md mb-6">
                  <h3 className="font-medium mb-4">Write Your Review</h3>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Rating
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewData({ ...reviewData, rating: star })}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-6 h-6 ${
                                star <= reviewData.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Review
                      </label>
                      <textarea
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        value={reviewData.comment}
                        onChange={(e) =>
                          setReviewData({ ...reviewData, comment: e.target.value })
                        }
                        placeholder="Share your thoughts about this book..."
                        required
                      ></textarea>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setReviewFormVisible(false)}
                        disabled={submittingReview}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={submittingReview}>
                        {submittingReview && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Submit Review
                      </Button>
                    </div>
                  </form>
                </div>
              )}
              
              {book.reviews && book.reviews.length > 0 ? (
                <div className="space-y-6">
                  {book.reviews.map((review, index) => (
                    <div 
                      key={index} 
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{review.name}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/50 p-6 rounded-md text-center">
                  <p className="text-muted-foreground">
                    Be the first to review this book!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Related books */}
          {relatedBooks.length > 0 && (
            <div>
              <div className="flex items-end justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold">You May Also Like</h2>
                {category && (
                  <Button variant="link" asChild>
                    <Link to={`/category/${category.slug}`}>View All</Link>
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {relatedBooks.map(relatedBook => (
                  <BookCard key={relatedBook._id} book={relatedBook} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BookDetail;
