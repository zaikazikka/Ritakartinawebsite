# 🔧 Fix Setup Issues - Login & Upload Error

## ⚠️ Error yang Muncul

1. ❌ `AuthApiError: Invalid login credentials` - Login gagal
2. ❌ `StorageApiError: new row violates row-level security policy` - Upload gambar gagal

---

## 📋 Solusi Lengkap

### STEP 1: Setup Database Table (5 menit)

**Buka Supabase Dashboard → SQL Editor → Jalankan SQL ini:**

```sql
-- ===================================
-- 1. CREATE KV_STORE TABLE
-- ===================================
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

-- ===================================
-- 2. ENABLE RLS (Row Level Security)
-- ===================================
ALTER TABLE kv_store_46c3d36c ENABLE ROW LEVEL SECURITY;

-- Policy untuk SELECT (semua orang bisa membaca)
CREATE POLICY "Allow public read access" ON kv_store_46c3d36c
  FOR SELECT
  USING (true);

-- Policy untuk INSERT (semua authenticated users bisa insert)
CREATE POLICY "Allow authenticated insert" ON kv_store_46c3d36c
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy untuk UPDATE (semua authenticated users bisa update)
CREATE POLICY "Allow authenticated update" ON kv_store_46c3d36c
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy untuk DELETE (semua authenticated users bisa delete)
CREATE POLICY "Allow authenticated delete" ON kv_store_46c3d36c
  FOR DELETE
  TO authenticated
  USING (true);
```

---

### STEP 2: Create Storage Bucket (3 menit)

**Buka Supabase Dashboard → Storage → Create bucket**

1. Klik tombol **"New bucket"** atau **"Create a new bucket"**
2. Isi form:
   - **Name**: `writings-images` (HARUS PERSIS INI!)
   - **Public bucket**: ✅ **CENTANG/CHECK THIS!**
   - **File size limit**: `5242880` (5 MB)
   - **Allowed MIME types**: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
3. Klik **"Create bucket"**
4. Verify bahwa badge **"Public"** muncul di samping nama bucket

---

### STEP 3: Setup Storage RLS Policies (PENTING!)

**Buka Supabase Dashboard → SQL Editor → Jalankan SQL ini:**

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
-- Policy 1: Allow everyone to view/download images
CREATE POLICY "Public can view images"
ON storage.objects FOR SELECT
USING (bucket_id = 'writings-images');

-- Policy 2: Allow everyone to upload images (FIX UPLOAD ERROR!)
CREATE POLICY "Anyone can upload images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'writings-images');

-- Policy 3: Allow everyone to update images
CREATE POLICY "Anyone can update images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'writings-images')
WITH CHECK (bucket_id = 'writings-images');

-- Policy 4: Allow everyone to delete images
CREATE POLICY "Anyone can delete images"
ON storage.objects FOR DELETE
USING (bucket_id = 'writings-images');
```

**Klik "Run" atau tekan F5**

✅ **Expected Output:**
- Beberapa `DROP POLICY` mungkin error "does not exist" - **ABAIKAN**, ini normal
- 4 `CREATE POLICY` harus sukses semua
- Di bagian bawah seharusnya ada pesan sukses

**Verify Policies Berhasil Dibuat:**

Jalankan query ini untuk verify:

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' 
  AND policyname LIKE '%images%';
```

Seharusnya muncul 4 rows:
- `Public can view images` (SELECT)
- `Anyone can upload images` (INSERT)
- `Anyone can update images` (UPDATE)
- `Anyone can delete images` (DELETE)

⚠️ **PENTING**: Jika query verify tidak menampilkan 4 policies, ulangi Step 2 di atas.

---

### STEP 4: Create Admin User (2 menit) - FIX LOGIN ERROR

Ada 2 cara membuat admin user:

#### **Cara A: Via Supabase Dashboard (RECOMMENDED ✅)**

1. Buka **Supabase Dashboard**
2. Klik **Authentication** di sidebar kiri
3. Klik tab **"Users"**
4. Klik tombol **"Add user"** (biasanya di kanan atas)
5. Pilih **"Create new user"**
6. Isi form:
   - **Email**: `admin@ritakartina.com` (atau email Anda)
   - **Password**: Buat password yang kuat (min 6 karakter)
   - **Auto Confirm User**: ✅ **CENTANG** (penting!)
7. Klik **"Create user"**

Screenshot langkah:
```
Authentication > Users > Add user
┌─────────────────────────────┐
│ Create new user             │
│                             │
│ Email: admin@ritakartina.com│
│ Password: YourSecurePass123 │
│ ☑ Auto Confirm User         │
│                             │
│ [Create user]               │
└─────────────────────────────┘
```

#### **Cara B: Via SQL**

Jika Cara A tidak bisa, gunakan SQL ini:

```sql
-- IMPORTANT: Ganti email dan password di bawah!
-- Email: ganti 'admin@ritakartina.com' dengan email Anda
-- Password: ganti 'YourSecurePassword123!' dengan password Anda

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'admin@ritakartina.com',  -- GANTI INI dengan email Anda
  crypt('YourSecurePassword123!', gen_salt('bf')),  -- GANTI password ini
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Admin Rita Kartina"}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Verify user berhasil dibuat
SELECT email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 1;
```

**PENTING**: Setelah run SQL, pastikan query terakhir menampilkan email yang baru Anda buat.

