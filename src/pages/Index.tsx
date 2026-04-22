import { useState, useEffect } from 'react';
import { BookOpen, Star, Heart, Sparkles, Send, Menu, X, Loader2 } from 'lucide-react';
import { fetchSanityBooks, SanityBook } from '../lib/sanity';

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [books, setBooks] = useState<SanityBook[]>([]);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch the books from Sanity
    async function loadBooks() {
      try {
        const fetchedBooks = await fetchSanityBooks();
        setBooks(fetchedBooks);
      } catch (error) {
        console.error("Failed to load books from Sanity:", error);
      } finally {
        setIsLoadingBooks(false);
      }
    }
    
    loadBooks();
  }, []);

  const handleScroll = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans selection:bg-purple-200 selection:text-purple-900">
      {/* Navigation */}
      <header className="sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-center justify-between rounded-full bg-white/90 px-6 py-4 shadow-sm backdrop-blur-md border border-purple-100">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleScroll('home')}>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-white">
                <Sparkles size={22} strokeWidth={2.5} />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-purple-950 font-serif">Alora Swift</span>
            </div>

            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-sm font-bold text-slate-600">
                <li><button onClick={() => handleScroll('books')} className="hover:text-purple-500 transition-colors">My Books</button></li>
                <li><button onClick={() => handleScroll('about')} className="hover:text-purple-500 transition-colors">About Alora</button></li>
                <li><button onClick={() => handleScroll('contact')} className="hover:text-purple-500 transition-colors">Contact</button></li>
              </ul>
            </nav>

            <div className="hidden md:block">
              <button 
                onClick={() => handleScroll('books')}
                className="inline-flex h-10 items-center justify-center rounded-full bg-purple-500 px-6 text-sm font-bold text-white transition-transform hover:scale-105 shadow-md shadow-purple-500/20"
              >
                Shop Books
              </button>
            </div>

            <button 
              className="md:hidden p-2 text-slate-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="absolute left-4 right-4 top-24 rounded-3xl bg-white p-6 shadow-xl border border-purple-100 animate-in slide-in-from-top-4 md:hidden">
              <nav className="flex flex-col gap-4 text-lg font-bold text-slate-800">
                <button onClick={() => handleScroll('home')} className="text-left py-2 border-b border-slate-50">Home</button>
                <button onClick={() => handleScroll('books')} className="text-left py-2 border-b border-slate-50">My Books</button>
                <button onClick={() => handleScroll('about')} className="text-left py-2 border-b border-slate-50">About Alora</button>
                <button onClick={() => handleScroll('contact')} className="text-left py-2 border-b border-slate-50">Contact</button>
                <button 
                  onClick={() => handleScroll('books')}
                  className="mt-4 flex h-12 items-center justify-center rounded-full bg-purple-500 text-white shadow-md shadow-purple-500/20"
                >
                  Shop Books
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative px-4 pb-20 pt-12 md:px-8 md:pt-20 lg:pb-32 overflow-hidden">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="max-w-2xl relative z-10">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
                  <Star size={16} className="fill-purple-500 text-purple-500" />
                  Award-Winning Children's Author
                </div>
                <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-7xl lg:leading-[1.1] font-serif">
                  Sparking <span className="text-purple-500">imagination</span> in every child.
                </h1>
                <p className="mb-8 text-lg text-slate-600 md:text-xl leading-relaxed font-medium">
                  Step into a world of whimsical adventures, gentle life lessons, and unforgettable characters. Alora Swift's books are crafted to make bedtime the best time of the day.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <button 
                    onClick={() => handleScroll('books')}
                    className="inline-flex h-14 items-center justify-center rounded-full bg-purple-500 px-8 text-lg font-bold text-white shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-1 hover:shadow-purple-500/40"
                  >
                    Explore My Books
                    <BookOpen className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <div className="absolute -inset-4 md:-inset-10 rounded-full bg-gradient-to-tr from-sky-200 via-purple-200 to-rose-200 opacity-60 blur-3xl animate-pulse"></div>
                <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-[3rem] shadow-2xl border-4 border-white rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1939&auto=format&fit=crop" 
                    alt="Child reading a magical book" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 md:-left-12 rounded-3xl bg-white p-5 shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500">
                    <Heart size={24} className="fill-rose-500" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900 leading-tight">Over 50,000</p>
                    <p className="text-sm font-semibold text-slate-500">Smiles created</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Books Section (Now Dynamic from Sanity) */}
        <section id="books" className="px-4 py-20 bg-purple-50 md:px-8 lg:py-32 rounded-[3rem] mx-2 md:mx-6 mb-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 md:text-center">
              <h2 className="mb-4 text-4xl font-extrabold text-slate-900 md:text-5xl font-serif">
                Magical Stories
              </h2>
              <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
                Discover the perfect book for your little reader. Each story is filled with vibrant illustrations and heartwarming messages.
              </p>
            </div>

            {isLoadingBooks ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-12 text-slate-500 font-medium">
                No books published yet. Check back soon!
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {books.map((book) => (
                  <div key={book._id} className="group relative flex flex-col bg-white rounded-[2.5rem] p-4 shadow-sm hover:shadow-xl transition-all border border-slate-100 hover:-translate-y-2">
                    <div className={`relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] ${book.color || 'bg-slate-100'} mb-6`}>
                      <img 
                        src={book.coverUrl || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070'} 
                        alt={book.title} 
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 mix-blend-multiply"
                      />
                    </div>
                    <div className="px-2 flex flex-col flex-grow">
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed mb-6 flex-grow">
                        {book.description}
                      </p>
                      <button className={`mt-auto w-full h-12 flex items-center justify-center rounded-2xl ${book.color || 'bg-slate-100'} ${book.textColor || 'text-slate-700'} font-bold transition-transform group-hover:scale-[1.02]`}>
                        Buy Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="px-4 py-20 md:px-8 lg:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-square overflow-hidden rounded-[3rem] shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1974&auto=format&fit=crop" 
                    alt="Alora Swift writing" 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-sky-200 -z-10 blur-xl"></div>
                <div className="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-rose-200 -z-10 blur-xl"></div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-bold text-sky-700">
                  About the Author
                </div>
                <h2 className="mb-6 text-4xl font-extrabold text-slate-900 md:text-5xl font-serif">
                  Hi, I'm <span className="text-purple-500">Alora</span>.
                </h2>
                <div className="space-y-6 text-lg text-slate-600 font-medium leading-relaxed">
                  <p>
                    Ever since I was a little girl, I believed that forests held secrets and clouds were just cotton candy waiting to be caught. Today, I turn those childhood daydreams into stories for the next generation.
                  </p>
                  <p>
                    When I'm not writing or sketching out new characters, you can find me baking overly complicated cookies, exploring local botanical gardens, and reading way past my bedtime.
                  </p>
                  <p>
                    My mission is simple: to write books that parents love reading out loud just as much as children love hearing them.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section id="contact" className="px-4 py-20 md:px-8 pb-32">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-[3rem] bg-slate-900 relative">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-500 opacity-40 blur-3xl"></div>
            <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-sky-500 opacity-40 blur-3xl"></div>
            
            <div className="relative p-10 md:p-20 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white">
                <Send size={28} />
              </div>
              <h2 className="mb-4 text-3xl font-extrabold text-white md:text-4xl font-serif">
                Join the Magic Mailing List
              </h2>
              <p className="mb-10 text-lg font-medium text-slate-300 max-w-lg mx-auto">
                Get free coloring pages, sneak peeks at new books, and exclusive discounts delivered straight to your inbox. No spam, just sparkles!
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }}>
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  className="h-14 w-full rounded-full border-0 px-6 text-slate-900 outline-none focus:ring-4 focus:ring-purple-500/50 bg-white/95"
                />
                <button 
                  type="submit"
                  className="h-14 whitespace-nowrap rounded-full bg-purple-500 px-8 font-bold text-white transition-transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-white px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
              <Sparkles size={16} strokeWidth={2.5} />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 font-serif">Alora Swift</span>
          </div>
          
          <p className="text-slate-500 font-medium text-center md:text-left">
            © {new Date().getFullYear()} Alora Swift. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}