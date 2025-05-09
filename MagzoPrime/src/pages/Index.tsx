import React, { useState } from 'react';
import BookCard from '../components/BookCard';
import CategoryCard from '../components/CategoryCard';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  categories, 
  getBestsellerBooks, 
  getFeaturedBooks, 
  getNewReleases 
} from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('featured');
  
  const featuredBooks = getFeaturedBooks();
  const bestsellerBooks = getBestsellerBooks();
  const newReleases = getNewReleases();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
                Your Gateway to <span className="text-primary">Literary Worlds</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Magzo Prime offers a vast collection of books across genres. 
                From bestsellers to hidden gems, find your next literary adventure today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/categories">Explore Categories</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/bestsellers">Browse Bestsellers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured promotion section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-secondary/80 rounded-lg p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On all orders over $35</p>
              </div>
              <div className="bg-secondary/80 rounded-lg p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">Member Discounts</h3>
                <p className="text-sm text-muted-foreground">Save up to 15% with membership</p>
              </div>
              <div className="bg-secondary/80 rounded-lg p-6 flex flex-col items-center text-center">
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-lg font-medium mb-2">100% Satisfaction</h3>
                <p className="text-sm text-muted-foreground">30-day return policy guaranteed</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Categories section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold">Categories</h2>
                <p className="text-muted-foreground mt-2">Browse books by category</p>
              </div>
              <Button variant="link" asChild>
                <Link to="/categories" className="flex items-center">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Bestselling authors section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-8 text-center">
              <h2 className="text-3xl font-serif font-bold">Bestselling Authors</h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Discover works from the most celebrated literary voices
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-32 h-32 mx-auto rounded-full bg-muted mb-4 overflow-hidden">
                    <img 
                      src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${i + 20}.jpg`} 
                      alt="Author" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg">{['J.K. Rowling', 'Stephen King', 'Michelle Obama', 'Haruki Murakami'][i-1]}</h3>
                  <p className="text-sm text-muted-foreground">
                    {['Fantasy', 'Horror', 'Memoir', 'Literary Fiction'][i-1]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="bg-secondary/80 rounded-xl p-8 md:p-12">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                  Stay Updated with New Releases
                </h2>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter and be the first to hear about new books, 
                  exclusive offers, and reading recommendations.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-grow rounded-md border border-border bg-background px-4 py-2"
                    required
                  />
                  <Button type="submit">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
