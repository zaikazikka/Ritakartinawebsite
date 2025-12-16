import { useState } from "react";
import { Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { supabase } from "../utils/supabase/client";

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error);
        
        // Show more helpful error messages
        if (error.message.includes('Invalid login credentials')) {
          toast.error(
            "Email atau password salah. Pastikan Anda sudah membuat akun admin di Supabase Dashboard → Authentication → Users.",
            { duration: 5000 }
          );
        } else if (error.message.includes('Email not confirmed')) {
          toast.error("Email belum dikonfirmasi. Periksa inbox email Anda.");
        } else {
          toast.error(`Login gagal: ${error.message}`);
        }
        return;
      }

      if (data.session) {
        // Store session in localStorage
        localStorage.setItem("admin_session", JSON.stringify(data.session));
        toast.success("Login berhasil!");
        onLoginSuccess();
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1d23] via-[#2a2d33] to-[#1a1d23] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-[#9ca3af] hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Website
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#6b7280] to-[#9ca3af] px-8 py-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl text-white text-center">Admin Login</h1>
            <p className="text-white/80 text-sm text-center mt-2">
              Dr. Rita Kartina - Dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="p-8 space-y-6">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">
                Email Admin
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="zaikazikka@gmail.com"
                className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-[#6b7280] text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] focus:border-transparent pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#1a1d23] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Memproses..." : "Login"}
            </button>
          </form>

          {/* Info */}
          <div className="px-8 pb-8">
            <div className="bg-[#f3f4f6] rounded-lg p-4">
              <p className="text-[#6b7280] text-xs text-center">
                🔒 Halaman ini dilindungi. Hanya admin yang memiliki akses.
              </p>
              <p className="text-[#9ca3af] text-xs text-center mt-2">
                Belum punya akun admin?{" "}
                <button
                  onClick={() => {
                    toast.info(
                      "Hubungi administrator untuk membuat akun admin baru"
                    );
                  }}
                  className="text-[#6b7280] hover:underline"
                >
                  Hubungi Administrator
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <p className="text-white text-sm mb-2">
            💡 <strong>Cara membuat akun admin pertama:</strong>
          </p>
          <ol className="text-white/80 text-xs space-y-1 ml-4 list-decimal">
            <li>Buka Supabase Dashboard</li>
            <li>Pilih project Anda</li>
            <li>Ke menu Authentication → Users</li>
            <li>Klik "Add user" → Masukkan email & password</li>
            <li>Login menggunakan kredensial tersebut</li>
          </ol>
        </div>
      </div>
    </div>
  );
}