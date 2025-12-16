import { BookOpen, FileText, Search, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { writingsAPI } from "../utils/api";

export function BlogKaryaTulis() {
  const [selectedField, setSelectedField] = useState("hukum");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [writings, setWritings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadWritings();
  }, []);

  const loadWritings = async () => {
    try {
      setIsLoading(true);
      const response = await writingsAPI.getAll();
      const data = response.data || [];
      // Sort by year, newest first
      const sortedData = data.sort((a: any, b: any) => {
        return parseInt(b.year || "0") - parseInt(a.year || "0");
      });
      setWritings(sortedData);
    } catch (error) {
      console.error("Error loading writings:", error);
      setWritings([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Default karya tulis jika database kosong
  const hukumPapers = [
    {
      title: "Reformasi Sistem Peradilan Pidana dalam Perspektif Keadilan Restoratif",
      type: "Jurnal Internasional",
      journal: "Indonesian Journal of Criminal Law",
      year: "2024",
      citation: "25 kutipan",
      abstract: "Penelitian ini mengkaji implementasi keadilan restoratif dalam sistem peradilan pidana Indonesia pasca KUHP baru...",
      category: "Hukum Pidana",
      image: "https://images.unsplash.com/photo-1752697589070-805ce3817859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBqdXN0aWNlJTIwYm9va3N8ZW58MXx8fHwxNzYzNzM1MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/reformasi-peradilan-pidana-2024"
    },
    {
      title: "Perlindungan Data Pribadi di Era Digital: Tantangan dan Solusi Hukum",
      type: "Jurnal Nasional Terakreditasi",
      journal: "Jurnal Hukum dan Pembangunan",
      year: "2024",
      citation: "18 kutipan",
      abstract: "Analisis komprehensif tentang UU Perlindungan Data Pribadi dan implikasinya terhadap privasi digital masyarakat...",
      category: "Hukum Bisnis",
      image: "https://images.unsplash.com/photo-1762330465065-af76f23809db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwcHJpdmFjeSUyMGRpZ2l0YWx8ZW58MXx8fHwxNzYzNzQzOTg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/perlindungan-data-pribadi-2024"
    },
    {
      title: "Konstitusionalitas Pembatasan Hak Asasi dalam Keadaan Darurat",
      type: "Jurnal Internasional",
      journal: "Constitutional Review Journal",
      year: "2023",
      citation: "32 kutipan",
      abstract: "Studi komparatif tentang pembatasan HAM dalam kondisi darurat kesehatan dan keamanan nasional...",
      category: "Hukum Tata Negara",
      image: "https://images.unsplash.com/photo-1688417486356-a302759b826a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdGl0dXRpb24lMjBnb3Zlcm5tZW50fGVufDF8fHx8MTc2Mzc0Mzk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/konstitusionalitas-pembatasan-ham-2023"
    },
    {
      title: "Hukum Kontrak Elektronik dalam Transaksi E-Commerce Indonesia",
      type: "Jurnal Nasional Terakreditasi",
      journal: "Media Hukum",
      year: "2023",
      citation: "21 kutipan",
      abstract: "Penelitian tentang keabsahan kontrak elektronik dan perlindungan konsumen dalam perdagangan digital...",
      category: "Hukum Perdata",
      image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjM2Nzc3OTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/kontrak-elektronik-ecommerce-2023"
    },
    {
      title: "Penegakan Hukum Lingkungan dalam Konteks Pembangunan Berkelanjutan",
      type: "Jurnal Internasional",
      journal: "Environmental Law Review",
      year: "2022",
      citation: "28 kutipan",
      abstract: "Kajian tentang efektivitas penegakan hukum lingkungan dan keseimbangan dengan kepentingan ekonomi...",
      category: "Hukum Lingkungan",
      image: "https://images.unsplash.com/photo-1629331873972-43bbadd8e17c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnZpcm9ubWVudCUyMG5hdHVyZSUyMHN1c3RhaW5hYmlsaXR5fGVufDF8fHx8MTc2Mzc0Mzk5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/hukum-lingkungan-berkelanjutan-2022"
    },
    {
      title: "Aspek Hukum Keuangan Negara dalam Pengelolaan APBN",
      type: "Buku",
      journal: "Penerbit Universitas Indonesia",
      year: "2022",
      citation: "35 kutipan",
      abstract: "Buku ini membahas aspek hukum dalam pengelolaan keuangan negara dan mekanisme pengawasan APBN...",
      category: "Hukum Administrasi",
      image: "https://images.unsplash.com/photo-1650821414390-276561abd95a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwZ292ZXJubWVudCUyMGJ1ZGdldHxlbnwxfHx8fDE3NjM3NDM5OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://press.ui.ac.id/aspek-hukum-keuangan-negara-2022"
    }
  ];

  const administrasiPapers = [
    {
      title: "Good Governance dan Akuntabilitas Penyelenggara Negara",
      type: "Buku",
      journal: "Penerbit Universitas Indonesia",
      year: "2024",
      citation: "45 kutipan",
      abstract: "Buku ini membahas prinsip-prinsip good governance dan mekanisme akuntabilitas dalam sistem pemerintahan...",
      category: "Administrasi Publik",
      image: "https://images.unsplash.com/photo-1640200330428-9fe2ab926de1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3Zlcm5hbmNlJTIwYWNjb3VudGFiaWxpdHklMjBtZWV0aW5nfGVufDF8fHx8MTc2Mzc0Mzk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://press.ui.ac.id/good-governance-akuntabilitas-2024"
    },
    {
      title: "Reformasi Birokrasi dan Peningkatan Kualitas Pelayanan Publik",
      type: "Jurnal Nasional Terakreditasi",
      journal: "Jurnal Administrasi Publik",
      year: "2024",
      citation: "22 kutipan",
      abstract: "Analisis implementasi reformasi birokrasi di Indonesia dan dampaknya terhadap kualitas layanan publik...",
      category: "Reformasi Birokrasi",
      image: "https://images.unsplash.com/photo-1590143304643-1c6c082de949?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBzZXJ2aWNlJTIwb2ZmaWNlfGVufDF8fHx8MTc2Mzc0Mzk5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/reformasi-birokrasi-pelayanan-2024"
    },
    {
      title: "Manajemen Keuangan Daerah dalam Konteks Otonomi Daerah",
      type: "Jurnal Internasional",
      journal: "Public Finance Review",
      year: "2023",
      citation: "30 kutipan",
      abstract: "Studi tentang pengelolaan keuangan daerah pasca otonomi dan tantangan fiskal yang dihadapi pemerintah daerah...",
      category: "Keuangan Publik",
      image: "https://images.unsplash.com/photo-1763565062965-16173b9ee752?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBwbGFubmluZyUyMG1hbmFnZW1lbnR8ZW58MXx8fHwxNzYzNzQzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/manajemen-keuangan-daerah-2023"
    },
    {
      title: "E-Government dan Transformasi Digital Pelayanan Publik",
      type: "Jurnal Nasional Terakreditasi",
      journal: "Jurnal Kebijakan dan Manajemen Publik",
      year: "2023",
      citation: "27 kutipan",
      abstract: "Penelitian tentang implementasi e-government dalam meningkatkan efisiensi dan transparansi pelayanan publik...",
      category: "Inovasi Pelayanan",
      image: "https://images.unsplash.com/photo-1649056172285-79288aefaaa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGdvdmVybm1lbnR8ZW58MXx8fHwxNzYzNzQzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/egovernment-transformasi-digital-2023"
    },
    {
      title: "Kebijakan Publik: Analisis, Formulasi, dan Implementasi",
      type: "Buku",
      journal: "Rajawali Press",
      year: "2022",
      citation: "52 kutipan",
      abstract: "Buku komprehensif tentang proses kebijakan publik dari tahap analisis hingga evaluasi implementasi...",
      category: "Kebijakan Publik",
      image: "https://images.unsplash.com/photo-1758872815676-3e4e2e81848a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwdWJsaWMlMjBwb2xpY3klMjBwbGFubmluZ3xlbnwxfHx8fDE3NjM3NDM5OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://rajawalipress.com/kebijakan-publik-2022"
    },
    {
      title: "Partisipasi Masyarakat dalam Perencanaan Pembangunan Daerah",
      type: "Jurnal Internasional",
      journal: "Journal of Public Administration",
      year: "2022",
      citation: "19 kutipan",
      abstract: "Kajian tentang pentingnya partisipasi masyarakat dalam proses perencanaan pembangunan untuk mencapai pembangunan yang berkelanjutan...",
      category: "Pembangunan Daerah",
      image: "https://images.unsplash.com/photo-1761723818201-2b86e46e8cc7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBwYXJ0aWNpcGF0aW9uJTIwZGV2ZWxvcG1lbnR8ZW58MXx8fHwxNzYzNzQzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      link: "https://journal.ui.ac.id/partisipasi-masyarakat-pembangunan-2022"
    }
  ];

  const papers = selectedField === "hukum" ? hukumPapers : administrasiPapers;
  const categories = selectedField === "hukum" 
    ? ["Semua", "Hukum Pidana", "Hukum Perdata", "Hukum Tata Negara", "Hukum Bisnis", "Hukum Administrasi"]
    : ["Semua", "Administrasi Publik", "Reformasi Birokrasi", "Keuangan Publik", "Kebijakan Publik", "Inovasi Pelayanan"];

  // Show loading state
  if (isLoading) {
    return (
      <section id="karya-tulis" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b7280]"></div>
            <p className="text-[#6b7280]">Memuat karya tulis...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use database writings if available, otherwise show default papers
  const displayPapers = writings.length > 0 ? writings : papers;

  // Filter by selected field
  const filteredByField = displayPapers.filter((paper: any) => {
    if (writings.length > 0) {
      // For database writings, use category field
      return selectedField === "hukum" 
        ? paper.category === "hukum"
        : paper.category === "administrasi-publik";
    } else {
      // For default papers, they're already pre-filtered
      return true;
    }
  });

  return (
    <section ref={sectionRef} id="karya-tulis" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3a3f47] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#1a1d23] uppercase">Karya Tulis Ilmiah</h2>
          <p className="text-[#4a4f57] max-w-2xl mx-auto">
            Koleksi publikasi ilmiah, jurnal, dan buku di bidang Hukum dan Administrasi Publik yang telah diterbitkan di berbagai jurnal nasional dan internasional.
          </p>
        </div>

        {/* Field Selector Dropdown */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/50 transition-all flex items-center gap-3 min-w-[280px] justify-between"
            >
              <span className="text-lg">
                {selectedField === "hukum" ? "Bidang Hukum" : "Bidang Administrasi Publik"}
              </span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#d1d5db] rounded-xl overflow-hidden shadow-xl z-10">
                <button
                  onClick={() => {
                    setSelectedField("hukum");
                    setIsDropdownOpen(false);
                    setShowAll(false); // Reset showAll when changing field
                  }}
                  className={`w-full px-6 py-4 text-left transition-colors ${
                    selectedField === "hukum" 
                      ? "bg-[#6b7280] text-white" 
                      : "text-[#1a1d23] hover:bg-[#f3f4f6]"
                  }`}
                >
                  Bidang Hukum
                </button>
                <button
                  onClick={() => {
                    setSelectedField("administrasi");
                    setIsDropdownOpen(false);
                    setShowAll(false); // Reset showAll when changing field
                  }}
                  className={`w-full px-6 py-4 text-left transition-colors ${
                    selectedField === "administrasi" 
                      ? "bg-[#6b7280] text-white" 
                      : "text-[#1a1d23] hover:bg-[#f3f4f6]"
                  }`}
                >
                  Bidang Administrasi Publik
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7280]" />
              <input
                type="text"
                placeholder="Cari karya tulis..."
                className="w-full pl-12 pr-4 py-4 bg-white border border-[#d1d5db] text-[#1a1d23] placeholder-[#6b7280] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors"
              />
            </div>
          </div>

          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-6 py-2 rounded-full border transition-all ${
                  index === 0
                    ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white border-transparent"
                    : "bg-transparent text-[#4a4f57] border-[#d1d5db] hover:border-[#6b7280]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {(showAll ? filteredByField : filteredByField.slice(0, 4)).map((paper, index) => (
            <div
              key={index}
              className="bg-white backdrop-blur-sm border border-[#d1d5db] rounded-xl overflow-hidden hover:border-[#6b7280] hover:bg-[#f9fafb] transition-all group"
            >
              {/* Image */}
              {(paper.imageUrl || paper.image) && (
                <div className="w-full h-48 overflow-hidden">
                  <ImageWithFallback
                    src={paper.imageUrl || paper.image}
                    alt={paper.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center text-white">
                    {paper.type === "Buku" ? (
                      <BookOpen className="w-6 h-6" />
                    ) : (
                      <FileText className="w-6 h-6" />
                    )}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-[#f3f4f6] border border-[#d1d5db] text-[#6b7280] text-xs rounded-full mb-2">
                      {paper.category === "hukum" ? "Bidang Hukum" : paper.category === "administrasi-publik" ? "Administrasi Publik" : paper.category}
                    </span>
                    <h3 className="text-[#1a1d23] text-xl group-hover:text-[#6b7280] transition-colors">
                      {paper.title}
                    </h3>
                  </div>
                </div>

                {/* Details - Only show if available */}
                {(paper.type || paper.journal || paper.year || paper.citation) && (
                  <div className="space-y-2 text-sm">
                    {(paper.type || paper.journal) && (
                      <p className="text-[#4a4f57]">
                        {paper.type && <span className="text-[#6b7280]">{paper.type}</span>}
                        {paper.type && paper.journal && " • "}
                        {paper.journal}
                      </p>
                    )}
                    {(paper.year || paper.citation) && (
                      <p className="text-[#4a4f57]">
                        {paper.year}
                        {paper.year && paper.citation && " • "}
                        {paper.citation}
                      </p>
                    )}
                  </div>
                )}

                {/* Abstract/Description */}
                {(paper.description || paper.abstract) && (
                  <p className="text-[#4a4f57] text-sm line-clamp-2">
                    {paper.description || paper.abstract}
                  </p>
                )}

                {/* Action - Link to external website */}
                {(paper.fileUrl || paper.link) && (
                  <a 
                    href={paper.fileUrl || paper.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-lg hover:shadow-lg hover:shadow-[#6b7280]/50 transition-all text-sm"
                  >
                    <FileText className="w-4 h-4" />
                    Buka Karya Tulis
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {filteredByField.length > 4 && (
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
              {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${filteredByField.length - 4} Karya Tulis Lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}