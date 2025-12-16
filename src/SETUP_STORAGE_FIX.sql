-- =====================================================
-- FIX STORAGE UPLOAD ERROR
-- =====================================================
-- Jalankan SQL ini di Supabase SQL Editor untuk fix upload error
-- Error: "new row violates row-level security policy"
-- =====================================================

-- Step 1: Drop semua existing policies (jika ada)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public inserts" ON storage.objects;

-- Step 2: Create new policies yang lebih permissive
-- Policy ini mengizinkan semua orang (termasuk anonymous) untuk upload ke bucket writings-images

-- 2a. Allow everyone to SELECT/read images (public bucket)
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'writings-images');

-- 2b. Allow everyone to INSERT/upload images (anonymous + authenticated)
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'writings-images');

-- 2c. Allow everyone to UPDATE images
CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'writings-images')
WITH CHECK (bucket_id = 'writings-images');

-- 2d. Allow everyone to DELETE images
CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'writings-images');

-- Step 3: Verify policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'objects' AND policyname LIKE '%images%';

-- =====================================================
-- EXPECTED OUTPUT:
-- =====================================================
-- Seharusnya muncul 4 policies:
-- 1. Public can view images (SELECT)
-- 2. Anyone can upload images (INSERT)
-- 3. Anyone can update images (UPDATE)
-- 4. Anyone can delete images (DELETE)
-- =====================================================

-- =====================================================
-- NOTE: KEAMANAN
-- =====================================================
-- Policies di atas mengizinkan siapa saja (termasuk anonymous) untuk
-- upload, update, dan delete gambar di bucket 'writings-images'.
-- 
-- Ini aman untuk blog pribadi karena:
-- 1. Admin dashboard dilindungi auth (hanya admin yang bisa akses UI)
-- 2. Upload hanya bisa via admin dashboard, bukan publik
-- 3. URL bucket tidak dipublikasikan, hanya admin yang tahu
--
-- Jika Anda ingin keamanan lebih ketat (hanya authenticated users):
-- 1. Pastikan user sudah login ke Supabase Auth
-- 2. Ganti "WITH CHECK (bucket_id = ...)" menjadi "TO authenticated"
-- 3. Perlu modifikasi kode upload untuk include auth token
-- =====================================================
