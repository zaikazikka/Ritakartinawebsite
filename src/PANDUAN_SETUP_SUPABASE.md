# 🚀 Panduan Setup Supabase untuk RitaKartina.com

## ✅ Status Saat Ini

**Project Supabase sudah terhubung!**
- **Project ID**: `zmnhzduscqfgrxxsqoyo`
- **Project URL**: `https://zmnhzduscqfgrxxsqoyo.supabase.co`
- **Status**: Credentials sudah terupdate otomatis di `/utils/supabase/info.tsx`

---

## 📋 Langkah-Langkah Setup Database

### 1️⃣ Login ke Supabase Dashboard

1. Buka browser dan pergi ke: **https://supabase.com/dashboard**
2. Login dengan akun Anda
3. Anda akan melihat project: **zmnhzduscqfgrxxsqoyo**

### 2️⃣ Buka SQL Editor

1. Di sidebar kiri, klik icon **`</>`** (SQL Editor)
2. Atau pergi langsung ke: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo/sql

### 3️⃣ Jalankan Setup Script

1. Klik tombol **"New query"** 
2. Copy semua isi file **`/SUPABASE_SETUP.sql`** (file sudah saya buat untuk Anda)
3. Paste ke SQL Editor
4. Klik tombol **"Run"** (atau tekan `Ctrl + Enter` / `Cmd + Enter`)
5. Tunggu beberapa detik sampai muncul notifikasi **"Success"**

### 4️⃣ Verifikasi Setup

Setelah script berhasil dijalankan, Anda akan melihat:

#### ✅ Table `kv_store_46c3d36c` sudah dibuat
- Cek di: **Table Editor** → Anda akan melihat table baru
- Table ini menyimpan semua data blog (artikel, buku, berita, karya tulis)

#### ✅ Storage Bucket `writings-images` sudah dibuat
- Cek di: **Storage** → Anda akan melihat bucket baru
- Bucket ini menyimpan semua gambar upload

#### ✅ Row Level Security (RLS) sudah aktif
- Semua orang bisa **membaca** data (untuk public blog)
- Hanya **authenticated users** yang bisa create/update/delete (Admin Dashboard)

---

## 🎯 Struktur Data

### Key Patterns untuk KV Store

Blog Anda menggunakan sistem **key-value** dengan prefix pattern:

| Tipe Konten | Key Pattern | Contoh |
|-------------|-------------|---------|
| **Artikel** | `artikel:{id}` | `artikel:sample-1` |
| **Buku** | `buku:{id}` | `buku:sample-1` |
| **Berita** | `berita:{id}` | `berita:breaking-news-1` |
| **Karya Tulis** | `karya:{id}` | `karya:hukum-1` |

### Sample Data Structure

**Artikel:**
```json
{
  "id": "sample-1",
  "title": "Perkembangan Hukum Pidana di Era Digital",
  "slug": "perkembangan-hukum-pidana-di-era-digital",
  "excerpt": "Analisis mendalam tentang tantangan...",
  "content": "Dalam era digital yang berkembang pesat...",
  "category": "Hukum Pidana",
  "imageUrl": "https://...supabase.co/storage/.../image.jpg",
  "date": "2024-01-15",
  "author": "Dr. Rita Kartina, S.H., M.H., M.AP.",
  "readTime": "8 menit"
}
```

**Buku:**
```json
{
  "id": "sample-1",
  "title": "Hukum Pidana Indonesia: Teori dan Praktik",
  "slug": "hukum-pidana-indonesia-teori-dan-praktik",
  "author": "Dr. Rita Kartina, S.H., M.H., M.AP.",
  "publisher": "Penerbit Hukum Indonesia",
  "year": "2023",
  "isbn": "978-602-1234-56-7",
  "description": "Buku komprehensif yang membahas...",
  "imageUrl": "https://...supabase.co/storage/.../cover.jpg",
  "category": "Hukum Pidana"
}
```

---

## 🔐 Setup Admin Account (Opsional)

Jika Anda ingin menggunakan sistem autentikasi Supabase untuk Admin Dashboard:

### 1️⃣ Buat Admin User

1. Pergi ke: **Authentication** → **Users**
2. Klik **"Add user"** → **"Create new user"**
3. Masukkan:
   - **Email**: admin@ritakartina.com (atau email Anda)
   - **Password**: buat password yang kuat
   - **Auto Confirm User**: ✅ Centang ini (karena email belum dikonfigurasi)
4. Klik **"Create user"**

### 2️⃣ Test Login

1. Buka aplikasi blog Anda
2. Klik **"Admin"** di menu
3. Login dengan email dan password yang baru dibuat
4. Anda seharusnya bisa mengakses Admin Dashboard

---

## 🖼️ Upload Gambar

