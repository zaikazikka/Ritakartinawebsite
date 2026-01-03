#!/bin/bash

echo "🧹 CLEANING UP UNNECESSARY DOCUMENTATION FILES..."
echo ""

# List of doc files to keep
KEEP_FILES=(
  "README.md"
  "CARA_PAKAI.md"
)

# Count files to delete
DELETE_COUNT=0

# Delete all .md files except the ones we want to keep
for file in *.md; do
  if [[ ! " ${KEEP_FILES[@]} " =~ " ${file} " ]]; then
    if [ -f "$file" ]; then
      echo "Deleting: $file"
      rm "$file"
      ((DELETE_COUNT++))
    fi
  fi
done

echo ""
echo "✅ Deleted $DELETE_COUNT documentation files"
echo "✅ Kept: README.md and CARA_PAKAI.md"
echo ""
echo "🧹 Cleaning other config files..."

# Delete old test scripts
rm -f test-build.sh test-vercel-build.sh

# Delete platform configs we don't need
rm -f netlify.toml render.yaml wrangler.toml

echo "✅ Cleanup complete!"
echo ""
echo "📂 Remaining files:"
ls -1 *.md 2>/dev/null || echo "  (no .md files)"
ls -1 *.toml 2>/dev/null || echo "  (no .toml files)"
ls -1 *.yaml 2>/dev/null || echo "  (no .yaml files)"
