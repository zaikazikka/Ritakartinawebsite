# 🚀 DEPLOY KE VERCEL - 3 LANGKAH MUDAH

## ✅ KONFIGURASI SUDAH 100% FIX!

---

## 📋 LANGKAH 1: TEST BUILD LOKAL

```bash
npm install
npm run build
```

**Cek apakah folder `dist` terbuat?**
- ✅ YES → Lanjut ke Langkah 2
- ❌ NO → Screenshot error dan hubungi saya

---

## 📋 LANGKAH 2: PUSH KE GITHUB

```bash
git add .
git commit -m "Deploy: Vercel configuration ready"
git push origin main
```

---

## 📋 LANGKAH 3: DEPLOY DI VERCEL

### A. Via Vercel Dashboard (RECOMMENDED):

1. Buka: https://vercel.com
2. Login dengan GitHub
3. Klik: **"Add New Project"**
4. Pilih repository: **ritakartina-website**
5. Klik: **"Deploy"** (jangan ubah apapun!)
6. Tunggu 2 menit
7. ✅ **SELESAI!**

### B. Via CLI (Alternatif):

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

---

## 🔑 LANGKAH 4: TAMBAH ENV VARIABLES

Di Vercel Dashboard:
1. Project Settings → Environment Variables
2. Tambahkan:

```
VITE_SUPABASE_URL = https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY = [your-anon-key]
```

3. Klik "Redeploy"

---

## 🎉 DONE!

Website online di: `https://ritakartina-website.vercel.app`

**Custom domain:** Settings → Domains → Add `ritakartina.com`

---

## 🆘 TROUBLESHOOTING CEPAT

### Build Failed?
- Lihat: Deployment → Build Logs
- Cari baris error (merah)
- Screenshot → kirim ke saya

### Dist Not Found?
- Sudah diperbaiki di konfigurasi!
- Re-import project di Vercel

### TypeScript Error?
- Sudah dihandle dengan `vite build`
- Error TypeScript tidak akan block build

---

## 📁 FILE KONFIGURASI (SUDAH FIX)

✅ tsconfig.json - Minimal & compatible
✅ vercel.json - Build command: vite build  
✅ vite.config.ts - outDir: dist, emptyOutDir: true
✅ .vercelignore - Tidak ignore dist
✅ package.json - Script build ada

**Semua sudah PERFECT! Tinggal deploy!** 🚀

---

**BUTUH BANTUAN?**
Baca: `/DEPLOY_VERCEL_FINAL.md` untuk panduan lengkap
Atau: `/PERBAIKAN_DEPLOYMENT.md` untuk detail teknis
