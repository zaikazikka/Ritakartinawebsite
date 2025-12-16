import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BlogEpisodes() {
  const episodes = [
    {
      title: "Reformasi Hukum Pidana Indonesia: Tantangan dan Prospek",
      description: "Analisis mendalam tentang KUHP baru dan dampaknya terhadap sistem peradilan pidana Indonesia.",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMjc1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Hukum Bisnis Digital di Era Ekonomi 4.0",
      description: "Membahas regulasi e-commerce, perlindungan konsumen online, dan transaksi elektronik di Indonesia.",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MzI5MjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Perlindungan HAM dalam Sistem Hukum Indonesia",
      description: "Kajian tentang implementasi perlindungan hak asasi manusia dalam peraturan perundang-undangan nasional.",
      image: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MzI5ODMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  return (
    <section className="relative py-20 px-6 lg:px-12 bg-[#0f1d2e]">
      {/* Background Gradient */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#3b82f6] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl text-white uppercase">Topik Penelitian Unggulan</h2>
          <p className="text-[#94a3b8] max-w-2xl mx-auto">
            Berikut adalah beberapa topik penelitian dan kajian hukum yang sedang dikembangkan untuk memberikan kontribusi akademis dan praktis bagi dunia hukum Indonesia.
          </p>
        </div>

        {/* Episodes Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {episodes.map((episode, index) => (
            <div key={index} className="group">
              <div className="space-y-6">
                {/* Image */}
                <div className="rounded-tl-[48px] rounded-br-[48px] rounded-tr-xl rounded-bl-xl overflow-hidden">
                  <ImageWithFallback
                    src={episode.image}
                    alt={episode.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                
                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-white text-xl">{episode.title}</h3>
                  <p className="text-[#94a3b8]">{episode.description}</p>
                  <button className="flex items-center gap-2 text-[#60a5fa] hover:gap-4 transition-all">
                    <span>Baca Selengkapnya</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#2a4a6f] transition-colors border border-[#3b82f6]/30">
            Lihat Lebih Banyak
          </button>
        </div>
      </div>
    </section>
  );
}