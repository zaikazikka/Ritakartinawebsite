# 🚀 Quick Start - Blog Rita Kartina

## ✅ Project Supabase Sudah Terkoneksi!

**Project ID**: `zmnhzduscqfgrxxsqoyo`  
**Project URL**: `https://zmnhzduscqfgrxxsqoyo.supabase.co`

---

## ⚡ 4 Langkah Setup (10 Menit)

### Step 1: Setup Database Table (2 menit)

1. Buka: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/editor
2. Klik **SQL Editor** di sidebar kiri
3. Klik **New query**
4. Copy-paste SQL ini:

```sql
-- Create KV Store Table
CREATE TABLE IF NOT EXISTS kv_store_46c3d36c (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
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

-- Enable RLS
ALTER TABLE kv_store_46c3d36c ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read access" ON kv_store_46c3d36c FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert" ON kv_store_46c3d36c FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update" ON kv_store_46c3d36c FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete" ON kv_store_46c3d36c FOR DELETE TO authenticated USING (true);
```

5. Klik **Run** (atau tekan F5)
6. ✅ Seharusnya muncul "Success. No rows returned"

---

### Step 2: Setup Storage Bucket (3 menit)

**Buka**: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/storage/buckets

1. Klik **"Create a new bucket"** atau **"New bucket"**
2. Isi form:
   - **Name**: `writings-images` (HARUS PERSIS INI!)
   - **Public bucket**: ✅ **CENTANG/CHECK THIS!** (PENTING!)
   - **File size limit**: `5242880` (5 MB)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
3. Klik **"Create bucket"**
4. ✅ Verify badge **"Public"** muncul di samping bucket name

**Kemudian setup Storage RLS Policies:**

Buka SQL Editor lagi, jalankan:

```sql
-- =====================================================
-- FIX STORAGE UPLOAD ERROR - COPY SEMUA SQL INI!
-- =====================================================

-- Step 1: Drop existing policies (cleanup)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Step 2: Create new policies (allow anyone to upload)
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'writings-images');

CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'writings-images');

CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'writings-images')
WITH CHECK (bucket_id = 'writings-images');

CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'writings-images');
```

**Klik Run!**

⚠️ Beberapa DROP POLICY mungkin error "does not exist" - **ABAIKAN**, ini normal. Yang penting 4 CREATE POLICY harus sukses.

**Verify policies berhasil:**

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' AND policyname LIKE '%images%';
```

Seharusnya muncul 4 policies. Jika tidak, ulangi Step 2 di atas.

---

### Step 3: Create Admin User (3 menit) - PENTING!

**Buka**: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/auth/users

1. Klik tombol **"Add user"** (kanan atas)
2. Pilih **"Create new user"**
3. Isi form:
   - **Email**: `admin@ritakartina.com` (atau email Anda)
   - **Password**: Buat password kuat (contoh: `SecurePass123!`)
   - **Auto Confirm User**: ✅ **CENTANG** (penting!)
4. Klik **"Create user"**
5. ✅ User berhasil dibuat!

**💡 CATAT credentials ini:**
```
Email: admin@ritakartina.com
Password: SecurePass123!
```

---

### Step 4: Login ke Admin Dashboard (2 menit)

1. Di aplikasi Anda, tambahkan `#admin` di URL:
   ```
   https://your-app-url.com/#admin
   ```

2. Login dengan credentials yang Anda buat di Step 3:
   - **Email**: `admin@ritakartina.com`
   - **Password**: `SecurePass123!`

3. ✅ Anda masuk! Sekarang bisa mulai tambah konten.

---

## 🎉 SELESAI!

Aplikasi Anda sudah siap digunakan! Anda bisa:
- ✅ Login ke admin dashboard
- ✅ Tambah artikel, buku, berita, karya tulis
- ✅ Upload gambar
- ✅ Kelola subscribers dan pesan kontak

---

## 🔍 Verifikasi Setup

Cek apakah setup berhasil:

1. **Database Table**:
   - Buka: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/editor
   - Klik **Database** → **Tables**
   - Seharusnya ada table `kv_store_46c3d36c` ✅

2. **Storage Bucket**:
   - Buka: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/storage/buckets
   - Seharusnya ada bucket `writings-images` ✅
   - Pastikan badge "Public" muncul ✅

3. **Admin Login**:
   - Akses `#admin` di URL
   - Login dengan admin/admin123
   - Seharusnya masuk ke dashboard ✅

---

## ⚠️ Troubleshooting

### Error: "relation kv_store_46c3d36c does not exist"
**Solusi**: Jalankan SQL di Step 1 lagi

### Error: "The resource already exists" di storage
**Solusi**: Bucket sudah dibuat, abaikan error ini ✅

### Error: "Upload failed"
**Solusi**: 
1. Pastikan bucket `writings-images` di-set ke **Public**
2. Buka Storage → writings-images → Settings → Centang "Public bucket"

### Login gagal terus
**Solusi**:
1. Pastikan SQL di Step 1 sudah dijalankan
2. Clear browser cache
3. Coba lagi

---

## 📚 Dokumentasi Lengkap

- **Setup Database Detail**: Lihat `SETUP_DATABASE.md`
- **Cara Pakai Aplikasi**: Lihat `CARA_PAKAI.md`
- **API Documentation**: Lihat `API_DOCUMENTATION.md`

---

## 🔐 Keamanan

⚠️ **PENTING**: Ubah password admin setelah setup!

Jalankan SQL ini di SQL Editor:

```sql
UPDATE kv_store_46c3d36c 
SET value = '{"username": "admin", "password": "PASSWORD_BARU_ANDA"}'::jsonb
WHERE key = 'admin:credentials';
```

Ganti `PASSWORD_BARU_ANDA` dengan password yang kuat.

---

## 🆘 Butuh Bantuan?

1. Cek error di Browser Console (F12 → Console)
2. Cek logs di Supabase Dashboard → Logs
3. Baca file dokumentasi lengkap

---

**Happy blogging!** 🚀