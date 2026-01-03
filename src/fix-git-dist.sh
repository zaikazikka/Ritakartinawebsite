#!/bin/bash

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  🔧 FIX GIT DIST ISSUE                                        ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "This script will:"
echo "  1. Remove dist/ from Git tracking"
echo "  2. Remove node_modules/ from Git tracking"
echo "  3. Ensure .gitignore is working"
echo "  4. Create a clean commit"
echo ""

read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
  echo "Aborted."
  exit 1
fi

echo ""
echo "🧹 Step 1: Removing dist/ from Git..."
echo "─────────────────────────────────────"

if git ls-files | grep -q "^dist/"; then
  git rm -rf dist --cached
  echo -e "${GREEN}✓${NC} dist/ removed from Git tracking"
else
  echo -e "${YELLOW}ℹ${NC} dist/ not tracked by Git (good!)"
fi

echo ""
echo "🧹 Step 2: Removing node_modules/ from Git..."
echo "─────────────────────────────────────"

if git ls-files | grep -q "^node_modules/"; then
  git rm -rf node_modules --cached
  echo -e "${GREEN}✓${NC} node_modules/ removed from Git tracking"
else
  echo -e "${YELLOW}ℹ${NC} node_modules/ not tracked by Git (good!)"
fi

echo ""
echo "📋 Step 3: Verifying .gitignore..."
echo "─────────────────────────────────────"

if [ -f ".gitignore" ]; then
  if grep -q "^dist" .gitignore && grep -q "^node_modules" .gitignore; then
    echo -e "${GREEN}✓${NC} .gitignore properly configured"
  else
    echo -e "${YELLOW}⚠${NC} .gitignore needs updating"
    
    # Add dist and node_modules if missing
    grep -q "^dist" .gitignore || echo "dist" >> .gitignore
    grep -q "^node_modules" .gitignore || echo "node_modules" >> .gitignore
    
    echo -e "${GREEN}✓${NC} .gitignore updated"
  fi
else
  echo -e "${RED}✗${NC} .gitignore missing!"
  exit 1
fi

echo ""
echo "📦 Step 4: Creating clean commit..."
echo "─────────────────────────────────────"

# Stage .gitignore
git add .gitignore

# Check if there are changes to commit
if git diff --cached --quiet; then
  echo -e "${YELLOW}ℹ${NC} No changes to commit (already clean!)"
else
  git commit -m "Remove dist and node_modules from Git tracking"
  echo -e "${GREEN}✓${NC} Changes committed"
fi

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║  ✅ GIT CLEANUP COMPLETE                                      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo "What was done:"
echo "  ✓ dist/ removed from Git (if tracked)"
echo "  ✓ node_modules/ removed from Git (if tracked)"
echo "  ✓ .gitignore verified/updated"
echo "  ✓ Changes committed"
echo ""

echo "Next steps:"
echo "  1. Run: ./test-build-final.sh"
echo "  2. If test passes:"
echo "     git push origin main"
echo "  3. Deploy to Cloudflare/Netlify"
echo ""

echo -e "${GREEN}🚀 Ready for deployment!${NC}"
echo ""
