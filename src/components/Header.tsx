import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="text-white">
            Rita Kartina
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-300 hover:text-red-500 transition-colors">
              Home
            </a>
            <a href="#about" className="text-gray-300 hover:text-red-500 transition-colors">
              About
            </a>
            <a href="#blog" className="text-gray-300 hover:text-red-500 transition-colors">
              Blog
            </a>
            <a href="#contact" className="text-gray-300 hover:text-red-500 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-red-500"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <a
                href="#home"
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#blog"
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-red-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
