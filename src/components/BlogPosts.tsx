import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArticleDetail } from "./ArticleDetail";
import { Calendar, Clock } from "lucide-react";
import { articlesAPI } from "../utils/api";

export function BlogPosts() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const response = await articlesAPI.getAll();
      const data = response.data || [];
      // Sort by date, newest first
      const sortedData = data.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setPosts(sortedData);
    } catch (error) {
      console.error("Error loading articles:", error);
      // Fallback to empty array if error
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = async (article: any) => {
    // Increment views
    if (article.id) {
      try {
        await articlesAPI.incrementViews(article.id);
        // Reload to get updated views
        await loadArticles();
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    }
    setSelectedArticle(article);
  };

  // Default posts jika database kosong
  const defaultPosts = [
    {
      title: "Analisis Putusan MK tentang Ambang Batas Pencalonan",
      date: "13 Januari 2025",
      readTime: "8 menit",
      category: "Hukum Tata Negara",
      image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzMjEwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "Mahkamah Konstitusi (MK) telah mengeluarkan putusan penting terkait ambang batas pencalonan dalam pemilihan umum. Putusan ini memiliki implikasi yang signifikan terhadap sistem demokrasi di Indonesia.",
      content: `Mahkamah Konstitusi (MK) telah mengeluarkan putusan penting terkait ambang batas pencalonan dalam pemilihan umum. Putusan ini memiliki implikasi yang signifikan terhadap sistem demokrasi di Indonesia.

Dalam pertimbangan hukumnya, MK menekankan pentingnya keseimbangan antara keterbukaan sistem demokrasi dengan kebutuhan untuk menjaga stabilitas politik. Ambang batas yang terlalu tinggi dapat menghambat partisipasi politik, sementara yang terlalu rendah dapat menciptakan fragmentasi yang berlebihan.

Analisis mendalam terhadap putusan ini menunjukkan bahwa MK berupaya mencari titik tengah yang optimal. Hakim konstitusi mempertimbangkan berbagai aspek, mulai dari prinsip demokrasi, hak asasi manusia, hingga efektivitas pemerintahan.

Implikasi praktis dari putusan ini akan terasa dalam pemilihan umum mendatang. Partai politik dan calon independen perlu menyesuaikan strategi mereka dengan ketentuan baru ini. Lebih dari itu, putusan ini juga membuka diskusi lebih lanjut tentang reformasi sistem pemilu di Indonesia.`,
      tags: ["Mahkamah Konstitusi", "Pemilu", "Hukum Tata Negara", "Demokrasi"]
    },
    {
      title: "Perkembangan Hukum Kontrak Elektronik",
      date: "15 November 2024",
      readTime: "10 menit",
      category: "Hukum Perdata",
      image: "https://images.unsplash.com/photo-1649589244330-09ca58e4fa64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MzE5MDE5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "Era digital telah mengubah lanskap hukum kontrak secara fundamental. Kontrak elektronik kini menjadi bagian integral dari transaksi bisnis modern.",
      content: `Era digital telah mengubah lanskap hukum kontrak secara fundamental. Kontrak elektronik, atau e-contract, kini menjadi bagian integral dari transaksi bisnis modern, mulai dari e-commerce hingga layanan keuangan digital.

Perkembangan teknologi blockchain dan smart contracts membawa dimensi baru dalam hukum kontrak. Teknologi ini menawarkan transparansi, keamanan, dan efisiensi yang belum pernah ada sebelumnya. Namun, tantangan hukumnya pun tidak sederhana.

Salah satu isu krusial adalah validitas tanda tangan elektronik. Undang-Undang ITE telah memberikan landasan hukum, namun implementasinya masih memerlukan penyesuaian terus-menerus mengikuti perkembangan teknologi.

Ke depan, harmonisasi hukum kontrak elektronik di tingkat regional dan internasional menjadi kebutuhan mendesak. Indonesia perlu terus menyesuaikan kerangka hukumnya agar tetap relevan dan dapat mendukung pertumbuhan ekonomi digital.`,
      tags: ["E-Contract", "Hukum Perdata", "Teknologi", "ITE"]
    },
    {
      title: "Keadilan Restoratif dalam KUHP Baru",
      date: "2 Oktober 2024",
      readTime: "12 menit",
      category: "Hukum Pidana",
      image: "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MzI2Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "KUHP baru menghadirkan paradigma baru dalam sistem peradilan pidana Indonesia melalui konsep keadilan restoratif.",
      content: `Kitab Undang-Undang Hukum Pidana (KUHP) baru menghadirkan paradigma baru dalam sistem peradilan pidana Indonesia melalui konsep keadilan restoratif. Pendekatan ini menawarkan alternatif dari sistem pemidanaan konvensional yang cenderung retributif.

Keadilan restoratif menekankan pada pemulihan hubungan antara pelaku, korban, dan masyarakat. Prinsip ini mengakui bahwa kejahatan tidak hanya melanggar hukum, tetapi juga merusak hubungan sosial yang perlu dipulihkan.

Implementasi keadilan restoratif dalam KUHP baru membuka peluang untuk penyelesaian perkara pidana di luar pengadilan. Mediasi penal dan diversi menjadi instrumen penting dalam mewujudkan konsep ini, terutama untuk tindak pidana ringan dan pelaku anak.

Tantangannya adalah mengubah mindset aparat penegak hukum dan masyarakat yang sudah terbiasa dengan pendekatan retributif. Diperlukan sosialisasi masif dan pelatihan berkelanjutan untuk memastikan keadilan restoratif dapat diimplementasikan secara efektif.`,
      tags: ["KUHP Baru", "Keadilan Restoratif", "Hukum Pidana", "Reformasi Hukum"]
    },
    {
      title: "Wawancara: Masa Depan Hukum Indonesia",
      date: "18 September 2024",
      readTime: "15 menit",
      category: "Wawancara",
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtpbmclMjBldmVudHxlbnwxfHx8fDE3NjMyOTgyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      excerpt: "Dr. Rita Kartina berbagi pandangannya tentang arah perkembangan hukum Indonesia di masa depan dengan pengalaman lebih dari 15 tahun.",
      content: `Dalam wawancara eksklusif ini, Dr. Rita Kartina berbagi pandangannya tentang arah perkembangan hukum Indonesia di masa depan. Dengan pengalaman lebih dari 15 tahun sebagai akademisi dan praktisi, beliau menawarkan perspektif yang mendalam dan komprehensif.

"Hukum Indonesia sedang berada di titik krusial," ujar Dr. Rita. "Kita perlu menyeimbangkan antara mempertahankan nilai-nilai hukum tradisional dengan kebutuhan untuk beradaptasi dengan perubahan global yang cepat."

Menurut Dr. Rita, teknologi akan memainkan peran semakin penting dalam sistem hukum. Artificial intelligence, big data, dan blockchain bukan hanya mengubah cara kita bertransaksi, tetapi juga bagaimana hukum diterapkan dan ditegakkan.

Beliau juga menekankan pentingnya pendidikan hukum yang progresif. "Fakultas hukum perlu mengajarkan tidak hanya doktrin hukum tradisional, tetapi juga keterampilan interdisipliner yang dibutuhkan dalam era digital," tutup Dr. Rita.`,
      tags: ["Wawancara", "Masa Depan", "Pendidikan Hukum", "Teknologi"]
    }
  ];

  if (selectedArticle) {
    return (
      <ArticleDetail
        {...selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <section id="blog" className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-[#d1d5db]">Memuat artikel...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use database posts if available, otherwise show default posts
  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  return (
    <section ref={sectionRef} id="blog" className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
      {/* Background Gradient */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#f3f4f6] uppercase">Blog & Artikel</h2>
          <p className="text-[#d1d5db] max-w-2xl mx-auto">
            Kumpulan artikel dan opini hukum tentang isu-isu terkini, analisis peraturan perundang-undangan, dan pandangan akademis mengenai perkembangan hukum di Indonesia.
          </p>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {(showAll ? displayPosts : displayPosts.slice(0, 6)).map((post, index) => (
            <div
              key={index}
              className="bg-[#252830] border border-[#3a3d47] rounded-xl overflow-hidden hover:border-[#6b7280] transition-all group shadow-sm cursor-pointer"
              onClick={() => handleArticleClick(post)}
            >
              <div className="relative h-48">
                <ImageWithFallback
                  src={post.imageUrl || post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-5 space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-1 bg-[#3a3d47] text-[#9ca3af] rounded-full border border-[#4a4f57]">
                    {post.category}
                  </span>
                  <span className="text-[#9ca3af] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </span>
                  <span className="text-[#9ca3af] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </span>
                </div>
                
                <h3 className="text-lg text-[#f3f4f6] group-hover:text-[#9ca3af] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-[#d1d5db] text-sm line-clamp-2">
                  {post.excerpt}
                </p>
                
                <button className="text-[#9ca3af] hover:text-[#f3f4f6] transition-colors text-sm flex items-center gap-2">
                  Baca Artikel →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayPosts.length > 6 && (
          <div className="text-center">
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
              {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${displayPosts.length - 6} Artikel Lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}