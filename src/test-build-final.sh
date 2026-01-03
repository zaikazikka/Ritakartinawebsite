#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🔍 FINAL BUILD TEST - Diagnosis Lengkap                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check required files
echo "📋 STEP 1: Checking required files..."
echo "─────────────────────────────────────"

REQUIRED_FILES=(
  "package.json"
  "vite.config.ts"
  "index.html"
  "main.tsx"
  "App.tsx"
  ".gitignore"
)

MISSING_FILES=0

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✓${NC} $file"
  else
    echo -e "${RED}✗${NC} $file ${RED}MISSING!${NC}"
    ((MISSING_FILES++))
  fi
done

echo ""

if [ $MISSING_FILES -gt 0 ]; then
  echo -e "${RED}❌ ERROR: $MISSING_FILES required files missing!${NC}"
  exit 1
fi

echo -e "${GREEN}✅ All required files present${NC}"
echo ""

# Step 2: Check .gitignore includes dist
echo "📋 STEP 2: Checking .gitignore..."
echo "─────────────────────────────────────"

if grep -q "^dist" .gitignore; then
  echo -e "${GREEN}✓${NC} .gitignore includes 'dist'"
else
  echo -e "${RED}✗${NC} .gitignore missing 'dist' entry!"
  exit 1
fi

if grep -q "^node_modules" .gitignore; then
  echo -e "${GREEN}✓${NC} .gitignore includes 'node_modules'"
else
  echo -e "${RED}✗${NC} .gitignore missing 'node_modules' entry!"
  exit 1
fi

echo -e "${GREEN}✅ .gitignore configured correctly${NC}"
echo ""

# Step 3: Check vite.config.ts
echo "📋 STEP 3: Checking vite.config.ts..."
echo "─────────────────────────────────────"

if grep -q "outDir.*dist" vite.config.ts; then
  echo -e "${GREEN}✓${NC} vite.config.ts has outDir: 'dist'"
else
  echo -e "${RED}✗${NC} vite.config.ts missing outDir!"
  exit 1
fi

echo -e "${GREEN}✅ vite.config.ts configured correctly${NC}"
echo ""

# Step 4: Check package.json
echo "📋 STEP 4: Checking package.json..."
echo "─────────────────────────────────────"

if grep -q '"build".*"vite build"' package.json; then
  echo -e "${GREEN}✓${NC} package.json has build script"
else
  echo -e "${RED}✗${NC} package.json missing build script!"
  exit 1
fi

echo -e "${GREEN}✅ package.json configured correctly${NC}"
echo ""

# Step 5: Clean old build
echo "📋 STEP 5: Cleaning old build..."
echo "─────────────────────────────────────"

if [ -d "dist" ]; then
  echo "Removing old dist/ directory..."
  rm -rf dist
  echo -e "${GREEN}✓${NC} Old dist/ removed"
else
  echo -e "${YELLOW}ℹ${NC} No old dist/ to remove"
fi

if [ -d "node_modules/.vite" ]; then
  echo "Removing Vite cache..."
  rm -rf node_modules/.vite
  echo -e "${GREEN}✓${NC} Vite cache cleared"
fi

echo -e "${GREEN}✅ Cleanup complete${NC}"
echo ""

# Step 6: Check if dist is in Git
echo "📋 STEP 6: Checking Git status..."
echo "─────────────────────────────────────"

if git ls-files | grep -q "^dist/"; then
  echo -e "${RED}⚠ WARNING: dist/ is tracked by Git!${NC}"
  echo "This will cause deployment issues!"
  echo ""
  echo "Run this to fix:"
  echo -e "${YELLOW}git rm -rf dist --cached${NC}"
  echo -e "${YELLOW}git commit -m 'Remove dist from git'${NC}"
  echo ""
else
  echo -e "${GREEN}✓${NC} dist/ not tracked by Git"
fi

echo ""

# Step 7: Run build
echo "📋 STEP 7: Running build..."
echo "─────────────────────────────────────"
echo ""

npm run build

BUILD_EXIT_CODE=$?

echo ""
echo "─────────────────────────────────────"

if [ $BUILD_EXIT_CODE -ne 0 ]; then
  echo -e "${RED}❌ BUILD FAILED!${NC}"
  echo ""
  echo "Check errors above and fix them."
  exit 1
fi

echo -e "${GREEN}✓${NC} Build completed successfully"
echo ""

# Step 8: Verify dist directory
echo "📋 STEP 8: Verifying output..."
echo "─────────────────────────────────────"

if [ ! -d "dist" ]; then
  echo -e "${RED}❌ ERROR: dist/ directory not created!${NC}"
  exit 1
fi

echo -e "${GREEN}✓${NC} dist/ directory exists"
echo ""

# Check for index.html
if [ -f "dist/index.html" ]; then
  echo -e "${GREEN}✓${NC} dist/index.html exists"
else
  echo -e "${RED}✗${NC} dist/index.html MISSING!"
  exit 1
fi

# Check for assets
if [ -d "dist/assets" ]; then
  echo -e "${GREEN}✓${NC} dist/assets/ directory exists"
  
  JS_COUNT=$(find dist/assets -name "*.js" | wc -l)
  CSS_COUNT=$(find dist/assets -name "*.css" | wc -l)
  
  echo "  - JavaScript files: $JS_COUNT"
  echo "  - CSS files: $CSS_COUNT"
  
  if [ $JS_COUNT -eq 0 ]; then
    echo -e "${RED}⚠ WARNING: No JavaScript files found!${NC}"
  fi
else
  echo -e "${YELLOW}ℹ${NC} dist/assets/ not found (might be okay)"
fi

echo ""

# Step 9: Show dist contents
echo "📋 STEP 9: dist/ contents:"
echo "─────────────────────────────────────"
ls -lah dist/
echo ""

# Step 10: Final summary
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ BUILD TEST COMPLETE - RESULTS                             ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

DIST_SIZE=$(du -sh dist | cut -f1)

echo -e "${GREEN}✅ ALL CHECKS PASSED!${NC}"
echo ""
echo "📦 Build output:"
echo "   Location: ./dist/"
echo "   Size: $DIST_SIZE"
echo "   Files: $(find dist -type f | wc -l)"
echo ""
echo "🚀 READY FOR DEPLOYMENT!"
echo ""
echo "Next steps:"
echo "  1. git add ."
echo "  2. git commit -m 'Ready for deployment'"
echo "  3. git push origin main"
echo "  4. Deploy to Cloudflare/Netlify/Vercel"
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  Platform recommendations:                                     ║"
echo "║  🥇 Cloudflare Pages (easiest)                                 ║"
echo "║  🥈 Netlify (reliable)                                         ║"
echo "║  🥉 Vercel (if you must)                                       ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
