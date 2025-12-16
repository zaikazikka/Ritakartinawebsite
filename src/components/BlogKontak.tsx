import { Mail, MapPin, Phone, Send, Youtube, Instagram, MessageCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import { contactAPI } from "../utils/api";

export function BlogKontak() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Mohon lengkapi semua field yang wajib diisi.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Mohon masukkan alamat email yang valid.");
      return;
    }

    setIsSubmitting(true);

    try {
      await contactAPI.submit({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });
      
      toast.success("Terima kasih! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error("Contact form error:", error);
      toast.error(error.message || "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kontak" className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
      {/* Background Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl text-[#f3f4f6] uppercase">Hubungi Saya</h2>
          <p className="text-[#9ca3af] max-w-2xl mx-auto">
            Untuk konsultasi hukum, kolaborasi penelitian, atau undangan seminar, silakan hubungi saya melalui formulir di bawah ini atau melalui informasi kontak yang tersedia.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#252830] border border-[#3a3d47] rounded-2xl p-8 space-y-6">
            <h3 className="text-[#f3f4f6] text-2xl">Kirim Pesan</h3>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#9ca3af] text-sm">Nama Lengkap</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 bg-[#1a1d23] border border-[#3a3d47] text-[#f3f4f6] placeholder-[#9ca3af] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[#9ca3af] text-sm">Email</label>
                  <input
                    type="email"
                    placeholder="nama@email.com"
                    className="w-full px-4 py-3 bg-[#1a1d23] border border-[#3a3d47] text-[#f3f4f6] placeholder-[#9ca3af] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#9ca3af] text-sm">Subjek</label>
                <input
                  type="text"
                  placeholder="Perihal konsultasi atau kolaborasi"
                  className="w-full px-4 py-3 bg-[#1a1d23] border border-[#3a3d47] text-[#f3f4f6] placeholder-[#9ca3af] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#9ca3af] text-sm">Pesan</label>
                <textarea
                  rows={5}
                  placeholder="Tuliskan pesan Anda di sini..."
                  className="w-full px-4 py-3 bg-[#1a1d23] border border-[#3a3d47] text-[#f3f4f6] placeholder-[#9ca3af] rounded-xl focus:outline-none focus:border-[#6b7280] transition-colors resize-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-[#252830] border border-[#3a3d47] rounded-2xl p-8 space-y-6">
              <h3 className="text-[#f3f4f6] text-2xl">Informasi Kontak</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#f3f4f6] mb-1">Alamat</h4>
                    <p className="text-[#9ca3af]">
                      Surabaya, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#f3f4f6] mb-1">Telepon</h4>
                    <p className="text-[#9ca3af]">
                      +62 878 52429087
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-[#f3f4f6] mb-1">Email</h4>
                    <p className="text-[#9ca3af]">
                      Rikamacetta88@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#252830] border border-[#3a3d47] rounded-2xl p-8 space-y-4">
              <h3 className="text-[#f3f4f6] text-2xl">Media Sosial</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.youtube.com/@rikanacetta4504"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/dr.r_cetta24/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://api.whatsapp.com/send/?phone=6287852429087&text=Saya+tertarik+Bertanya+Sesuatu+Tentang+Endorsment&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-xl flex items-center justify-center text-white hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Map - Surabaya */}
            <div className="bg-[#252830] border border-[#3a3d47] rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126646.23944719424!2d112.63260989999999!3d-7.2754438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd7fbf8381ac47f%3A0x3027a76e352be40!2sSurabaya%2C%20Kota%20Surabaya%2C%20Jawa%20Timur!5e0!3m2!1sen!2sid!4v1234567890123!5m2!1sen!2sid"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Surabaya"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}