import { ImageWithFallback } from "./figma/ImageWithFallback";

export function BlogAbout() {
  return (
    <section id="about" className="relative py-20 px-6 lg:px-12 bg-[#0f1d2e]">
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#3b82f6] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="rounded-tl-[60px] rounded-br-[60px] rounded-tr-xl rounded-bl-xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MzI2Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workspace"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl text-white uppercase">
              Meningkatkan Pemahaman Hukum & Keadilan
            </h2>
            <p className="text-[#94a3b8] text-lg">
              Dengan pengalaman lebih dari 15 tahun di bidang hukum, baik sebagai akademisi maupun praktisi, Dr. Rita Kartina, S.H., M.H. berdedikasi untuk mengajarkan dan menyebarkan pengetahuan hukum yang berkualitas kepada mahasiswa dan masyarakat luas.
            </p>
            <button className="px-8 py-4 bg-[#1e3a5f] text-white rounded-xl hover:bg-[#2a4a6f] transition-colors border border-[#3b82f6]/30">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}