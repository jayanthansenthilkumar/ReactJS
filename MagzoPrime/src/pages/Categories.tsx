
import React from 'react';
import { Link } from 'react-router-dom';
import { categories, genres, getBestsellerBooks, getFeaturedBooks } from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryCard from '../components/CategoryCard';
import BookCard from '../components/BookCard';
import { Button } from '../components/ui/button';
import { ChevronRight } from 'lucide-react';

const Categories = () => {
  const featuredBooks = getFeaturedBooks().slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">Browse by Category</h1>
              <p className="text-muted-foreground mb-6">
                Discover books across a wide range of categories and genres to satisfy every reader's taste
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">Categories</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* All categories section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">All Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Genres by category */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Popular Genres</h2>
            
            {categories.slice(0, 4).map(category => (
              <div key={category.id} className="mb-12">
                <div className="flex items-end justify-between mb-6">
                  <h3 className="text-xl font-serif font-medium">{category.name} Genres</h3>
                  <Button variant="link" asChild>
                    <Link to={`/category/${category.slug}`}>View All</Link>
                  </Button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {genres
                    .filter(genre => genre.category === category.id)
                    .slice(0, 6)
                    .map(genre => (
                      <Link
                        key={genre.id}
                        to={`/genre/${genre.slug}`}
                        className="bg-secondary/80 rounded-lg p-4 hover:bg-secondary transition-colors text-center"
                      >
                        <h4 className="text-base font-medium">{genre.name}</h4>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Featured books section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold">Editor's Choice</h2>
                <p className="text-muted-foreground mt-2">Handpicked selections from our editors</p>
              </div>
              <Button variant="link" asChild>
                <Link to="/">View All</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
              {featuredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Category exploration guide */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/80 rounded-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-serif font-bold mb-6 text-center">Discover Your Next Read</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-medium">For Fiction Lovers</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/fantasy" className="hover:underline">Escape into fantastical worlds with Fantasy</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/romance" className="hover:underline">Experience heartwarming tales in Romance</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/mystery-thriller" className="hover:underline">Solve crimes with our Mystery collection</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/sci-fi" className="hover:underline">Explore tomorrow with Science Fiction</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-xl font-medium">For Non-Fiction Enthusiasts</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/biography" className="hover:underline">Learn from the best with Biographies</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/history" className="hover:underline">Expand your knowledge with History</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/self-help" className="hover:underline">Transform your life with Self-Help</Link>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-primary mr-2" />
                        <Link to="/genre/science-tech" className="hover:underline">Stay informed with Science & Technology</Link>
                      </li>
                    </ul>
                  </div>
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

export default Categories;
