# ⚡ VERCEL FIX - QUICK SOLUTION

**Solusi cepat untuk error "No Output Directory named 'dist' found"**

---

## 🎯 SOLUSI TERCEPAT (RECOMMENDED!)

### ❌ HAPUS vercel.json!

```bash
# Delete atau rename
rm vercel.json
# atau
mv vercel.json vercel.json.backup

# Push
git add .
git commit -m "Remove vercel.json"
git push origin main
```

---

### ✅ DEPLOY DENGAN MANUAL SETTINGS

**1. Go to Vercel Dashboard**
https://vercel.com/dashboard

**2. Import Project**
- Add New → Project
- Import Git Repository
- Select: `ritakartina-website`

**3. Configure (PENTING - Override SEMUA!)**

**Framework Preset:**
```
Vite
```

**✅ Override Build Command:**
```
npm run build
```

**✅ Override Output Directory:**
```
dist
```

**✅ Override Install Command:**
```
npm install
```

**Node.js Version:**
```
18.x
```

**Environment Variables (Add 2):**
```
VITE_SUPABASE_URL = https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY = (your-key)
```

**4. Deploy!**

Klik "Deploy" → Tunggu 3-5 menit → DONE! ✅

---

## 🔍 JIKA MASIH ERROR

### Clear Cache & Redeploy

```
Vercel Dashboard → Settings → General
→ "Clear Build Cache"
→ Save

Deployments → Latest → "..." → Redeploy
```

---

### Check Build Logs

```
Deployments ��� Click deployment → View logs

Harus lihat:
✓ npm run build
✓ vite building...
✓ dist/index.html
✓ dist/assets/...
✓ built in XXs
✓ Output Directory: dist  ← KEY!
```

---

## ⚠️ VERIFY LOKAL DULU

```bash
# Clean & test
rm -rf node_modules dist
npm install
npm run build

# Check dist exists
ls -la dist/

# Preview
npm run preview
```

**Jika lokal berhasil → Vercel pasti berhasil!**

---

## 🚨 STILL FAILING?

### Option 1: Vercel CLI

```bash
npm install -g vercel
vercel login
vercel

# Saat prompt:
# Build Command: npm run build
# Output Directory: dist

vercel --prod
```

---

### Option 2: Switch to Cloudflare (EASIER!)

```
Cloudflare Pages:
✅ Auto-detect Vite
✅ No config needed
✅ Unlimited bandwidth
✅ Faster setup

Guide: /START_CLOUDFLARE.md
Deploy in 3 minutes!
```

---

## ✅ CHECKLIST

**Vercel Settings MUST be:**
- [ ] Framework: **Vite**
- [ ] Build Command: **npm run build**
- [ ] Output Directory: **dist**
- [ ] Node.js: **18.x**
- [ ] Env Variables: Added (2)

**Local Test MUST pass:**
- [ ] `npm run build` → Success
- [ ] `dist/` folder created
- [ ] `npm run preview` → Website works

---

## 📖 DETAILED GUIDE

**Complete troubleshooting:** `/FIX_VERCEL_DIST_ERROR.md`

---

## 🎯 TL;DR

1. **Delete** `vercel.json`
2. **Push** to GitHub
3. **Import** to Vercel
4. **Override** all settings manually:
   - Framework: Vite
   - Build: npm run build
   - Output: dist
5. **Add** env variables
6. **Deploy!**

**Or just use Cloudflare Pages!** (Easier)

---

**Good luck! 🚀**
