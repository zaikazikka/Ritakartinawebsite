# ✅ Checklist Setup Blog Rita Kartina

Gunakan checklist ini untuk memastikan semua sudah berjalan dengan baik.

---

## 📋 Pre-Setup Checklist

- [x] **Project Supabase terkoneksi**
  - Project ID: `zmnhzduscqfgrxxsqoyo`
  - Credentials sudah terupdate di `/utils/supabase/info.tsx`

---

## 🗄️ Database Setup Checklist

### Step 1: Table Setup
- [ ] Buka Supabase Dashboard → SQL Editor
- [ ] Run SQL untuk create table `kv_store_46c3d36c`
- [ ] Verify: Buka Database → Tables → Table `kv_store_46c3d36c` muncul
- [ ] Verify: Table memiliki columns: `key`, `value`, `created_at`, `updated_at`
- [ ] Verify: RLS (Row Level Security) enabled

### Step 2: Admin Credentials
- [ ] SQL untuk insert admin credentials sudah dijalankan
- [ ] Verify: Query berikut mengembalikan data:
  ```sql
  SELECT * FROM kv_store_46c3d36c WHERE key = 'admin:credentials';
  ```
- [ ] Hasilnya: `{"username": "admin", "password": "admin123"}`

---

## 🗂️ Storage Setup Checklist

### Step 1: Create Bucket
- [ ] Buka Supabase Dashboard → Storage
- [ ] Bucket `writings-images` sudah dibuat
- [ ] Badge **"Public"** muncul di samping nama bucket
- [ ] File size limit: 5 MB
- [ ] Allowed MIME types: image/jpeg, image/png, image/gif, image/webp

### Step 2: Storage Policies
- [ ] RLS policies untuk storage sudah di-setup
- [ ] Verify: Bisa upload test file via Supabase UI
- [ ] Verify: Test file bisa diakses via public URL

---

## 🔐 Authentication Setup Checklist

### Admin Login
- [ ] Akses aplikasi dengan URL: `your-app-url/#admin`
- [ ] Halaman login muncul
- [ ] Login dengan username: `admin`, password: `admin123`
- [ ] Berhasil masuk ke Admin Dashboard
- [ ] Dashboard menampilkan statistik (subscribers, contacts, articles, dll)

### Security
- [ ] **PENTING**: Password admin sudah diubah dari default
- [ ] New password disimpan dengan aman (gunakan password manager)

---

## 📝 Admin Dashboard Features Checklist

### Inbox
- [ ] Tab "Inbox" bisa dibuka
- [ ] Sub-tab "Kontak" menampilkan list pesan (atau empty state)
- [ ] Sub-tab "Subscribers" menampilkan list email (atau empty state)

### Artikel
- [ ] Tab "Artikel" bisa dibuka
- [ ] Tombol "+ Tambah Artikel" berfungsi
- [ ] Form artikel muncul dengan fields: Judul, Konten, Ringkasan, Penulis, Tanggal, Kategori, Tags, Gambar
- [ ] Upload gambar berfungsi (preview muncul setelah select file)
- [ ] Simpan artikel berhasil
- [ ] Artikel muncul di list
- [ ] Edit artikel berfungsi
- [ ] Hapus artikel berfungsi

### Buku
- [ ] Tab "Buku" bisa dibuka
- [ ] Tombol "+ Tambah Buku" berfungsi
- [ ] Form buku muncul dengan fields yang benar
- [ ] Upload cover buku berhasil
- [ ] Simpan buku berhasil
- [ ] Buku muncul di list
- [ ] Edit/hapus berfungsi

### Berita
- [ ] Tab "Berita" bisa dibuka
- [ ] Form berita berfungsi
- [ ] Upload gambar berita berhasil
- [ ] CRUD (Create, Read, Update, Delete) berfungsi

### Karya Tulis
- [ ] Tab "Karya Tulis" bisa dibuka
- [ ] Form karya tulis berfungsi
- [ ] Dropdown tipe (Hukum/Administrasi Publik) berfungsi
- [ ] Upload gambar berhasil
- [ ] CRUD berfungsi

### Video
- [ ] Tab "Video" bisa dibuka
- [ ] Form video berfungsi
- [ ] URL YouTube bisa disimpan
- [ ] CRUD berfungsi

### Galeri
- [ ] Tab "Galeri" bisa dibuka
- [ ] Upload foto galeri berhasil
- [ ] CRUD berfungsi

---

## 🌐 Frontend Website Checklist

### Homepage
- [ ] Homepage bisa diakses
- [ ] Header/Navbar muncul dengan 8 menu utama
- [ ] Hero section dengan foto Dr. Rita Kartina muncul
- [ ] Gelar "Dr. RITA KARTINA, S.H., M.H., M.AP." ditampilkan
- [ ] Section Profil muncul
- [ ] Section Artikel (latest articles) muncul
- [ ] Section Buku muncul
- [ ] Section Newsletter signup muncul
- [ ] Section Kontak muncul
- [ ] Footer muncul

