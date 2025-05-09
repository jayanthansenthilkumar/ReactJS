
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  genres, 
  books,
  findCategoryById, 
  Genre, 
  Book,
  Category
} from '../data/books';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookCard from '../components/BookCard';
import { ChevronRight } from 'lucide-react';

const GenreDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [genre, setGenre] = useState<Genre | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [genreBooks, setGenreBooks] = useState<Book[]>([]);
  
  useEffect(() => {
    if (slug) {
      // Find genre by slug
      const foundGenre = genres.find(g => g.slug === slug);
      if (foundGenre) {
        setGenre(foundGenre);
        
        // Find parent category
        const parentCategory = findCategoryById(foundGenre.category);
        if (parentCategory) {
          setCategory(parentCategory);
        }
        
        // Get books in this genre
        const booksInGenre = books.filter(book => book.genre === foundGenre.id);
        setGenreBooks(booksInGenre);
      }
    }
  }, [slug]);
  
  if (!genre) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Genre not found</p>
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
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{genre.name}</h1>
              <p className="text-muted-foreground mb-6">
                Explore our collection of {genre.name} books
              </p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">Home</Link>
                <ChevronRight className="w-4 h-4 mx-2" />
                {category && (
                  <>
                    <Link to={`/category/${category.slug}`} className="hover:text-foreground">{category.name}</Link>
                    <ChevronRight className="w-4 h-4 mx-2" />
                  </>
                )}
                <span className="text-foreground">{genre.name}</span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Books in this genre */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8">Books in {genre.name}</h2>
            {genreBooks.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {genreBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">No books found in this genre.</p>
            )}
          </div>
        </section>
        
        {/* Related Genres - If we're in a category */}
        {category && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-serif font-bold mb-8">Other Genres in {category.name}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {genres
                  .filter(g => g.category === category.id && g.id !== genre.id)
                  .map(relatedGenre => (
                    <Link
                      key={relatedGenre.id}
                      to={`/genre/${relatedGenre.slug}`}
                      className="bg-secondary/80 rounded-lg p-6 hover:bg-secondary transition-colors"
                    >
                      <h3 className="text-lg font-medium mb-2">{relatedGenre.name}</h3>
                    </Link>
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default GenreDetail;
