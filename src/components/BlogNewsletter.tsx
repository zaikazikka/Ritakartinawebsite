import { Mail } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import { newsletterAPI } from "../utils/api";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Mohon masukkan alamat email Anda.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Mohon masukkan alamat email yang valid.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      await newsletterAPI.subscribe(email);
      toast.success("Terima kasih! Anda telah berhasil berlangganan newsletter.");
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription error:", error);
      toast.error(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#9ca3af] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="bg-gradient-to-br from-[#252830] to-[#2a2d33] rounded-3xl p-12 border border-[#3a3d47] shadow-xl">
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-2xl flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl text-[#f3f4f6] uppercase">Berlangganan Newsletter</h2>
            
            <p className="text-[#9ca3af] max-w-2xl mx-auto">
              Dapatkan update terbaru tentang perkembangan hukum Indonesia, analisis peraturan perundang-undangan baru, dan artikel akademis langsung di inbox Anda.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Alamat Email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-6 py-4 bg-[#252830] border border-[#3a3d47] text-[#f3f4f6] placeholder-[#9ca3af] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all whitespace-nowrap"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sedang Mengirim..." : "Berlangganan Sekarang"}
              </button>
            </form>
            
            <p className="text-[#9ca3af] text-sm">
              📧 Kami menghormati privasi Anda dan tidak akan membagikan email Anda kepada pihak ketiga.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}