Setelah setup selesai, fitur upload gambar akan langsung berfungsi:

### Cara Kerja Upload Gambar:

1. **Admin Dashboard** → Pilih form (Artikel/Buku/Berita/Karya Tulis)
2. Klik **"Choose File"** di field gambar
3. Pilih gambar (max 5MB, format: JPG, PNG, GIF, WebP)
4. Gambar otomatis diupload ke Supabase Storage
5. URL gambar disimpan di database
6. Preview gambar muncul langsung

### Troubleshooting Upload:

Jika upload gagal, cek:
- ✅ Ukuran file < 5MB
- ✅ Format file: JPEG, PNG, GIF, atau WebP
- ✅ Bucket `writings-images` sudah dibuat
- ✅ Storage policies sudah dijalankan (dari SQL script)

---

## 🧪 Testing Koneksi

### Test 1: Baca Data Sample

Buka browser console (F12) dan jalankan:

```javascript
// Test koneksi ke Supabase
const { supabase } = await import('/utils/supabase/client.ts');

// Baca semua artikel
const { data, error } = await supabase
  .from('kv_store_46c3d36c')
  .select('*')
  .like('key', 'artikel:%');

console.log('Artikel:', data);
```

### Test 2: Upload Gambar

1. Pergi ke Admin Dashboard
2. Klik tab **"Artikel"**
3. Isi form artikel
4. Upload gambar
5. Klik **"Simpan"**
6. Refresh halaman → artikel baru muncul

---

## 🔧 Troubleshooting

### ❌ Error: "relation kv_store_46c3d36c does not exist"

**Solusi**: Table belum dibuat. Jalankan setup SQL script di SQL Editor.

### ❌ Error: "bucket writings-images does not exist"

**Solusi**: Bucket belum dibuat. Jalankan setup SQL script atau buat manual:
1. Pergi ke **Storage**
2. Klik **"New bucket"**
3. Name: `writings-images`
4. Public: ✅ Ya
5. File size limit: `5242880` (5MB)
6. Allowed MIME types: `image/jpeg,image/png,image/gif,image/webp`

### ❌ Error: "new row violates row-level security policy"

**Solusi**: RLS policies belum aktif. Jalankan setup SQL script bagian RLS.

### ❌ Upload berhasil tapi gambar tidak muncul

**Solusi**: 
1. Cek bucket adalah **public** (bukan private)
2. Cek RLS policies untuk storage.objects sudah aktif
3. Clear browser cache dan refresh

---

## 📊 Monitoring & Maintenance

### Cek Penggunaan Storage

**Dashboard** → **Storage** → `writings-images` → Lihat total size

Free tier Supabase: **1GB storage**

### Cek Jumlah Database Rows

Jalankan di SQL Editor:
```sql
SELECT 
    COUNT(*) FILTER (WHERE key LIKE 'artikel:%') AS artikel,
    COUNT(*) FILTER (WHERE key LIKE 'buku:%') AS buku,
    COUNT(*) FILTER (WHERE key LIKE 'berita:%') AS berita,
    COUNT(*) FILTER (WHERE key LIKE 'karya:%') AS karya
FROM public.kv_store_46c3d36c;
```

Free tier Supabase: **500MB database**, **Unlimited rows**

### Backup Data

**Otomatis**: Supabase membuat backup harian (retained 7 hari di free tier)

**Manual**: 
1. **Database** → **Backups** → **Download backup**
2. Atau export via SQL:
```sql
COPY public.kv_store_46c3d36c TO '/tmp/backup.csv' WITH CSV HEADER;
```

---

## 🎉 Selesai!

Setup Supabase Anda sudah lengkap! Sekarang Anda bisa:

✅ Menambahkan artikel, buku, berita, dan karya tulis via Admin Dashboard
✅ Upload gambar untuk setiap konten
✅ Melihat konten di halaman public blog
✅ Mengedit dan menghapus konten

---

## 💡 Tips

1. **Gunakan Slug yang SEO-friendly**: Gunakan lowercase, dash-separated (contoh: `hukum-pidana-indonesia`)
2. **Optimasi Gambar**: Kompres gambar sebelum upload untuk menghemat storage
3. **Backup Berkala**: Download backup database setiap bulan
4. **Monitor Usage**: Cek dashboard untuk memastikan tidak melewati free tier limits

---

## 📞 Need Help?

Jika ada masalah atau pertanyaan:
1. Cek **Supabase Logs**: Dashboard → Logs & Reports
2. Baca **Supabase Docs**: https://supabase.com/docs
3. Atau tanyakan ke saya! 😊

---

**Generated for**: Dr. Rita Kartina Blog  
**Project ID**: zmnhzduscqfgrxxsqoyo  
**Date**: Desember 2024
