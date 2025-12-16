# 🚀 DEPLOYMENT COMMAND CHEATSHEET

Quick reference untuk deploy ritakartina.com ke berbagai platform

---

## 📦 PRE-DEPLOYMENT

### Test Build Lokal
```bash
# Install dependencies
npm install

# Test build
npm run build

# Preview production build
npm run preview
```

Jika berhasil → Siap deploy! ✅

---

## 🟢 NETLIFY

### Deploy via CLI
```bash
# Install Netlify CLI (sekali saja)
npm install -g netlify-cli

# Login
netlify login

# Initialize (jika pertama kali)
netlify init

# Deploy ke production
netlify deploy --prod
```

### Deploy via Git
```bash
# Push ke GitHub
git add .
git commit -m "Deploy to Netlify"
git push origin main

# Netlify otomatis detect & deploy!
```

### Useful Commands
```bash
# Check deploy status
netlify status

# Open dashboard
netlify open

# View logs
netlify logs

# Link existing site
netlify link
```

---

## ⚡ CLOUDFLARE PAGES

### Deploy via CLI (Wrangler)
```bash
# Install Wrangler (sekali saja)
npm install -g wrangler

# Login
wrangler login

# Deploy
npx wrangler pages deploy dist --project-name=ritakartina-blog
```

### Deploy via Git
```bash
# Push ke GitHub
git add .
git commit -m "Deploy to Cloudflare"
git push origin main

# Cloudflare otomatis detect & deploy!
```

### Useful Commands
```bash
# Check deployment status
npx wrangler pages deployment list --project-name=ritakartina-blog

# View project info
npx wrangler pages project list

# Tail logs (real-time)
npx wrangler pages deployment tail
```

---

## 🔵 RENDER

### Deploy via Git
```bash
# Push ke GitHub
git add .
git commit -m "Deploy to Render"
git push origin main

# Render otomatis detect & deploy!
```

*Note: Render tidak punya CLI untuk static sites, deploy via dashboard saja*

---

## ⚫ VERCEL (Backup Option)

### Deploy via CLI
```bash
# Install Vercel CLI (sekali saja)
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Deploy via Git
```bash
# Push ke GitHub
git add .
git commit -m "Deploy to Vercel"
git push origin main

# Vercel otomatis detect & deploy!
```

### Useful Commands
```bash
# Check deployments
vercel ls

# View logs
vercel logs

# Remove deployment
vercel rm [deployment-url]
```

---

## 🔄 UPDATE WORKFLOW

### Workflow Normal (Setelah Initial Deploy)
```bash
# 1. Edit files
# (edit App.tsx, components, etc)

# 2. Test locally
npm run dev

# 3. Commit & push
git add .
git commit -m "Update: describe your changes"
git push origin main

# 4. SELESAI! Auto-deploy in 2-3 minutes ✅
```

---

## 🌿 BRANCH WORKFLOW (Advanced)

### Create Feature Branch
```bash
# Buat branch baru
git checkout -b feature-new-section

# Edit files
# (your changes here)

# Commit
git add .
git commit -m "Add new section"

# Push branch
git push origin feature-new-section

# Netlify/Cloudflare akan auto-deploy preview!
# Preview URL: feature-new-section--ritakartina.netlify.app
```

### Merge to Production
```bash
# Setelah test preview OK
git checkout main
git merge feature-new-section
git push origin main

# Production otomatis update!
```

---

## 🛠️ TROUBLESHOOTING COMMANDS

### Clear Build Cache
```bash
# Netlify
netlify build --clear-cache

# Local
rm -rf node_modules dist
npm install
npm run build
```

### Force Redeploy
```bash
# Netlify CLI
netlify deploy --prod --force

# Git (trigger new build)
git commit --allow-empty -m "Trigger rebuild"
git push
```

### View Build Logs
```bash
# Netlify
netlify logs:deploy

# Or check dashboard
netlify open
```

---

## 🔐 ENVIRONMENT VARIABLES

### Set via CLI

#### Netlify
```bash
# Set variable
netlify env:set VITE_SUPABASE_URL "https://zmnhzduscqfgrxxsqoyo.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key"

# List all variables
netlify env:list

# Get specific variable
netlify env:get VITE_SUPABASE_URL
```

#### Cloudflare (Wrangler)
```bash
# Set via dashboard lebih mudah
# Or edit wrangler.toml:

