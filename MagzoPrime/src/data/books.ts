export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  coverImage: string;
  rating: number;
  category: string;
  genre: string;
  description: string;
  publicationDate: string;
  pages: number;
  isbn: string;
  publisher: string;
  language: string;
  inStock: number;
  featured?: boolean;
  bestseller?: boolean;
  newRelease?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  category: string;
}

// Sample categories
export const categories: Category[] = [
  {
    id: "cat-fiction",
    name: "Fiction",
    slug: "fiction",
    description: "Stories from the imagination"
  },
  {
    id: "cat-nonfiction",
    name: "Non-Fiction",
    slug: "non-fiction",
    description: "Facts, true stories, and knowledge"
  },
  {
    id: "cat-children",
    name: "Children's Books",
    slug: "children",
    description: "Books for young readers"
  },
  {
    id: "cat-academic",
    name: "Academic",
    slug: "academic",
    description: "Educational and scholarly works"
  },
  {
    id: "cat-poetry",
    name: "Poetry",
    slug: "poetry",
    description: "Artistic arrangement of words expressing feelings and ideas"
  },
  {
    id: "cat-comics",
    name: "Comics & Graphic Novels",
    slug: "comics-graphic-novels",
    description: "Stories told through sequential art and illustrations"
  }
];

// Sample genres
export const genres: Genre[] = [
  // Fiction genres
  { id: "genre-fantasy", name: "Fantasy", slug: "fantasy", category: "cat-fiction" },
  { id: "genre-sci-fi", name: "Science Fiction", slug: "sci-fi", category: "cat-fiction" },
  { id: "genre-mystery", name: "Mystery & Thriller", slug: "mystery-thriller", category: "cat-fiction" },
  { id: "genre-romance", name: "Romance", slug: "romance", category: "cat-fiction" },
  { id: "genre-horror", name: "Horror", slug: "horror", category: "cat-fiction" },
  { id: "genre-literary", name: "Literary Fiction", slug: "literary-fiction", category: "cat-fiction" },
  { id: "genre-historical", name: "Historical Fiction", slug: "historical-fiction", category: "cat-fiction" },
  { id: "genre-adventure", name: "Adventure", slug: "adventure", category: "cat-fiction" },
  
  // Non-fiction genres
  { id: "genre-biography", name: "Biography", slug: "biography", category: "cat-nonfiction" },
  { id: "genre-history", name: "History", slug: "history", category: "cat-nonfiction" },
  { id: "genre-science", name: "Science & Technology", slug: "science-tech", category: "cat-nonfiction" },
  { id: "genre-self-help", name: "Self-Help", slug: "self-help", category: "cat-nonfiction" },
  { id: "genre-business", name: "Business", slug: "business", category: "cat-nonfiction" },
  { id: "genre-cooking", name: "Cooking", slug: "cooking", category: "cat-nonfiction" },
  { id: "genre-travel", name: "Travel", slug: "travel", category: "cat-nonfiction" },
  { id: "genre-philosophy", name: "Philosophy", slug: "philosophy", category: "cat-nonfiction" },
  
  // Children's genres
  { id: "genre-picture", name: "Picture Books", slug: "picture-books", category: "cat-children" },
  { id: "genre-middle-grade", name: "Middle Grade", slug: "middle-grade", category: "cat-children" },
  { id: "genre-young-adult", name: "Young Adult", slug: "young-adult", category: "cat-children" },
  { id: "genre-educational", name: "Educational", slug: "educational", category: "cat-children" },
  
  // Academic genres
  { id: "genre-textbooks", name: "Textbooks", slug: "textbooks", category: "cat-academic" },
  { id: "genre-reference", name: "Reference", slug: "reference", category: "cat-academic" },
  { id: "genre-research", name: "Research", slug: "research", category: "cat-academic" },
  
  // Poetry genres
  { id: "genre-classic-poetry", name: "Classic Poetry", slug: "classic-poetry", category: "cat-poetry" },
  { id: "genre-modern-poetry", name: "Modern Poetry", slug: "modern-poetry", category: "cat-poetry" },
  
  // Comics & Graphic Novels
  { id: "genre-superhero", name: "Superhero", slug: "superhero", category: "cat-comics" },
  { id: "genre-manga", name: "Manga", slug: "manga", category: "cat-comics" },
  { id: "genre-graphic-novel", name: "Graphic Novel", slug: "graphic-novel", category: "cat-comics" }
];

