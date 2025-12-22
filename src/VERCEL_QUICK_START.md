# ⚡ VERCEL DEPLOYMENT - QUICK START

**Deploy ritakartina.com ke Vercel dalam 10 menit!**

---

## ✅ KONFIGURASI SUDAH DIPERBAIKI

Saya sudah fix semua config files:

- ✅ **`/vercel.json`** - Build command & output directory fixed
- ✅ **`/tsconfig.json`** - Added `noEmit: true`
- ✅ **`/.vercelignore`** - Ignore unnecessary files
- ✅ **`/vite.config.ts`** - Output ke `dist` folder

**Status**: 🎉 **READY TO DEPLOY!**

---

## 🚀 DEPLOY SEKARANG (4 LANGKAH)

### 1️⃣ Test Build Lokal (PENTING!)

```bash
# Clean & build
rm -rf node_modules dist
npm install
npm run build

# Harus sukses! Check output:
ls -la dist/
# Harus ada: index.html, assets/, favicon.svg
```

**✅ Jika build lokal sukses → Lanjut langkah 2**

---

### 2️⃣ Push ke GitHub

```bash
git add .
git commit -m "Fix Vercel configuration - ready to deploy"
git push origin main
```

---

### 3️⃣ Deploy di Vercel Dashboard

#### A. Login & Import
1. Buka: **https://vercel.com/dashboard**
2. Login dengan GitHub
3. Klik **"Add New..."** → **"Project"**
4. Pilih repository **ritakartina-website**
5. Klik **"Import"**

#### B. Configure (MANUAL - PENTING!)

**Framework Preset**: 
- Pilih **"Vite"**

**Build and Output Settings** - OVERRIDE SEMUA:

✅ **Build Command**: 
```
npm run build
```

✅ **Output Directory**: 
```
dist
```

✅ **Install Command**: 
```
npm install
```

**Node.js Version**: 
- **18.x**

#### C. Environment Variables

Klik **"Environment Variables"**, add:

```
Name:  VITE_SUPABASE_URL
Value: https://zmnhzduscqfgrxxsqoyo.supabase.co

Name:  VITE_SUPABASE_ANON_KEY
Value: (paste anon key dari Supabase)
```

**Environment**: Pilih **All** (Production, Preview, Development)

---

### 4️⃣ Deploy!

1. Klik **"Deploy"**
2. **Tunggu 3-5 menit** ⏱️
3. ✅ **SELESAI!**

---

## 🔍 VERIFY DEPLOYMENT

### Check Build Logs
```
Vercel Dashboard → Deployments → Click latest
→ View Function Logs

Harus lihat:
✓ Running "npm run build"
✓ vite v5.1.0 building for production...
✓ dist/index.html
✓ dist/assets/index-[hash].css
✓ dist/assets/index-[hash].js
✓ Build Completed in /vercel/output
✓ Detected output: dist
```

### Test Website
```
1. Klik deployment URL
2. Website harus load dengan benar
3. Test navigasi
4. Test /admin-login
5. Test upload gambar
```

---

## ❌ TROUBLESHOOTING CEPAT

### Error: "No Output Directory named 'dist' found"

**Fix:**
```
Vercel Dashboard → Settings → General
→ Build & Development Settings

Pastikan:
✅ Build Command: npm run build
✅ Output Directory: dist

Klik Save → Deployments → Redeploy
```

### Build Failed di Vercel Tapi Lokal OK

**Fix:**
```
1. Vercel Dashboard → Settings
2. General → "Clear Build Cache"
3. Go to Deployments
4. Click ... → "Redeploy"
```

### Website Blank Setelah Deploy

**Fix:**
```
1. Check browser console (F12)
2. Jika error tentang Supabase:
   → Settings → Environment Variables
   → Pastikan VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY ada
   → Redeploy
```

**Full troubleshooting**: `/DEPLOY_VERCEL_FIX_FINAL.md`

---

## 🔧 VERCEL CLI (ALTERNATIVE)

Jika prefer command line:

```bash
# Install
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Saat prompt:
# - Build Command? npm run build
# - Output Directory? dist
# - Development Command? npm run dev

# Set env vars
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## 📊 EXPECTED RESULT

**Success indicators**:
- ✅ Build logs show "Build Completed"
- ✅ "Detected output: dist"
- ✅ Status: Ready
- ✅ URL accessible
- ✅ Website fully functional

**Timeline**:
- Install deps: ~1-2 min
- Build: ~1-2 min
- Deploy: ~1 min
- Total: **~5 min** ⏱️

---

## 🌐 CUSTOM DOMAIN (OPTIONAL)

Setelah deploy sukses:

```
Vercel Dashboard → Project → Settings → Domains
→ Add: ritakartina.com
→ Follow DNS instructions
→ Wait for SSL (auto)
```

Update di Supabase:
```
Authentication → URL Configuration
→ Site URL: https://ritakartina.com
→ Redirect URLs: https://ritakartina.com/**
```

---

## ✅ CHECKLIST

**Pre-Deploy**:
- [x] Config files fixed
- [ ] `npm run build` works locally
- [ ] Code pushed to GitHub
- [ ] Supabase credentials ready

**Deploy**:
- [ ] Imported to Vercel
- [ ] Framework: Vite
- [ ] Build command: `npm run build`
- [ ] Output: `dist`
- [ ] Env variables set
- [ ] Deployed

**Post-Deploy**:
- [ ] URL works
- [ ] Admin login works
- [ ] Images display
- [ ] No console errors

---

## 📞 HELP

**Dokumentasi lengkap**: `/DEPLOY_VERCEL_FIX_FINAL.md`

**Test script**: 
```bash
chmod +x test-vercel-build.sh
./test-vercel-build.sh
```

---

## 🎉 READY!

**Config sudah 100% fixed!**

**Next**: Push ke GitHub → Import di Vercel → Deploy! 🚀

---

**TL;DR**:
1. `npm run build` (test lokal)
2. `git push` (upload ke GitHub)
3. Import di Vercel dashboard
4. Set: Build=`npm run build`, Output=`dist`
5. Add env variables
6. Deploy! ✅