[env.production]
VITE_SUPABASE_URL = "https://zmnhzduscqfgrxxsqoyo.supabase.co"
VITE_SUPABASE_ANON_KEY = "your-anon-key"
```

---

## 📊 MONITORING COMMANDS

### Check Site Status
```bash
# Netlify
netlify status

# Check uptime
curl -I https://your-site.netlify.app
```

### Performance Test
```bash
# Lighthouse CI
npm install -g @lhci/cli

# Run audit
lhci autorun --url=https://your-site.netlify.app
```

---

## 🔙 ROLLBACK

### Netlify
```bash
# Via CLI
netlify rollback

# Or via dashboard
netlify open
# → Deploys → Click old deploy → "Publish deploy"
```

### Cloudflare
```bash
# Via dashboard only
# Go to Deployments → Click old deployment → "Rollback to this deployment"
```

---

## 🗑️ CLEANUP COMMANDS

### Remove Old Deployments
```bash
# Netlify (via dashboard)
netlify open
# → Deploys → ... menu → Delete deploy

# Git cleanup (remove merged branches)
git branch --merged | grep -v "main" | xargs git branch -d
```

---

## 📱 MOBILE TESTING

### Test on Mobile Devices
```bash
# Run dev server with network access
npm run dev -- --host

# Access from phone:
# http://YOUR_LOCAL_IP:3000
# (find IP: ipconfig on Windows, ifconfig on Mac/Linux)
```

---

## 🎯 ONE-LINER DEPLOY

### Quick Deploy to Netlify
```bash
git add . && git commit -m "Update $(date +%Y-%m-%d)" && git push && echo "✅ Deploying to Netlify..."
```

### Quick Deploy to Cloudflare
```bash
npm run build && npx wrangler pages deploy dist --project-name=ritakartina-blog
```

---

## 📋 CHECKLIST COMMANDS

### Before Deploy
```bash
# 1. Check Git status
git status

# 2. Test build
npm run build

# 3. Preview
npm run preview

# 4. Check for errors
npm run build 2>&1 | grep -i "error"
```

### After Deploy
```bash
# 1. Check if site is up
curl -I https://your-site.netlify.app

# 2. Test Supabase connection
# Open browser dev tools → Check console for errors

# 3. View deployment
netlify open:site
```

---

## 🆘 EMERGENCY COMMANDS

### Site Down? Quick Fix!
```bash
# 1. Check if build failed
netlify logs:deploy

# 2. Rollback to last working version
netlify rollback

# 3. If still down, redeploy
git commit --allow-empty -m "Emergency redeploy"
git push

# 4. Clear cache and rebuild
netlify build --clear-cache
netlify deploy --prod
```

---

## 💡 PRO TIPS

### Alias untuk Git + Deploy
Tambahkan ke `~/.bashrc` atau `~/.zshrc`:
```bash
# Quick deploy alias
alias deploy="git add . && git commit -m 'Update' && git push"

# Quick build check
alias checkbuild="npm run build && echo '✅ Build OK!'"

# Open Netlify
alias web="netlify open:site"
```

Lalu:
```bash
source ~/.bashrc  # reload
deploy            # instant deploy!
```

---

## 🔗 QUICK LINKS

```bash
# Open Netlify dashboard
netlify open

# Open site
netlify open:site

# Open admin page
netlify open:admin

# Open deployed site
open https://your-site.netlify.app/admin-login
```

---

## 📝 COMMIT MESSAGE TEMPLATES

### Good Commit Messages
```bash
git commit -m "feat: Add new blog section"
git commit -m "fix: Resolve image upload issue"
git commit -m "style: Update header design"
git commit -m "docs: Update README"
git commit -m "refactor: Optimize Supabase queries"
```

---

## 🎉 SUMMARY

**Paling Mudah → Netlify:**
```bash
netlify login
netlify deploy --prod
```

**Paling Cepat → Cloudflare:**
```bash
wrangler login
npx wrangler pages deploy dist --project-name=ritakartina-blog
```

**Paling Simple → Git Push:**
```bash
git push  # Auto-deploy enabled! ✨
```

---

**Pilih yang paling nyaman untuk workflow Anda!** 🚀
