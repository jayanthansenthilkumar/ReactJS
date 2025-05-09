import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Search, Plus, Edit, Trash2, Star, Loader2 } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { toast } from 'sonner';
import { getBooks, deleteBook } from '../../services/bookService';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog';
import BookForm from '@/components/admin/BookForm';

const AdminBooks = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isEditBookOpen, setIsEditBookOpen] = useState(false);
  const [currentBookId, setCurrentBookId] = useState<string | undefined>(undefined);
  
  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data.books || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch books. Please try again.');
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id);
        toast.success('Book deleted successfully');
        fetchBooks(); // Refresh the book list
      } catch (err) {
        toast.error('Failed to delete book');
      }
    }
  };
  
  const handleAddBookSuccess = () => {
    setIsAddBookOpen(false);
    fetchBooks();
    toast.success('Book added successfully');
  };
  
  const handleEditBookSuccess = () => {
    setIsEditBookOpen(false);
    setCurrentBookId(undefined);
    fetchBooks();
    toast.success('Book updated successfully');
  };
  
  const openEditBookDialog = (bookId: string) => {
    setCurrentBookId(bookId);
    setIsEditBookOpen(true);
  };
  
  const filteredBooks = books.filter(book => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.title.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      (book.isbn && book.isbn.toLowerCase().includes(searchLower))
    );
  });

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-serif font-bold">Books</h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              className="pl-9 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button onClick={() => setIsAddBookOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading books...</span>
            </div>
          ) : books.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              No books found. Add your first book to get started.
            </div>
          ) : (
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Book
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium hidden md:table-cell">
                      Author
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium hidden lg:table-cell">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium hidden xl:table-cell">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium hidden sm:table-cell">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium hidden md:table-cell">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredBooks.map((book) => (
                    <tr key={book._id} className="bg-background hover:bg-muted/20">
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-14 bg-muted mr-3">
                            <img 
                              src={book.image || '/placeholder.svg'} 
                              alt={book.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="truncate max-w-[180px]">
                            {book.title}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        {book.author}
                      </td>
                      <td className="px-6 py-4 capitalize hidden lg:table-cell">
                        {typeof book.category === 'object' ? book.category.name : book.category}
                      </td>
                      <td className="px-6 py-4 hidden xl:table-cell">
                        ${book.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-amber-400 text-amber-400" />
                          <span>{book.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className={`${book.countInStock < 10 ? 'text-red-600' : ''}`}>
                          {book.countInStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => openEditBookDialog(book._id)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteBook(book._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add Book Dialog */}
      <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
            <DialogDescription>
              Fill in the book details below to add a new book to your inventory.
            </DialogDescription>
          </DialogHeader>
          <BookForm onSuccess={handleAddBookSuccess} onCancel={() => setIsAddBookOpen(false)} />
        </DialogContent>
      </Dialog>
      
      {/* Edit Book Dialog */}
      <Dialog open={isEditBookOpen} onOpenChange={setIsEditBookOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Update the book details below.
            </DialogDescription>
          </DialogHeader>
          <BookForm 
            bookId={currentBookId} 
            onSuccess={handleEditBookSuccess} 
            onCancel={() => {
              setIsEditBookOpen(false);
              setCurrentBookId(undefined);
            }} 
          />
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminBooks;
