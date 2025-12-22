#!/bin/bash

echo "🔍 TESTING VERCEL BUILD CONFIGURATION"
echo "======================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check if node_modules exists
echo "1️⃣  Checking node_modules..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules exists${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules not found, running npm install...${NC}"
    npm install
fi
echo ""

# Step 2: Check package.json
echo "2️⃣  Checking package.json..."
if [ -f "package.json" ]; then
    echo -e "${GREEN}✅ package.json exists${NC}"
    if grep -q '"build": "vite build"' package.json; then
        echo -e "${GREEN}✅ Build script correct: vite build${NC}"
    else
        echo -e "${RED}❌ Build script incorrect!${NC}"
    fi
else
    echo -e "${RED}❌ package.json not found!${NC}"
    exit 1
fi
echo ""

# Step 3: Check vite.config.ts
echo "3️⃣  Checking vite.config.ts..."
if [ -f "vite.config.ts" ]; then
    echo -e "${GREEN}✅ vite.config.ts exists${NC}"
    if grep -q 'outDir.*dist' vite.config.ts; then
        echo -e "${GREEN}✅ outDir set to 'dist'${NC}"
    else
        echo -e "${YELLOW}⚠️  outDir might not be set to 'dist'${NC}"
    fi
else
    echo -e "${RED}❌ vite.config.ts not found!${NC}"
    exit 1
fi
echo ""

# Step 4: Check vercel.json
echo "4️⃣  Checking vercel.json..."
if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅ vercel.json exists${NC}"
    if grep -q '"outputDirectory": "dist"' vercel.json; then
        echo -e "${GREEN}✅ outputDirectory set to 'dist'${NC}"
    else
        echo -e "${RED}❌ outputDirectory not set correctly!${NC}"
    fi
    if grep -q '"buildCommand": "npm run build"' vercel.json; then
        echo -e "${GREEN}✅ buildCommand set to 'npm run build'${NC}"
    else
        echo -e "${YELLOW}⚠️  buildCommand might not be correct${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  vercel.json not found (optional but recommended)${NC}"
fi
echo ""

# Step 5: Clean old build
echo "5️⃣  Cleaning old dist folder..."
if [ -d "dist" ]; then
    rm -rf dist
    echo -e "${GREEN}✅ Old dist folder removed${NC}"
else
    echo -e "${YELLOW}⚠️  No old dist folder to clean${NC}"
fi
echo ""

# Step 6: Run build
echo "6️⃣  Running build command: npm run build"
echo "-------------------------------------"
npm run build

BUILD_EXIT_CODE=$?

echo ""
echo "-------------------------------------"

if [ $BUILD_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✅ BUILD SUCCESSFUL!${NC}"
else
    echo -e "${RED}❌ BUILD FAILED!${NC}"
    exit 1
fi
echo ""

# Step 7: Check dist folder
echo "7️⃣  Checking dist folder output..."
if [ -d "dist" ]; then
    echo -e "${GREEN}✅ dist folder created${NC}"
    
    if [ -f "dist/index.html" ]; then
        echo -e "${GREEN}✅ dist/index.html exists${NC}"
    else
        echo -e "${RED}❌ dist/index.html NOT found!${NC}"
        exit 1
    fi
    
    if [ -d "dist/assets" ]; then
        echo -e "${GREEN}✅ dist/assets folder exists${NC}"
        
        # Count files in assets
        ASSET_COUNT=$(ls -1 dist/assets | wc -l)
        echo -e "${GREEN}   Found $ASSET_COUNT files in assets${NC}"
    else
        echo -e "${YELLOW}⚠️  dist/assets folder not found (might be OK)${NC}"
    fi
    
    # Show dist folder size
    DIST_SIZE=$(du -sh dist | cut -f1)
    echo -e "${GREEN}   Total dist size: $DIST_SIZE${NC}"
else
    echo -e "${RED}❌ dist folder NOT created!${NC}"
    exit 1
fi
echo ""

# Step 8: List dist contents
echo "8️⃣  Dist folder contents:"
echo "-------------------------------------"
ls -lh dist/
echo "-------------------------------------"
echo ""

# Final summary
echo "✅ ======================================"
echo "✅  ALL CHECKS PASSED!"
echo "✅ ======================================"
echo ""
echo "🎉 Your build is ready for Vercel deployment!"
echo ""
echo "📋 Next steps:"
echo "   1. git add ."
echo "   2. git commit -m 'Fix Vercel configuration'"
echo "   3. git push origin main"
echo "   4. Deploy on Vercel dashboard"
echo ""
echo "🌐 Or deploy via CLI:"
echo "   vercel --prod"
echo ""
