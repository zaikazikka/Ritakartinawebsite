# 🌟 Website Personal - Dr. Rita Kartina, S.H., M.H., M.AP.

<div align="center">

**Website Profesional untuk Dosen Hukum**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-green)](https://supabase.com)

[Live Demo](#) • [Documentation](./START_DEPLOYMENT.md) • [Quick Start](./DEPLOY_NOW.md)

</div>

---

## 📋 Tentang Project

Website personal dengan desain abu-abu metalik yang sophisticated untuk Dr. Rita Kartina sebagai Dosen Hukum. Menampilkan profil, publikasi, artikel, dan karya ilmiah dengan sistem manajemen konten yang lengkap.

### ✨ Fitur Utama

- 🎨 **Design Modern**: Tema abu metalik (#1a1d23) & abu muda (#f3f4f6)
- 📱 **Fully Responsive**: Sempurna di desktop, tablet, dan mobile
- 🔐 **Admin Dashboard**: CMS lengkap dengan autentikasi
- 🖼️ **Media Management**: Upload gambar & PDF dengan mudah
- ⚡ **Real-time Updates**: Perubahan langsung terlihat
- 🚀 **High Performance**: Optimized untuk kecepatan

### 📂 7 Section Utama

1. **Profil** - Informasi personal & biografi
2. **Berita dan Liputan** - Media coverage & berita
3. **Buku & Publikasi** - Koleksi buku yang diterbitkan
4. **Blog & Artikel** - Artikel dan opini
5. **Karya Tulis Ilmiah** - Paper & penelitian
6. **Video** - Video & podcast
7. **Galeri** - Dokumentasi foto

---

## 🚀 Quick Start

### Deployment dalam 12 menit:

```bash
# 1. Upload 9 file konfigurasi ke GitHub (5 menit)
# 2. Deploy di Vercel (5 menit)
# 3. Setup Supabase URLs (2 menit)
```

**Panduan lengkap:** [START_DEPLOYMENT.md](./START_DEPLOYMENT.md)

**Quick start:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18.3 + TypeScript 5.2 |
| **Build Tool** | Vite 5.1 |
| **Styling** | Tailwind CSS 4.0 |
| **Backend** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **Auth** | Supabase Auth |
| **Hosting** | Vercel |
| **Icons** | Lucide React |

---

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm atau yarn
- Akun Supabase (gratis)
- Akun Vercel (gratis)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

Website akan berjalan di `http://localhost:3000`

---

## 🌐 Deployment

### Deploy ke Vercel (Recommended)

1. **Upload ke GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import repository
   - Framework: **Vite**
   - Build Command: `npm install && npm run build`
   - Output Directory: `dist`
   - Deploy!

3. **Setup Supabase**
   - Buka Supabase Dashboard
   - Authentication → URL Configuration
   - Site URL: `https://your-domain.vercel.app`
   - Redirect URLs: `https://your-domain.vercel.app/**`

**Panduan detail:** [Deployment Guides](./START_DEPLOYMENT.md)

---

## 🔐 Admin Access

### Login ke Dashboard

```
URL: https://your-domain.vercel.app/#admin
Email: (email terdaftar di Supabase)
Password: (password Supabase)
```

### Fitur Admin Dashboard

- ✅ Create/Read/Update/Delete semua konten
- ✅ Upload gambar & PDF
- ✅ Preview real-time
- ✅ Manage semua 7 section
- ✅ Statistics & analytics

---

## 📁 Project Structure

```
ritakartina-website/
├── components/              # React components
│   ├── BlogHeader.tsx      # Navigation header
│   ├── BlogHero.tsx        # Hero section
│   ├── BlogProfil.tsx      # Profile section
│   ├── BlogBerita.tsx      # News section
│   ├── BlogBuku.tsx        # Books section
│   ├── BlogPosts.tsx       # Blog/Articles
│   ├── BlogKaryaTulis.tsx  # Scientific papers
│   ├── BlogPodcast.tsx     # Videos section
│   ├── BlogGaleri.tsx      # Gallery
│   ├── AdminDashboard.tsx  # Admin CMS
│   └── ui/                 # Reusable components
├── utils/
│   ├── supabase/
│   │   └── client.ts       # Supabase config
│   └── api.ts              # API helpers
├── styles/
│   └── globals.css         # Global styles
├── App.tsx                 # Main app
├── main.tsx                # React entry
├── index.html              # HTML entry
├── package.json            # Dependencies
├── vite.config.ts          # Vite config
├── tsconfig.json           # TypeScript config
└── vercel.json             # Vercel config
```

---

## 🎨 Design System

### Colors

```css
--abu-metalik: #1a1d23;  /* Background utama */
--abu-muda: #f3f4f6;     /* Background alternatif */
```

Background bergantian setiap section untuk visual yang menarik.

### Typography

- **Nama**: Dr. RITA KARTINA, S.H., M.H., M.AP.
- **Font**: System fonts untuk performa optimal
- **Hierarchy**: Defined di `globals.css`

---

## 💾 Database Schema

### Supabase Tables

| Table | Description |
|-------|-------------|
| `profil` | Profile information |
| `berita` | News & media coverage |
| `buku` | Books & publications |
| `blog` | Blog articles |
| `karya_tulis` | Scientific papers |
| `video` | Videos & podcasts |
| `galeri` | Photo gallery |

### Storage Buckets

| Bucket | Purpose |
|--------|---------|
| `profil-images` | Profile photos |
| `berita-images` | News images |
| `buku-images` | Book covers |
| `buku-pdfs` | Book PDF files |
| `blog-images` | Article images |
| `karya-pdfs` | Paper PDF files |
| `video-thumbnails` | Video thumbnails |
| `galeri-images` | Gallery photos |

**Setup SQL:** [SUPABASE_SETUP.sql](./SUPABASE_SETUP.sql)

---

## 🔄 Update Content

### Via Admin Dashboard (Recommended)

1. Login ke admin
2. Pilih section
3. Add/Edit/Delete content
4. Upload media
5. Changes auto-saved

### Via Code (For Developers)

1. Edit component files
2. Commit to GitHub
3. Vercel auto-deploys
4. Live in 2-3 minutes

---

## 🧪 Testing

### Manual Testing

```bash
# Test website
https://your-domain.vercel.app

# Test admin
https://your-domain.vercel.app/#admin

# Check console (F12)
No errors should appear
```

### Responsive Testing

- ✅ Desktop (1920px+)
- ✅ Laptop (1366px)
- ✅ Tablet (768px)
- ✅ Mobile (375px)

---

## 📚 Documentation

### Deployment Guides

- **[START_DEPLOYMENT.md](./START_DEPLOYMENT.md)** - Navigation hub
- **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Quick start (12 min)
- **[DEPLOY_MUDAH.md](./DEPLOY_MUDAH.md)** - Panduan pemula (15 min)
- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step
- **[VISUAL_DEPLOY_GUIDE.md](./VISUAL_DEPLOY_GUIDE.md)** - Visual guide

### Technical Reference

- **[DEPLOY_FIX.md](./DEPLOY_FIX.md)** - Error fixes & troubleshooting
- **[FIX_SUMMARY.md](./FIX_SUMMARY.md)** - Summary of fixes
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Cheat sheet

### Database Setup

- **[SUPABASE_SETUP.md](./SUPABASE_SETUP.md)** - Supabase configuration
- **[SUPABASE_SETUP.sql](./SUPABASE_SETUP.sql)** - SQL schema

---

## 🆘 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Build failed | Check [DEPLOY_FIX.md](./DEPLOY_FIX.md) |
| Blank page | Clear cache, check console |
| Login failed | Verify Supabase URLs |
| Upload failed | Check bucket permissions |

### Support

- **Build Logs**: Vercel Dashboard → Deployments
- **Browser Console**: F12 → Console tab
- **Supabase Logs**: Supabase Dashboard → Logs

---

## 🔒 Security

- ✅ HTTPS enforced by Vercel
- ✅ Supabase Row Level Security (RLS)
- ✅ Secure authentication
- ✅ Environment variables protected
- ✅ No sensitive data exposed

---

## 📈 Performance

### Optimizations

- Code splitting (vendor chunks)
- Tree shaking
- Minification
- Lazy loading
- CDN delivery (Vercel Edge)

### Metrics

- First Load: < 3 seconds
- Subsequent: < 1 second
- Bundle Size: ~200KB gzipped

---

## 🌍 Custom Domain (Optional)

### Setup Custom Domain

1. **Vercel**: Settings → Domains → Add domain
2. **DNS Provider**: Update DNS records
3. **Supabase**: Update Site URL

**Example:** `ritakartina.com`

---

## 📝 Environment Variables

**Not needed!** Credentials are in code (safe with RLS).

If you want to externalize:

```env
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Update `utils/supabase/client.ts` to use env vars.

---

## 🤝 Contributing

This is a personal project. For feature requests or bug reports, please open an issue.

---

## 📄 License

© 2025 Dr. Rita Kartina, S.H., M.H., M.AP. All rights reserved.

---

## 🙏 Credits

- **Built with**: React + Supabase + Vercel
- **Icons**: Lucide React
- **Design**: Dr. Rita Kartina

---

## 📞 Links

- **Website**: https://your-domain.vercel.app
- **Admin**: https://your-domain.vercel.app/#admin
- **Vercel**: https://vercel.com/dashboard
- **Supabase**: https://supabase.com/dashboard

---

## 🎉 Ready to Deploy?

### Quick Start in 3 Steps:

```bash
1. Upload to GitHub          (5 minutes)
2. Deploy on Vercel          (5 minutes)
3. Configure Supabase        (2 minutes)
```

**Start here:** [DEPLOY_NOW.md](./DEPLOY_NOW.md)

---

<div align="center">

**Website Profesional untuk Profesional Hukum** ⚖️

**Powered by Modern Web Technologies** 🚀

Made with ❤️ by Dr. Rita Kartina

</div>