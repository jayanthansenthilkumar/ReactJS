
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  categories, 
  books,
  genres, 
  Category, 
  Genre,
  Book
} from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { ChevronRight } from 'lucide-react';

const CategoryDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [categoryBooks, setCategoryBooks] = useState<Book[]>([]);
  const [categoryGenres, setCategoryGenres] = useState<Genre[]>([]);
  
  useEffect(() => {
    if (slug) {
      // Find category by slug
      const foundCategory = categories.find(c => c.slug === slug);
      if (foundCategory) {
        setCategory(foundCategory);
        
        // Get books in this category
        const booksInCategory = books.filter(book => book.category === foundCategory.id);
        setCategoryBooks(booksInCategory);
        
        // Get genres in this category
        const genresInCategory = genres.filter(genre => genre.category === foundCategory.id);
        setCategoryGenres(genresInCategory);
      }
    }
  }, [slug]);
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Category not found</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header section */}
        <section className="bg-primary/10 py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{category.name}</h1>
              <p className="text-muted-foreground mb-6">
                {category.description}
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <Link to="/categories" className="hover:text-foreground">Categories</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                <span className="text-foreground">{category.name}</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Genres section */}
        {categoryGenres.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold mb-8">Genres in {category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryGenres.map(genre => (
                  <Link
                    key={genre.id}
                    to={`/genre/${genre.slug}`}
                    className="bg-secondary/80 rounded-lg p-6 hover:bg-secondary transition-colors"
                  >
                    <h3 className="text-lg font-medium mb-2">{genre.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        
        {/* Books in this category */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Books in {category.name}</h2>
            {categoryBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {categoryBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No books found in this category.</p>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryDetail;
