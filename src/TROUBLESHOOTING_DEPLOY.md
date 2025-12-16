# 🔧 TROUBLESHOOTING DEPLOYMENT

Solusi untuk masalah umum saat deploy ritakartina.com

---

## 🔍 DIAGNOSIS CEPAT

### Website Tidak Bisa Diakses?

**Check 1: Build Status**
- Buka dashboard platform (Netlify/Cloudflare/Render)
- Lihat di tab "Deploys" atau "Deployments"
- Status harus: ✅ "Published" atau "Success"
- Jika ❌ "Failed" → Lihat build logs

**Check 2: DNS**
```bash
# Check if domain resolves
nslookup your-site.netlify.app

# Check if site is up
curl -I https://your-site.netlify.app
```

**Check 3: Browser**
- Clear browser cache (Ctrl+Shift+Del)
- Try incognito/private mode
- Try different browser

---

## ❌ ERROR: Build Failed

### Symptom:
Deployment status shows "Failed" dengan error di build logs

### Solusi:

#### 1. Check Build Logs
```
Go to dashboard → Deploys → Click failed deployment → View logs
```

Look for error messages like:
- `npm ERR!`
- `Error: ...`
- `Command failed`

#### 2. Common Build Errors & Fixes

**Error: "npm install failed"**
```bash
# Fix: Clear node_modules dan reinstall
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

**Error: "TypeScript errors"**
```bash
# Fix: Check TypeScript compilation
npm run build

# Jika ada error, fix code lalu:
git add .
git commit -m "Fix TypeScript errors"
git push
```

**Error: "Command not found"**
```
# Fix: Check di dashboard platform
Build command harus: npm run build
Publish directory harus: dist
```

#### 3. Nuclear Option (Clear Everything)
```bash
# Di dashboard platform
→ Deploys
→ Trigger deploy
→ ✅ Clear cache and retry deploy
```

---

## ❌ ERROR: Website Blank/White Screen

### Symptom:
Website deploy sukses tapi hanya tampil layar putih kosong

### Solusi:

#### 1. Check Browser Console
- Buka website
- Press F12 (Dev Tools)
- Tab "Console"
- Lihat error messages

#### 2. Common Causes

**Cause 1: JavaScript Error**
```
Console shows: "Uncaught Error: ..."

Fix: Check build logs dan fix error di code
```

**Cause 2: Missing Environment Variables**
```
Console shows: "undefined" untuk Supabase

Fix: Add environment variables di platform:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY
```

**Cause 3: Wrong Base Path**
```
Console shows: 404 errors untuk assets

Fix: Check vite.config.ts
→ Seharusnya tidak ada "base" option
→ Atau set base: "/"
```

#### 3. Test Locally First
```bash
# Build & test production build locally
npm run build
npm run preview

# Jika lokal OK tapi production tidak:
# → Pasti environment variables issue!
```

---

## ❌ ERROR: Admin Login Tidak Bisa

### Symptom:
Tidak bisa login ke `/admin-login`, redirect loop, atau error

### Solusi:

#### 1. Check Supabase Redirect URLs
```
1. Buka Supabase Dashboard
2. Authentication → URL Configuration
3. Site URL harus: https://your-actual-domain.com
4. Redirect URLs harus include:
   - https://your-site.netlify.app/**
   - https://your-domain.com/**
```

#### 2. Check Environment Variables
```
Di platform dashboard:
✅ VITE_SUPABASE_URL = https://zmnhzduscqfgrxxsqoyo.supabase.co
✅ VITE_SUPABASE_ANON_KEY = (your key)

PENTING: Harus ada prefix "VITE_"!
```

#### 3. Test Supabase Connection
```javascript
// Buka browser console di website
// Run:
console.log(import.meta.env.VITE_SUPABASE_URL)

// Harus output: https://zmnhzduscqfgrxxsqoyo.supabase.co
// Jika "undefined" → Environment variables tidak ter-set!
```

#### 4. Clear Browser Data
```
1. Logout dari semua tabs
2. Clear cookies & cache
3. Close all tabs
4. Try login again
```

---

## ❌ ERROR: Images Tidak Muncul

### Symptom:
Gambar broken/tidak tampil, atau error 404 untuk images

### Solusi:

#### 1. Check Supabase Storage
```
1. Buka Supabase Dashboard
2. Storage → Buckets
3. Check semua buckets:
   - berita-images (Public)
   - book-covers (Public)
   - karya-tulis-files (Public)
   - galeri-images (Public)
   - video-thumbnails (Public)

