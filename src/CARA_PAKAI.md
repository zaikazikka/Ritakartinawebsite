# 📘 Panduan Lengkap Menggunakan Blog Rita Kartina

## 🎯 Ringkasan Cepat

Blog ini adalah website personal untuk **Dr. Rita Kartina, S.H., M.H., M.AP.** dengan:
- ✅ **Frontend**: React + Tailwind CSS dengan tema abu-abu metalik (#1a1d23) dan abu muda (#f3f4f6)
- ✅ **Backend**: Supabase (PostgreSQL database + Storage untuk gambar)
- ✅ **Admin Dashboard**: Kelola semua konten (artikel, buku, berita, karya tulis, galeri, video, dll)
- ✅ **Upload Gambar**: Langsung ke Supabase Storage dengan preview
- ✅ **Responsive**: Mobile-friendly

---

## 🚀 Langkah Setup Database (WAJIB DILAKUKAN DULU!)

### 1️⃣ Buka Supabase Dashboard

Pergi ke: https://supabase.com/dashboard/project/zmnhzduscqfgrxxsqoyo

### 2️⃣ Setup Database Table

1. Klik **SQL Editor** di sidebar kiri
2. Klik tombol **New query**
3. Copy-paste SQL dari file `SETUP_DATABASE.md` bagian **Langkah 1**
4. Klik **Run** (atau tekan F5)
5. Seharusnya muncul pesan sukses ✅

### 3️⃣ Setup Storage Bucket

**Opsi A: Via UI (Lebih Mudah)**
1. Klik **Storage** di sidebar kiri
2. Klik **Create a new bucket**
3. Isi:
   - Name: `writings-images`
   - Public bucket: ✅ **CENTANG**
   - File size limit: `5242880` (5 MB)
   - Allowed MIME types: `image/jpeg`, `image/png`, `image/gif`, `image/webp`
4. Klik **Create bucket**

**Opsi B: Via SQL**
1. Buka **SQL Editor**
2. Copy-paste SQL dari file `SETUP_DATABASE.md` bagian **Langkah 2**
3. Klik **Run**

### 4️⃣ Verifikasi

Cek apakah berhasil:
- **Database** → **Tables** → Harus ada `kv_store_46c3d36c` ✅
- **Storage** → Harus ada bucket `writings-images` ✅

---

## 🔐 Cara Login ke Admin Dashboard

### 1️⃣ Akses Halaman Admin

Buka: `https://your-app-url.com/#admin`

ATAU tambahkan `#admin` di URL browser Anda

### 2️⃣ Login

**Default credentials** (jika belum diubah):
- **Username**: `admin`
- **Password**: `admin123`

> ⚠️ **PENTING**: Untuk keamanan, sebaiknya ubah password ini setelah pertama kali login!

### 3️⃣ Masuk ke Dashboard

Setelah login berhasil, Anda akan melihat dashboard dengan:
- 📊 **Statistik**: Total subscribers, contacts, articles, books, dll
- 📥 **Inbox**: Pesan kontak dan subscribers newsletter
- 📝 **Kelola Konten**: Artikel, buku, berita, karya tulis, video, galeri

---

## 📝 Kelola Konten di Admin Dashboard

### A. Artikel Blog

**Cara Menambah Artikel Baru:**

1. Klik tab **"Artikel"** di dashboard
2. Klik tombol **"+ Tambah Artikel"** (warna hijau)
3. Isi form:
   - **Judul**: Judul artikel (contoh: "Hukum Pidana dalam Era Digital")
   - **Konten**: Isi artikel lengkap (bisa panjang, gunakan paragraf)
   - **Ringkasan**: Ringkasan singkat untuk preview (1-2 kalimat)
   - **Penulis**: Default "Dr. Rita Kartina" (bisa diubah)
   - **Tanggal**: Pilih tanggal publikasi
   - **Kategori**: Pilih kategori (Hukum Pidana, Hukum Perdata, Hukum Tata Negara, dll)
   - **Tags**: Pisahkan dengan koma (contoh: `hukum, pidana, Indonesia`)
   - **Gambar**: Klik **"Choose File"** → Pilih gambar cover (max 5MB, format: JPG, PNG, GIF, WEBP)
     - Preview gambar akan muncul setelah dipilih
     - Pastikan gambar landscape (16:9) untuk tampilan terbaik
4. Klik **"Simpan"**
5. Artikel akan muncul di homepage dan halaman Blog

**Cara Edit Artikel:**
1. Klik icon **pensil** (Edit) di samping artikel
2. Ubah data yang ingin diubah
3. Klik **"Update"**

**Cara Hapus Artikel:**
1. Klik icon **tempat sampah** (Trash) di samping artikel
2. Konfirmasi penghapusan
3. Artikel akan terhapus permanen ⚠️

---

### B. Buku

**Cara Menambah Buku Baru:**

1. Klik tab **"Buku"**
2. Klik **"+ Tambah Buku"**
3. Isi form:
   - **Judul**: Judul buku
   - **Penulis**: Nama penulis (default: Dr. Rita Kartina)
   - **Deskripsi**: Sinopsis/deskripsi buku
   - **Penerbit**: Nama penerbit
   - **Tahun**: Tahun terbit (contoh: 2024)
   - **ISBN**: Nomor ISBN (opsional)
   - **Cover**: Upload gambar cover buku
4. Klik **"Simpan"**

Tips:
- Gunakan cover buku resolusi tinggi (minimal 800x1200px)
- Format portrait (vertikal) lebih baik untuk cover buku

---

### C. Berita

**Cara Menambah Berita:**

1. Klik tab **"Berita"**
2. Klik **"+ Tambah Berita"**
3. Isi form:
   - **Judul**: Judul berita
   - **Konten**: Isi berita lengkap
   - **Tanggal**: Tanggal berita
   - **Sumber**: Sumber berita (contoh: "Kompas.com", "Media Internal")
   - **Gambar**: Upload foto berita
4. Klik **"Simpan"**

---

### D. Karya Tulis

**Cara Menambah Karya Tulis:**

1. Klik tab **"Karya Tulis"**
2. Klik **"+ Tambah Karya Tulis"**
3. Isi form:
   - **Judul**: Judul paper/jurnal/karya tulis
   - **Tipe**: Pilih "Hukum" atau "Administrasi Publik"
   - **Deskripsi**: Deskripsi singkat
   - **Tanggal**: Tanggal publikasi
   - **File URL**: Link ke file PDF (contoh: Google Drive link, Dropbox, dll)
   - **Gambar**: Upload thumbnail/cover
4. Klik **"Simpan"**

Tips untuk File URL:
- Upload PDF ke Google Drive → Klik kanan → Get link → Set to "Anyone with the link"
- Copy link tersebut ke field "File URL"

---

### E. Galeri Foto

**Cara Menambah Foto ke Galeri:**

1. Klik tab **"Galeri"**
2. Klik **"+ Tambah Galeri"**
3. Isi form:
   - **Judul**: Judul foto/album
   - **Deskripsi**: Deskripsi foto (opsional)
   - **Gambar**: Upload foto
4. Klik **"Simpan"**

Tips:
- Gunakan foto landscape (horizontal) untuk tampilan grid yang rapi
- Resolusi minimal 1200x800px
- Bisa upload foto acara, seminar, kegiatan kampus, dll

---

### F. Video/Podcast

**Cara Menambah Video:**

1. Klik tab **"Video"**
2. Klik **"+ Tambah Video"**
3. Isi form:
   - **Judul**: Judul video
   - **Deskripsi**: Deskripsi video
   - **URL**: Link YouTube video (contoh: `https://www.youtube.com/watch?v=xxxxx`)
   - **Tanggal**: Tanggal upload
4. Klik **"Simpan"**

Tips:
- Video akan ditampilkan sebagai embedded YouTube player
- Pastikan video sudah di-set ke **Public** di YouTube

---

## 📥 Kelola Inbox

### Pesan Kontak

1. Klik tab **"Inbox"**
2. Klik sub-tab **"Kontak"**
3. Anda akan melihat daftar semua pesan yang masuk dari form kontak
4. Klik pesan untuk melihat detail
5. Klik **"Tandai Sudah Dibaca"** untuk menandai pesan sudah ditangani

**Data yang ditampilkan:**
- Nama pengirim
- Email
- Subjek
- Pesan
- Tanggal kirim
- Status (sudah dibaca/belum)

### Subscribers Newsletter

1. Klik sub-tab **"Subscribers"**
2. Lihat daftar email subscribers
3. Export data jika diperlukan (untuk email marketing)

---

## 🎨 Struktur Navigasi Website

Website memiliki 8 menu utama:

### 1. **Home** (`/`)
- Hero section dengan foto Dr. Rita Kartina
- Profil singkat
- Latest articles
- Buku terbaru
- Newsletter signup

### 2. **Tentang**
Dropdown dengan 2 submenu:
- **Profil**: Biografi lengkap, pendidikan, pengalaman
- **Galeri**: Foto-foto kegiatan

### 3. **Karya Tulis**
Dropdown dengan 2 submenu:
- **Hukum**: Karya tulis bidang hukum
- **Administrasi Publik**: Karya tulis bidang administrasi

### 4. **Hobi**
Halaman khusus tentang hobi Dr. Rita Kartina

### 5. **Buku**
Katalog buku yang ditulis/diterbitkan

### 6. **Berita**
Berita terkait Dr. Rita Kartina atau bidang hukum

### 7. **Blog**
Daftar semua artikel blog dengan filter kategori

### 8. **Kontak**
Form kontak dan informasi kontak

---

## 🎨 Tema Warna

Website menggunakan 2 warna utama yang bergantian per section:

- **Abu-abu Metalik**: `#1a1d23` (untuk section gelap)
- **Abu Muda**: `#f3f4f6` (untuk section terang)

Background bergantian secara berurutan untuk setiap section, memberikan kontras visual yang jelas.

---

## 📱 Responsive Design

Website sudah **mobile-friendly**:
- Navbar berubah menjadi hamburger menu di mobile
- Layout berubah dari grid ke kolom di layar kecil
- Font size menyesuaikan dengan ukuran layar

---

## ⚠️ Troubleshooting

### Masalah: "Error loading data"

**Solusi:**
1. Cek apakah database table `kv_store_46c3d36c` sudah dibuat
2. Buka Supabase Dashboard → SQL Editor → Run setup SQL
3. Refresh halaman admin

### Masalah: "Upload image failed"

**Solusi:**
1. Cek apakah storage bucket `writings-images` sudah dibuat
2. Pastikan bucket di-set ke **Public**
3. Cek ukuran file (max 5MB)
4. Cek format file (hanya JPG, PNG, GIF, WEBP)

### Masalah: "Unauthorized" saat login

**Solusi:**
1. Pastikan credentials benar (default: admin/admin123)
2. Cek apakah RLS policies sudah di-setup di database
3. Clear browser cache dan coba lagi

### Masalah: Gambar tidak muncul setelah upload

**Solusi:**
1. Cek apakah bucket `writings-images` di-set ke **Public**
2. Buka Supabase Dashboard → Storage → writings-images → Configuration → Pastikan "Public bucket" = Yes
3. Atau jalankan SQL policy untuk storage (lihat SETUP_DATABASE.md)

---

## 🔒 Keamanan

### Ubah Password Admin

**Cara 1: Via Supabase Dashboard (Recommended)**
1. Buka Supabase Dashboard → SQL Editor
2. Jalankan SQL:
```sql
UPDATE kv_store_46c3d36c 
SET value = '{"username": "admin", "password": "PASSWORD_BARU_ANDA"}'::jsonb
WHERE key = 'admin:credentials';
```
3. Ganti `PASSWORD_BARU_ANDA` dengan password yang Anda inginkan
4. Klik Run

**Cara 2: Via Code (Advanced)**
Edit file `/utils/api.ts` dan ubah validasi login dengan hashing yang lebih aman.

### Tips Keamanan:
- ⚠️ Jangan share credentials admin ke sembarang orang
- ⚠️ Gunakan password yang kuat (minimal 12 karakter, kombinasi huruf besar/kecil/angka/simbol)
- ✅ Pertimbangkan mengaktifkan Supabase Auth untuk keamanan lebih baik
- ✅ Set RLS policies yang lebih ketat untuk production

---

## ���� Data Structure (Untuk Developer)

Data di Supabase disimpan di table `kv_store_46c3d36c` dengan pattern:

| Key Pattern | Value (JSONB) | Deskripsi |
|------------|---------------|-----------|
| `articles:<id>` | `{title, content, excerpt, author, date, category, tags, image}` | Data artikel |
| `books:<id>` | `{title, author, description, publisher, year, isbn, cover}` | Data buku |
| `news:<id>` | `{title, content, date, source, image}` | Data berita |
| `writings:<id>` | `{title, type, description, date, file, image}` | Data karya tulis |
| `videos:<id>` | `{title, description, url, date}` | Data video |
| `gallery:<id>` | `{title, description, image}` | Data galeri |
| `contacts:<id>` | `{name, email, subject, message, date, read}` | Pesan kontak |
| `subscribers:<id>` | `{email, date}` | Email subscribers |
| `admin:credentials` | `{username, password}` | Admin login |

Gambar disimpan di Supabase Storage bucket `writings-images` dengan struktur:
```
writings-images/
  ├── uploads/
  │   ├── 1702468800000-abc123.jpg
  │   ├── 1702468800001-def456.png
  │   └── ...
```

---

## 🎉 Selesai!

Anda sekarang siap menggunakan blog Rita Kartina! 

**Next Steps:**
1. ✅ Setup database (lihat SETUP_DATABASE.md)
2. ✅ Login ke admin dashboard
3. ✅ Ubah password default
4. ✅ Tambahkan konten pertama Anda
5. ✅ Customize profil dan informasi
6. 🚀 Publish dan share website Anda!

---

## 📞 Butuh Bantuan?

Jika ada pertanyaan atau masalah:
1. Cek file `SETUP_DATABASE.md` untuk setup database
2. Cek file `API_DOCUMENTATION.md` untuk dokumentasi API
3. Buka Supabase Dashboard untuk cek logs dan errors

Happy blogging! 🎊
