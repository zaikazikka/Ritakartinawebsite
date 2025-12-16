# 🚀 Panduan Deploy Website Rita Kartina

Website ini siap untuk di-deploy ke internet! Ikuti langkah-langkah di bawah ini.

## 📋 Persiapan

Pastikan Anda sudah punya:
- ✅ Akun Supabase (sudah terhubung dengan project ID: zmnhzduscqfgrxxsqoyo)
- ✅ Source code website ini

---

## 🎯 CARA 1: Deploy ke Vercel (PALING MUDAH & GRATIS)

Vercel adalah platform terbaik untuk deploy aplikasi React. Gratis selamanya untuk personal projects!

### Langkah 1: Persiapan Code

1. **Download semua file website ini** ke folder di komputer Anda
2. File-file penting sudah dibuat:
   - ✅ `vercel.json` - konfigurasi Vercel
   - ✅ `.gitignore` - file yang tidak perlu di-upload

### Langkah 2: Setup Git & GitHub

1. **Install Git** (jika belum):
   - Download dari: https://git-scm.com/downloads
   - Install dengan pengaturan default

2. **Buat akun GitHub** (jika belum):
   - Daftar di: https://github.com/signup
   - Gratis!

3. **Upload code ke GitHub**:
   
   **Cara A - Via GitHub Desktop (Lebih Mudah):**
   - Download GitHub Desktop: https://desktop.github.com
   - Install dan login dengan akun GitHub
   - Klik "Add" → "Add Existing Repository"
   - Pilih folder website Rita Kartina
   - Klik "Publish repository"
   - Beri nama: `ritakartina-website`
   - Pastikan **UNCHECK "Keep this code private"** atau pilih **Private** (terserah Anda)
   - Klik "Publish Repository"

   **Cara B - Via Command Line:**
   ```bash
   # Buka Terminal/Command Prompt di folder website
   cd /path/ke/folder/website
   
   # Inisialisasi Git
   git init
   
   # Tambahkan semua file
   git add .
   
   # Commit
   git commit -m "Initial commit - Rita Kartina Website"
   
   # Login ke GitHub (akan buka browser)
   gh auth login
   
   # Buat repository dan push
   gh repo create ritakartina-website --public --source=. --push
   ```

### Langkah 3: Deploy ke Vercel

1. **Buka Vercel**:
   - Pergi ke: https://vercel.com/signup
   - Klik "Continue with GitHub"
   - Login dengan akun GitHub Anda

2. **Import Project**:
   - Setelah login, klik "Add New" → "Project"
   - Pilih repository `ritakartina-website`
   - Klik "Import"

3. **Configure Project**:
   - **Framework Preset**: Vercel akan otomatis detect "Vite"
   - **Build Command**: `npm run build` (sudah otomatis)
   - **Output Directory**: `dist` (sudah otomatis)
   - **Install Command**: `npm install` (sudah otomatis)

4. **Environment Variables** (SANGAT PENTING!):
   Klik "Environment Variables" dan tambahkan:
   
   | Name | Value |
   |------|-------|
   | `VITE_SUPABASE_URL` | `https://zmnhzduscqfgrxxsqoyo.supabase.co` |
   | `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inptbmh6ZHVzY3FmZ3J4eHNxb3lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4NzkwMTUsImV4cCI6MjA3OTQ1NTAxNX0.a2mqXd9zXc96glU_YkzCgDZfclcaAm_n5sHBFNtOis8` |

   ⚠️ **CATATAN**: Environment variables ini opsional karena sudah hardcoded di `info.tsx`. Tapi sebaiknya tetap ditambahkan untuk keamanan di masa depan.

5. **Deploy**:
   - Klik "Deploy"
   - Tunggu 2-3 menit
   - Website Anda akan online! 🎉

6. **Lihat Website**:
   - Setelah deploy selesai, Anda akan dapat URL seperti:
     `https://ritakartina-website.vercel.app`
   - Klik URL untuk membuka website

---

## 🌐 CARA 2: Deploy ke Netlify (Alternatif, Juga Gratis)

### Langkah 1-2: Sama seperti Vercel (Git & GitHub)

### Langkah 3: Deploy ke Netlify

1. **Buka Netlify**:
   - Pergi ke: https://app.netlify.com/signup
   - Login dengan GitHub

