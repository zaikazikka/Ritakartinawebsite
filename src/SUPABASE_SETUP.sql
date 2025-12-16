-- ============================================
-- SUPABASE SETUP SCRIPT untuk RitaKartina.com
-- ============================================
-- Project: Blog Dr. Rita Kartina, S.H., M.H., M.AP.
-- Database: PostgreSQL (Supabase)
-- 
-- CARA MENJALANKAN:
-- 1. Login ke https://supabase.com/dashboard
-- 2. Pilih project: zmnhzduscqfgrxxsqoyo
-- 3. Buka SQL Editor (icon </> di sidebar kiri)
-- 4. Copy-paste script ini
-- 5. Klik "Run" atau tekan Ctrl+Enter
-- ============================================

-- ============================================
-- 1. CREATE KV_STORE TABLE
-- ============================================
-- Table untuk menyimpan data blog (artikel, buku, berita, karya tulis)
-- Struktur key-value memberikan fleksibilitas tinggi

CREATE TABLE IF NOT EXISTS public.kv_store_46c3d36c (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index untuk mempercepat query dengan prefix (contoh: "artikel:", "buku:", dll)
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix ON public.kv_store_46c3d36c (key text_pattern_ops);

-- Index untuk mempercepat query berdasarkan waktu
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at ON public.kv_store_46c3d36c (created_at DESC);

-- Trigger untuk auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_kv_store_updated_at ON public.kv_store_46c3d36c;
CREATE TRIGGER update_kv_store_updated_at
    BEFORE UPDATE ON public.kv_store_46c3d36c
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 2. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================
ALTER TABLE public.kv_store_46c3d36c ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca (untuk public blog)
DROP POLICY IF EXISTS "Allow public read access" ON public.kv_store_46c3d36c;
CREATE POLICY "Allow public read access" 
    ON public.kv_store_46c3d36c
    FOR SELECT
    USING (true);

-- Policy: Hanya authenticated users yang bisa INSERT/UPDATE/DELETE
-- (untuk Admin Dashboard)
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.kv_store_46c3d36c;
CREATE POLICY "Allow authenticated insert" 
    ON public.kv_store_46c3d36c
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated update" ON public.kv_store_46c3d36c;
CREATE POLICY "Allow authenticated update" 
    ON public.kv_store_46c3d36c
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated delete" ON public.kv_store_46c3d36c;
CREATE POLICY "Allow authenticated delete" 
    ON public.kv_store_46c3d36c
    FOR DELETE
    TO authenticated
    USING (true);

-- ============================================
-- 3. CREATE STORAGE BUCKET
-- ============================================
-- Bucket untuk menyimpan gambar artikel, buku, berita, karya tulis

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'writings-images',
    'writings-images',
    true,
    5242880, -- 5MB max file size
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. STORAGE BUCKET POLICIES
-- ============================================

-- Policy: Semua orang bisa membaca gambar (public bucket)
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
CREATE POLICY "Allow public read access"
    ON storage.objects
    FOR SELECT
    USING (bucket_id = 'writings-images');

-- Policy: Authenticated users bisa upload gambar
DROP POLICY IF EXISTS "Allow authenticated upload" ON storage.objects;
CREATE POLICY "Allow authenticated upload"
    ON storage.objects
    FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'writings-images');

-- Policy: Authenticated users bisa update gambar
DROP POLICY IF EXISTS "Allow authenticated update" ON storage.objects;
CREATE POLICY "Allow authenticated update"
    ON storage.objects
    FOR UPDATE
    TO authenticated
    USING (bucket_id = 'writings-images')
    WITH CHECK (bucket_id = 'writings-images');

-- Policy: Authenticated users bisa delete gambar
DROP POLICY IF EXISTS "Allow authenticated delete" ON storage.objects;
CREATE POLICY "Allow authenticated delete"
    ON storage.objects
    FOR DELETE
    TO authenticated
    USING (bucket_id = 'writings-images');

-- ============================================
-- 5. INSERT SAMPLE DATA (OPTIONAL)
-- ============================================
-- Data sample untuk testing (bisa dihapus jika tidak perlu)

-- Sample Artikel
INSERT INTO public.kv_store_46c3d36c (key, value)
VALUES (
    'artikel:sample-1',
    '{
        "id": "sample-1",
        "title": "Perkembangan Hukum Pidana di Era Digital",
        "slug": "perkembangan-hukum-pidana-di-era-digital",
        "excerpt": "Analisis mendalam tentang tantangan hukum pidana menghadapi kejahatan siber dan teknologi digital.",
        "content": "Dalam era digital yang berkembang pesat, hukum pidana menghadapi tantangan baru yang belum pernah ada sebelumnya...",
        "category": "Hukum Pidana",
        "imageUrl": "",
        "date": "2024-01-15",
        "author": "Dr. Rita Kartina, S.H., M.H., M.AP.",
        "readTime": "8 menit"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- Sample Buku
INSERT INTO public.kv_store_46c3d36c (key, value)
VALUES (
    'buku:sample-1',
    '{
        "id": "sample-1",
        "title": "Hukum Pidana Indonesia: Teori dan Praktik",
        "slug": "hukum-pidana-indonesia-teori-dan-praktik",
        "author": "Dr. Rita Kartina, S.H., M.H., M.AP.",
        "publisher": "Penerbit Hukum Indonesia",
        "year": "2023",
        "isbn": "978-602-1234-56-7",
        "description": "Buku komprehensif yang membahas teori dan praktik hukum pidana di Indonesia dengan pendekatan akademis yang mendalam.",
        "imageUrl": "",
        "category": "Hukum Pidana"
    }'::jsonb
)
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- 6. VERIFICATION QUERIES
-- ============================================
-- Jalankan query ini untuk memverifikasi setup berhasil

-- Cek apakah table sudah dibuat
SELECT 'Table kv_store_46c3d36c created' AS status
WHERE EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'kv_store_46c3d36c'
);

-- Cek jumlah data
SELECT 
    COUNT(*) FILTER (WHERE key LIKE 'artikel:%') AS artikel_count,
    COUNT(*) FILTER (WHERE key LIKE 'buku:%') AS buku_count,
    COUNT(*) FILTER (WHERE key LIKE 'berita:%') AS berita_count,
    COUNT(*) FILTER (WHERE key LIKE 'karya:%') AS karya_count,
    COUNT(*) AS total_records
FROM public.kv_store_46c3d36c;

-- Cek bucket storage
SELECT id, name, public, file_size_limit, allowed_mime_types
FROM storage.buckets
WHERE id = 'writings-images';

-- ============================================
-- SETUP SELESAI! 🎉
-- ============================================
-- Langkah selanjutnya:
-- 1. Verifikasi semua query berhasil dijalankan
-- 2. Buka aplikasi blog Anda
-- 3. Login ke Admin Dashboard
-- 4. Mulai menambahkan konten!
-- ============================================
