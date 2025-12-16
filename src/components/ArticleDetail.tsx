import { ArrowLeft, Calendar, Clock, Tag, Share2, BookmarkPlus, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";

interface ArticleDetailProps {
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  imageUrl?: string;
  content: string;
  tags?: string[];
  views?: number;
  documentUrl?: string;
  documentName?: string;
  onBack: () => void;
}

export function ArticleDetail({
  title,
  author,
  date,
  readTime,
  category,
  image,
  imageUrl,
  content,
  tags = [],
  views = 0,
  documentUrl,
  documentName,
  onBack
}: ArticleDetailProps) {
  const handleShare = () => {
    toast.success("Link artikel berhasil disalin ke clipboard!");
  };

  const handleBookmark = () => {
    toast.success("Artikel berhasil disimpan!");
  };

  // Use imageUrl first, fallback to image
  const displayImage = imageUrl || image || '';

  return (
    <div className="min-h-screen bg-[#1a1d23] py-20 px-6 lg:px-12">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#6b7280] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#d1d5db] hover:text-[#9ca3af] transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        {/* Header */}
        <div className="space-y-6 mb-8">
          {/* Category Badge */}
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#6b7280]/20 to-[#9ca3af]/20 border border-[#6b7280]/30 rounded-full">
            <span className="text-[#9ca3af]">{category}</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl text-[#f3f4f6] leading-tight">
            {title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-[#d1d5db]">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{readTime}</span>
            </div>
            {views > 0 && (
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{views.toLocaleString('id-ID')} kali dilihat</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleShare}
              className="px-4 py-2 bg-[#2a2f37]/50 backdrop-blur-sm border border-[#3a3d47] text-[#d1d5db] hover:text-[#9ca3af] hover:border-[#6b7280] rounded-xl transition-all flex items-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Bagikan
            </button>
            <button
              onClick={handleBookmark}
              className="px-4 py-2 bg-[#2a2f37]/50 backdrop-blur-sm border border-[#3a3d47] text-[#d1d5db] hover:text-[#9ca3af] hover:border-[#6b7280] rounded-xl transition-all flex items-center gap-2"
            >
              <BookmarkPlus className="w-5 h-5" />
              Simpan
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden mb-12 border border-[#3a3d47]">
          <ImageWithFallback
            src={displayImage}
            alt={title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none mb-12">
          <div className="text-[#d1d5db] space-y-6 leading-relaxed">
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-[#d1d5db]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Document Download Section */}
        {documentUrl && (
          <div className="bg-gradient-to-r from-[#6b7280]/10 to-[#9ca3af]/10 border border-[#6b7280]/30 rounded-2xl p-8 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-[#f3f4f6] text-xl mb-1">Dokumen Pendukung</h3>
                <p className="text-[#d1d5db] text-sm">{documentName || 'Unduh file pendukung artikel ini'}</p>
              </div>
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Unduh
              </a>
            </div>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="border-t border-[#3a3d47] pt-8 mb-12">
            <div className="flex items-center gap-4 flex-wrap">
              <Tag className="w-5 h-5 text-[#9ca3af]" />
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-[#2a2f37]/30 border border-[#3a3d47] text-[#d1d5db] rounded-lg hover:border-[#6b7280] transition-all cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Author Card */}
        <div className="bg-[#2a2f37]/30 backdrop-blur-sm border border-[#3a3d47] rounded-2xl p-8">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-full flex items-center justify-center text-white flex-shrink-0">
              <User className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-[#f3f4f6] text-xl mb-2">Tentang Penulis</h3>
              <p className="text-[#d1d5db] mb-4">
                Dr. Rita Kartina, S.H., M.H., M.AP. adalah seorang akademisi dan praktisi hukum yang berpengalaman lebih dari 15 tahun di bidang hukum Indonesia. Beliau adalah dosen tetap di Fakultas Hukum dan aktif sebagai peneliti di berbagai lembaga penelitian hukum.
              </p>
              <a href="#profil" className="text-[#9ca3af] hover:text-[#6b7280] transition-colors">
                Lihat Profil Lengkap →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}