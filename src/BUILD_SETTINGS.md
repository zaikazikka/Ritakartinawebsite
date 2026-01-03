# ⚙️ BUILD SETTINGS - COPY PASTE EXACT!

**Error yang Anda dapat:**
```
/bin/sh: 1: dist: not found
Failed: error occurred while running deploy command
```

**Penyebab:**
Platform salah interpret "dist" sebagai **command** bukannya **output directory**!

---

## ✅ SOLUSI: COPY SETTINGS INI EXACT!

### 🟠 CLOUDFLARE PAGES

**Framework preset:** 
```
Vite
```

**Build command:** 
```
npm run build
```

**Build output directory:** 
```
dist
```

**Root directory:**
```
(leave blank or /)
```

**⚠️ PENTING:** 
- Jangan ketik di field yang salah!
- "dist" goes in **"Build output directory"** field
- NOT in "Build command" field!

---

### 🔷 NETLIFY

**Build command:**
```
npm run build
```

**Publish directory:**
```
dist
```

**⚠️ ATAU use `netlify.toml`** (sudah saya buat):
```toml
[build]
  command = "npm run build"
  publish = "dist"
```

---

### ▲ VERCEL

**Framework Preset:**
```
Vite
```

**Build Command (OVERRIDE!):**
```
npm run build
```

**Output Directory (OVERRIDE!):**
```
dist
```

**Install Command:**
```
npm install
```

**⚠️ ATAU use `vercel.json`** (sudah saya buat):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

---

## 🎯 COMMON MISTAKES (HINDARI!)

### ❌ SALAH:

**Build Command field:**
```
dist   ← SALAH! Ini bukan command!
```

**Build Command field:**
```
npm run build && dist   ← SALAH!
```

---

### ✅ BENAR:

**Build Command field:**
```
npm run build   ← BENAR!
```

**Output Directory field:**
```
dist   ← BENAR! Put "dist" HERE!
```

---

## 🔍 WHERE TO PUT WHAT

### Cloudflare Dashboard:

```
┌─────────────────────────────────────────┐
│ Framework preset                        │
│ [Vite                            ▼]    │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Build command                           │
│ [npm run build                     ]    │  ← Put command HERE
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ Build output directory                  │
│ [dist                              ]    │  ← Put "dist" HERE
└─────────────────────────────────────────┘
```

---

## 📋 STEP-BY-STEP FIX

### IF YOU'RE ON CLOUDFLARE:

**1. Go to deployment settings**
- Dashboard → Workers & Pages
- Select your project
- Settings → Builds & deployments
- **Edit configuration**

**2. Clear ALL fields first!**

**3. Fill EXACT:**

| Field | Value |
|-------|-------|
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | (blank) |

**4. Environment Variables:**

Click "Add variable" (2x):

```
VITE_SUPABASE_URL
https://zmnhzduscqfgrxxsqoyo.supabase.co
```

```
VITE_SUPABASE_ANON_KEY
[your-anon-key]
```

**5. Save and Redeploy**

---

### IF YOU'RE ON NETLIFY:

**Option A: Use netlify.toml (Recommended!)**

File `netlify.toml` sudah saya buat! Just:

```bash
git add netlify.toml
git commit -m "Add Netlify config"
git push origin main
```

Netlify akan auto-detect!

**Option B: Manual settings**

Dashboard → Site settings → Build & deploy → Edit settings

```
Build command: npm run build
Publish directory: dist
```

---

### IF YOU'RE ON VERCEL:

**Option A: Use vercel.json (Recommended!)**

File `vercel.json` sudah saya buat! Just:

```bash
git add vercel.json
git commit -m "Add Vercel config"
git push origin main
```

**Option B: Manual Override**

Dashboard → Project Settings → General

**Build & Development Settings:**

Click **"Override"** for each:

```
Framework Preset: Vite
Build Command: npm run build (Override: ON)
Output Directory: dist (Override: ON)
Install Command: npm install
```

---

## 🚀 QUICK FIX NOW

**1. Commit config files:**

```bash
git add .gitignore netlify.toml vercel.json wrangler.toml public/_redirects
git commit -m "Add explicit build configs"
git push origin main
```

**2. Go to platform dashboard**

**3. Settings → Build configuration**

**4. Copy settings EXACT dari atas!**

**5. Redeploy**

---

## ✅ VERIFICATION

After config correct, build logs should show:

```
✓ Cloning repository
✓ Installing dependencies
  npm install
  
✓ Building
  npm run build
  
  vite v5.1.0 building for production...
  dist/index.html                  0.52 kB
  dist/assets/index-xxx.css       23.45 kB
  dist/assets/index-xxx.js       234.56 kB
  ✓ built in 15s
  
✓ Deploying
  Uploading dist/ folder
  
✓ Success!
  https://your-site.pages.dev
```

**NO MORE "dist: not found" ERROR!**

---

## 💡 WHY THIS ERROR HAPPENED

**What you probably did:**

In platform dashboard, you put "dist" in **Build Command** field:

```
Build command: dist          ← WRONG FIELD!
Output directory: (empty)
```

Platform tried to execute:
```bash
/bin/sh -c "dist"
```

But `dist` is not a command! It's a folder name!

**Correct way:**

```
Build command: npm run build    ← COMMAND HERE
Output directory: dist          ← FOLDER NAME HERE
```

---

## 🎯 SUMMARY

**The Fix:**
1. ✅ Created `.gitignore`
2. ✅ Created `netlify.toml`
3. ✅ Created `vercel.json`
4. ✅ Created `wrangler.toml`
5. ✅ Created `public/_redirects`

**What to do:**
1. Commit config files
2. Push to GitHub
3. Update platform settings (COPY EXACT dari guide!)
4. Redeploy

**Expected result:**
✅ Build succeeds
✅ Website live!

---

**GO FIX IT NOW!** 🚀
