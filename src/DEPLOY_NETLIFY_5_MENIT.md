# 🚀 DEPLOY KE NETLIFY DALAM 5 MENIT

## Mengapa Netlify?
✅ **PALING MUDAH** untuk Vite + React  
✅ **GRATIS** selamanya untuk project seperti ini  
✅ **AUTO-DETECT** semua settings  
✅ **TIDAK ADA** error "Output Directory not found"  

---

## 🎯 LANGKAH-LANGKAH (SUPER SIMPLE)

### STEP 1: Push ke GitHub (Jika belum)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

### STEP 2: Buka Netlify
1. Buka browser → https://app.netlify.com/
2. Klik **"Sign up"** atau **"Log in"**
3. Pilih **"Continue with GitHub"**
4. Authorize Netlify

---

### STEP 3: Import Project
1. Klik tombol **"Add new site"** (hijau, pojok kanan atas)
2. Pilih **"Import an existing project"**
3. Klik **"Deploy with GitHub"**
4. **Cari dan pilih** repository `ritakartina-website` (atau nama repo Anda)
5. Klik repository tersebut

---

### STEP 4: Configure Settings

Netlify akan menampilkan form configuration. **GOOD NEWS**: Netlify sudah auto-detect semuanya! ✅

Anda akan lihat:
```
Site name: ritakartina-website-123 (bisa diubah nanti)
Branch to deploy: main
Build command: npm run build
Publish directory: dist
```

**JANGAN UBAH APAPUN!** Sudah benar semua. ✅

---

### STEP 5: Tambahkan Environment Variables

⚠️ **INI PENTING!** Tanpa ini, koneksi ke Supabase tidak akan bekerja.

1. Klik **"Show advanced"** atau **"Add environment variables"**
2. Tambahkan 2 variables:

**Variable 1:**
```
Key: VITE_SUPABASE_URL
Value: https://zmnhzduscqfgrxxsqoyo.supabase.co
```

**Variable 2:**
```
Key: VITE_SUPABASE_ANON_KEY
Value: (copy dari Supabase Dashboard → Settings → API → anon public key)
```

---

### STEP 6: Deploy!
1. Klik tombol **"Deploy site"** (biru besar)
2. **TUNGGU 2-3 MENIT** ☕
3. Netlify akan:
   - Clone repo Anda
   - Install dependencies
   - Run `npm run build`
   - Deploy ke CDN global

---

### STEP 7: Website LIVE! 🎉

Setelah build selesai, Anda akan lihat:
```
✅ Site is live!
🌐 https://ritakartina-website-123.netlify.app
```

**KLIK URL** tersebut untuk melihat website Anda! 🚀

---

## ✅ CHECKLIST SETELAH DEPLOY

### Test Semua Fitur:
- [ ] Website terbuka dengan benar
- [ ] Semua section tampil (Profil, Berita, Buku, dll)
- [ ] Gambar loading dengan baik
- [ ] Navigasi bekerja
- [ ] Footer & header tampil

### Test Admin Dashboard:
- [ ] Buka `/admin-login`
- [ ] Login dengan credentials Supabase
- [ ] Test upload gambar
- [ ] Test CRUD operations (Create, Read, Update, Delete)

---

## 🌐 SETUP CUSTOM DOMAIN (OPTIONAL)

Jika Anda ingin menggunakan `ritakartina.com` instead of `.netlify.app`:

### Di Netlify:
1. Go to **"Site settings"** → **"Domain management"**
2. Klik **"Add custom domain"**
3. Masukkan: `ritakartina.com` dan `www.ritakartina.com`
4. Netlify akan memberikan **DNS records** yang harus Anda set

### Di Registrar Domain (Niagahoster, GoDaddy, etc):
1. Login ke dashboard domain
2. Cari **"DNS Settings"** atau **"Manage DNS"**
3. Tambahkan A Record yang diberikan Netlify:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```
4. Tambahkan CNAME:
   ```
   Type: CNAME
   Name: www
   Value: ritakartina-website-123.netlify.app
   ```
5. **Tunggu 1-24 jam** untuk propagasi DNS

### Update Supabase Redirect URLs:
1. Buka **Supabase Dashboard**
2. Go to **Authentication** → **URL Configuration**
3. Update:
   - **Site URL**: `https://ritakartina.com`
   - **Redirect URLs**: Tambahkan:
     - `https://ritakartina.com/**`
     - `https://www.ritakartina.com/**`
     - `https://ritakartina-website-123.netlify.app/**`

---

## 🔄 AUTO DEPLOY

**KABAR BAIK**: Sekarang setiap kali Anda push ke GitHub, Netlify akan **otomatis rebuild dan redeploy**! 🎉

```bash
# Edit file apapun
git add .
git commit -m "Update content"
git push

# Netlify akan auto-detect dan deploy dalam 2 menit!
```

---

## 🛠️ FITUR NETLIFY YANG BERGUNA

### 1. Deploy Previews
Setiap kali Anda buat Pull Request, Netlify akan deploy preview URL

### 2. Rollback
Jika ada masalah, klik **"Deploys"** → Pilih versi lama → **"Publish deploy"**

### 3. Build Logs
Jika ada error, lihat di **"Deploys"** → Klik deploy → **"View build logs"**

### 4. Analytics (Optional - Paid)
Track visitors, page views, dll

### 5. Forms (Built-in)
Kalau mau tambah contact form, Netlify punya fitur bawaan

---

## ❌ TROUBLESHOOTING

### Build Gagal?

#### Check 1: Environment Variables
- Pastikan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` sudah diset
- Re-deploy: **"Deploys"** → **"Trigger deploy"** → **"Clear cache and deploy site"**

#### Check 2: Build Command
- Pastikan Build command: `npm run build`
- Pastikan Publish directory: `dist`

#### Check 3: Node Version
- Go to **"Site settings"** → **"Build & deploy"** → **"Environment"**
- Set `NODE_VERSION` = `18`

### Website Blank/Error 404?

#### Check Redirect Rules
File `/netlify.toml` harus ada:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

✅ **Sudah ada di project Anda!**

### Images Tidak Muncul?

#### Check Supabase Storage
1. Buka Supabase Dashboard
2. Storage → Buckets
3. Pastikan semua buckets **PUBLIC**
4. Test URL gambar langsung di browser

---

## 📊 MONITORING

### Check Deploy Status:
1. **Deploys** tab → Lihat semua deployment history
2. **Production deploys** = yang live di website
3. **Deploy previews** = untuk testing

### Check Performance:
Netlify otomatis optimasi:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Asset optimization
- ✅ Gzip compression

---

## 🎉 SELESAI!

Website Anda sekarang:
- ✅ **Live** di internet
- ✅ **HTTPS** secure
- ✅ **Fast** (CDN global)
- ✅ **Auto-deploy** setiap git push
- ✅ **Free** selamanya

---

## 📞 SUPPORT

Jika masih ada masalah:
1. **Netlify Support**: https://answers.netlify.com/
2. **Build Logs**: Lihat di Netlify dashboard
3. **Re-deploy**: Klik "Trigger deploy" → "Clear cache and deploy"

---

**Selamat! Website Dr. Rita Kartina sudah online! 🚀**

Next steps:
- Share URL dengan Dr. Rita
- Test semua fitur
- Tambah content via Admin Dashboard
- Setup custom domain (optional)