### Navigasi
- [ ] Menu **Home** berfungsi
- [ ] Menu **Tentang** dropdown berfungsi:
  - [ ] Submenu "Profil" berfungsi
  - [ ] Submenu "Galeri" berfungsi
- [ ] Menu **Karya Tulis** dropdown berfungsi:
  - [ ] Submenu "Hukum" berfungsi
  - [ ] Submenu "Administrasi Publik" berfungsi
- [ ] Menu **Hobi** berfungsi
- [ ] Menu **Buku** berfungsi
- [ ] Menu **Berita** berfungsi
- [ ] Menu **Blog** berfungsi
- [ ] Menu **Kontak** berfungsi

### Tema Warna
- [ ] Background bergantian antara abu metalik (#1a1d23) dan abu muda (#f3f4f6)
- [ ] Kontras warna jelas antar section
- [ ] Text readable di semua section

### Responsiveness
- [ ] Website responsive di desktop (1920px)
- [ ] Website responsive di tablet (768px)
- [ ] Website responsive di mobile (375px)
- [ ] Navbar berubah jadi hamburger menu di mobile
- [ ] Grid layout berubah jadi kolom di mobile

---

## 📤 Upload Gambar Checklist

### Test Upload
- [ ] Buat artikel baru dengan gambar
- [ ] Klik "Choose File" → Pilih gambar (JPG/PNG, < 5MB)
- [ ] Preview gambar muncul setelah select file
- [ ] Klik "Simpan"
- [ ] Artikel tersimpan dengan gambar
- [ ] Buka artikel di frontend → Gambar muncul
- [ ] Gambar loading dengan baik (tidak broken)

### Validasi
- [ ] Upload file > 5MB → Error muncul
- [ ] Upload file selain image (PDF, DOCX) → Error muncul
- [ ] Upload tanpa gambar → Tetap bisa simpan (gambar optional)

---

## 📧 Form Kontak & Newsletter Checklist

### Form Kontak
- [ ] Buka halaman Kontak
- [ ] Isi form: Nama, Email, Subjek, Pesan
- [ ] Klik "Kirim"
- [ ] Notifikasi sukses muncul
- [ ] Pesan masuk ke Admin Dashboard → Inbox → Kontak

### Newsletter Signup
- [ ] Isi email di form newsletter (di homepage)
- [ ] Klik "Subscribe"
- [ ] Notifikasi sukses muncul
- [ ] Email masuk ke Admin Dashboard → Inbox → Subscribers

---

## 🧪 Data Testing Checklist

### Create Sample Data
- [ ] Tambah minimal 3 artikel dengan gambar
- [ ] Tambah minimal 2 buku dengan cover
- [ ] Tambah minimal 2 berita
- [ ] Tambah minimal 2 karya tulis (1 Hukum, 1 Administrasi Publik)
- [ ] Tambah minimal 5 foto galeri
- [ ] Tambah minimal 1 video

### Verify Data Display
- [ ] Artikel muncul di homepage (latest articles)
- [ ] Artikel muncul di halaman Blog
- [ ] Buku muncul di halaman Buku
- [ ] Berita muncul di halaman Berita
- [ ] Karya tulis muncul di halaman Karya Tulis (terpisah Hukum & Admin Publik)
- [ ] Galeri muncul di halaman Galeri
- [ ] Video muncul di halaman Podcast/Video

---

## 🔍 Browser Testing Checklist

Test di berbagai browser:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (jika Mac)
- [ ] Mobile browser (Chrome/Safari mobile)

---

## 📊 Performance Checklist

- [ ] Halaman homepage load < 3 detik
- [ ] Gambar loading dengan lazy load
- [ ] Tidak ada console errors (buka F12 → Console)
- [ ] Tidak ada 404 errors di Network tab

---

## 🚀 Final Production Checklist

### Security
- [ ] Password admin sudah diubah dari default
- [ ] Supabase RLS policies sudah di-setup
- [ ] API keys tidak exposed di frontend

### Content
- [ ] Semua placeholder text sudah diganti dengan content asli
- [ ] Semua gambar placeholder sudah diganti dengan gambar asli
- [ ] Informasi kontak sudah akurat
- [ ] Profil Dr. Rita Kartina sudah lengkap

### SEO & Meta
- [ ] Title tag sudah custom
- [ ] Meta description sudah custom
- [ ] Favicon sudah di-set (optional)

### Legal
- [ ] Privacy policy page (jika diperlukan)
- [ ] Terms of service (jika diperlukan)

---

## ✅ FINAL CHECK

Sebelum launch:
- [ ] Semua checklist di atas sudah ✅
- [ ] Test end-to-end flow: upload content → tampil di frontend
- [ ] Backup credentials admin ke password manager
- [ ] Screenshot dashboard untuk dokumentasi
- [ ] Save Project URL & credentials dengan aman

---

## 🎉 READY TO LAUNCH!

Jika semua checklist sudah ✅, aplikasi Anda siap di-launch!

**Selamat!** 🚀

---

## 📝 Notes

Gunakan space di bawah untuk catatan pribadi:

```
[Tulis catatan Anda di sini]
```
