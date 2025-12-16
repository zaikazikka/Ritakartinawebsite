# ✅ Checklist Deploy Website Rita Kartina

## 📦 Persiapan (5 menit)

- [ ] Download semua file website ke komputer
- [ ] Install Git dari https://git-scm.com/downloads
- [ ] Buat akun GitHub di https://github.com/signup
- [ ] Install GitHub Desktop (opsional, lebih mudah): https://desktop.github.com

## 🚀 Upload ke GitHub (5 menit)

### Via GitHub Desktop (Mudah):
- [ ] Buka GitHub Desktop
- [ ] Login dengan akun GitHub
- [ ] Klik "Add" → "Add Existing Repository"
- [ ] Pilih folder website Rita Kartina
- [ ] Klik "Publish repository"
- [ ] Nama: `ritakartina-website`
- [ ] Klik "Publish Repository" ✅

### Via Browser (Sangat Mudah):
- [ ] Login ke GitHub.com
- [ ] Klik tombol "+" → "New repository"
- [ ] Nama: `ritakartina-website`
- [ ] Klik "Create repository"
- [ ] Upload semua file via drag & drop
- [ ] Klik "Commit changes" ✅

## 🌐 Deploy ke Vercel (3 menit)

- [ ] Buka https://vercel.com/signup
- [ ] Klik "Continue with GitHub"
- [ ] Login dengan akun GitHub
- [ ] Klik "Add New" → "Project"
- [ ] Pilih repository `ritakartina-website`
- [ ] Klik "Import"
- [ ] Framework: Vite (otomatis terdetect)
- [ ] Klik "Deploy" ✅
- [ ] Tunggu 2-3 menit...
- [ ] 🎉 Website Online! Copy URL-nya

## 🔧 Konfigurasi Supabase (2 menit)

- [ ] Buka https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo
- [ ] Pergi ke: Authentication → URL Configuration
- [ ] **Site URL**: Paste URL Vercel Anda
  - Contoh: `https://ritakartina-website.vercel.app`
- [ ] **Redirect URLs**: Tambahkan URL Vercel + `/**`
  - Contoh: `https://ritakartina-website.vercel.app/**`
- [ ] Klik "Save" ✅

## ✅ Testing (5 menit)

- [ ] Buka website via URL Vercel
- [ ] Cek semua section tampil dengan benar
- [ ] Test di mobile (buka dari HP)
- [ ] Pergi ke: `https://your-url.vercel.app/#admin`
- [ ] Test login admin
- [ ] Test upload gambar
- [ ] Test create/edit/delete content ✅

## 🎨 Custom Domain (Opsional - 10 menit)

Jika ingin pakai domain ritakartina.com:

- [ ] Buka Vercel → Project → Settings → Domains
- [ ] Klik "Add Domain"
- [ ] Masukkan: `ritakartina.com`
- [ ] Ikuti instruksi update DNS
- [ ] Update Site URL di Supabase jadi: `https://ritakartina.com`
- [ ] Tunggu propagasi (5-30 menit) ✅

## 🎊 Selesai!

Jika semua checklist sudah ✅, maka:

🌟 **WEBSITE SUDAH ONLINE!** 🌟

- 📱 URL Website: `_____________________`
- 🔐 URL Admin: `_____________________/#admin`
- 📧 Email Admin: `_____________________`
- 🔑 Password: `_____________________`

---

## 📝 Notes

Tuliskan URL dan kredensial di atas untuk referensi!

## 🔄 Update Website Nanti

Jika ingin update konten atau design:

1. Edit file di komputer
2. Buka GitHub Desktop
3. Write commit message
4. Klik "Commit" dan "Push"
5. Vercel otomatis deploy update! (2-3 menit)

Easy! 🎉

---

## 🆘 Butuh Bantuan?

Jika ada masalah, cek:
1. **Vercel Dashboard** → Build Logs (untuk error deploy)
2. **Browser Console** → F12 (untuk error website)
3. **Supabase Dashboard** → Logs (untuk error database)

Atau hubungi developer untuk support!

---

**GOOD LUCK! 🚀**