// Sample book data
export const books: Book[] = [
  {
    id: "book-1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 16.99,
    originalPrice: 24.99,
    discount: 32,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "Between life and death there is a library. When Nora Seed finds herself in the Midnight Library, she has a chance to make things right. Up until now, her life has been full of misery and regret. She feels she has let everyone down, including herself. But things are about to change.",
    publicationDate: "2020-08-13",
    pages: 304,
    isbn: "978-0525559474",
    publisher: "Viking",
    language: "English",
    inStock: 42,
    featured: true
  },
  {
    id: "book-2",
    title: "Educated",
    author: "Tara Westover",
    price: 14.99,
    originalPrice: 18.99,
    discount: 21,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-nonfiction",
    genre: "genre-biography",
    description: "An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    publicationDate: "2018-02-20",
    pages: 352,
    isbn: "978-0399590504",
    publisher: "Random House",
    language: "English",
    inStock: 27,
    bestseller: true
  },
  {
    id: "book-3",
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    price: 18.99,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-fiction",
    genre: "genre-fantasy",
    description: "A magical island. A dangerous task. A burning secret. Linus Baker leads a quiet, solitary life. At forty, he lives in a tiny house with a devious cat and his old records. As a Case Worker at the Department in Charge Of Magical Youth, he spends his days overseeing the well-being of children in government-sanctioned orphanages.",
    publicationDate: "2020-03-17",
    pages: 400,
    isbn: "978-1250217288",
    publisher: "Tor Books",
    language: "English",
    inStock: 15,
    featured: true
  },
  {
    id: "book-4",
    title: "Atomic Habits",
    author: "James Clear",
    price: 11.99,
    originalPrice: 27.00,
    discount: 56,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-nonfiction",
    genre: "genre-self-help",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    publicationDate: "2018-10-16",
    pages: 320,
    isbn: "978-0735211292",
    publisher: "Avery",
    language: "English",
    inStock: 54,
    bestseller: true
  },
  {
    id: "book-5",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 14.49,
    originalPrice: 28.99,
    discount: 50,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-fiction",
    genre: "genre-sci-fi",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    publicationDate: "2021-05-04",
    pages: 496,
    isbn: "978-0593135204",
    publisher: "Ballantine Books",
    language: "English",
    inStock: 31,
    newRelease: true
  },
  {
    id: "book-6",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 16.55,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-fiction",
    genre: "genre-fantasy",
    description: "Greece in the age of heroes. Patroclus, an awkward young prince, has been exiled to the court of King Peleus and his perfect son Achilles. By all rights their paths should never cross, but Achilles takes the shamed prince as his friend, and as they grow into young men skilled in the arts of war and medicine their bond blossoms into something deeper - despite the displeasure of Achilles' mother Thetis, a cruel sea goddess.",
    publicationDate: "2012-03-06",
    pages: 416,
    isbn: "978-0062060624",
    publisher: "Ecco",
    language: "English",
    inStock: 19,
    featured: true
  },
  {
    id: "book-7",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 12.39,
    originalPrice: 18.00,
    discount: 31,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "For years, rumors of the 'Marsh Girl' haunted Barkley Cove, a quiet fishing village. Kya Clark is barefoot and wild; unfit for polite society. So in late 1969, when the popular Chase Andrews is found dead, locals immediately suspect her.",
    publicationDate: "2018-08-14",
    pages: 384,
    isbn: "978-0735219090",
    publisher: "G.P. Putnam's Sons",
    language: "English",
    inStock: 23,
    bestseller: true
  },
  {
    id: "book-8",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 15.99,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-nonfiction",
    genre: "genre-history",
    description: "In Sapiens, Dr. Yuval Noah Harari spans the whole of human history, from the very first humans to walk the earth to the radical – and sometimes devastating – breakthroughs of the Cognitive, Agricultural, and Scientific Revolutions.",
    publicationDate: "2015-02-10",
    pages: 464,
    isbn: "978-0062316097",
    publisher: "Harper",
    language: "English",
    inStock: 38,
    bestseller: true
  },
  {
    id: "book-9",
    title: "The Very Hungry Caterpillar",
    author: "Eric Carle",
    price: 8.99,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-children",
    genre: "genre-picture",
    description: "The classic children's book featuring a caterpillar eating his way through the week.",
    publicationDate: "1969-03-20",
    pages: 26,
    isbn: "978-0399226908",
    publisher: "Philomel Books",
    language: "English",
    inStock: 67,
    featured: true
  },
  {
    id: "book-10",
    title: "Principles of Economics",
    author: "N. Gregory Mankiw",
    price: 169.99,
    originalPrice: 299.99,
    discount: 43,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-academic",
    genre: "genre-textbooks",
    description: "Now you can master the principles of economics with the help of the most popular, widely-used economics textbook by students worldwide -- Mankiw's PRINCIPLES OF ECONOMICS, 9E.",
    publicationDate: "2020-01-01",
    pages: 912,
    isbn: "978-0357038314",
    publisher: "Cengage Learning",
    language: "English",
    inStock: 12
  },
  {
    id: "book-11",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 13.29,
    originalPrice: 26.99,
    discount: 51,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-fiction",
    genre: "genre-mystery",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    publicationDate: "2019-02-05",
    pages: 336,
    isbn: "978-1250301697",
    publisher: "Celadon Books",
    language: "English",
    inStock: 32,
    bestseller: true
  },
  {
    id: "book-12",
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 14.50,
    originalPrice: 28.99,
    discount: 50,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "From the number-one bestselling author of The Nightingale and The Great Alone comes a powerful American epic about love and heroism and hope, set during the Great Depression, a time when the country was in crisis and at war with itself, when millions were out of work and even the land seemed to have turned against them.",
    publicationDate: "2021-02-02",
    pages: 464,
    isbn: "978-1250178602",
    publisher: "St. Martin's Press",
    language: "English",
    inStock: 28,
    newRelease: true
  },
  {
    id: "book-13",
    title: "The Last Thing He Told Me",
    author: "Laura Dave",
    price: 15.99,
    originalPrice: 22.99,
    discount: 30,
    coverImage: "/placeholder.svg",
    rating: 4.3,
    category: "cat-fiction",
    genre: "genre-mystery",
    description: "Before Owen Michaels disappears, he smuggles a note to his beloved wife of one year: Protect her. Despite her confusion and fear, Hannah Hall knows exactly to whom the note refers—Owen's sixteen-year-old daughter, Bailey.",
    publicationDate: "2021-05-04",
    pages: 320,
    isbn: "978-1501171345",
    publisher: "Simon & Schuster",
    language: "English",
    inStock: 19,
    newRelease: true
  },
  {
    id: "book-14",
    title: "A Court of Thorns and Roses",
    author: "Sarah J. Maas",
    price: 18.99,
    originalPrice: 28.00,
    discount: 32,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-fiction",
    genre: "genre-fantasy",
    description: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world.",
    publicationDate: "2015-05-05",
    pages: 419,
    isbn: "978-1635575569",
    publisher: "Bloomsbury Publishing",
    language: "English",
    inStock: 54,
    bestseller: true
  },
  {
    id: "book-15",
    title: "Becoming",
    author: "Michelle Obama",
    price: 19.50,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-nonfiction",
    genre: "genre-biography",
    description: "In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work, to her time spent at the world's most famous address.",
    publicationDate: "2018-11-13",
    pages: 448,
    isbn: "978-1524763138",
    publisher: "Crown Publishing Group",
    language: "English",
    inStock: 74,
    bestseller: true
  },
  {
    id: "book-16",
    title: "Dune",
    author: "Frank Herbert",
    price: 12.99,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-fiction",
    genre: "genre-sci-fi",
    description: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange, a drug capable of extending life and enhancing consciousness.",
    publicationDate: "1965-08-01",
    pages: 688,
    isbn: "978-0441172719",
    publisher: "Ace Books",
    language: "English",
    inStock: 61,
    bestseller: true,
    featured: true
  },
  {
    id: "book-17",
    title: "The Cat in the Hat",
    author: "Dr. Seuss",
    price: 9.99,
    coverImage: "/placeholder.svg",
    rating: 4.9,
    category: "cat-children",
    genre: "genre-picture",
    description: "Poor Sally and her brother. It's cold and wet and they're stuck in the house with nothing to do... until a giant cat in a hat shows up, transforming the dull day into a madcap adventure.",
    publicationDate: "1957-03-12",
    pages: 61,
    isbn: "978-0394800011",
    publisher: "Random House Books for Young Readers",
    language: "English",
    inStock: 92,
    featured: true
  },
  {
    id: "book-18",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 10.99,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-nonfiction",
    genre: "genre-self-help",
    description: "This book contains money-making secrets that can change your life. Think and Grow Rich, based on the author's famed Law of Success, represents the distilled wisdom of distinguished men of great wealth and achievement.",
    publicationDate: "1937-01-01",
    pages: 320,
    isbn: "978-1585424337",
    publisher: "Tarcher",
    language: "English",
    inStock: 48,
    bestseller: true
  },
  {
    id: "book-19",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 14.99,
    originalPrice: 24.99,
    discount: 40,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-fiction",
    genre: "genre-literary",
    description: "Combining magic, mysticism, wisdom, and wonder into an inspiring tale of self-discovery, The Alchemist has become a modern classic, selling millions of copies around the world and transforming the lives of countless readers across generations.",
    publicationDate: "1988-01-01",
    pages: 208,
    isbn: "978-0062315007",
    publisher: "HarperOne",
    language: "English",
    inStock: 37,
    featured: true
  },
  {
    id: "book-20",
    title: "Principles of Microeconomics",
    author: "N. Gregory Mankiw",
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    coverImage: "/placeholder.svg",
    rating: 4.5,
    category: "cat-academic",
    genre: "genre-textbooks",
    description: "In writing this textbook, Mankiw has tried to put himself in the position of someone seeing economics for the first time. The author's conversational writing style is superb for presenting the politics and science of economic theories to tomorrow's decision-makers.",
    publicationDate: "2020-01-01",
    pages: 528,
    isbn: "978-0357133484",
    publisher: "Cengage Learning",
    language: "English",
    inStock: 25
  },
  {
    id: "book-21",
    title: "It Ends with Us",
    author: "Colleen Hoover",
    price: 14.99,
    originalPrice: 16.99,
    discount: 12,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-fiction",
    genre: "genre-romance",
    description: "Sometimes it is the one who loves you who hurts you the most. Lily hasn't always had it easy, but that's never stopped her from working hard for the life she wants.",
    publicationDate: "2016-08-02",
    pages: 384,
    isbn: "978-1501110368",
    publisher: "Atria Books",
    language: "English",
    inStock: 67,
    bestseller: true
  },
  {
    id: "book-22",
    title: "The Body Keeps the Score",
    author: "Bessel van der Kolk",
    price: 16.59,
    originalPrice: 19.00,
    discount: 13,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-nonfiction",
    genre: "genre-science",
    description: "Trauma is a fact of life. Veterans and their families deal with the painful aftermath of combat; one in five Americans has been molested; one in four grew up with alcoholics; one in three couples have engaged in physical violence.",
    publicationDate: "2014-09-25",
    pages: 464,
    isbn: "978-0143127741",
    publisher: "Penguin Books",
    language: "English",
    inStock: 42,
    bestseller: true
  },
  {
    id: "book-23",
    title: "Percy Jackson & The Lightning Thief",
    author: "Rick Riordan",
    price: 12.99,
    coverImage: "/placeholder.svg",
    rating: 4.7,
    category: "cat-fiction",
    genre: "genre-middle-grade",
    description: "Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse - Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him.",
    publicationDate: "2005-03-01",
    pages: 377,
    isbn: "978-0786838653",
    publisher: "Disney-Hyperion",
    language: "English",
    inStock: 85,
    featured: true
  },
  {
    id: "book-24",
    title: "The Sun and Her Flowers",
    author: "Rupi Kaur",
    price: 13.99,
    coverImage: "/placeholder.svg",
    rating: 4.6,
    category: "cat-poetry",
    genre: "genre-modern-poetry",
    description: "From Rupi Kaur, the bestselling author of milk and honey, comes her long-awaited second collection of poetry. Divided into five chapters and illustrated by Kaur, the sun and her flowers is a journey of wilting, falling, rooting, rising, and blooming.",
    publicationDate: "2017-10-03",
    pages: 256,
    isbn: "978-1449486792",
    publisher: "Andrews McMeel Publishing",
    language: "English",
    inStock: 29,
    newRelease: true
  },
  {
    id: "book-25",
    title: "Batman: Year One",
    author: "Frank Miller",
    price: 14.99,
    coverImage: "/placeholder.svg",
    rating: 4.8,
    category: "cat-comics",
    genre: "genre-superhero",
    description: "In 1986, Frank Miller and David Mazzucchelli produced this groundbreaking reinterpretation of the origin of Batman—who he is, and how he came to be.",
    publicationDate: "1988-01-01",
    pages: 144,
    isbn: "978-1401207526",
    publisher: "DC Comics",
    language: "English",
    inStock: 23,
    featured: true
  }
];

export const findBookById = (id: string): Book | undefined => {
  return books.find(book => book.id === id);
};

export const findCategoryById = (id: string): Category | undefined => {
  return categories.find(category => category.id === id);
};

export const findGenreById = (id: string): Genre | undefined => {
  return genres.find(genre => genre.id === id);
};

export const getBooksByCategory = (categoryId: string): Book[] => {
  return books.filter(book => book.category === categoryId);
};

export const getBooksByGenre = (genreId: string): Book[] => {
  return books.filter(book => book.genre === genreId);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const getBestsellerBooks = (): Book[] => {
  return books.filter(book => book.bestseller);
};

export const getNewReleases = (): Book[] => {
  return books.filter(book => book.newRelease);
};
