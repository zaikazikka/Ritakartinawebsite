# ⚡ QUICK REFERENCE CARD

> **Simpan file ini! Semua info penting ada di sini.**

---

## 🎯 DEPLOYMENT - 3 LANGKAH UTAMA

```
1️⃣ Upload 9 file ke GitHub        (5 menit)
2️⃣ Deploy di Vercel                (5 menit)
3️⃣ Update Supabase URLs            (2 menit)
```

---

## 📦 9 FILE YANG HARUS DI-UPLOAD

```
✅ package.json
✅ vite.config.ts
✅ tsconfig.json
✅ tsconfig.node.json
✅ index.html
✅ main.tsx
✅ vercel.json (replace yang lama)
✅ .gitignore
✅ favicon.svg
```

**Cara upload:** GitHub.com → Repository → Add file → Upload files → Drag & drop

---

## 🔧 VERCEL CONFIGURATION

```
Framework:      Vite
Build Command:  npm install && npm run build
Output Dir:     dist
Install Cmd:    npm install
Env Variables:  SKIP (jangan isi!)
```

**URL:** https://vercel.com/dashboard

---

## 🔐 SUPABASE CONFIGURATION

**Project ID:** `zmnhzduscqfgrxxsqoyo`

**Authentication → URL Configuration:**

| Field | Value |
|-------|-------|
| Site URL | `https://your-domain.vercel.app` |
| Redirect URLs | `https://your-domain.vercel.app/**` |

**PENTING:**
- Site URL: TANPA `/` di akhir
- Redirect URL: HARUS ada `/**` di akhir

**URL:** https://supabase.com/dashboard

---

## 🧪 TESTING CHECKLIST

```
✅ https://your-domain.vercel.app           → Website buka
✅ F12 → Console                            → No errors
✅ https://your-domain.vercel.app/#admin    → Login works
✅ Test di mobile                           → Responsive
✅ Upload gambar di admin                   → Upload works
```

---

## 🆘 TROUBLESHOOTING CEPAT

| Problem | Check | Fix |
|---------|-------|-----|
| Build Failed | Vercel Build Logs | Upload semua 9 file ke GitHub |
| Blank Page | Browser Console (F12) | Clear cache, refresh |
| Login Failed | Supabase Site URL | Re-check URL configuration |
| 404 Errors | vercel.json | Pastikan file vercel.json ter-upload |

---

## 📱 ADMIN ACCESS

**URL:** `https://your-domain.vercel.app/#admin`

**Login:**
- Email: (terdaftar di Supabase Auth)
- Password: (password Supabase)

**Features:**
- Create/Edit/Delete content
- Upload images & PDFs
- Manage all sections
- Real-time preview

---

## 🌐 WEBSITE SECTIONS

```
1. Profil               (Background: Abu Metalik #1a1d23)
2. Berita dan Liputan   (Background: Abu Muda #f3f4f6)
3. Buku & Publikasi     (Background: Abu Metalik)
4. Blog & Artikel       (Background: Abu Muda)
5. Karya Tulis Ilmiah   (Background: Abu Metalik)
6. Video                (Background: Abu Muda)
7. Galeri               (Background: Abu Metalik)
```

---

## 🎨 DESIGN TOKENS

**Colors:**
- Abu Metalik: `#1a1d23`
- Abu Muda: `#f3f4f6`
- Teks kontras otomatis

**Branding:**
- Nama: Dr. RITA KARTINA, S.H., M.H., M.AP.
- Tema: Professional, Sophisticated, Legal

---

## 💾 SUPABASE TABLES

```
profil          → Profile information
berita          → News & media coverage
buku            → Books & publications
blog            → Blog articles
karya_tulis     → Scientific papers
video           → Videos & podcasts
galeri          → Photo gallery
```

---

## 📦 SUPABASE STORAGE BUCKETS

```
profil-images       → Profile photos
berita-images       → News images
buku-images         → Book covers
buku-pdfs           → Book PDF files
blog-images         → Article images
karya-pdfs          → Paper PDF files
video-thumbnails    → Video thumbnails
galeri-images       → Gallery photos
```

**All buckets:** PUBLIC access

---

## 🔄 UPDATE WORKFLOW

**Option 1: Via Admin Dashboard (Recommended)**
```
1. Login ke admin
2. Edit content
3. Changes auto-saved
4. Live immediately
```

**Option 2: Via GitHub**
```
1. Edit file di GitHub.com
2. Commit changes
3. Vercel auto-deploy (2-3 menit)
4. Live!
```

---

## 🚀 TECH STACK

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React | 18.3.1 |
| Language | TypeScript | 5.2.2 |
| Build | Vite | 5.1.0 |
| Styling | Tailwind CSS | 4.0.0 |
| Backend | Supabase | 2.39.3 |
| Database | PostgreSQL | Latest |
| Storage | Supabase Storage | Latest |
| Auth | Supabase Auth | Latest |
| Hosting | Vercel | Latest |
| Icons | Lucide React | 0.344.0 |

