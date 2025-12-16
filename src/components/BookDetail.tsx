import { ArrowLeft, Calendar, BookOpen, User, Tag, Share2, ShoppingCart, ExternalLink, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface BookDetailProps {
  title: string;
  author: string;
  year: string;
  publisher: string;
  pages: string;
  isbn: string;
  image?: string;
  imageUrl?: string;
  coverUrl?: string;
  description: string;
  tableOfContents?: string[];
  buyLink: string;
  views?: number;
  rating?: number;
  reviews?: number;
  onBack: () => void;
}

export function BookDetail({
  title,
  author,
  year,
  publisher,
  pages,
  isbn,
  image,
  imageUrl,
  coverUrl,
  description,
  tableOfContents = [],
  buyLink,
  views = 0,
  rating = 5,
  reviews = 0,
  onBack
}: BookDetailProps) {
  const handleShare = () => {
    toast.success("Link buku berhasil disalin ke clipboard!");
  };

  // Use coverUrl first, then imageUrl, fallback to image
  const displayImage = coverUrl || imageUrl || image || '';

  // Convert rating and reviews to numbers to ensure proper formatting
  const numericRating = typeof rating === 'number' ? rating : parseFloat(rating as any) || 5;
  const numericReviews = typeof reviews === 'number' ? reviews : parseInt(reviews as any) || 0;

  return (
    <div className="min-h-screen bg-[#1a1d23] py-20 px-6 lg:px-12">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6b7280] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#d1d5db] hover:text-[#9ca3af] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali ke Daftar Buku
        </button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Book Cover */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden border-4 border-[#3a3d47] shadow-2xl mb-6">
                <ImageWithFallback
                  src={displayImage}
                  alt={title}
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
              
              {/* Buy Button */}
              <a
                href={buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-6 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/50 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Beli Buku
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Share Button */}
              <button 
                onClick={handleShare}
                className="w-full mt-4 px-6 py-4 bg-[#2a2f37]/50 backdrop-blur-sm border border-[#3a3d47] text-[#d1d5db] hover:text-[#9ca3af] hover:border-[#6b7280] rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Bagikan
              </button>
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Basic Info */}
            <div>
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#6b7280]/20 to-[#9ca3af]/20 border border-[#6b7280]/30 rounded-full mb-4">
                <span className="text-[#9ca3af]">Buku Hukum</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl text-[#f3f4f6] mb-6 leading-tight">
                {title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-[#d1d5db]">
                  <User className="w-5 h-5" />
                  <span className="text-xl">{author}</span>
                </div>
                {views > 0 && (
                  <div className="flex items-center gap-2 text-[#d1d5db]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{views.toLocaleString('id-ID')} kali dilihat</span>
                  </div>
                )}
                {numericRating > 0 && (
                  <div className="flex items-center gap-2 text-[#d1d5db]">
                    <Star className="w-5 h-5 text-[#9ca3af]" />
                    <span>{numericRating.toFixed(1)} ({numericReviews} ulasan)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Book Metadata */}
            <div className="bg-[#2a2f37]/30 backdrop-blur-sm border border-[#3a3d47] rounded-2xl p-6">
              <h3 className="text-[#f3f4f6] text-xl mb-4">Informasi Buku</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-[#9ca3af]" />
                  <div>
                    <div className="text-[#d1d5db] text-sm">Tahun Terbit</div>
                    <div className="text-[#f3f4f6]">{year}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#9ca3af]" />
                  <div>
                    <div className="text-[#d1d5db] text-sm">Jumlah Halaman</div>
                    <div className="text-[#f3f4f6]">{pages}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#9ca3af]" />
                  <div>
                    <div className="text-[#d1d5db] text-sm">Penerbit</div>
                    <div className="text-[#f3f4f6]">{publisher}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-[#9ca3af]" />
                  <div>
                    <div className="text-[#d1d5db] text-sm">ISBN</div>
                    <div className="text-[#f3f4f6]">{isbn}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#2a2f37]/30 backdrop-blur-sm border border-[#3a3d47] rounded-2xl p-6">
              <h3 className="text-[#f3f4f6] text-xl mb-4">Deskripsi</h3>
              <div className="text-[#d1d5db] space-y-4 leading-relaxed">
                {description.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="bg-[#2a2f37]/30 backdrop-blur-sm border border-[#3a3d47] rounded-2xl p-6">
                <h3 className="text-[#f3f4f6] text-xl mb-4">Daftar Isi</h3>
                <ol className="space-y-2">
                  {tableOfContents.map((chapter, index) => (
                    <li key={index} className="text-[#d1d5db] flex gap-3">
                      <span className="text-[#9ca3af] flex-shrink-0">Bab {index + 1}.</span>
                      <span>{chapter}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Author Info */}
            <div className="bg-[#2a2f37]/30 backdrop-blur-sm border border-[#3a3d47] rounded-2xl p-6">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-full flex items-center justify-center text-white flex-shrink-0">
                  <User className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-[#f3f4f6] text-xl mb-2">Tentang Penulis</h3>
                  <p className="text-[#d1d5db] mb-4">
                    Dr. Rita Kartina, S.H., M.H., M.AP. adalah seorang akademisi dan praktisi hukum yang berpengalaman lebih dari 15 tahun di bidang hukum Indonesia. Beliau telah menulis berbagai buku dan artikel ilmiah yang berkontribusi pada pengembangan ilmu hukum di Indonesia.
                  </p>
                  <a href="#profil" className="text-[#9ca3af] hover:text-[#6b7280] transition-colors">
                    Lihat Profil Lengkap →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}