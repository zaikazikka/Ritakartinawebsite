# Setup Database Supabase untuk Blog Rita Kartina

## ✅ Status Koneksi
Project Supabase Anda sudah berhasil terkoneksi!

---

## 📋 Langkah 1: Setup Database Tables

Buka **Supabase Dashboard** → **SQL Editor** → Klik **New Query**, lalu jalankan SQL berikut:

```sql
-- ===================================
-- 1. CREATE KV_STORE TABLE
-- ===================================
-- Table untuk menyimpan semua data blog (artikel, buku, berita, karya tulis, dll)
CREATE TABLE IF NOT EXISTS kv_store_46c3d36c (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index untuk pencarian yang lebih cepat
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix ON kv_store_46c3d36c (key text_pattern_ops);
CREATE INDEX IF NOT EXISTS idx_kv_store_created_at ON kv_store_46c3d36c (created_at DESC);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kv_store_updated_at 
  BEFORE UPDATE ON kv_store_46c3d36c 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- ===================================
-- 2. ROW LEVEL SECURITY (RLS)
-- ===================================
-- Enable RLS untuk keamanan
ALTER TABLE kv_store_46c3d36c ENABLE ROW LEVEL SECURITY;

-- Policy untuk SELECT (semua orang bisa membaca/view)
CREATE POLICY "Allow public read access" ON kv_store_46c3d36c
  FOR SELECT
  USING (true);

-- Policy untuk INSERT, UPDATE, DELETE (hanya admin yang bisa)
-- Catatan: Untuk sementara, kita allow semua authenticated users
-- Nanti bisa dibatasi lebih ketat dengan custom roles
CREATE POLICY "Allow authenticated insert" ON kv_store_46c3d36c
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated update" ON kv_store_46c3d36c
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete" ON kv_store_46c3d36c
  FOR DELETE
  USING (true);

-- ===================================
-- 3. SAMPLE DATA (OPTIONAL)
-- ===================================
-- Uncomment jika ingin insert sample admin user
-- INSERT INTO kv_store_46c3d36c (key, value) VALUES 
--   ('admin:credentials', '{"username": "admin", "password": "admin123"}')
-- ON CONFLICT (key) DO NOTHING;
```

---

## 🗄️ Langkah 2: Setup Storage Bucket

Buka **Supabase Dashboard** → **Storage** → **Create a new bucket**

### Konfigurasi Bucket:

- **Name**: `writings-images`
- **Public bucket**: ✅ **CHECKED** (centang)
- **File size limit**: `5 MB`
- **Allowed MIME types**: 
  - `image/jpeg`
  - `image/png`
  - `image/gif`
  - `image/webp`

### ATAU jalankan SQL ini di SQL Editor:

```sql
-- Create storage bucket untuk gambar
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'writings-images',
  'writings-images',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Set RLS policy untuk storage
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'writings-images');

CREATE POLICY "Allow authenticated uploads" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'writings-images');

CREATE POLICY "Allow authenticated deletes" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'writings-images');

CREATE POLICY "Allow authenticated updates" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'writings-images');
```

---

## 🔐 Langkah 3: Setup Authentication (OPTIONAL)

Jika Anda ingin fitur login admin yang lebih aman:

Buka **Supabase Dashboard** → **Authentication** → **Providers** → **Email**

- Enable **Email** provider
- Disable **Confirm email** (karena ini blog pribadi dan tidak perlu email confirmation)

### Buat Admin User:

Buka **SQL Editor** dan jalankan:

```sql
-- Buat admin user
-- Password akan di-hash otomatis oleh Supabase
-- Ganti email dan password sesuai keinginan
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  confirmation_token,
  recovery_token
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@ritakartina.com',
  crypt('Admin123!', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin Rita Kartina"}',
  '',
  ''
);
```

---

## ✅ Verifikasi Setup

Setelah menjalankan semua SQL di atas, cek:

1. **Table**: Di **Database** → **Tables**, seharusnya ada table `kv_store_46c3d36c`
2. **Storage**: Di **Storage**, seharusnya ada bucket `writings-images`
3. **Auth** (jika diaktifkan): Di **Authentication** → **Users**, seharusnya ada user admin

---

## 🚀 Struktur Data KV Store

Data di table `kv_store_46c3d36c` menggunakan key-value pattern:

### Artikel Blog
- **Key**: `articles:<id>` (contoh: `articles:1702468800000`)
- **Value**: 
```json
{
  "id": "1702468800000",
  "title": "Judul Artikel",
  "content": "Konten artikel...",
  "excerpt": "Ringkasan...",
  "author": "Dr. Rita Kartina",
  "date": "2024-01-15",
  "category": "Hukum Pidana",
  "tags": ["hukum", "pidana"],
  "image": "https://xxx.supabase.co/storage/v1/object/public/writings-images/..."
}
```

### Buku
- **Key**: `books:<id>`
- **Value**: 
```json
{
  "id": "1702468800001",
  "title": "Judul Buku",
  "description": "Deskripsi buku...",
  "author": "Dr. Rita Kartina",
  "publisher": "Penerbit X",
  "year": "2024",
  "isbn": "978-xxx",
  "cover": "https://xxx.supabase.co/storage/v1/object/public/writings-images/..."
}
```

### Berita
- **Key**: `news:<id>`
- **Value**: 
```json
{
  "id": "1702468800002",
  "title": "Judul Berita",
  "content": "Konten berita...",
  "date": "2024-01-15",
  "source": "Media X",
  "image": "https://..."
}
```

### Karya Tulis
- **Key**: `writings:<id>`
- **Value**: 
```json
{
  "id": "1702468800003",
  "title": "Judul Karya Tulis",
  "type": "Hukum" | "Administrasi Publik",
  "description": "Deskripsi...",
  "date": "2024-01-15",
  "file": "https://...",
  "image": "https://..."
}
```

### Admin Credentials
- **Key**: `admin:credentials`
- **Value**: 
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

## 🎉 Selesai!

Database dan storage Anda sudah siap digunakan. Aplikasi blog sudah bisa:
- ✅ Menyimpan artikel, buku, berita, karya tulis
- ✅ Upload gambar cover/thumbnail
- ✅ Login admin dashboard
- ✅ CRUD (Create, Read, Update, Delete) semua konten

**Catatan Keamanan**: 
- Untuk production, sebaiknya ubah password admin dan gunakan Supabase Auth yang lebih aman
- Pertimbangkan untuk membatasi RLS policy hanya untuk authenticated users tertentu
