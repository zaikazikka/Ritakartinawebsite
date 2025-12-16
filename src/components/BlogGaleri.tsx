import { Calendar, MapPin, Users, Expand } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner@2.0.3";
import { useState, useEffect, useRef } from "react";
import { galleryAPI } from "../utils/api";

export function BlogGaleri() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadGalleries();
  }, []);

  const loadGalleries = async () => {
    try {
      setIsLoading(true);
      const { data } = await galleryAPI.getAll();
      setGalleries(data || []);
    } catch (error) {
      console.error("Error loading galleries:", error);
      setGalleries([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Default galleries jika database kosong
  const defaultGalleries = [
    {
      title: "Seminar Nasional Hukum 2024",
      category: "Seminar",
      image: "https://images.unsplash.com/photo-1762158007969-eb58e74ee3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwc3BlYWtpbmclMjBldmVudHxlbnwxfHx8fDE3NjMyOTgyNTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Perkuliahan Hukum Pidana",
      category: "Akademik",
      image: "https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYzMjc1MzM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Diskusi Panel Reformasi Hukum",
      category: "Diskusi",
      image: "https://images.unsplash.com/photo-1557838923-2985c318be48?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDF8fHx8MTc2MzI5MjM5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Peluncuran Buku Hukum Terbaru",
      category: "Publikasi",
      image: "https://images.unsplash.com/photo-1617575521317-d2974f3b56d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdyaXRpbmd8ZW58MXx8fHwxNzYzMjEwOTM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Workshop Penelitian Hukum",
      category: "Workshop",
      image: "https://images.unsplash.com/photo-1503551723145-6c040742065b-v2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMHN0cmF0ZWd5fGVufDF8fHx8MTc2MzI5ODMwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      title: "Kegiatan Pengabdian Masyarakat",
      category: "Pengabdian",
      image: "https://images.unsplash.com/photo-1621743018966-29194999d736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBkZXNrfGVufDF8fHx8MTc2MzI2Mzg0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <section id="galeri" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b7280]"></div>
            <p className="text-[#6b7280]">Memuat galeri...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use database galleries if available, otherwise show default galleries
  const displayGalleries = galleries.length > 0 ? galleries : defaultGalleries;

  return (
    <section ref={sectionRef} id="galeri" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
      {/* Background Gradient */}
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#1a1d23] uppercase">Galeri</h2>
          <p className="text-[#4a4f57] max-w-2xl mx-auto">
            Dokumentasi kegiatan akademik, seminar, workshop, dan pengabdian masyarakat yang telah dilakukan.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(showAll ? displayGalleries : displayGalleries.slice(0, 6)).map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="space-y-4">
                {/* Image */}
                <div className="relative rounded-tl-[48px] rounded-br-[48px] rounded-tr-xl rounded-bl-xl overflow-hidden">
                  <ImageWithFallback
                    src={item.imageUrl || item.image}
                    alt={item.title}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1d23] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-sm rounded-full">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Title */}
                <div>
                  <h3 className="text-[#1a1d23] text-xl group-hover:text-[#6b7280] transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayGalleries.length > 6 && (
          <div className="text-center mt-12">
            <button
              onClick={() => {
                if (showAll) {
                  // Scroll to section top when collapsing
                  setShowAll(false);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                } else {
                  // Expand first, then scroll
                  setShowAll(true);
                  setTimeout(() => {
                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/30 transition-all"
            >
              {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${displayGalleries.length - 6} Galeri Lainnya)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}