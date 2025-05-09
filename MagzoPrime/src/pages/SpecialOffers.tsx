import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ChevronRight, Percent, Tag, Clock } from 'lucide-react';
import { books } from '../data/books';

const SpecialOffers = () => {
  // Get books with discounts, sort by highest discount first
  const discountedBooks = books
    .filter(book => book.discount && book.discount > 0)
    .sort((a, b) => (b.discount || 0) - (a.discount || 0))
    .slice(0, 12);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Special Offers</h1>
              <p className="text-muted-foreground mb-6">
                Discover incredible savings on a wide range of books with our limited-time special offers
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Special Offers</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Current offers section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Current Promotions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/20 p-3 mr-4">
                      <Percent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-medium">Buy 2, Get 1 Free</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Purchase any two books from our fiction collection and get the third one free.
                  </p>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Use code: FICTION3
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/20 p-3 mr-4">
                      <Tag className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-medium">25% Off Bestsellers</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Enjoy 25% off on all bestselling titles this month only.
                  </p>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Use code: BEST25
                  </Badge>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="rounded-full bg-primary/20 p-3 mr-4">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-medium">Flash Sale</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    48-hour flash sale on selected academic and reference books. Up to 40% off.
                  </p>
                  <Badge className="bg-primary/20 text-primary hover:bg-primary/30">
                    Ends in: 1 day 6 hours
                  </Badge>
                </CardContent>
              </Card>
            </div>
            
            <h2 className="text-2xl font-serif font-bold mb-8">Books On Sale</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {discountedBooks.map(book => (
                <Card key={book.id} className="overflow-hidden">
                  <Link to={`/book/${book.id}`}>
                    <div className="relative">
                      <img 
                        src={book.coverImage} 
                        alt={book.title}
                        className="w-full aspect-[2/3] object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-red-500 text-white">
                          {book.discount}% OFF
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium truncate">{book.title}</h3>
                      <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="font-bold">${book.price.toFixed(2)}</span>
                        <span className="text-sm text-muted-foreground line-through">
                          ${book.originalPrice?.toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <Button asChild>
                <Link to="/categories">Browse All Categories</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SpecialOffers;
