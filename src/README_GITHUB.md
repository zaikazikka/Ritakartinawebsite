# Website Personal Dr. Rita Kartina, S.H., M.H., M.AP.

Website personal profesional untuk Dr. Rita Kartina sebagai Dosen Hukum dengan desain abu-abu metalik yang sophisticated.

## 🌐 Live Website

**[ritakartina-website.vercel.app](https://ritakartina-website.vercel.app)** _(ganti dengan URL aktual Anda)_

## ✨ Fitur Utama

### Frontend
- ⚡ **Modern Stack**: React 18 + TypeScript + Vite
- 🎨 **Tailwind CSS 4.0**: Styling modern dan responsive
- 📱 **Fully Responsive**: Desktop, tablet, dan mobile
- 🎯 **7 Section Utama**:
  - Profil
  - Berita dan Liputan
  - Buku & Publikasi
  - Blog & Artikel
  - Karya Tulis Ilmiah
  - Video
  - Galeri

### Backend & Database
- 🗄️ **Supabase**: Backend as a Service
- 🔐 **Supabase Auth**: Autentikasi admin yang aman
- 💾 **PostgreSQL**: Database untuk semua konten
- 📦 **Supabase Storage**: Upload dan hosting gambar/PDF
- 🔄 **Real-time**: Update konten tanpa refresh

### Admin Dashboard
- 📝 **CRUD Lengkap**: Create, Read, Update, Delete untuk semua section
- 🖼️ **Upload Media**: Upload gambar dan PDF dengan drag & drop
- 👁️ **Preview Real-time**: Lihat perubahan langsung
- 📊 **Statistics**: Lihat jumlah views dan tanggal publikasi
- 🔒 **Secure**: Protected dengan Supabase authentication

## 🚀 Quick Start - Deploy ke Vercel

### 1. Upload ke GitHub
```bash
# Clone atau download repository ini
# Upload semua file ke GitHub repository baru Anda
```

### 2. Deploy ke Vercel
1. Buka [vercel.com](https://vercel.com)
2. Login dengan GitHub
3. Import repository ini
4. Konfigurasi:
   - Framework: **Vite**
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
5. Klik **Deploy**

### 3. Setup Supabase
1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project ID: `zmnhzduscqfgrxxsqoyo`
3. **Authentication → URL Configuration**:
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/**`
4. Save

## 🛠️ Development Local

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Struktur Project

```
ritakartina-website/
├── components/           # React components
│   ├── BlogHeader.tsx   # Header navigation
│   ├── BlogHero.tsx     # Hero section
│   ├── BlogProfil.tsx   # Profile section
│   ├── BlogBerita.tsx   # News section
│   ├── BlogBuku.tsx     # Books section
│   ├── BlogPosts.tsx    # Blog/Articles section
│   ├─��� BlogKaryaTulis.tsx # Scientific papers
│   ├── BlogPodcast.tsx  # Videos section
│   ├── BlogGaleri.tsx   # Gallery section
│   ├── AdminDashboard.tsx # Admin CMS
│   └── ui/              # Reusable UI components
├── utils/
│   ├── supabase/
│   │   └── client.ts    # Supabase client config
│   └── api.ts           # API helper functions
├── styles/
│   └── globals.css      # Global styles + Tailwind
├── App.tsx              # Main app component
├── main.tsx             # React entry point
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies
└── vercel.json          # Vercel deployment config
```

## 🎨 Design System

### Colors
- **Abu Metalik**: `#1a1d23` - Background utama
- **Abu Muda**: `#f3f4f6` - Background alternatif
- **Teks**: Kontras otomatis berdasarkan background

### Typography
- **Nama**: Dr. RITA KARTINA, S.H., M.H., M.AP.
- **Font**: System fonts untuk performa optimal
- **Hierarchy**: Defined di `globals.css`

## 🔐 Admin Access

Akses admin dashboard:
```
URL: https://your-domain.vercel.app/#admin
Email: (email terdaftar di Supabase Auth)
Password: (password Supabase)
```

## 📚 Database Schema

### Tables
- `profil` - Informasi profil
- `berita` - Berita dan liputan media
- `buku` - Buku dan publikasi
- `blog` - Blog dan artikel
- `karya_tulis` - Karya tulis ilmiah
- `video` - Video dan podcast
- `galeri` - Galeri foto

### Storage Buckets
- `profil-images` - Foto profil
- `berita-images` - Gambar berita
- `buku-images` - Cover buku
- `buku-pdfs` - File PDF buku
- `blog-images` - Gambar artikel
- `karya-pdfs` - File PDF karya tulis
- `video-thumbnails` - Thumbnail video
- `galeri-images` - Foto galeri

## 🔄 Update Content

### Via Admin Dashboard
1. Login ke `https://your-domain.vercel.app/#admin`
2. Pilih section yang ingin diedit
3. Tambah, edit, atau hapus konten
4. Perubahan langsung terlihat di website

### Via GitHub (untuk developer)
1. Edit file di GitHub
2. Commit changes
3. Vercel otomatis deploy update

## 🌍 Custom Domain (Opsional)

Jika punya domain `ritakartina.com`:

1. **Vercel Settings** → **Domains** → Add domain
2. Update DNS di provider domain Anda
3. Update Site URL di Supabase

## 📊 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18.3 |
| Language | TypeScript 5.2 |
| Build Tool | Vite 5.1 |
| Styling | Tailwind CSS 4.0 |
| Backend | Supabase |
| Database | PostgreSQL |
| Storage | Supabase Storage |
| Auth | Supabase Auth |
| Hosting | Vercel |
| Icons | Lucide React |

## 🤝 Contributing

Website ini adalah project personal. Untuk request fitur atau bug report, silakan buka issue.

## 📄 License

© 2025 Dr. Rita Kartina, S.H., M.H., M.AP. All rights reserved.

## 🙏 Credits

- Built with React + Supabase + Vercel
- Icons by Lucide
- Design by Dr. Rita Kartina

---

**Website Profesional untuk Profesional Hukum** ⚖️

**Powered by Modern Web Technologies** 🚀
