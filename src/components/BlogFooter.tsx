import { Shield } from "lucide-react";

export function BlogFooter() {
  return (
    <footer className="relative bg-[#f3f4f6] border-t border-[#d1d5db] py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Copyright */}
        <div className="text-center space-y-4">
          <p className="text-[#4a4f57] text-sm">
            © 2024 Dr. Rita Kartina, S.H., M.H., M.AP. All rights reserved. • Designed with <span className="text-[#6b7280]">♥</span> for Indonesian Legal Academia
          </p>
          
          {/* Admin Login Button */}
          <div>
            <a
              href="#admin"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#e5e7eb] hover:bg-gradient-to-r hover:from-[#6b7280] hover:to-[#9ca3af] text-[#4a4f57] hover:text-white rounded-lg transition-all text-sm"
            >
              <Shield className="w-4 h-4" />
              Admin Login
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}