# Panduan Setup Supabase untuk Dr. Rita Kartina Blog

## 🔐 Setup Authentication (Untuk Login Admin)

### Membuat User Admin Pertama

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project: **zmnhzduscqfgrxxsqoyo**
3. Navigasi ke **Authentication** → **Users**
4. Klik tombol **Add user** 
5. Isi form:
   - **Email**: masukkan email admin (contoh: zaikazikka@gmail.com atau Rikamacetta88@gmail.com)
   - **Password**: buat password yang kuat (min. 6 karakter)
   - **Auto Confirm User**: ✅ **CENTANG INI** (agar tidak perlu konfirmasi email)
6. Klik **Create user**
7. Sekarang Anda bisa login menggunakan email dan password tersebut

### Troubleshooting Login Error

Jika muncul error "Invalid login credentials":
- ✅ Pastikan user sudah dibuat di Supabase Dashboard
- ✅ Pastikan "Auto Confirm User" dicentang saat membuat user
- ✅ Cek email dan password yang dimasukkan sudah benar
- ✅ Jika perlu, reset password user di Dashboard

---

## 📦 Setup Storage (Untuk Upload Gambar & Dokumen)

### Membuat Bucket Storage

**GUNAKAN 1 BUCKET UNTUK SEMUA FILE (Gambar + Dokumen)**

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project: **zmnhzduscqfgrxxsqoyo**
3. Navigasi ke **Storage** di sidebar kiri
4. Klik tombol **New bucket** atau **Create bucket**
5. Isi form:
   - **Name**: `writings-images` (harus persis seperti ini - huruf kecil, pakai dash)
   - **Public bucket**: ✅ **WAJIB CENTANG!** (agar file bisa diakses publik)
   - **File size limit**: 50 MB (opsional)
   - **Allowed MIME types**: ✅ **PILIH "Allow all MIME types"** (cara termudah dan recommended!)
     
     ATAU jika ingin restrict secara manual, tambahkan satu per satu:
     - `image/*` (untuk semua gambar)
     - `application/pdf` (untuk file PDF)
     - `application/vnd.ms-powerpoint` (untuk file PPT)
     - `application/vnd.openxmlformats-officedocument.presentationml.presentation` (untuk file PPTX)

6. Klik **Create bucket**
7. ✅ Selesai! Bucket sudah siap digunakan untuk upload gambar dan dokumen.

### Mengatur Allowed MIME Types di Bucket yang Sudah Ada

Jika bucket "writings-images" sudah ada tapi upload PDF/PPT gagal:

1. Buka **Storage** → Klik nama bucket **writings-images**
2. Klik tab **Configuration** atau ikon **Settings** (gear icon ⚙️)
3. Cari bagian **Allowed MIME types**
4. Pilih **"Allow all MIME types"** (recommended)
   
   ATAU klik **"Restrict MIME types"** dan tambahkan manual:
   - `image/*`
   - `application/pdf`
   - `application/vnd.ms-powerpoint`
   - `application/vnd.openxmlformats-officedocument.presentationml.presentation`

5. Klik **Save** atau **Update**
6. Refresh halaman admin dan coba upload lagi

### Troubleshooting Upload Error

Jika muncul error "mime type application/pdf is not supported":

**✅ SOLUSI 1: Update Allowed MIME Types**
- Ikuti langkah "Mengatur Allowed MIME Types" di atas
- Pastikan semua MIME types sudah ditambahkan
- Refresh halaman admin dashboard dan coba upload lagi

**✅ SOLUSI 2: Buat Bucket Baru (Jika Cara 1 Gagal)**
1. Hapus bucket "writings-images" yang lama
2. Buat bucket baru dengan nama yang sama
3. Ikuti langkah "Membuat Bucket Storage" di atas
4. **PENTING**: Centang "Public bucket" dan tambahkan semua MIME types

**✅ SOLUSI 3: Nonaktifkan MIME Type Restriction (Tidak Disarankan)**
1. Buka bucket **writings-images** → **Configuration**
2. Matikan/Disable "Restrict file upload by MIME type"
3. Save changes

---

## 📊 Database (Sudah Otomatis Setup)

Database KV Store dengan nama `kv_store_46c3d36c` sudah otomatis dibuat.

Tidak perlu setup manual untuk database.

---

## ✅ Checklist Setup

- [ ] User admin sudah dibuat di Authentication → Users
- [ ] Auto Confirm User dicentang saat membuat user
- [ ] Bucket "writings-images" sudah dibuat
- [ ] Bucket sudah diset sebagai Public
- [ ] Allowed MIME types sudah ditambahkan (image/*, PDF, PPT, PPTX)
- [ ] Berhasil login ke admin dashboard
- [ ] Berhasil upload gambar
- [ ] Berhasil upload PDF/PPT

---

## 🆘 Bantuan Tambahan

Jika masih ada masalah:

1. **Cek Console Browser**: Buka Developer Tools (F12) → Console untuk melihat error detail
2. **Cek Supabase Logs**: Dashboard → Logs → untuk melihat error di sisi server
3. **Restart Browser**: Kadang cache browser menyebabkan masalah
4. **Clear Browser Cache**: Hapus cache dan cookies untuk domain Supabase

---

## 📝 Catatan Penting

- **Project ID**: zmnhzduscqfgrxxsqoyo
- **Bucket Name**: writings-images (jangan diubah)
- **KV Store Table**: kv_store_46c3d36c (jangan diubah)
- **Email Admin**: Rikamacetta88@gmail.com
- **Kontak**: +62 878 52429087 (WhatsApp)