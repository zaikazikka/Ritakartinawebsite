# 📄 DEPLOYMENT CHEATSHEET

**Quick reference untuk deploy ritakartina.com**

---

## ⚡ QUICK DEPLOY

### Netlify (Recommended)
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to
https://app.netlify.com/

# 3. Import & Deploy
- Login with GitHub
- Add new site → Import
- Select repo
- Deploy!

# 4. Set Environment Variables
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=(your-key)
```

### Cloudflare Pages
```bash
# 1. Push to GitHub
git push origin main

# 2. Go to
https://dash.cloudflare.com/

# 3. Deploy
- Workers & Pages → Create
- Connect to Git
- Select repo
- Framework: Vite
- Deploy!

# 4. Set Environment Variables
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=(your-key)
```

---

## 🔧 BUILD COMMANDS

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Test Before Deploy
```bash
# Full test
npm install
npm run build
npm run preview

# If successful → Ready to deploy! ✅
```

---

## 📁 KEY FILES

### Config Files (Already Ready!)
```
/netlify.toml       ← Netlify configuration
/wrangler.toml      ← Cloudflare configuration
/render.yaml        ← Render configuration
/package.json       ← Build scripts
/vite.config.ts     ← Vite settings
/.gitignore         ← Git ignore rules
```

### Documentation Files
```
/MULAI_DISINI_DEPLOY.md        ← START HERE
/DEPLOY_NETLIFY_5_MENIT.md     ← Netlify guide
/DEPLOY_CLOUDFLARE.md          ← Cloudflare guide
/TROUBLESHOOTING_DEPLOY.md     ← Fix errors
/DEPLOY_COMMANDS.md            ← CLI reference
```

---

## 🌐 PLATFORM URLS

### Dashboards
```
Netlify:      https://app.netlify.com/
Cloudflare:   https://dash.cloudflare.com/
Render:       https://dashboard.render.com/
Supabase:     https://supabase.com/dashboard
```

### Project
```
Supabase URL: https://zmnhzduscqfgrxxsqoyo.supabase.co
GitHub Repo:  (your-repo-url)
```

---

## 🔑 ENVIRONMENT VARIABLES

### Required Variables
```bash
# For ALL platforms:
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=(get from Supabase Dashboard)
```

### Get Supabase Keys
```
1. Go to: https://supabase.com/dashboard
2. Select project: zmnhzduscqfgrxxsqoyo
3. Settings → API
4. Copy "URL" and "anon public" key
```

---

## ✅ DEPLOYMENT CHECKLIST

### Before Deploy
- [ ] Code pushed to GitHub
- [ ] `npm run build` works locally
- [ ] Have Supabase URL & key ready

### During Deploy
- [ ] Platform: Netlify/Cloudflare/Render
- [ ] Import repository
- [ ] Set environment variables
- [ ] Click deploy

### After Deploy
- [ ] Website loads
- [ ] Admin login works (`/admin-login`)
- [ ] Images display
- [ ] CRUD works

---

## 🔄 GIT WORKFLOW

### Deploy Updates
```bash
# 1. Make changes
# (edit files)

# 2. Test locally
npm run build

# 3. Commit & push
git add .
git commit -m "Update: describe changes"
git push origin main

# 4. Auto-deploy! ✅
# (platform detects push and rebuilds)
```

---

## 🆘 COMMON ERRORS

### Build Failed
```bash
# Solution:
- Check build logs in platform dashboard
- Test locally: npm run build
- Clear cache: Platform → Clear cache & redeploy
```

### Website Blank
```bash
# Solution:
- Check browser console (F12)
- Verify environment variables set
- Check if Supabase URL correct
```

### Login Failed
```bash
# Solution:
- Update Supabase Redirect URLs
- Add: https://your-site.netlify.app/**
- Clear browser cache
```

### Images Broken
```bash
# Solution:
- Check Supabase Storage buckets are PUBLIC
- Test image URL directly in browser
- Re-upload image via admin dashboard
```

**Full troubleshooting**: `/TROUBLESHOOTING_DEPLOY.md`

---

## 💻 CLI DEPLOY

### Netlify CLI
```bash
# Install
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Cloudflare CLI
```bash
# Install
npm install -g wrangler

# Login
wrangler login

# Deploy
npx wrangler pages deploy dist --project-name=ritakartina-blog
```

---

## 🌐 CUSTOM DOMAIN

