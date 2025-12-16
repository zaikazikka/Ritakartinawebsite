-- Migration untuk menambahkan field views dan created_at ke semua tabel konten
-- Jalankan script ini di Supabase SQL Editor

-- 1. Tambahkan kolom views dan created_at ke tabel news
ALTER TABLE news 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 2. Tambahkan kolom views dan created_at ke tabel articles
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. Tambahkan kolom views dan created_at ke tabel books
ALTER TABLE books 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. Tambahkan kolom views dan created_at ke tabel writings
ALTER TABLE writings 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 5. Tambahkan kolom views ke tabel gallery jika diperlukan
ALTER TABLE gallery 
ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 6. Buat function untuk increment views
CREATE OR REPLACE FUNCTION increment_views(table_name TEXT, record_id INTEGER)
RETURNS void AS $$
BEGIN
  EXECUTE format('UPDATE %I SET views = views + 1 WHERE id = $1', table_name) USING record_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Update existing records untuk set created_at jika NULL
UPDATE news SET created_at = NOW() WHERE created_at IS NULL;
UPDATE articles SET created_at = NOW() WHERE created_at IS NULL;
UPDATE books SET created_at = NOW() WHERE created_at IS NULL;
UPDATE writings SET created_at = NOW() WHERE created_at IS NULL;
UPDATE gallery SET created_at = NOW() WHERE created_at IS NULL;

-- 8. Buat index untuk performa
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_writings_created_at ON writings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_news_views ON news(views DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);
CREATE INDEX IF NOT EXISTS idx_books_views ON books(views DESC);
CREATE INDEX IF NOT EXISTS idx_writings_views ON writings(views DESC);

-- Done! Sekarang semua tabel memiliki field views dan created_at
