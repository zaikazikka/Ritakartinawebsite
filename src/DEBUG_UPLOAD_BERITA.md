# 🔍 Debug Upload Gambar Berita - Troubleshooting Guide

## ❌ Error: "Gagal Upload Gambar di Berita"

Mari kita debug masalah upload gambar di section Berita secara sistematis.

---

## 📋 Checklist Diagnostik

### ✅ STEP 1: Pastikan Storage Bucket Sudah Dibuat

1. **Buka Supabase Dashboard → Storage**
   
   Link: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/storage/buckets

2. **Verify bucket `writings-images` ada**
   - Cari bucket dengan nama `writings-images`
   - Pastikan badge **"Public"** muncul

3. **Jika bucket TIDAK ADA:**
   ```
   Create bucket baru:
   - Name: writings-images
   - Public: ✅ CENTANG
   - File size limit: 5242880 (5 MB)
   ```

4. **Jika bucket ADA tapi TIDAK Public:**
   - Klik bucket `writings-images`
   - Klik **Settings** atau **Configuration**
   - Toggle **"Public bucket"** → ON
   - Save

---

### ✅ STEP 2: Pastikan Storage RLS Policies Sudah Di-Setup

1. **Buka Supabase Dashboard → SQL Editor**
   
   Link: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/sql

2. **Jalankan query verify ini:**

```sql
-- Verify Storage RLS Policies
SELECT 
  policyname, 
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'objects' 
  AND policyname LIKE '%images%'
ORDER BY policyname;
```

3. **Expected Output (harus ada 4 policies):**

```
policyname                  | cmd    | qual                            | with_check
----------------------------+--------+---------------------------------+----------------------------------
Anyone can delete images    | DELETE | (bucket_id = 'writings-images') | -
Anyone can update images    | UPDATE | (bucket_id = 'writings-images') | (bucket_id = 'writings-images')
Anyone can upload images    | INSERT | -                               | (bucket_id = 'writings-images')
Public can view images      | SELECT | (bucket_id = 'writings-images') | -
```

4. **Jika TIDAK muncul 4 policies:**

Jalankan SQL ini untuk create policies:

```sql
-- =====================================================
-- FIX STORAGE UPLOAD ERROR
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

-- Step 2: Create new policies
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

Klik **Run** → Verify lagi dengan query di poin 2.

---

### ✅ STEP 3: Test Upload dengan Console Debug

1. **Buka Admin Dashboard** (`#admin`)

2. **Buka Browser Console** (tekan F12 → tab Console)

3. **Klik tab "Berita"**

4. **Klik "+ Tambah Berita"**

5. **Isi form:**
   - Judul: "Test Upload Berita"
   - Konten: "Ini adalah test"
   - Pilih gambar (JPG/PNG, ukuran < 5MB)

6. **Perhatikan Console saat klik "Simpan"**

---

### 🔍 STEP 4: Identifikasi Error dari Console

Lihat error message di Browser Console. Cari salah satu dari ini:

#### Error A: "Bucket not found" atau "The resource you are looking for could not be found"

**Artinya**: Bucket `writings-images` belum dibuat atau nama salah

**Solusi**:
- Kembali ke STEP 1
- Create bucket dengan nama PERSIS `writings-images`

---

#### Error B: "new row violates row-level security policy"

**Artinya**: Storage RLS policies belum di-setup dengan benar

**Solusi**:
- Kembali ke STEP 2
- Jalankan SQL untuk create policies
- Verify ada 4 policies

---

#### Error C: "File size exceeds the maximum allowed size"

**Artinya**: Gambar terlalu besar (> 5MB)

**Solusi**:
- Compress gambar atau pilih gambar lain
- Gunakan tool online: https://tinypng.com atau https://compressor.io

---

#### Error D: "Invalid file type" atau "File must be an image"

**Artinya**: File yang dipilih bukan gambar

**Solusi**:
- Pastikan file adalah JPG, PNG, GIF, atau WEBP
- Jangan upload PDF, DOC, atau file lain

---

#### Error E: "Upload error: 400" atau "Invalid request"

**Artinya**: Ada masalah dengan request format

**Solusi**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+F5)
3. Logout → Login lagi
4. Coba upload lagi

---

#### Error F: "Network error" atau "Failed to fetch"

**Artinya**: Koneksi internet bermasalah atau CORS issue

**Solusi**:
1. Cek koneksi internet
2. Coba browser lain (Chrome/Firefox)
3. Disable browser extensions (Adblock, dll)
4. Coba lagi

---

### ✅ STEP 5: Verify Database Table (Opsional)

Jika upload berhasil tapi data tidak muncul:

```sql
-- Check data berita di database
SELECT key, value->>'title' as title, value->>'imageUrl' as imageUrl, created_at
FROM kv_store_46c3d36c
WHERE key LIKE 'news:%'
ORDER BY created_at DESC
LIMIT 10;
```

