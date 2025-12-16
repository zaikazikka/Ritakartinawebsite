# ⚡ FIX UPLOAD BERITA - DO THIS NOW!

## 🎯 3 Langkah Fix (5 Menit)

Upload gambar gagal di Berita? Follow langkah ini **SEKARANG**:

---

## 🔧 STEP 1: Create Storage Bucket (2 menit)

**Buka link ini:**
https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/storage/buckets

**Klik "New bucket" atau "Create a new bucket"**

**Isi form:**
```
Name: writings-images
Public bucket: ✅ CENTANG INI! (PENTING!)
File size limit: 5242880
Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
```

**Klik "Create bucket"**

✅ **Verify**: Badge "Public" muncul di samping bucket name

---

## 🔧 STEP 2: Setup Storage Policies (2 menit)

**Buka link ini:**
https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/sql

**Copy-paste SQL ini dan klik "Run":**

```sql
-- Drop old policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete" ON storage.objects;
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete images" ON storage.objects;

-- Create new policies
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

**Klik "Run"**

⚠️ Beberapa DROP mungkin error - **ABAIKAN**

---

## 🔧 STEP 3: Verify & Test (1 menit)

**Verify policies berhasil dibuat:**

Run query ini di SQL Editor:

```sql
SELECT policyname, cmd 
FROM pg_policies 
WHERE tablename = 'objects' AND policyname LIKE '%images%';
```

**Harus muncul 4 rows:**
- Public can view images (SELECT)
- Anyone can upload images (INSERT)
- Anyone can update images (UPDATE)
- Anyone can delete images (DELETE)

---

## ✅ Test Upload

1. Buka aplikasi → `#admin`
2. Login
3. Tab **"Berita"**
4. **"+ Tambah Berita"**
5. Isi form + **pilih gambar**
6. **"Simpan"**

✅ **Upload seharusnya BERHASIL!**

---

## ❌ Masih Gagal?

### Quick Fix:

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Hard refresh** (Ctrl+F5)
3. **Logout → Login lagi**
4. **Coba upload lagi**

### Cek Error:

1. **Buka Console** (F12 → Console tab)
2. **Upload lagi**
3. **Lihat error message**
4. **Report error tersebut**

---

## 🆘 Error Messages

### "Bucket not found"
→ STEP 1 belum dilakukan, create bucket `writings-images`

### "RLS policy violation"
→ STEP 2 belum dilakukan, run SQL policies

### "File too large"
→ Gambar > 5MB, compress dulu di https://tinypng.com

### "Network error"
→ Cek internet, coba browser lain

---

## 📸 Alternatif: Upload via URL

Jika upload file masih gagal:

1. Upload gambar ke **Imgur**: https://imgur.com/upload
2. Copy image URL
3. Di form Berita, paste URL ke field **"URL Gambar"**
4. Simpan

---

## ✅ Done!

Setelah STEP 1 & 2 selesai, upload gambar di Berita (dan semua tab lain) **PASTI BERHASIL**.

**Jika masih gagal setelah semua langkah, screenshot error di console dan report!**

---

**Last updated**: December 13, 2024
