import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '../../components/ui/alert';
import { getPendingApprovalBooks, approveBook, rejectBook } from '../../services/bookService';
import SuperAdminLayout from '../../components/admin/SuperAdminLayout';

const BookApprovals = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>('');
  const [currentBookId, setCurrentBookId] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchPendingBooks = async () => {
    try {
      setLoading(true);
      const data = await getPendingApprovalBooks();
      setBooks(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching pending books:', err);
      setError('Failed to load books pending approval. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveBook(id);
      setSuccessMessage('Book approved successfully!');
      // Remove the approved book from the list
      setBooks(books.filter(book => book._id !== id));
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error approving book:', err);
      setError('Failed to approve book. Please try again.');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  const handleReject = async () => {
    if (!currentBookId) return;
    
    try {
      await rejectBook(currentBookId, rejectionReason);
      setSuccessMessage('Book rejected successfully!');
      
      // Remove the rejected book from the list
      setBooks(books.filter(book => book._id !== currentBookId));
      
      // Reset state
      setRejectionReason('');
      setCurrentBookId(null);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error('Error rejecting book:', err);
      setError('Failed to reject book. Please try again.');
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <SuperAdminLayout>
        <div className="flex items-center justify-center h-screen">Loading...</div>
      </SuperAdminLayout>
    );
  }

  return (
    <SuperAdminLayout>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Book Approvals</h1>
        
        {successMessage && (
          <Alert className="mb-4 bg-green-50">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}
        
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {books.length === 0 ? (
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold">No books pending approval</h2>
            <p className="text-gray-500 mt-2">All books have been reviewed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book._id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold">Price:</span> ${book.price.toFixed(2)}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Added by:</span> {book.user.name}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Category:</span> {book.category.name}
                    </div>
                    <div className="text-sm line-clamp-3">
                      <span className="font-semibold">Description:</span> {book.description}
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setCurrentBookId(book._id);
                      setRejectionReason('');
                    }}
                  >
                    Reject
                  </Button>
                  <Button 
                    onClick={() => handleApprove(book._id)}
                  >
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Rejection Dialog */}
      <Dialog open={!!currentBookId} onOpenChange={(open) => !open && setCurrentBookId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Book</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this book. This will be recorded for internal purposes.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter reason for rejection"
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setCurrentBookId(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleReject}>Confirm Rejection</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SuperAdminLayout>
  );
};

export default BookApprovals;