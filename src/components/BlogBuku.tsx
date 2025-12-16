import { Star, BookOpen, ShoppingCart, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect, useRef } from "react";
import { booksAPI } from "../utils/api";

export function BlogBuku() {
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [books, setBooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const response = await booksAPI.getAll();
      const data = response.data || [];
      // Sort by year, newest first
      const sortedData = data.sort((a: any, b: any) => {
        return parseInt(b.year || "0") - parseInt(a.year || "0");
      });
      setBooks(sortedData);
    } catch (error) {
      console.error("Error loading books:", error);
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = async (book: any) => {
    // Increment views
    if (book.id) {
      try {
        await booksAPI.incrementViews(book.id);
        // Reload to get updated views
        await loadBooks();
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    }
    setSelectedBook(book);
  };

  if (selectedBook) {
    return (
      <BookDetail
        {...selectedBook}
        onBack={() => setSelectedBook(null)}
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b7280]"></div>
            <p className="text-[#6b7280]">Memuat buku...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="buku" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
      {/* Background Gradient */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#1a1d23] uppercase">Buku & Publikasi</h2>
          <p className="text-[#4a4f57] max-w-2xl mx-auto">
            Koleksi buku yang telah saya tulis untuk memberikan kontribusi nyata bagi perkembangan ilmu hukum Indonesia dan menjadi referensi akademis berkualitas.
          </p>
        </div>

        {/* Books Grid */}
        <div className="space-y-12">
          {(showAll ? books : books.slice(0, 2)).map((book, index) => (
            <div
              key={index}
              className="grid lg:grid-cols-[300px_1fr] gap-8 bg-white border border-[#d1d5db] rounded-2xl overflow-hidden hover:border-[#6b7280] transition-all group cursor-pointer shadow-sm"
              onClick={() => handleBookClick(book)}
            >
              {/* Book Cover */}
              <div className="relative h-[400px] lg:h-auto">
                <ImageWithFallback
                  src={book.coverUrl || book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Awards Badges */}
                {book.awards && book.awards.length > 0 && (
                  <div className="absolute top-4 left-4 space-y-2">
                    {book.awards.map((award, i) => (
                      <div key={i} className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-sm rounded-full">
                        <Star className="w-4 h-4" />
                        {award}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Details */}
              <div className="p-8 space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <h3 className="text-3xl text-[#1a1d23] group-hover:text-[#6b7280] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-[#4a4f57]">{book.subtitle}</p>
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-6 text-[#4a4f57] text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{book.pages}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Tahun: {book.year}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>ISBN: {book.isbn}</span>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(book.rating || 0)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[#1a1d23]">{book.rating || 5}</span>
                  <span className="text-[#4a4f57]">({book.reviews || 0} ulasan)</span>
                </div>

                {/* Description */}
                <p className="text-[#4a4f57] leading-relaxed">
                  {book.description.split('\n\n')[0]}
                </p>

                {/* Publisher */}
                <p className="text-[#4a4f57] text-sm">
                  <span className="text-[#6b7280]">Penerbit:</span> {book.publisher}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <a
                    href={book.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    Beli Buku
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBook(book);
                    }}
                    className="px-6 py-3 bg-white border border-[#d1d5db] text-[#1a1d23] hover:text-[#6b7280] hover:border-[#6b7280] rounded-xl transition-all"
                  >
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-[#4a4f57]">
            Buku-buku tersedia di toko buku online dan offline terkemuka di Indonesia
          </p>
        </div>

        {/* Load More Button */}
        {books.length > 2 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                if (showAll) {
                  // Scroll to section top when collapsing
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
                setShowAll(!showAll);
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/30 transition-all"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${books.length - 2} Buku Lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}