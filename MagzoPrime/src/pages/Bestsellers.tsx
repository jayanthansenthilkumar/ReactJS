
import React from 'react';
import { Link } from 'react-router-dom';
import { getBestsellerBooks } from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { ChevronRight } from 'lucide-react';

const Bestsellers = () => {
  const bestsellerBooks = getBestsellerBooks();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Bestsellers</h1>
              <p className="text-muted-foreground mb-6">
                Discover the books that readers can't get enough of - our top-selling titles that are flying off the shelves
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Bestsellers</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Top 10 Bestsellers */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Top 10 Bestsellers</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {bestsellerBooks.slice(0, 10).map((book, index) => (
                <div key={book.id} className="relative">
                  <div className="absolute -left-2 -top-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold z-10 shadow-md">
                    {index + 1}
                  </div>
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bestseller Categories */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Bestsellers by Category</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-serif font-medium mb-6 pb-2 border-b">Fiction Bestsellers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {bestsellerBooks
                    .filter(book => book.category === 'cat-fiction')
                    .slice(0, 5)
                    .map(book => (
                      <BookCard key={book.id} book={book} />
                    ))
                  }
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-medium mb-6 pb-2 border-b">Non-fiction Bestsellers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {bestsellerBooks
                    .filter(book => book.category === 'cat-nonfiction')
                    .slice(0, 5)
                    .map(book => (
                      <BookCard key={book.id} book={book} />
                    ))
                  }
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-medium mb-6 pb-2 border-b">Children's & Young Adult Bestsellers</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {bestsellerBooks
                    .filter(book => book.category === 'cat-children')
                    .slice(0, 5)
                    .map(book => (
                      <BookCard key={book.id} book={book} />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bestsellers;