Seharusnya muncul data berita dengan imageUrl yang valid.

---

## 🧪 Test Upload Manual (Alternative)

Jika upload via form gagal terus, test upload manual via console:

1. **Buka Browser Console** (F12)

2. **Jalankan code ini:**

```javascript
// Test upload gambar manual
async function testUpload() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  
  input.onchange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    console.log('File selected:', file.name, file.size, file.type);
    
    try {
      // Import storage helper
      const { storageHelper } = await import('./utils/supabase/client.ts');
      
      console.log('Uploading...');
      const url = await storageHelper.uploadImage(file, 'news');
      
      console.log('✅ Upload SUCCESS!');
      console.log('Image URL:', url);
      alert('Upload berhasil! URL: ' + url);
    } catch (error) {
      console.error('❌ Upload FAILED:', error);
      alert('Upload gagal! Lihat console untuk detail error.');
    }
  };
  
  input.click();
}

// Run test
testUpload();
```

3. **Pilih gambar**

4. **Lihat hasil di console:**
   - ✅ Jika sukses: Akan muncul URL gambar
   - ❌ Jika gagal: Lihat error message

---

## 📸 Alternatif: Upload via URL (Workaround)

Jika upload file gagal terus, gunakan URL gambar external:

1. **Upload gambar ke hosting gratis:**
   - **Imgur**: https://imgur.com/upload
   - **ImgBB**: https://imgbb.com
   - **Cloudinary**: https://cloudinary.com

2. **Copy image URL**

3. **Di form Berita, paste URL ke field "URL Gambar" (di bawah file upload)**

4. **Simpan** → Gambar akan muncul dari URL external

---

## 🔧 Fix Cepat (Quick Fixes)

### Fix 1: Clear Browser Cache

```
Chrome: Ctrl+Shift+Delete → Clear browsing data → Cache
Firefox: Ctrl+Shift+Delete → Cache → Clear
Edge: Ctrl+Shift+Delete → Cached images and files
```

### Fix 2: Hard Refresh

```
Windows: Ctrl+F5
Mac: Cmd+Shift+R
```

### Fix 3: Reset Form State

Di Browser Console:

```javascript
// Reset upload state
localStorage.removeItem('admin_session');
location.reload();
```

Kemudian login lagi dan coba upload.

---

## 🆘 Masih Gagal?

Jika semua langkah di atas sudah dicoba tapi masih gagal:

### Langkah Terakhir: Re-setup Storage dari Awal

1. **Delete bucket `writings-images`** (jika ada)
   - Dashboard → Storage → writings-images → Settings → Delete bucket

2. **Create bucket baru:**
   ```
   Name: writings-images
   Public: ✅ CENTANG
   File size limit: 5242880
   ```

3. **Run SQL policies lagi** (dari STEP 2)

4. **Hard refresh aplikasi** (Ctrl+F5)

5. **Logout → Login lagi**

6. **Test upload**

---

## ✅ Checklist Final

Sebelum lapor masih error, pastikan semua ini sudah dilakukan:

- [ ] ✅ Bucket `writings-images` sudah dibuat
- [ ] ✅ Bucket di-set sebagai **Public**
- [ ] ✅ 4 Storage RLS policies sudah dibuat (verified via SQL)
- [ ] ✅ Browser cache sudah di-clear
- [ ] ✅ Gambar yang diupload < 5MB dan format valid (JPG/PNG/GIF/WEBP)
- [ ] ✅ Sudah login ke admin dashboard
- [ ] ✅ Console tidak menunjukkan error "bucket not found"
- [ ] ✅ Console tidak menunjukkan error "RLS policy"
- [ ] ✅ Network tab menunjukkan upload request dikirim

---

## 📊 Expected Behavior (Upload Sukses)

Jika upload berhasil, ini yang seharusnya terjadi:

1. **Saat pilih gambar:**
   - Preview gambar muncul di form
   - Ukuran file di-validate (< 5MB)

2. **Saat klik "Simpan":**
   - Console log: "Uploading..."
   - Toast notification: "Gambar berhasil diupload"
   - Toast notification: "Berita berhasil ditambahkan"

3. **Setelah simpan:**
   - Form tertutup
   - List berita muncul item baru
   - Gambar ter-display di card berita

4. **Di Supabase Storage:**
   - Buka Storage → writings-images → folder `news`
   - File gambar muncul dengan nama format: `{timestamp}-{random}.{ext}`

---

## 🎯 Contact/Report

Jika sudah semua dicoba tapi masih gagal, report dengan info ini:

1. **Screenshot error di console** (F12 → Console tab)
2. **Screenshot network request** (F12 → Network tab → filter "storage")
3. **Screenshot bucket settings** (Dashboard → Storage → writings-images → Settings)
4. **Screenshot policies** (hasil query verify dari STEP 2)

Dengan info di atas, debugging akan lebih mudah.

---

**Good luck!** 🚀

---

**Last updated**: December 13, 2024
