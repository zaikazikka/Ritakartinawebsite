import { Calendar, Clock, User } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArticleDetail } from "./ArticleDetail";
import { useState } from "react";

export function BlogHobi() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  const articles = [
    {
      title: "Menemukan Ketenangan Melalui Membaca Literatur Klasik",
      excerpt: "Bagaimana membaca karya-karya klasik seperti To Kill a Mockingbird dan 1984 memberikan perspektif baru tentang keadilan dan hukum dalam kehidupan modern...",
      date: "12 November 2024",
      readTime: "8 menit",
      category: "Membaca",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzMjEwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Membaca literatur klasik bukan hanya sekadar hobi bagi saya, tetapi juga menjadi jendela untuk memahami keadilan, moralitas, dan hukum dari perspektif yang lebih luas dan mendalam. Karya-karya seperti "To Kill a Mockingbird" karya Harper Lee dan "1984" karya George Orwell memberikan refleksi kritis tentang sistem hukum dan kekuasaan.

Dalam "To Kill a Mockingbird", saya menemukan potret nyata tentang bagaimana prasangka rasial dapat mempengaruhi sistem peradilan. Tokoh Atticus Finch mengajarkan bahwa keadilan sejati memerlukan keberanian untuk melawan arus, bahkan ketika seluruh masyarakat berdiri di sisi yang berlawanan. Ini mengingatkan saya pada pentingnya integritas dalam praktik hukum.

Novel "1984" memberikan peringatan tentang bahaya totalitarianisme dan bagaimana hukum dapat dimanipulasi untuk mengontrol masyarakat. Orwell menggambarkan dunia di mana kebenaran adalah apa yang dikatakan oleh penguasa. Ini menjadi pengingat bagi saya sebagai akademisi hukum untuk selalu kritis dan menjaga independensi pemikiran.

Membaca karya-karya klasik ini memberikan perspektif historis dan filosofis yang memperkaya pemahaman saya tentang hukum. Mereka mengajarkan bahwa hukum bukan hanya sekumpulan aturan, tetapi refleksi dari nilai-nilai masyarakat dan instrumen untuk mencapai keadilan sosial.`,
      tags: ["Literatur", "Membaca", "Filosofi Hukum", "Keadilan"]
    },
    {
      title: "Mengabadikan Momen: Fotografi Arsitektur Klasik di Jakarta",
      excerpt: "Perjalanan fotografi saya mengeksplorasi bangunan-bangunan bersejarah di Jakarta yang menyimpan nilai hukum dan sejarah Indonesia...",
      date: "28 Oktober 2024",
      readTime: "6 menit",
      category: "Fotografi",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MzI5ODMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Fotografi arsitektur telah menjadi salah satu hobi yang sangat saya nikmati, terutama ketika mengeksplorasi bangunan-bangunan bersejarah di Jakarta. Setiap bangunan memiliki cerita, dan banyak di antaranya terkait erat dengan sejarah hukum dan pemerintahan Indonesia.

Salah satu lokasi favorit saya adalah kawasan Kota Tua Jakarta. Gedung-gedung peninggalan kolonial Belanda di sana, termasuk bekas gedung pengadilan, menyimpan memori tentang sistem hukum yang pernah berlaku. Melalui lensa kamera, saya berusaha menangkap tidak hanya keindahan arsitekturnya, tetapi juga atmosfer sejarah yang terpancar.

Museum Fatahillah, yang dulunya adalah Stadhuis atau Balai Kota Batavia, juga bekas gedung pengadilan, menjadi objek yang menarik. Arsitekturnya yang megah mencerminkan kekuasaan kolonial pada zamannya. Mengabadikan detail-detail seperti ukiran, pilar, dan tata ruangnya memberikan apresiasi mendalam terhadap bagaimana ruang fisik mencerminkan struktur kekuasaan.

Fotografi arsitektur mengajarkan saya untuk melihat detail dan konteks. Sama seperti dalam analisis hukum, di mana kita perlu memahami konteks historis dan sosial, fotografi menuntut kita untuk memahami latar belakang sebuah bangunan untuk bisa menangkap esensinya.`,
      tags: ["Fotografi", "Arsitektur", "Sejarah", "Jakarta"]
    },
    {
      title: "Traveling ke Jepang: Belajar Sistem Hukum dari Negeri Sakura",
      excerpt: "Pengalaman mengunjungi pengadilan dan fakultas hukum di Tokyo memberikan wawasan baru tentang sistem peradilan yang efisien dan modern...",
      date: "15 Oktober 2024",
      readTime: "10 menit",
      category: "Traveling",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MzI2Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Perjalanan ke Jepang bukan hanya tentang menikmati keindahan alam atau kuliner, tetapi juga menjadi kesempatan emas untuk mempelajari sistem hukum yang sangat berbeda namun sangat efisien. Kunjungan saya ke Tokyo Supreme Court dan beberapa fakultas hukum terkemuka memberikan perspektif baru yang sangat berharga.

Sistem peradilan Jepang dikenal dengan tingkat efisiensi yang tinggi dan tingkat konviksi yang mencapai 99%. Meski angka ini sering diperdebatkan, saya melihat langsung bagaimana sistem mereka berfokus pada investigasi yang sangat mendalam sebelum kasus dibawa ke pengadilan. Proses pra-peradilan yang ketat memastikan bahwa hanya kasus dengan bukti kuat yang masuk ke tahap persidangan.

Saya juga berkesempatan berdiskusi dengan beberapa profesor hukum di Universitas Tokyo. Mereka menjelaskan konsep "honne" dan "tatemae" dalam konteks hukum Jepang – yaitu perbedaan antara keinginan pribadi dan kewajiban sosial. Konsep ini sangat mempengaruhi bagaimana masyarakat Jepang memandang hukum dan kepatuhan.

Yang paling mengesankan adalah budaya mediasi dalam sistem hukum Jepang. Mereka sangat menekankan penyelesaian sengketa secara damai sebelum masuk ke pengadilan, sebuah pendekatan yang sejalan dengan nilai-nilai keharmonisan sosial. Ini memberikan pelajaran berharga tentang pentingnya keadilan restoratif.`,
      tags: ["Traveling", "Jepang", "Sistem Hukum", "Komparasi Hukum"]
    },
    {
      title: "Mozart dan Bach: Musik yang Menemani Penulisan Jurnal Hukum",
      excerpt: "Peran musik klasik dalam meningkatkan konsentrasi dan kreativitas saat menulis artikel ilmiah dan melakukan penelitian hukum...",
      date: "2 Oktober 2024",
      readTime: "5 menit",
      category: "Musik",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMjc1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Musik klasik telah menjadi teman setia saya dalam setiap proses penulisan artikel ilmiah dan penelitian hukum. Komposisi-komposisi dari Mozart, Bach, dan Beethoven menciptakan atmosfer yang sempurna untuk berpikir mendalam dan menulis dengan fokus tinggi.

Mozart, dengan melodi-melodinya yang harmonis dan terstruktur, memberikan ketenangan yang saya butuhkan ketika menganalisis permasalahan hukum yang kompleks. Sonata Piano-nya, khususnya Piano Sonata No. 16 in C major, memiliki ritme yang membantu otak saya tetap aktif tanpa terdistraksi.

Bach, di sisi lain, dengan komposisi matematisnya yang presisi seperti dalam The Well-Tempered Clavier, mencerminkan cara berpikir logis yang sangat dibutuhkan dalam penulisan hukum. Struktur musik Bach yang teratur dan sistematis seolah mengajarkan bagaimana menyusun argumen hukum yang koheren dan terstruktur.

Penelitian ilmiah juga mendukung pengalaman subjektif saya ini. Musik klasik, khususnya dari era Baroque dan Classical, terbukti dapat meningkatkan fungsi kognitif dan konsentrasi. Tempo yang moderat dan tidak ada lirik membuat pikiran tetap fokus pada pekerjaan tanpa gangguan emosional yang berlebihan.`,
      tags: ["Musik", "Klasik", "Produktivitas", "Konsentrasi"]
    },
    {
      title: "Menulis Esai: Menyalurkan Pemikiran di Luar Dunia Akademis",
      excerpt: "Menulis esai tentang kehidupan sehari-hari dan filosofi hukum membantu saya melihat hukum dari sudut pandang yang lebih humanis...",
      date: "18 September 2024",
      readTime: "7 menit",
      category: "Menulis",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MzI5MjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Menulis esai di luar konteks akademis telah menjadi outlet kreatif yang sangat berharga bagi saya. Berbeda dengan artikel jurnal yang harus mengikuti format dan gaya penulisan yang ketat, esai memberikan kebebasan untuk mengeksplorasi pemikiran dengan cara yang lebih personal dan reflektif.

Saya sering menulis esai tentang pengamatan sehari-hari yang memiliki dimensi hukum atau filosofis. Misalnya, bagaimana interaksi di pasar tradisional mencerminkan konsep kontrak sosial, atau bagaimana kemacetan lalu lintas Jakarta dapat menjadi metafora untuk kompleksitas sistem hukum Indonesia.

Menulis esai mengajarkan saya untuk melihat hukum tidak hanya sebagai sistem norma yang kaku, tetapi sebagai fenomena sosial yang hidup dan bernapas. Ini membantu saya mengembangkan perspektif yang lebih humanis, memahami bahwa di balik setiap aturan hukum ada manusia dengan cerita, harapan, dan perjuangannya masing-masing.

Proses menulis esai juga melatih kemampuan bercerita, yang ternyata sangat berguna dalam dunia akademis. Kemampuan untuk menyampaikan argumen hukum yang kompleks dengan cara yang menarik dan mudah dipahami adalah keterampilan yang sangat berharga, baik dalam pengajaran maupun dalam publikasi ilmiah.`,
      tags: ["Menulis", "Esai", "Filosofi", "Refleksi"]
    },
    {
      title: "Eksplorasi Alam: Mendaki Gunung Sebagai Terapi Mental",
      excerpt: "Mendaki gunung mengajarkan saya tentang ketekunan, kesabaran, dan perspektif baru yang sangat berguna dalam praktik hukum...",
      date: "5 September 2024",
      readTime: "9 menit",
      category: "Traveling",
      author: "Dr. Rita Kartina, S.H., M.H., M.AP.",
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtpbmclMjBldmVudHxlbnwxfHx8fDE3NjMyOTgyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      content: `Mendaki gunung telah menjadi terapi mental yang sangat efektif bagi saya di tengah kesibukan sebagai akademisi hukum. Setiap pendakian menawarkan tantangan fisik sekaligus meditasi mental yang membantu me-refresh pikiran dan mendapatkan perspektif baru.

Pelajaran pertama yang saya dapatkan dari mendaki gunung adalah tentang ketekunan. Sama seperti dalam riset hukum yang memerlukan ketekunan dalam membaca ratusan halaman putusan pengadilan atau literatur, mendaki gunung mengajarkan untuk tidak menyerah meski jalur terasa berat. Setiap langkah kecil membawa kita lebih dekat ke puncak.

Kesabaran adalah pelajaran kedua. Di gunung, kita tidak bisa terburu-buru. Kita harus menyesuaikan diri dengan kondisi medan, cuaca, dan kemampuan fisik. Ini sangat relevan dengan praktik hukum, di mana proses peradilan memerlukan kesabaran dan tidak bisa dipaksakan untuk bergerak lebih cepat dari yang seharusnya.

Yang paling berharga adalah perspektif yang didapat dari puncak gunung. Melihat hamparan alam yang luas dari ketinggian mengingatkan saya untuk selalu melihat permasalahan hukum dari sudut pandang yang lebih luas. Kadang kita terlalu fokus pada detail teknis dan lupa melihat gambaran besar dan dampak sosial dari hukum yang kita kaji.

Mendaki gunung juga mengajarkan tentang pentingnya persiapan dan manajemen risiko – keterampilan yang sangat penting dalam praktik hukum. Kita harus mempersiapkan diri dengan baik, mengantisipasi berbagai skenario, dan siap menghadapi tantangan yang tidak terduga.`,
      tags: ["Mendaki", "Alam", "Mental Health", "Filosofi"]
    }
  ];

  const categories = ["Semua", "Membaca", "Menulis", "Fotografi", "Traveling", "Musik"];

  if (selectedArticle) {
    return (
      <ArticleDetail
        {...selectedArticle}
        onBack={() => setSelectedArticle(null)}
      />
    );
  }

  return (
    <section id="hobi" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3a3f47] rounded-full blur-[150px] opacity-20" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#1a1d23] uppercase">Hobi & Minat</h2>
          <p className="text-[#6b7280] max-w-2xl mx-auto">
            Berbagi pengalaman dan pemikiran tentang hobi yang membantu menyeimbangkan kehidupan akademis dan memberikan inspirasi dalam berkarya.
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
                  : "bg-transparent text-[#6b7280] border-[#d1d5db] hover:border-[#6b7280]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-12">
          <div 
            onClick={() => setSelectedArticle(articles[0])}
            className="group cursor-pointer bg-white border border-[#d1d5db] rounded-2xl overflow-hidden hover:border-[#6b7280] transition-all"
          >
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="relative h-[400px] lg:h-auto">
                <ImageWithFallback
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-sm rounded-full">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 space-y-4">
                <span className="inline-block px-3 py-1 bg-[#f3f4f6] border border-[#d1d5db] text-[#6b7280] text-sm rounded-full">
                  {articles[0].category}
                </span>
                <h3 className="text-[#1a1d23] text-3xl group-hover:text-[#6b7280] transition-colors">
                  {articles[0].title}
                </h3>
                <p className="text-[#6b7280]">{articles[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-[#9ca3af] pt-4 border-t border-[#d1d5db]">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {articles[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {articles[0].date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {articles[0].readTime}
                  </div>
                </div>
                <div className="text-[#6b7280] group-hover:text-[#9ca3af] transition-colors flex items-center gap-2">
                  Baca Selengkapnya →
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.slice(1).map((article, index) => (
            <div
              key={index}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer bg-white border border-[#d1d5db] rounded-xl overflow-hidden hover:border-[#6b7280] transition-all"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#1a1d23]/80 backdrop-blur-sm text-white text-xs rounded-full border border-[#3a3d47]">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <h3 className="text-[#1a1d23] text-lg group-hover:text-[#6b7280] transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-[#6b7280] text-sm line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-[#9ca3af] pt-3 border-t border-[#d1d5db]">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <button className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all">
            Muat Lebih Banyak Artikel
          </button>
        </div>
      </div>
    </section>
  );
}