2. **Import Project**:
   - Klik "Add new site" → "Import an existing project"
   - Pilih "GitHub"
   - Pilih repository `ritakartina-website`

3. **Configure**:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Environment variables** (sama seperti Vercel)

4. **Deploy**:
   - Klik "Deploy site"
   - Tunggu beberapa menit
   - Website online!

---

## 🔧 Konfigurasi Supabase untuk Production

Setelah deploy, Anda perlu mengupdate Supabase settings:

1. **Buka Supabase Dashboard**:
   - https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo

2. **Update Authentication Settings**:
   - Pergi ke: Authentication → URL Configuration
   - **Site URL**: Ganti dengan URL Vercel Anda
     Contoh: `https://ritakartina-website.vercel.app`
   - **Redirect URLs**: Tambahkan:
     - `https://ritakartina-website.vercel.app/**`
     - `https://ritakartina-website.vercel.app/admin`

3. **Update CORS**:
   - Pergi ke: Settings → API
   - Scroll ke "CORS Settings"
   - Tambahkan domain Vercel Anda jika belum ada

---

## 🎨 Setup Custom Domain (Opsional)

Jika Anda ingin menggunakan domain `ritakartina.com`:

### Di Vercel:

1. Pergi ke project → Settings → Domains
2. Klik "Add"
3. Masukkan: `ritakartina.com` dan `www.ritakartina.com`
4. Ikuti instruksi untuk update DNS

### Di Provider Domain (Niagahoster, Cloudflare, dll):

Tambahkan DNS records:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

Atau gunakan Nameservers Vercel jika tersedia.

### Update Supabase:

Setelah domain aktif, update Site URL di Supabase ke:
- `https://ritakartina.com`

---

## 🔄 Update Website di Masa Depan

Setiap kali Anda ingin update website:

### Via GitHub Desktop:
1. Edit file yang ingin diubah
2. Buka GitHub Desktop
3. Lihat changes → Write commit message
4. Klik "Commit to main"
5. Klik "Push origin"
6. Vercel akan otomatis deploy versi baru! ✨

### Via Command Line:
```bash
# Setelah edit file
git add .
git commit -m "Update website"
git push
```

Vercel akan otomatis detect perubahan dan deploy versi baru dalam 2-3 menit!

---

## ⚡ Tips Optimasi

1. **Custom Domain**: Gunakan domain sendiri untuk profesional
2. **Analytics**: Tambahkan Google Analytics untuk tracking visitor
3. **SEO**: Update meta tags untuk optimasi SEO
4. **Performance**: Vercel sudah mengoptimasi otomatis
5. **Backup**: Git otomatis menjadi backup code Anda

---

## 🆘 Troubleshooting

### Website tidak bisa login admin?
- Pastikan Site URL di Supabase sudah benar
- Pastikan Redirect URLs sudah ditambahkan
- Clear browser cache dan coba lagi

### Deploy gagal?
- Cek error message di Vercel
- Pastikan semua dependencies terinstall
- Cek Build logs untuk detail error

### Gambar tidak muncul?
- Pastikan Storage bucket Supabase sudah dibuat
- Pastikan bucket bersifat public
- Cek CORS settings di Supabase

---

## 📞 Bantuan

Jika ada masalah:
1. Cek Vercel Build Logs
2. Cek Supabase Logs
3. Cek Browser Console (F12) untuk error

---

## ✅ Checklist Sebelum Go Live

- [ ] Code sudah di-push ke GitHub
- [ ] Deploy ke Vercel berhasil
- [ ] Website bisa dibuka via URL Vercel
- [ ] Login admin berfungsi
- [ ] Upload gambar berfungsi
- [ ] Semua section tampil dengan benar
- [ ] Site URL Supabase sudah diupdate
- [ ] Custom domain sudah dikonfigurasi (jika ada)
- [ ] Test di mobile dan desktop
- [ ] Share URL ke teman untuk testing

---

🎉 **SELAMAT! Website Anda sudah online!** 🎉

URL Website: `https://ritakartina-website.vercel.app` (atau custom domain Anda)
URL Admin: `https://ritakartina-website.vercel.app/#admin`

Sekarang dunia bisa melihat karya Dr. Rita Kartina! 🌟
