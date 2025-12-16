import { Calendar, Clock, ExternalLink } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArticleDetail } from "./ArticleDetail";
import { useState, useEffect, useRef } from "react";
import { newsAPI } from "../utils/api";

export function BlogBerita() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setIsLoading(true);
      const response = await newsAPI.getAll();
      const data = response.data || [];
      // Sort by date, newest first
      const sortedData = data.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setNewsItems(sortedData);
    } catch (error) {
      console.error("Error loading news:", error);
      setNewsItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = async (article: any) => {
    // Increment views
    if (article.id) {
      try {
        await newsAPI.incrementViews(article.id);
        // Reload to get updated views
        await loadNews();
      } catch (error) {
        console.error("Error incrementing views:", error);
      }
    }
    setSelectedArticle(article);
  };

  // Default news jika database kosong
  const defaultNews = [
    {
      title: "Dr. Rita Kartina Menjadi Narasumber di Seminar Nasional Reformasi Hukum Pidana",
      excerpt: "Dalam seminar yang diselenggarakan oleh Mahkamah Agung RI, Dr. Rita memberikan pandangan akademis tentang implementasi KUHP baru...",
      date: "15 November 2024",
      readTime: "5 menit",
      category: "Seminar",
      source: "Kompas.com",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtpbmclMjBldmVudHxlbnwxfHx8fDE3NjMyOTgyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Mahkamah Agung Republik Indonesia menyelenggarakan Seminar Nasional Reformasi Hukum Pidana yang menghadirkan para pakar hukum terkemuka dari berbagai universitas dan lembaga hukum di Indonesia. Dalam acara prestisius ini, Dr. Rita Kartina dipercaya sebagai salah satu narasumber utama untuk memberikan pandangan akademis tentang implementasi KUHP baru.

Seminar yang dihadiri oleh lebih dari 500 peserta dari kalangan hakim, jaksa, advokat, dan akademisi ini berlangsung di Auditorium Mahkamah Agung Jakarta. Dr. Rita menyampaikan materi tentang "Keadilan Restoratif dalam KUHP Baru: Peluang dan Tantangan Implementasi".

Dalam paparannya, Dr. Rita menekankan bahwa KUHP baru membawa perubahan paradigma yang signifikan dalam sistem peradilan pidana Indonesia. "Kita bergerak dari pendekatan retributif yang murni ke arah yang lebih restoratif, yang menekankan pada pemulihan dan rekonsiliasi," ujarnya.

Dr. Rita juga menyoroti pentingnya kesiapan infrastruktur dan sumber daya manusia dalam implementasi KUHP baru. Beliau merekomendasikan agar dilakukan pelatihan intensif bagi aparat penegak hukum dan sosialisasi masif kepada masyarakat untuk memastikan transisi yang mulus.

Seminar ini mendapat sambutan positif dari para peserta yang mengapresiasi analisis mendalam dan rekomendasi praktis yang disampaikan Dr. Rita. Mahkamah Agung berencana menindaklanjuti rekomendasi tersebut dalam penyusunan pedoman teknis pelaksanaan KUHP baru.`,
      tags: ["Seminar", "KUHP Baru", "Hukum Pidana", "Mahkamah Agung"]
    },
    {
      title: "Peluncuran Buku Terbaru: Hukum Pidana Indonesia Teori dan Praktik",
      excerpt: "Buku terbaru Dr. Rita Kartina diluncurkan di Universitas Indonesia dengan sambutan meriah dari akademisi dan praktisi hukum...",
      date: "3 Oktober 2024",
      readTime: "4 menit",
      category: "Publikasi",
      source: "Tempo.co",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzMjEwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Buku terbaru Dr. Rita Kartina berjudul "Hukum Pidana Indonesia: Teori dan Praktik" resmi diluncurkan di Fakultas Hukum Universitas Indonesia. Acara peluncuran yang berlangsung meriah ini dihadiri oleh para akademisi, praktisi hukum, mahasiswa, dan media massa.

Buku setebal 450 halaman ini merupakan hasil riset mendalam selama tiga tahun terakhir yang menggabungkan teori hukum pidana dengan praktik peradilan di Indonesia. Karya ini diterbitkan oleh UI Press dan telah mendapat sambutan positif dari komunitas hukum.

"Buku ini saya tulis dengan harapan dapat menjembatani kesenjangan antara teori hukum pidana yang dipelajari di bangku kuliah dengan praktik di lapangan," ungkap Dr. Rita dalam sambutannya. Buku ini dilengkapi dengan analisis kasus-kasus landmark dan putusan-putusan penting pengadilan.

Yang membuat buku ini unik adalah pendekatan interdisipliner yang digunakan, mengintegrasikan perspektif sosiologi hukum, kriminologi, dan psikologi forensik. Selain itu, buku ini juga membahas secara khusus implementasi KUHP baru dan implikasinya terhadap praktik peradilan.

Peluncuran buku ini mendapat liputan luas dari media nasional. Beberapa universitas terkemuka telah menyatakan minat untuk menggunakan buku ini sebagai referensi utama dalam perkuliahan hukum pidana. Buku ini tersedia di toko buku utama dan platform online.`,
      tags: ["Publikasi", "Buku", "Hukum Pidana", "Akademik"]
    },
    {
      title: "Analisis Ahli: UU Perlindungan Data Pribadi dalam Perspektif Hukum Internasional",
      excerpt: "Dr. Rita Kartina memberikan analisis mendalam tentang kesesuaian UU PDP Indonesia dengan standar internasional seperti GDPR...",
      date: "20 September 2024",
      readTime: "6 menit",
      category: "Opini",
      source: "Media Indonesia",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MzI5MjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Dalam artikel opini yang dimuat di Media Indonesia, Dr. Rita Kartina memberikan analisis komprehensif tentang Undang-Undang Perlindungan Data Pribadi (UU PDP) Indonesia dan kesesuaiannya dengan standar internasional, khususnya General Data Protection Regulation (GDPR) Uni Eropa.

Dr. Rita menilai bahwa UU PDP Indonesia merupakan langkah maju yang signifikan dalam perlindungan privasi digital warga negara. "UU ini telah mengadopsi prinsip-prinsip universal perlindungan data pribadi, termasuk prinsip lawfulness, fairness, dan transparency," tulisnya.

Namun, Dr. Rita juga mengidentifikasi beberapa area yang memerlukan perhatian khusus dalam implementasi, terutama terkait mekanisme penegakan hukum dan kapasitas lembaga pengawas. Beliau membandingkan dengan pengalaman Uni Eropa dalam implementasi GDPR dan pelajaran yang dapat diambil.

Artikel ini juga membahas implikasi UU PDP terhadap bisnis digital, terutama startup dan perusahaan teknologi. Dr. Rita menekankan pentingnya keseimbangan antara perlindungan data pribadi dengan mendorong inovasi digital.

Analisis Dr. Rita mendapat apresiasi luas dari komunitas hukum dan praktisi bisnis digital. Banyak perusahaan yang kemudian mengundang beliau untuk memberikan konsultasi tentang kepatuhan terhadap UU PDP. Artikel ini menjadi referensi penting dalam diskusi publik tentang perlindungan data pribadi di Indonesia.`,
      tags: ["Opini", "Perlindungan Data", "UU PDP", "GDPR", "Hukum Digital"]
    },
    {
      title: "Menjadi Pembicara Utama di Konferensi Internasional Hukum Asia-Pasifik",
      excerpt: "Dr. Rita mempresentasikan penelitiannya tentang keadilan restoratif di hadapan akademisi dari berbagai negara...",
      date: "5 Agustus 2024",
      readTime: "5 menit",
      category: "Konferensi",
      source: "The Jakarta Post",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMjc1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Dr. Rita Kartina tampil sebagai pembicara utama (keynote speaker) di Asia-Pacific Law Conference 2024 yang diselenggarakan di Singapura. Konferensi bergengsi ini menghadirkan lebih dari 300 akademisi, peneliti, dan praktisi hukum dari 25 negara di kawasan Asia-Pasifik.

Dalam presentasinya yang berjudul "Restorative Justice in Southeast Asian Criminal Justice Systems: Challenges and Opportunities", Dr. Rita memaparkan hasil penelitiannya tentang implementasi keadilan restoratif di negara-negara Asia Tenggara, dengan fokus khusus pada Indonesia.

Dr. Rita menggunakan pendekatan komparatif untuk menganalisis keberhasilan dan tantangan implementasi keadilan restoratif di berbagai yurisdiksi. "Setiap negara memiliki konteks budaya dan sistem hukum yang unik, sehingga pendekatan implementasi perlu disesuaikan," jelasnya.

Presentasi Dr. Rita mendapat sambutan antusias dari para peserta konferensi. Sesi tanya jawab berlangsung sangat dinamis dengan berbagai pertanyaan kritis dan diskusi mendalam tentang masa depan sistem peradilan pidana di kawasan Asia-Pasifik.

Penampilan Dr. Rita di forum internasional ini semakin mengukuhkan reputasinya sebagai pakar hukum pidana terkemuka di kawasan Asia-Pasifik. Beberapa universitas dari negara lain menyatakan minat untuk berkolaborasi dalam penelitian bersama tentang keadilan restoratif.`,
      tags: ["Konferensi", "Internasional", "Keadilan Restoratif", "Asia-Pasifik"]
    },
    {
      title: "Penghargaan Akademisi Terbaik dari Kementerian Pendidikan",
      excerpt: "Atas kontribusinya dalam pengembangan ilmu hukum, Dr. Rita Kartina menerima penghargaan sebagai Akademisi Terbaik 2024...",
      date: "12 Juli 2024",
      readTime: "3 menit",
      category: "Penghargaan",
      source: "CNN Indonesia",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MzI5ODMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi menganugerahkan penghargaan "Akademisi Terbaik 2024" kepada Dr. Rita Kartina atas kontribusinya yang luar biasa dalam pengembangan ilmu hukum di Indonesia. Penghargaan ini diserahkan langsung oleh Menteri Pendidikan dalam upacara yang berlangsung di Jakarta.

Penghargaan ini diberikan berdasarkan penilaian komprehensif terhadap karya ilmiah, pengajaran, pengabdian masyarakat, dan dampak akademik yang dihasilkan. Dr. Rita dinilai telah memberikan kontribusi signifikan melalui publikasi internasional, bimbingan mahasiswa, dan advokasi kebijakan hukum.

"Saya sangat terhormat menerima penghargaan ini. Ini adalah motivasi untuk terus berkontribusi dalam pengembangan ilmu hukum dan pendidikan hukum di Indonesia," ungkap Dr. Rita dalam pidato penerimaannya.

Sepanjang karirnya, Dr. Rita telah menerbitkan lebih dari 50 artikel jurnal internasional, membimbing ratusan mahasiswa S2 dan S3, serta aktif memberikan masukan kebijakan kepada pemerintah. Beliau juga dikenal sebagai dosen yang inspiratif dengan metode pengajaran yang inovatif.

Penghargaan ini semakin menegaskan posisi Dr. Rita sebagai salah satu akademisi hukum terkemuka di Indonesia. Rekan-rekan sejawat dan mahasiswa-mahasiswanya memberikan ucapan selamat dan apresiasi atas pencapaian yang luar biasa ini.`,
      tags: ["Penghargaan", "Akademisi", "Kementerian Pendidikan", "Prestasi"]
    },
    {
      title: "Workshop Penelitian Hukum untuk Mahasiswa S2 dan S3",
      excerpt: "Mengadakan workshop intensif tentang metodologi penelitian hukum dan penulisan artikel jurnal internasional...",
      date: "28 Juni 2024",
      readTime: "4 menit",
      category: "Workshop",
      source: "Tribun News",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MzI2Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Dr. Rita Kartina menyelenggarakan workshop intensif tentang metodologi penelitian hukum dan penulisan artikel jurnal internasional untuk mahasiswa program pascasarjana (S2 dan S3). Workshop yang berlangsung selama tiga hari ini diikuti oleh 50 peserta dari berbagai universitas di Indonesia.

Workshop ini dirancang untuk memberikan pemahaman mendalam tentang berbagai aspek penelitian hukum, mulai dari perumusan masalah penelitian, pemilihan metodologi yang tepat, analisis data, hingga penulisan artikel yang memenuhi standar jurnal internasional bereputasi.

"Banyak mahasiswa yang memiliki ide penelitian bagus namun kesulitan dalam eksekusi dan penulisan. Workshop ini bertujuan membekali mereka dengan keterampilan praktis yang dibutuhkan," jelas Dr. Rita.

Materi workshop mencakup strategi publikasi di jurnal internasional, teknik literature review yang efektif, penggunaan software analisis data hukum, dan tips menghadapi proses peer review. Peserta juga mendapat kesempatan untuk mempresentasikan proposal penelitian mereka dan menerima feedback langsung.

Workshop ini mendapat respon sangat positif dari peserta. Banyak yang menyatakan bahwa workshop ini sangat membantu dalam mengatasi hambatan yang mereka hadapi dalam penelitian. Beberapa peserta bahkan telah berhasil mempublikasikan artikel mereka di jurnal internasional setelah mengikuti workshop ini.`,
      tags: ["Workshop", "Penelitian", "Metodologi", "Publikasi Ilmiah"]
    }
  ];

  const categories = ["Semua", "Seminar", "Publikasi", "Konferensi", "Penghargaan", "Workshop", "Opini"];

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
      <section className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-[#d1d5db]">Memuat berita...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use database news if available, otherwise show default news
  const displayNews = newsItems.length > 0 ? newsItems : defaultNews;

  // Guard: check if displayNews has items
  if (!displayNews || displayNews.length === 0) {
    return (
      <section className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl text-white uppercase">Berita & Liputan</h2>
            <p className="text-[#d1d5db]">Belum ada berita tersedia.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="berita" className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#f3f4f6] uppercase">Berita & Liputan</h2>
          <p className="text-[#d1d5db] max-w-2xl mx-auto">
            Aktivitas akademik, seminar, publikasi, dan berbagai kegiatan lainnya yang telah diliput oleh media nasional dan internasional.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-5 py-2 rounded-full border transition-all text-sm ${
                index === 0
                  ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white border-transparent"
                  : "bg-transparent text-[#d1d5db] border-[#3a3d47] hover:border-[#6b7280]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured News */}
        <div className="mb-12">
          <div 
            onClick={() => handleArticleClick(displayNews[0])}
            className="group cursor-pointer"
          >
            <div className="grid lg:grid-cols-2 gap-6 bg-[#252830] border border-[#3a3d47] rounded-2xl overflow-hidden hover:border-[#6b7280] transition-all shadow-sm">
              <div className="relative h-[300px] lg:h-auto">
                <ImageWithFallback
                  src={displayNews[0].imageUrl || displayNews[0].image}
                  alt={displayNews[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-sm rounded-full">
                    {displayNews[0].category}
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-4 text-sm text-[#9ca3af]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {displayNews[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {displayNews[0].readTime}
                  </div>
                </div>
                <h3 className="text-[#f3f4f6] text-3xl group-hover:text-[#9ca3af] transition-colors">
                  {displayNews[0].title}
                </h3>
                <p className="text-[#d1d5db]">{displayNews[0].excerpt}</p>
                <div className="flex items-center justify-between pt-4 border-t border-[#3a3d47]">
                  <span className="text-[#9ca3af] text-sm">Sumber: {displayNews[0].source}</span>
                  <button className="flex items-center gap-2 text-[#9ca3af] hover:text-[#d1d5db] transition-colors">
                    Baca Selengkapnya
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {(showAll ? displayNews.slice(1) : displayNews.slice(1, 4)).map((item, index) => (
            <div
              key={index}
              onClick={() => handleArticleClick(item)}
              className="group cursor-pointer bg-[#252830] border border-[#3a3d47] rounded-xl overflow-hidden hover:border-[#6b7280] transition-all shadow-sm"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl || item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#1a1d23]/80 backdrop-blur-sm text-[#f3f4f6] text-xs rounded-full border border-[#3a3d47]">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#9ca3af]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </div>
                  {item.views > 0 && (
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {item.views}
                    </div>
                  )}
                </div>
                <h3 className="text-[#f3f4f6] text-lg group-hover:text-[#9ca3af] transition-colors line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-[#d1d5db] text-sm line-clamp-2">{item.excerpt}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#3a3d47]">
                  <span className="text-[#9ca3af] text-xs">{item.source}</span>
                  <ExternalLink className="w-4 h-4 text-[#9ca3af]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {displayNews.length > 4 && (
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
              {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${displayNews.length - 4} Berita Lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}