# 📋 COMMAND REFERENCE - Copy & Paste Ready

Semua command yang Anda butuhkan untuk deployment!

---

## 🧪 LOCAL TESTING

### Install Dependencies
```bash
npm install
```

### Build Project
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

### Development Server
```bash
npm run dev
```

### Check Dist Folder
```bash
ls -la dist/
```

### Check Dist Contents
```bash
find dist -type f
```

### Test Build Script
```bash
bash test-build.sh
```

---

## 📦 GIT COMMANDS

### Check Status
```bash
git status
```

### Add All Changes
```bash
git add .
```

### Commit Changes
```bash
git commit -m "Deploy: Vercel configuration ready"
```

### Push to GitHub
```bash
git push origin main
```

### Check Current Branch
```bash
git branch
```

### Create New Branch
```bash
git checkout -b deployment-fix
```

---

## 🚀 VERCEL CLI

### Install Vercel CLI
```bash
npm i -g vercel
```

### Login to Vercel
```bash
vercel login
```

### Deploy (Development)
```bash
vercel
```

### Deploy to Production
```bash
vercel --prod
```

### List Deployments
```bash
vercel ls
```

### Check Project Info
```bash
vercel project ls
```

### Remove Deployment
```bash
vercel rm [deployment-url]
```

---

## 🔧 TROUBLESHOOTING COMMANDS

### Clear Node Modules & Reinstall
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### Force Rebuild
```bash
npm run build --force
```

### Check Node Version
```bash
node -v
```

### Check NPM Version
```bash
npm -v
```

### Clear NPM Cache
```bash
npm cache clean --force
```

### Check Build Output Size
```bash
du -sh dist/
```

### Check Detailed Dist Size
```bash
du -h dist/
```

---

## 📊 VERCEL PROJECT SETUP

### Initialize Vercel Project
```bash
vercel init
```

### Link to Existing Project
```bash
vercel link
```

### Pull Environment Variables
```bash
vercel env pull
```

### Add Environment Variable (CLI)
```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

---

## 🧹 CLEANUP COMMANDS

### Remove Dist Folder
```bash
rm -rf dist
```

### Remove Build Files
```bash
rm -rf dist
rm -rf node_modules/.vite
```

### Git Clean
```bash
git clean -fd
```

---

## 🔍 DEBUGGING COMMANDS

### Check TypeScript Errors
```bash
npx tsc --noEmit
```

### Vite Build with Debug
```bash
DEBUG=vite:* npm run build
```

### Check Vite Config
```bash
npx vite --help
```

### Show Build Info
```bash
npm run build -- --debug
```

---

## 📁 FILE OPERATIONS

### View tsconfig.json
```bash
cat tsconfig.json
```

### View vercel.json
```bash
cat vercel.json
```

### View package.json
```bash
cat package.json
```

### View vite.config.ts
```bash
cat vite.config.ts
```

### Create .env.local
```bash
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://zmnhzduscqfgrxxsqoyo.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
EOF
```

---

## 🌐 DOMAIN SETUP

### Verify DNS
```bash
dig ritakartina.com
```

### Check DNS Propagation
```bash
nslookup ritakartina.com
```

### Test SSL Certificate
```bash
curl -I https://ritakartina.com
```

---

## 📈 MONITORING

### Check Deployment Status
```bash
vercel inspect [deployment-url]
```

### View Logs
```bash
vercel logs [deployment-url]
```

### Monitor Build
```bash
vercel logs --follow
```

---

## 🔐 ENVIRONMENT VARIABLES

### List All Env Variables
```bash
vercel env ls
```

### Pull Production Env
```bash
vercel env pull .env.production
```

### Add Environment Variable
```bash
# Interactive mode
vercel env add
```

---

## 📦 PACKAGE MANAGEMENT

### Update All Dependencies
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

### Install Specific Version
```bash
npm install vite@5.1.0
```

### List Installed Packages
```bash
npm list --depth=0
```

---

## 🧪 QUICK TEST SEQUENCE

Complete test before deployment:

```bash
# 1. Clean install
rm -rf node_modules dist
npm install

# 2. Build
npm run build

# 3. Check output
ls -la dist/

# 4. Preview
npm run preview

# 5. Commit & push
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## 🚀 QUICK DEPLOY SEQUENCE

Complete deployment in one go:

```bash
# Local test
npm run build

# Git push
git add .
git commit -m "Deploy: $(date +%Y%m%d-%H%M%S)"
git push origin main

# Vercel deploy
vercel --prod
```

---

## 📋 ONE-LINER COMMANDS

### Build & Preview
```bash
npm run build && npm run preview
```

### Clean & Build
```bash
rm -rf dist && npm run build
```

### Install & Build
```bash
npm install && npm run build
```

### Build & Check Size
```bash
npm run build && du -sh dist/
```

### Git Add, Commit, Push
```bash
git add . && git commit -m "Update" && git push
```

---

## 🎯 MOST USED COMMANDS

Untuk copy-paste cepat:

```bash
# Test build
npm run build

# Push code
git add . && git commit -m "Update" && git push

# Deploy to Vercel
vercel --prod
```

---

## 💡 TIPS

### Create Alias for Common Commands

Add to `~/.bashrc` or `~/.zshrc`:

```bash
# Deployment aliases
alias build='npm run build'
alias deploy='npm run build && vercel --prod'
alias gpush='git add . && git commit -m "Update" && git push'
alias dev='npm run dev'
```

Reload:
```bash
source ~/.bashrc  # or ~/.zshrc
```

Usage:
```bash
build   # Instead of npm run build
deploy  # Build and deploy in one command
gpush   # Quick git push
dev     # Start dev server
```

---

## 📞 HELP COMMANDS

### NPM Help
```bash
npm help
npm help scripts
```

### Vercel Help
```bash
vercel --help
vercel deploy --help
```

### Vite Help
```bash
npx vite --help
```

### Git Help
```bash
git --help
git commit --help
```

---

**COPY COMMAND YANG ANDA BUTUHKAN DAN PASTE DI TERMINAL! 🚀**
