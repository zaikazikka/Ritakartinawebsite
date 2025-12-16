# ⚡ DEPLOY COMMAND - COPY & PASTE

## 🚀 ONE-LINE DEPLOY

```bash
npm install -g vercel && vercel login && vercel --prod
```

**SELESAI!** Website online dalam 3 menit! 🎉

---

## 📋 STEP-BY-STEP (Jika One-Line Tidak Bekerja)

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Login
```bash
vercel login
```
(Browser akan terbuka, login dengan GitHub/GitLab/Email)

### 3. Deploy
```bash
vercel --prod
```

### 4. Pilihan Deploy
Vercel akan menanya:
- **Set up and deploy?** → Tekan Enter (Yes)
- **Which scope?** → Pilih account Anda
- **Link to existing project?** → N (No, buat baru)
- **Project name?** → Tekan Enter atau ketik `ritakartina-website`
- **In which directory is your code?** → Tekan Enter (current directory)
- **Override settings?** → N (No, gunakan dari vercel.json)

Tunggu 2-3 menit... ☕

**DONE!** URL akan muncul:
```
✅ Production: https://ritakartina-xxx.vercel.app
```

---

## ⚙️ TAMBAH ENVIRONMENT VARIABLES (WAJIB!)

Setelah deploy berhasil:

### Via Vercel CLI
```bash
vercel env add VITE_SUPABASE_URL
# Paste: https://zmnhzduscqfgrxxsqoyo.supabase.co
# Environment: production

vercel env add VITE_SUPABASE_ANON_KEY
# Paste: [your-anon-key]
# Environment: production

# Redeploy
vercel --prod
```

### Via Vercel Dashboard
1. Buka https://vercel.com/dashboard
2. Pilih project `ritakartina-website`
3. Klik **Settings** → **Environment Variables**
4. Tambahkan:
   ```
   VITE_SUPABASE_URL = https://zmnhzduscqfgrxxsqoyo.supabase.co
   VITE_SUPABASE_ANON_KEY = [your-anon-key]
   ```
5. Klik **Deployments** → Latest → **Redeploy**

---

## 🐛 TROUBLESHOOTING

### Error: "command not found: vercel"
```bash
# Reinstall Vercel CLI
npm install -g vercel --force
```

### Error: "No Output Directory"
✅ Sudah diperbaiki! Tidak akan terjadi lagi.

Jika masih muncul:
```bash
# Test build lokal dulu
npm install
npm run build

# Jika berhasil, folder dist/ akan terbuat
ls dist/
```

### Error: "Failed to compile"
```bash
# Clear cache dan rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📱 DEPLOY VIA GITHUB (ALTERNATIF)

Jika tidak mau pakai CLI:

```bash
# 1. Push ke GitHub
git init
git add .
git commit -m "Deploy ritakartina website"
git remote add origin https://github.com/yourusername/ritakartina-website.git
git push -u origin main

# 2. Buka vercel.com
# 3. New Project → Import dari GitHub
# 4. Deploy
```

---

## ✅ VERIFIKASI

Setelah deploy, cek:

```bash
# Open di browser
vercel open
```

Atau buka URL yang diberikan Vercel.

Pastikan:
- ✅ Homepage tampil
- ✅ Nama "Dr. RITA KARTINA, S.H., M.H., M.AP." muncul
- ✅ Menu navigasi berfungsi

---

## 📚 BUTUH PANDUAN LENGKAP?

Lihat file:
- **BACA_DULU.md** → Overview
- **MULAI_DEPLOY.md** → Step-by-step lengkap
- **VERCEL_DEPLOY_FIX.md** → Troubleshooting

---

## 🎯 QUICK REFERENCE

| Command | Fungsi |
|---------|--------|
| `vercel` | Deploy ke preview |
| `vercel --prod` | Deploy ke production |
| `vercel ls` | List deployments |
| `vercel open` | Open di browser |
| `vercel logs` | Lihat logs |
| `vercel env ls` | List env variables |
| `vercel env add` | Tambah env variable |

---

## 🎉 SELESAI!

Copy command di atas, paste di terminal, dan website Anda akan online!

**Total waktu: 3 menit** ⚡

---

**GO DEPLOY NOW! 🚀**
