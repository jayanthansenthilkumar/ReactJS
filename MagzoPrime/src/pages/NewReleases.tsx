
import React from 'react';
import { Link } from 'react-router-dom';
import { getNewReleases } from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { ChevronRight } from 'lucide-react';

const NewReleases = () => {
  const newReleases = getNewReleases();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">New Releases</h1>
              <p className="text-muted-foreground mb-6">
                Be among the first to discover these hot-off-the-press books
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">New Releases</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* This Month's New Releases */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">This Month's New Releases</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {newReleases.slice(0, 10).map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Coming Soon */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Coming Soon</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-secondary/70 rounded-lg p-6">
                  <div className="flex items-start mb-4">
                    <div className="w-20 h-28 bg-muted shrink-0">
                      <img 
                        src={`https://picsum.photos/seed/${i + 100}/200/300`} 
                        alt="Book cover" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-medium mb-1">
                        {['The Lost Kingdom', 'Echoes of Tomorrow', 'Silent Whispers', 'The Final Chapter'][i-1]}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {['Jane Austen', 'Michael Crichton', 'Gillian Flynn', 'Dan Brown'][i-1]}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        Release date: {['June 12', 'June 25', 'July 3', 'July 18'][i-1]}, 2023
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {[
                      'A fantasy epic about a lost civilization and the adventurer who discovers its secrets.',
                      'A thrilling sci-fi novel that explores the consequences of time manipulation.',
                      'A psychological thriller that will keep you guessing until the final page.',
                      'A fast-paced adventure that uncovers ancient mysteries and modern conspiracies.'
                    ][i-1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* New Releases by Genre */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">New Releases by Genre</h2>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-serif font-medium mb-6 pb-2 border-b">Fiction</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {newReleases
                    .filter(book => book.category === 'cat-fiction')
                    .slice(0, 5)
                    .map(book => (
                      <BookCard key={book.id} book={book} />
                    ))
                  }
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-serif font-medium mb-6 pb-2 border-b">Non-fiction</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {newReleases
                    .filter(book => book.category === 'cat-nonfiction')
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

export default NewReleases;
