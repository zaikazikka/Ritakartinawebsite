import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/ea4b9be802ca0e54ac214a8cd05a4c6b557f90eb.png";

export function BlogHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTentangOpen, setIsTentangOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#1a1d23]/90 backdrop-blur-md z-50 border-b border-[#3a3f47]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo} alt="Rita Kartina" className="h-40 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <a href="#home" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Home
            </a>
            
            {/* Tentang Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
                Tentang
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[#232730] border border-[#4a4f57] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <a href="#profil" className="block px-4 py-3 text-[#d1d5db] hover:text-[#9ca3af] hover:bg-[#3a3f47] transition-colors">
                  Profil
                </a>
                <a href="#galeri" className="block px-4 py-3 text-[#d1d5db] hover:text-[#9ca3af] hover:bg-[#3a3f47] transition-colors">
                  Galeri
                </a>
              </div>
            </div>

            <a href="#karya-tulis" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Karya Tulis
            </a>
            <a href="#hobi" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Hobi
            </a>
            <a href="#buku" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Buku
            </a>
            <a href="#berita" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Berita
            </a>
            <a href="#blog" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Blog
            </a>
            <a href="#kontak" className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors">
              Kontak
            </a>
          </nav>

          {/* CTA Button */}
          <a href="#kontak" className="hidden lg:block px-6 py-3 bg-white text-[#1a1d23] rounded-xl hover:bg-[#f3f4f6] transition-colors">
            Hubungi Saya
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#94a3b8] hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#1e3a5f]">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              
              {/* Tentang with Dropdown */}
              <div className="space-y-2">
                <button
                  onClick={() => setIsTentangOpen(!isTentangOpen)}
                  className="flex items-center justify-between w-full text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                >
                  Tentang
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTentangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTentangOpen && (
                  <div className="pl-4 space-y-2 border-l-2 border-[#4a4f57]">
                    <a
                      href="#profil"
                      className="block text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profil
                    </a>
                    <a
                      href="#galeri"
                      className="block text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Galeri
                    </a>
                  </div>
                )}
              </div>

              <a
                href="#karya-tulis"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Karya Tulis
              </a>
              <a
                href="#hobi"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hobi
              </a>
              <a
                href="#buku"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Buku
              </a>
              <a
                href="#berita"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Berita
              </a>
              <a
                href="#blog"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#kontak"
                className="text-[#d1d5db] hover:text-[#9ca3af] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Kontak
              </a>
              <a 
                href="#kontak" 
                className="px-6 py-3 bg-white text-[#1a1d23] rounded-xl hover:bg-[#f3f4f6] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Hubungi Saya
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}