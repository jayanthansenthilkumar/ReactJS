import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star } from 'lucide-react';
import { addToCart } from '../services/cartService';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface BookCardProps {
  book: any; // Use 'any' to handle both frontend and backend book types
  compact?: boolean;
}

const BookCard = ({ book, compact = false }: BookCardProps) => {
  const handleAddToCart = () => {
    const bookId = book._id || book.id; // Support both API and local data models
    addToCart(bookId, 1);
    toast.success(`${book.title} added to cart`);
  };

  // Calculate if there's a discount and the original price
  const discountPercentage = book.discountPercentage || 0;
  const price = book.price || 0;
  const originalPrice = discountPercentage > 0 
    ? (price / (1 - discountPercentage/100)).toFixed(2) 
    : null;

  const renderBadges = () => {
    return (
      <div className="absolute top-2 left-2 flex flex-wrap gap-1">
        {book.isFeatured && (
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Featured
          </Badge>
        )}
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
        {discountPercentage > 0 && (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {discountPercentage}% OFF
          </Badge>
        )}
      </div>
    );
  };

  const bookId = book._id || book.id; // Support both API and local data models
  const coverImage = book.image || book.coverImage || '/placeholder.svg';

  if (compact) {
    return (
      <Card className="book-card h-full overflow-hidden border border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-3 h-full flex flex-col">
          <Link to={`/book/${bookId}`} className="flex items-center space-x-4">
            <div className="relative flex-shrink-0 w-16 h-24 bg-muted">
              <img 
                src={coverImage} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <h3 className="text-sm font-medium line-clamp-1">{book.title}</h3>
              <p className="text-xs text-muted-foreground">{book.author}</p>
              <div className="mt-1 flex items-center">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span className="text-xs ml-1">{book.rating?.toFixed(1) || "0.0"}</span>
              </div>
              <p className="font-medium text-sm mt-1">
                ${Number(price).toFixed(2)}
                {originalPrice && (
                  <span className="text-xs text-muted-foreground line-through ml-1">
                    ${originalPrice}
                  </span>
                )}
              </p>
            </div>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="book-card h-full overflow-hidden border border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-3 h-full flex flex-col">
        <Link to={`/book/${bookId}`} className="flex flex-col flex-grow">
          <div className="relative aspect-[2/3] bg-muted mb-3 overflow-hidden">
            <img 
              src={coverImage} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
            {renderBadges()}
          </div>
          <div className="flex flex-col flex-grow">
            <h3 className="font-medium line-clamp-2 h-12 mb-1">{book.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{book.author}</p>
            <div className="flex items-center mb-2">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm ml-1">{book.rating?.toFixed(1) || "0.0"}</span>
            </div>
            <div className="mt-auto">
              <div className="font-medium">
                ${Number(price).toFixed(2)}
                {originalPrice && (
                  <span className="text-sm text-muted-foreground line-through ml-2">
                    ${originalPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>
        <Button 
          onClick={handleAddToCart} 
          className="w-full mt-3"
          size="sm"
          disabled={book.countInStock === 0}
        >
          {book.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookCard;
