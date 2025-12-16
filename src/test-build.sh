#!/bin/bash

echo "🔍 Testing Build Configuration..."
echo ""

echo "📦 Installing dependencies..."
npm install
echo ""

echo "🏗️  Building project..."
npm run build
echo ""

if [ -d "dist" ]; then
    echo "✅ SUCCESS! Folder dist berhasil dibuat"
    echo ""
    echo "📁 Contents of dist folder:"
    ls -lah dist/
    echo ""
    echo "📄 Files in dist:"
    find dist -type f
    echo ""
    echo "🎉 Build sukses! Siap deploy ke Vercel!"
else
    echo "❌ ERROR! Folder dist tidak ditemukan"
    echo "Periksa error message di atas"
fi
