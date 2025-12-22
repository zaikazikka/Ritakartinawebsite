# ⚡ CLOUDFLARE PAGES - QUICK GUIDE

**Deploy dalam 3 menit!**

---

## 🎯 WHY CLOUDFLARE?

✅ **UNLIMITED** bandwidth & requests  
✅ **TERCEPAT** - CDN terbaik dunia  
✅ **GRATIS** selamanya  
✅ **ZERO CONFIG** - Auto-detect Vite  

---

## 🚀 3 LANGKAH DEPLOY

### 1️⃣ Test & Push

```bash
npm run build
git add .
git commit -m "Deploy to Cloudflare"
git push origin main
```

---

### 2️⃣ Setup di Cloudflare

**Go to**: https://dash.cloudflare.com/

```
1. Workers & Pages → Create application → Pages
2. Connect to Git → Connect GitHub
3. Select repository: ritakartina-website
4. Begin setup
```

---

### 3️⃣ Configure & Deploy

**Framework**: Vite (pilih dari dropdown) ✅

**Environment Variables** (Add 2):
```
VITE_SUPABASE_URL = https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY = (your-key)
```

**Deploy**: Klik "Save and Deploy" ✅

---

## ✅ DONE!

**Website live di**: `https://ritakartina-blog.pages.dev`

**Timeline**: ~3 menit ⏱️

---

## 🌐 CUSTOM DOMAIN (Optional)

```
1. Custom domains → Set up a custom domain
2. Enter: ritakartina.com
3. Follow DNS instructions
4. Wait 5-30 min for SSL
```

---

## 🔄 AUTO DEPLOY

Every `git push` → Auto rebuild & deploy! 🎉

---

## 🆘 TROUBLESHOOT

**Build failed?**
→ Check logs di dashboard

**Website blank?**
→ Check env variables

**Domain not working?**
→ Wait for DNS propagation (up to 24h)

---

## 📖 FULL GUIDE

**Detailed**: `/CLOUDFLARE_DEPLOY_SEKARANG.md`

**Complete**: `/DEPLOY_CLOUDFLARE.md`

---

## ✅ CHECKLIST

- [ ] Test build lokal
- [ ] Push ke GitHub
- [ ] Sign up Cloudflare
- [ ] Connect GitHub
- [ ] Framework: Vite
- [ ] Add env variables
- [ ] Deploy!
- [ ] Test URL
- [ ] Setup domain (optional)

---

**READY! Deploy now! 🚀**

**URL**: https://dash.cloudflare.com/
