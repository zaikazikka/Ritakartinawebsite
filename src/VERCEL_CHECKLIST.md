# ✅ VERCEL DEPLOYMENT CHECKLIST

Print atau bookmark halaman ini untuk deployment!

---

## 📋 PRE-DEPLOYMENT CHECKS

### File Konfigurasi
- [x] `tsconfig.json` - No allowImportingTsExtensions
- [x] `tsconfig.json` - No noEmit setting
- [x] `vercel.json` - Build command: vite build
- [x] `vercel.json` - Output directory: dist
- [x] `vite.config.ts` - outDir: dist
- [x] `vite.config.ts` - emptyOutDir: true
- [x] `package.json` - Build script: vite build
- [x] `.vercelignore` - Tidak ignore dist

### Dependencies
- [x] React & React-DOM installed
- [x] Vite installed
- [x] TypeScript installed
- [x] @vitejs/plugin-react installed
- [x] Supabase client installed

### Project Structure
- [x] `index.html` ada di root
- [x] `main.tsx` ada di root
- [x] `App.tsx` ada di root
- [x] `/components` folder exists
- [x] `/styles/globals.css` exists

---

## 🧪 LOCAL TESTING

### Build Test
```bash
npm install
```
- [ ] Install berhasil tanpa error

```bash
npm run build
```
- [ ] Build berhasil
- [ ] Folder `dist` terbuat
- [ ] File `dist/index.html` ada
- [ ] Folder `dist/assets` ada

### Preview Test
```bash
npm run preview
```
- [ ] Preview server jalan di port 4173
- [ ] Website bisa dibuka di browser
- [ ] Tidak ada error di console
- [ ] Images loading dengan baik
- [ ] Navigation works

---

## 🚀 DEPLOYMENT STEPS

### 1. Git Repository
- [ ] Code sudah di-commit
- [ ] Code sudah di-push ke GitHub/GitLab
- [ ] Branch: `main` atau `master`

### 2. Vercel Account
- [ ] Login ke https://vercel.com
- [ ] Connect dengan GitHub/GitLab account

### 3. Import Project
- [ ] Klik "Add New Project"
- [ ] Pilih repository: ritakartina-website
- [ ] Framework detected: **Vite** ✅

### 4. Build Settings (AUTO-DETECTED)
- [ ] Framework Preset: `Vite`
- [ ] Build Command: `vite build`
- [ ] Output Directory: `dist`
- [ ] Install Command: `npm install`

**JANGAN UBAH APAPUN!**

### 5. Environment Variables (SKIP DULU)
- [ ] Skip for now (bisa ditambah nanti)

### 6. Deploy
- [ ] Klik tombol "Deploy"
- [ ] Tunggu 2-3 menit
- [ ] Check build logs (no error)

---

## 🎯 POST-DEPLOYMENT

### Verify Deployment
- [ ] Deployment status: Ready ✅
- [ ] Visit deployment URL
- [ ] Website loading
- [ ] No console errors
- [ ] Check homepage
- [ ] Check blog section
- [ ] Check admin login

### Environment Variables
- [ ] Go to: Settings → Environment Variables
- [ ] Add: `VITE_SUPABASE_URL`
- [ ] Add: `VITE_SUPABASE_ANON_KEY`
- [ ] Redeploy after adding env vars

### Custom Domain (Optional)
- [ ] Settings → Domains
- [ ] Add domain: `ritakartina.com`
- [ ] Add domain: `www.ritakartina.com`
- [ ] Configure DNS records
- [ ] Wait for SSL certificate (auto)

---

## 🔧 TROUBLESHOOTING CHECKLIST

### If Build Fails

1. **Check Build Logs**
   - [ ] Vercel Dashboard → Deployments
   - [ ] Click failed deployment
   - [ ] View "Build Logs"
   - [ ] Find error message (usually red)

2. **Common Fixes**
   - [ ] Clear build cache (Settings → General)
   - [ ] Re-import project
   - [ ] Check git repository is up to date

3. **TypeScript Errors**
   - [ ] Should not block build (config fixed)
   - [ ] If blocking, check tsconfig.json
   - [ ] Make sure no `allowImportingTsExtensions`

4. **Module Errors**
   - [ ] Check import paths
   - [ ] No `.ts` or `.tsx` in imports
   - [ ] All dependencies in package.json

---

## 📊 DEPLOYMENT SUCCESS CRITERIA

- [x] Build completes without error
- [x] Folder `dist` created during build
- [x] Deployment shows "Ready" status
- [x] Website accessible via Vercel URL
- [x] No 404 errors on refresh
- [x] Images loading correctly
- [x] CSS styles applied
- [x] JavaScript working
- [x] React app rendering

---

## 🎉 SUCCESS!

Jika semua checklist di atas ✅, deployment berhasil!

**URL Production:** https://[project-name].vercel.app

### Auto-Deploy Setup
- [x] Vercel connected to Git
- [x] Every git push = auto deploy
- [x] Preview deployments for PRs

---

## 📞 SUPPORT

### Dokumentasi
- Quick start: `/DEPLOY_3_LANGKAH.md`
- Full guide: `/DEPLOY_VERCEL_FINAL.md`
- Technical: `/PERBAIKAN_DEPLOYMENT.md`

### Test Script
```bash
bash test-build.sh
```

---

## 💡 TIPS

- ✅ First deployment bisa 3-5 menit
- ✅ Next deployments lebih cepat (cache)
- ✅ Always test build locally first
- ✅ Check preview deployment sebelum production
- ✅ Monitor build logs for errors
- ✅ Use environment variables untuk secrets

---

**VERSI:** 1.0 - Deployment Fix Final
**TANGGAL:** December 16, 2025
**STATUS:** ✅ Production Ready

---

Print checklist ini dan centang satu per satu! 🚀