---

## 📊 BUILD PROCESS

```
Local Development:
npm run dev  → Vite dev server (port 3000)

Production Build:
npm install              → Install dependencies
npm run build            → TypeScript compile + Vite bundle
  ├─ tsc                 → Compile TypeScript
  └─ vite build          → Bundle & optimize
     └─ Output: dist/    → Static files ready to deploy

Vercel Deployment:
1. Run: npm install
2. Run: npm run build
3. Serve: dist/ folder
```

---

## 🔒 SECURITY

**Authentication:**
- Supabase Auth (email/password)
- Row Level Security (RLS) enabled
- Admin-only access to dashboard

**Data Protection:**
- HTTPS enforced (Vercel)
- Secure headers configured
- No sensitive data in client code

**Best Practices:**
- Credentials via Supabase (not exposed)
- .gitignore for sensitive files
- Public buckets for images only

---

## 📈 PERFORMANCE

**Optimizations:**
- Code splitting (vendor chunks)
- Tree shaking (remove unused code)
- Minification (reduce size)
- Lazy loading (load on demand)
- CDN delivery (Vercel Edge)

**Expected Metrics:**
- First Load: < 3 seconds
- Subsequent: < 1 second
- Bundle Size: ~200KB gzipped

---

## 🌍 DOMAINS

**Default Vercel:**
```
https://ritakartina-website.vercel.app
```

**Custom Domain (Optional):**
```
https://ritakartina.com

Setup:
1. Vercel → Settings → Domains
2. Add domain
3. Update DNS at domain provider
4. Update Supabase Site URL
```

---

## 📞 SUPPORT LINKS

**Services:**
- Vercel: https://vercel.com/dashboard
- Supabase: https://supabase.com/dashboard
- GitHub: https://github.com

**Documentation:**
- React: https://react.dev
- Vite: https://vitejs.dev
- Tailwind: https://tailwindcss.com
- Supabase: https://supabase.com/docs

**Project Docs:**
- Quick Start: `DEPLOY_NOW.md`
- Detailed Fix: `DEPLOY_FIX.md`
- Checklist: `DEPLOYMENT_CHECKLIST.md`
- Visual Guide: `VISUAL_DEPLOY_GUIDE.md`
- Summary: `FIX_SUMMARY.md`

---

## 💡 TIPS

**Development:**
- Use browser DevTools (F12) for debugging
- Check Console for errors
- Check Network tab for failed requests

**Deployment:**
- Always test locally before deploy
- Check build logs if deployment fails
- Clear browser cache after updates

**Content Management:**
- Use admin dashboard for content
- Upload images < 5MB
- Use PDFs < 10MB
- Optimize images before upload

---

## ⚠️ COMMON MISTAKES

| Mistake | Problem | Solution |
|---------|---------|----------|
| Site URL dengan `/` | Login failed | Remove trailing slash |
| Missing `/**` | Redirect failed | Add `/**` to redirect URL |
| Wrong build command | Build failed | Use `npm install && npm run build` |
| Missing files | 404 errors | Upload all 9 files |
| Cache not cleared | Old version showing | Ctrl+Shift+Delete |

---

## ✅ SUCCESS INDICATORS

**Deployment successful if:**
```
✅ Vercel shows "Deployment Ready"
✅ Website loads without errors
✅ All sections display correctly
✅ Colors are correct (metalik & muda)
✅ Login admin works
✅ Can upload images
✅ Can create/edit/delete content
✅ Responsive on all devices
✅ No console errors
✅ Fast loading (< 3s)
```

---

## 🎯 QUICK COMMANDS

**Local Development:**
```bash
npm install      # Install dependencies
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

**Git (if using CLI):**
```bash
git add .
git commit -m "Add build configuration"
git push origin main
```

---

## 📝 CREDENTIALS TEMPLATE

Simpan di tempat aman:

```
PROJECT: Dr. Rita Kartina Website
URL: https://_____________________.vercel.app
GitHub: https://github.com/___________/ritakartina-website
Vercel: https://vercel.com/dashboard
Supabase Project ID: zmnhzduscqfgrxxsqoyo
Admin Email: _____________________
Admin Password: __________________ (RAHASIA!)
Last Updated: __________________
```

---

## 🎉 LAUNCH CHECKLIST

Sebelum announce:

```
□ Website live & accessible
□ All sections working
□ Admin login tested
□ Upload tested
□ Mobile tested
□ Different browsers tested
□ Different networks tested
□ Friends tested (ask 3 people)
□ Screenshot taken
□ URL saved
□ Credentials saved
```

**Ready to launch? SHARE IT! 🚀**

---

**© 2025 Dr. Rita Kartina, S.H., M.H., M.AP.**

**Your Quick Reference for Everything! 📋**
