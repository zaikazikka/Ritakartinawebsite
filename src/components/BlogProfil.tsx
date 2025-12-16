import { Youtube, Instagram, MessageCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import profileImage from "figma:asset/8fa31fc408d38671a2fc7fed7b06b011fdf568ca.png";

export function BlogProfil() {
  return (
    <section id="profil" className="relative py-20 px-6 lg:px-12 bg-[#f3f4f6]">
      {/* Background Gradient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#1a1d23] uppercase">Profil</h2>
          <p className="text-[#4a4f57] max-w-2xl mx-auto">
            Mengenal lebih dekat Dr. Rita Kartina, S.H., M.H., M.AP. - Akademisi dan praktisi hukum yang berdedikasi untuk kemajuan ilmu hukum Indonesia.
          </p>
        </div>

        {/* Main Profile Content */}
        <div className="flex flex-col items-center">
          {/* Image with Social Icons */}
          <div className="relative max-w-md">
            <div className="rounded-tl-[60px] rounded-br-[60px] rounded-tr-xl rounded-bl-xl overflow-hidden border-4 border-[#d1d5db]">
              <ImageWithFallback
                src={profileImage}
                alt="Dr. Rita Kartina"
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#9ca3af]/20 to-transparent rounded-3xl -z-10" />
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-10">
            <a 
              href="https://www.youtube.com/@rikanacetta4504" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white border border-[#d1d5db] rounded-xl flex items-center justify-center text-[#1a1d23] hover:bg-[#1a1d23] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a 
              href="https://instagram.com/dr.r_cetta24/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white border border-[#d1d5db] rounded-xl flex items-center justify-center text-[#1a1d23] hover:bg-[#1a1d23] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a 
              href="https://api.whatsapp.com/send/?phone=6287852429087&text=Saya+tertarik+Bertanya+Sesuatu+Tentang+Endorsment&type=phone_number&app_absent=0" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-14 h-14 bg-white border border-[#d1d5db] rounded-xl flex items-center justify-center text-[#1a1d23] hover:bg-[#1a1d23] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}