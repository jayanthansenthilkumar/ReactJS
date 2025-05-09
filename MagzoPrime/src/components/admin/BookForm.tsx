import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Loader2 } from 'lucide-react';
import { createBook, getBookById, updateBook } from '../../services/bookService';
import { getCategories } from '../../services/categoryService';
import { toast } from 'sonner';

interface BookFormProps {
  bookId?: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ bookId, onSuccess, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [fetchingBook, setFetchingBook] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    price: '',
    image: '',
    category: '',
    countInStock: '',
    publisher: '',
    publicationDate: '',
    isbn: '',
    language: '',
    pages: '',
    format: '',
    isBestseller: false,
    isNewRelease: false,
    isSpecialOffer: false,
    discountPercentage: '',
    genres: [],
  });

  // Fetch categories when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // If bookId is provided, fetch the book data for editing
  useEffect(() => {
    if (bookId) {
      fetchBookDetails();
    }
  }, [bookId]);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      toast.error('Failed to load categories');
    }
  };

  const fetchBookDetails = async () => {
    try {
      setFetchingBook(true);
      const book = await getBookById(bookId);
      setFormData({
        title: book.title || '',
        author: book.author || '',
        description: book.description || '',
        price: book.price ? book.price.toString() : '',
        image: book.image || '',
        category: book.category?._id || book.category || '',
        countInStock: book.countInStock ? book.countInStock.toString() : '',
        publisher: book.publisher || '',
        publicationDate: book.publicationDate || '',
        isbn: book.isbn || '',
        language: book.language || '',
        pages: book.pages ? book.pages.toString() : '',
        format: book.format || '',
        isBestseller: book.isBestseller || false,
        isNewRelease: book.isNewRelease || false,
        isSpecialOffer: book.isSpecialOffer || false,
        discountPercentage: book.discountPercentage ? book.discountPercentage.toString() : '',
        genres: book.genres || [],
      });
    } catch (err) {
      toast.error('Failed to fetch book details');
    } finally {
      setFetchingBook(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.title || !formData.author || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Prepare data for API
    const bookData = {
      ...formData,
      price: parseFloat(formData.price),
      countInStock: parseInt(formData.countInStock),
      pages: formData.pages ? parseInt(formData.pages) : undefined,
      discountPercentage: formData.discountPercentage ? parseInt(formData.discountPercentage) : 0,
    };
    
    setLoading(true);
    
    try {
      if (bookId) {
        await updateBook(bookId, bookData);
      } else {
        await createBook(bookData);
      }
      onSuccess();
    } catch (err) {
      toast.error(err.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingBook) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading book details...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Book title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author">Author *</Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Price ($) *</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="29.99"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="countInStock">Stock Quantity *</Label>
            <Input
              id="countInStock"
              name="countInStock"
              type="number"
              min="0"
              value={formData.countInStock}
              onChange={handleChange}
              placeholder="100"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="isbn">ISBN</Label>
            <Input
              id="isbn"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="978-3-16-148410-0"
            />
          </div>
        </div>
          
        {/* Right Column */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Book description"
              rows={4}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="publisher">Publisher</Label>
            <Input
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              placeholder="Publisher name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="publicationDate">Publication Date</Label>
            <Input
              id="publicationDate"
              name="publicationDate"
              type="date"
              value={formData.publicationDate}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="pages">Number of Pages</Label>
            <Input
              id="pages"
              name="pages"
              type="number"
              min="1"
              value={formData.pages}
              onChange={handleChange}
              placeholder="300"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Input
              id="language"
              name="language"
              value={formData.language}
              onChange={handleChange}
              placeholder="English"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="format">Format</Label>
              <Select
                value={formData.format}
                onValueChange={(value) => handleSelectChange('format', value)}
              >
                <SelectTrigger id="format">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hardcover">Hardcover</SelectItem>
                  <SelectItem value="paperback">Paperback</SelectItem>
                  <SelectItem value="ebook">E-Book</SelectItem>
                  <SelectItem value="audiobook">Audiobook</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="discountPercentage">Discount (%)</Label>
              <Input
                id="discountPercentage"
                name="discountPercentage"
                type="number"
                min="0"
                max="100"
                value={formData.discountPercentage}
                onChange={handleChange}
                placeholder="10"
              />
            </div>
          </div>
          
          {/* Book Flags */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="isBestseller"
                name="isBestseller"
                checked={formData.isBestseller}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isBestseller: checked }))
                }
              />
              <Label htmlFor="isBestseller">Bestseller</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isNewRelease"
                name="isNewRelease"
                checked={formData.isNewRelease}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isNewRelease: checked }))
                }
              />
              <Label htmlFor="isNewRelease">New Release</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="isSpecialOffer"
                name="isSpecialOffer"
                checked={formData.isSpecialOffer}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, isSpecialOffer: checked }))
                }
              />
              <Label htmlFor="isSpecialOffer">Special Offer</Label>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {bookId ? 'Update Book' : 'Add Book'}
        </Button>
      </div>
    </form>
  );
};

export default BookForm;