---

### STEP 5: Test Login (1 menit)

1. Buka aplikasi Anda
2. Tambahkan `#admin` di URL
   ```
   https://your-app.com/#admin
   ```
3. Masukkan credentials:
   - **Email**: Email yang Anda buat di STEP 4 (contoh: `admin@ritakartina.com`)
   - **Password**: Password yang Anda buat di STEP 4
4. Klik **"Login"**
5. ✅ Seharusnya berhasil masuk ke Dashboard!

---

### STEP 6: Test Upload Gambar (1 menit)

1. Di Admin Dashboard, klik tab **"Artikel"**
2. Klik **"+ Tambah Artikel"**
3. Isi form:
   - Judul: "Test Artikel"
   - Konten: "Ini adalah test artikel"
   - Ringkasan: "Test"
   - Penulis: "Admin"
   - Tanggal: Pilih hari ini
   - Kategori: Pilih salah satu
   - Tags: "test"
   - **Gambar**: Klik "Choose File" → Pilih gambar JPG/PNG (< 5MB)
4. **Preview gambar seharusnya muncul** setelah pilih file
5. Klik **"Simpan"**
6. ✅ Artikel tersimpan dengan gambar!

---

## 🔍 Verifikasi Setup

### Checklist Lengkap:

- [ ] ✅ Table `kv_store_46c3d36c` sudah dibuat
  - Cek: Dashboard → Database → Tables
- [ ] ✅ RLS enabled di table `kv_store_46c3d36c`
  - Cek: Dashboard → Database → Tables → kv_store_46c3d36c → Policies
- [ ] ✅ Bucket `writings-images` sudah dibuat
  - Cek: Dashboard → Storage → Bucket `writings-images` ada
- [ ] ✅ Bucket `writings-images` adalah **Public**
  - Cek: Badge "Public" muncul di samping nama bucket
- [ ] ✅ Storage RLS policies sudah di-setup
  - Cek: Dashboard → Storage → writings-images → Policies (seharusnya ada 4 policies)
- [ ] ✅ Admin user sudah dibuat
  - Cek: Dashboard → Authentication → Users (seharusnya ada minimal 1 user)
- [ ] ✅ Login berhasil dengan credentials admin
  - Cek: Buka `#admin` → Login → Masuk ke dashboard
- [ ] ✅ Upload gambar berhasil
  - Cek: Tambah artikel dengan gambar → Simpan → Gambar tersimpan

---

## ⚠️ Troubleshooting

### Error: "Invalid login credentials" masih muncul

**Kemungkinan penyebab:**
1. Email/password salah
2. User belum di-confirm (auto confirm tidak dicentang saat create user)
3. User belum dibuat

**Solusi:**
1. Cek di **Authentication → Users** apakah user ada
2. Klik user tersebut → Pastikan **"Email confirmed"** = ✅
3. Jika tidak ada centang, klik **"Confirm email"**
4. Coba login lagi

### Error: "Upload failed" atau "RLS policy" masih muncul

**Kemungkinan penyebab:**
1. Bucket belum dibuat
2. Bucket tidak Public
3. Storage RLS policies belum di-setup
4. User tidak authenticated

**Solusi:**
1. Verify bucket `writings-images` ada dan Public
2. Jalankan ulang SQL untuk Storage policies (STEP 3)
3. Pastikan Anda sudah login (authenticated)
4. Coba logout → login lagi → test upload

### Error: "Bucket not found"

**Solusi:**
1. Pastikan nama bucket PERSIS: `writings-images` (no typo!)
2. Buat bucket via Dashboard (STEP 2)
3. Refresh halaman admin

### Gambar tidak muncul setelah upload

**Solusi:**
1. Bucket HARUS Public ✅
2. Buka Dashboard → Storage → writings-images → Configuration
3. Pastikan "Public bucket" = **Yes**
4. Jika tidak, toggle ke Public
5. Upload ulang gambar

---

## 📧 Default Admin Credentials

Setelah setup STEP 4, gunakan credentials ini untuk login:

```
Email: admin@ritakartina.com (atau email yang Anda buat)
Password: YourSecurePassword123! (atau password yang Anda buat)
```

⚠️ **PENTING**: Simpan credentials ini dengan aman!

---

## 🎉 Setup Selesai!

Jika semua step di atas berhasil, aplikasi Anda sudah siap digunakan:

- ✅ Login admin berhasil
- ✅ Upload gambar berhasil
- ✅ CRUD konten berhasil
- ✅ Data tersimpan di Supabase

**Next Steps:**
1. Ubah password admin ke password yang lebih kuat
2. Mulai tambahkan konten asli (artikel, buku, berita, dll)
3. Customize profil Dr. Rita Kartina
4. Test semua fitur di browser & mobile

---

## 📚 Quick Reference

| Aksi | URL/Lokasi |
|------|-----------|
| **Supabase Dashboard** | https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo |
| **SQL Editor** | Dashboard → SQL Editor |
| **Storage** | Dashboard → Storage |
| **Authentication** | Dashboard → Authentication → Users |
| **Admin Login** | your-app-url/#admin |
| **Bucket name** | `writings-images` |
| **Table name** | `kv_store_46c3d36c` |

---

**Last updated**: December 13, 2024

**Need help?** Cek error di Browser Console (F12 → Console) atau Supabase Logs (Dashboard → Logs)