4. Click bucket → Policies
5. Pastikan ada policy untuk public access
```

#### 2. Test Image URL Directly
```
Copy image URL dari website
Paste di browser address bar
Jika 403/404 → Bucket tidak public!
```

#### 3. Re-upload Images
```
1. Login ke admin dashboard
2. Delete image yang broken
3. Upload ulang
4. Check di Storage apakah muncul
```

---

## ❌ ERROR: "No Output Directory named 'dist' found" (Vercel)

### Symptom:
Deploy di Vercel gagal dengan error ini

### Solusi:

**Option 1: Pindah ke Netlify (Recommended)**
```
Vercel bermasalah untuk Vite di project ini.
Better: Deploy ke Netlify atau Cloudflare.

Follow: /DEPLOY_NETLIFY_5_MENIT.md
```

**Option 2: Fix Vercel Config (Advanced)**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "devCommand": "npm run dev"
}
```

Tapi honestly, **Option 1 lebih mudah**!

---

## ❌ ERROR: 404 on Page Refresh

### Symptom:
Website bekerja tapi refresh halaman → 404 error

### Solusi:

#### Netlify:
```toml
# File /netlify.toml harus ada:
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
✅ **Sudah ada di project!**

#### Cloudflare:
```
Automatically handled by Cloudflare Pages
Tidak perlu konfigurasi tambahan
```

#### Render:
```yaml
# File /render.yaml harus ada:
routes:
  - type: rewrite
    source: /*
    destination: /index.html
```
✅ **Sudah ada di project!**

---

## ❌ ERROR: Build Timeout

### Symptom:
Build process timeout setelah beberapa menit

### Solusi:

#### 1. Optimize Build
```javascript
// vite.config.ts
export default defineConfig({
  build: {
    sourcemap: false,  // Disable sourcemaps
    minify: 'esbuild', // Faster minification
  }
})
```
✅ **Sudah di-optimize di project!**

#### 2. Check Dependencies
```bash
# Remove unused dependencies
npm prune

# Update package-lock
npm install

# Commit
git add package-lock.json
git commit -m "Optimize dependencies"
git push
```

#### 3. Platform Limits
```
Netlify: 15 minutes (cukup!)
Cloudflare: 20 minutes (cukup!)
Render: 15 minutes (cukup!)

Project ini build ~2 menit. Tidak akan timeout.
```

---

## ❌ ERROR: Environment Variables Tidak Bekerja

### Symptom:
Sudah set env vars di dashboard tapi masih undefined di code

### Solusi:

#### 1. Naming Convention
```bash
# WRONG ❌
SUPABASE_URL=...
REACT_APP_SUPABASE_URL=...

# CORRECT ✅
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

**PENTING**: Harus pakai prefix `VITE_` untuk Vite!

#### 2. Redeploy After Setting
```
Set environment variables
→ Save
→ Trigger new deployment
(Variables baru TIDAK apply ke deployment lama!)
```

#### 3. Check in Code
```typescript
// utils/supabase/client.ts
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('URL:', supabaseUrl) // Should not be undefined
console.log('Key:', supabaseKey ? 'Set' : 'Not set')
```

---

## ❌ ERROR: Custom Domain Tidak Bisa Diakses

### Symptom:
Subdomain `.netlify.app` bekerja tapi custom domain tidak

### Solusi:

#### 1. Check DNS Propagation
```bash
# Check if DNS has propagated
nslookup ritakartina.com

# Or use online tool:
# https://www.whatsmydns.net/
```

DNS propagation bisa butuh 1-48 jam!

#### 2. Netlify - Check Domain Status
```
Dashboard → Domain settings → ritakartina.com

Status harus:
✅ "Domain verified"
✅ "SSL/TLS certificate: Active"

Jika "Awaiting DNS":
→ Check DNS records di registrar
→ Wait for propagation
```

#### 3. DNS Records (Netlify)
```
Di registrar domain, set:

A Record:
Type: A
Name: @
Value: 75.2.60.5

CNAME Record:
Type: CNAME
Name: www
Value: your-site.netlify.app
```

#### 4. Cloudflare Pages
```
Jika domain sudah di Cloudflare:
→ Automatic DNS setup! ✅

Jika domain di registrar lain:
→ Pindahkan nameservers ke Cloudflare
→ Or add A/CNAME records manual
```

---

## ❌ ERROR: HTTPS Certificate Error

### Symptom:
"Your connection is not private" atau certificate error

### Solusi:

#### 1. Wait for Certificate
```
Platform butuh 1-5 menit generate SSL certificate
→ Wait sebentar
→ Refresh browser
→ Should work!
```

#### 2. Force HTTPS
```
Netlify Dashboard:
→ Domain settings
→ HTTPS
→ ✅ Force HTTPS
```

#### 3. Clear SSL State (Browser)
```
Chrome:
→ Settings
→ Privacy and security
→ Clear browsing data
→ ✅ Cached images and files
→ ✅ Cookies and other site data
→ Clear data
```

---

## ❌ ERROR: Slow Loading

### Symptom:
Website loading lambat atau images load lama

### Solusi:

#### 1. Check Platform CDN
```
Netlify: CDN di ~100+ locations ✅
Cloudflare: CDN di 300+ locations ✅ (paling cepat!)
Render: CDN di ~50+ locations ✅

Untuk Indonesia: Cloudflare paling cepat
```

#### 2. Optimize Images
```
Supabase Storage:
→ Upload images yang sudah di-resize
→ Max width: 1920px untuk desktop
→ Max width: 800px untuk thumbnails

Tools untuk resize:
- TinyPNG (online)
- ImageOptim (Mac)
- GIMP (Windows/Mac/Linux)
```

#### 3. Enable Compression
```
Netlify & Cloudflare otomatis compress:
✅ Gzip
✅ Brotli

Tidak perlu konfigurasi tambahan!
```

---

## 🆘 EMERGENCY: Rollback ke Versi Sebelumnya

### Jika deployment baru error, rollback ke versi lama:

#### Netlify:
```
1. Dashboard → Deploys
2. Find deployment yang working
3. Click → "Publish deploy"
4. DONE! ✅
```

#### Cloudflare:
```
1. Dashboard → Deployments
2. Click deployment yang working
3. "Rollback to this deployment"
4. DONE! ✅
```

#### Render:
```
1. Dashboard → Deploys
2. Click working deployment
3. "Redeploy"
4. DONE! ✅
```

---

## 🔍 DEBUG CHECKLIST

Jika masih ada masalah, check semua ini:

### Build:
- [ ] `npm install` works locally
- [ ] `npm run build` works locally
- [ ] `npm run preview` works locally
- [ ] No TypeScript errors
- [ ] No console errors

### Deployment:
- [ ] Code pushed to GitHub
- [ ] Platform dashboard shows "Success"
- [ ] Environment variables set correctly
- [ ] VITE_SUPABASE_URL set
- [ ] VITE_SUPABASE_ANON_KEY set

### Supabase:
- [ ] Storage buckets are PUBLIC
- [ ] Redirect URLs configured
- [ ] Site URL correct
- [ ] Can access Supabase dashboard

### DNS (if using custom domain):
- [ ] A record set correctly
- [ ] CNAME record set correctly
- [ ] DNS propagated (check whatsmydns.net)
- [ ] SSL certificate active

---

## 📞 MASIH STUCK?

### Langkah Terakhir:

#### 1. Nuclear Option - Redeploy dari Awal
```bash
# Delete deployment di platform
# Lalu deploy ulang:

git add .
git commit -m "Fresh deployment"
git push

# Re-import di platform dashboard
```

#### 2. Try Different Platform
```
Jika Netlify bermasalah → Try Cloudflare
Jika Cloudflare bermasalah → Try Render

Config files sudah ready untuk semua platform!
```

#### 3. Check Platform Status
```
Netlify Status: https://www.netlifystatus.com/
Cloudflare Status: https://www.cloudflarestatus.com/

Mungkin platform sedang down/maintenance
```

---

## 💡 PREVENTIVE TIPS

### Untuk Avoid Issues di Future:

#### 1. Always Test Locally
```bash
# Before every deployment:
npm run build
npm run preview

# Jika lokal OK → Deploy OK!
```

#### 2. Use Git Properly
```bash
# Commit often with clear messages
git add .
git commit -m "feat: add new section"
git push

# Easy rollback jika perlu
```

#### 3. Monitor Build Logs
```
Check logs setiap deployment
Jika ada warning → Fix immediately
```

#### 4. Keep Environment Variables Updated
```
Update di platform setiap ganti Supabase key
Test after every change
```

---

## ✅ SUCCESS CHECKLIST

Website deployment SUKSES jika:

- [ ] ✅ Website bisa diakses
- [ ] ✅ Semua halaman loading
- [ ] ✅ Images tampil
- [ ] ✅ Navigation works
- [ ] ✅ Admin login works
- [ ] ✅ Upload gambar works
- [ ] ✅ CRUD operations work
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive
- [ ] ✅ Custom domain works (if applicable)

**Jika semua ✅ → SELAMAT! Website LIVE! 🎉**

---

**Masih ada masalah? Coba platform deployment lain!**

**Rekomendasi: Netlify → Cloudflare → Render**

**Semua config files sudah ready! Tinggal deploy! 🚀**