### Netlify Domain Setup
```
1. Dashboard → Domain settings
2. Add custom domain: ritakartina.com
3. Follow DNS instructions
4. Update registrar:
   - A Record: @ → 75.2.60.5
   - CNAME: www → your-site.netlify.app
5. Wait for SSL (auto-generated)
```

### Update Supabase After Domain
```
1. Supabase Dashboard
2. Authentication → URL Configuration
3. Add redirect URL:
   - https://ritakartina.com/**
   - https://www.ritakartina.com/**
```

---

## 📊 BUILD SETTINGS

### All Platforms Should Have:
```
Framework:         Vite
Build command:     npm run build
Publish directory: dist
Node version:      18
```

### Environment Variables:
```
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=(your-anon-key)
```

---

## 🎯 PLATFORM COMPARISON

| Feature | Netlify | Cloudflare | Render |
|---------|---------|------------|--------|
| **Ease** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Speed** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Free Tier** | 100GB | Unlimited | 100GB |
| **Setup Time** | 5 min | 7 min | 6 min |

**Recommendation**: **Netlify** for ease, **Cloudflare** for speed

---

## 🔧 ROLLBACK

### If New Deployment Breaks:

**Netlify**:
```
Dashboard → Deploys
→ Find working version
→ Click "Publish deploy"
```

**Cloudflare**:
```
Dashboard → Deployments
→ Find working version
→ "Rollback to this deployment"
```

**Git Rollback**:
```bash
git revert HEAD
git push
# Platform auto-redeploys previous version
```

---

## 📈 MONITORING

### Check Website Status
```bash
# Check if site is up
curl -I https://your-site.netlify.app

# Check DNS
nslookup ritakartina.com
```

### Platform Dashboards
- **Netlify**: Build logs, analytics, bandwidth
- **Cloudflare**: Real-time analytics, performance
- **Render**: Deployment history, logs

---

## 💡 PRO TIPS

### Faster Workflow
```bash
# Create alias in ~/.bashrc or ~/.zshrc:
alias deploy="git add . && git commit -m 'Update' && git push"

# Then just:
deploy
# Auto-commits and pushes → triggers deploy!
```

### Branch Previews
```bash
# Create feature branch
git checkout -b feature-new

# Make changes & push
git push origin feature-new

# Netlify/Cloudflare auto-creates preview:
# feature-new--yoursite.netlify.app
```

### Clear Cache
```
If weird issues:
1. Platform dashboard
2. Trigger deploy → Clear cache
3. Redeploy
```

---

## 🎯 SUPPORT LINKS

### Documentation
- **Netlify**: https://docs.netlify.com/
- **Cloudflare**: https://developers.cloudflare.com/pages/
- **Vite**: https://vitejs.dev/guide/static-deploy.html

### Community
- **Netlify**: https://answers.netlify.com/
- **Cloudflare**: https://community.cloudflare.com/
- **Reddit**: r/webdev, r/reactjs

### Tools
- **DNS Checker**: https://www.whatsmydns.net/
- **SSL Checker**: https://www.sslshopper.com/ssl-checker.html
- **PageSpeed**: https://pagespeed.web.dev/

---

## 📞 EMERGENCY

### Website Down?
```bash
1. Check platform status page
2. Check build logs
3. Rollback to previous version
4. Try different platform
```

### Can't Login to Admin?
```bash
1. Check Supabase Redirect URLs
2. Clear browser cache
3. Try incognito mode
4. Check environment variables
```

### Total Failure?
```bash
1. Redeploy from scratch
2. Try different platform
3. Check /TROUBLESHOOTING_DEPLOY.md
```

---

## ✅ SUCCESS CHECKLIST

Website is LIVE when:
- [ ] ✅ URL accessible
- [ ] ✅ All pages load
- [ ] ✅ Images display
- [ ] ✅ Navigation works
- [ ] ✅ Admin login works
- [ ] ✅ Upload works
- [ ] ✅ No console errors
- [ ] ✅ Mobile responsive

---

## 🎉 FINAL COMMAND

### One-Line Deploy Check
```bash
npm install && npm run build && npm run preview && echo "✅ Ready to deploy!"
```

If this works → Deploy with confidence! 🚀

---

## 📝 NOTES SECTION

*(Use this space for your own notes)*

```
Platform chosen: _________________

Deployment URL: _________________

Custom domain: _________________

Deploy date: _________________

Notes:
_________________________________
_________________________________
_________________________________
```

---

**Quick Reference Complete! Save this file for future deployments! 📌**

**Next**: `/DEPLOY_NETLIFY_5_MENIT.md` → Deploy NOW! 🚀
