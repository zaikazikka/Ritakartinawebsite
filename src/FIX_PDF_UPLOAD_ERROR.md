# ❌ FIX: Error Upload PDF/PPT

## Error yang Muncul:
```
StorageApiError: mime type application/pdf is not supported
```

## 🚀 SOLUSI CEPAT (2 Menit)

Error ini terjadi karena bucket "writings-images" **belum mengizinkan MIME type** untuk file PDF/PPT.

### Langkah 1: Buka Bucket Configuration
1. Klik link: https://supabase.com/dashboard
2. Login dengan akun Supabase Anda
3. Pilih project: **zmnhzduscqfgrxxsqoyo**
4. Klik menu **Storage** di sidebar kiri
5. Klik bucket **writings-images**

### Langkah 2: Update Allowed MIME Types
1. Klik tab **Configuration** (atau icon ⚙️ Settings)
2. Scroll ke bagian **Allowed MIME types**
3. **PILIH: "Allow all MIME types"** ← CARA TERMUDAH!
   
   ATAU jika tidak ada pilihan itu:
   - Klik **"Add MIME type"**
   - Tambahkan satu per satu:
     - `image/*`
     - `application/pdf`
     - `application/vnd.ms-powerpoint`
     - `application/vnd.openxmlformats-officedocument.presentationml.presentation`

4. Klik **Save** atau **Update**

### Langkah 3: Test Upload
- Kembali ke halaman admin blog
- Refresh halaman (F5)
- Coba upload PDF/PPT lagi
- Upload seharusnya berhasil! 🎉

---

## 🎯 Cara Tercepat: Allow All MIME Types

Ini cara paling simple dan aman:

1. **Storage** → **writings-images** → **Configuration**
2. **Allowed MIME types**: Pilih **"Allow all MIME types"**
3. **Save**

Selesai! Semua jenis file (gambar, PDF, PPT) bisa diupload.

---

## ✅ Verifikasi Setting Sudah Benar

Setelah update, pastikan:

1. Buka bucket **writings-images** → tab **Configuration**
2. Lihat bagian **Allowed MIME types**
3. Harus tertulis: **"All MIME types allowed"** ✅
   
   ATAU minimal ada:
   - ✅ `image/*`
   - ✅ `application/pdf`
   - ✅ `application/vnd.ms-powerpoint`
   - ✅ `application/vnd.openxmlformats-officedocument.presentationml.presentation`

---

## 🔍 Troubleshooting

### Masalah 1: Masih error setelah update MIME types
**Solusi:**
- Refresh halaman admin (Ctrl+Shift+R untuk hard refresh)
- Logout dan login lagi
- Clear browser cache

### Masalah 2: Tidak ada opsi "Allow all MIME types"
**Solusi:**
- Tambahkan MIME types secara manual (lihat daftar di atas)
- Pastikan semua 4 MIME types untuk gambar dan dokumen sudah ditambahkan
- Save dan refresh

### Masalah 3: Bisa upload gambar tapi tidak bisa PDF
**Solusi:**
- Berarti hanya `image/*` yang diizinkan
- Tambahkan MIME types untuk PDF:
  - `application/pdf`
  - `application/vnd.ms-powerpoint`
  - `application/vnd.openxmlformats-officedocument.presentationml.presentation`

---

## 📸 Screenshot Panduan

**Yang BENAR:**
```
Allowed MIME types
● Allow all MIME types    ← PILIH INI!
○ Restrict MIME types
```

**Atau:**
```
Allowed MIME types
○ Allow all MIME types
● Restrict MIME types:
  - image/*
  - application/pdf
  - application/vnd.ms-powerpoint
  - application/vnd.openxmlformats-officedocument...
```

---

## 🆘 Masih Error?

Jika setelah mengikuti semua langkah masih error:

1. **Screenshot error message** yang muncul
2. **Cek console browser** (F12 → Console tab)
3. **Verifikasi bucket name**: Harus `writings-images` (bukan typo)
4. **Hubungi support**:
   - WhatsApp: +62 878 52429087
   - Email: Rikamacetta88@gmail.com

---

## ✅ Checklist

Pastikan sudah:

- [ ] Bucket "writings-images" sudah ada
- [ ] Bucket sudah Public
- [ ] Allowed MIME types sudah diupdate (pilih "Allow all")
- [ ] Sudah save perubahan di Supabase
- [ ] Sudah refresh halaman admin
- [ ] Sudah coba upload PDF → Berhasil!
- [ ] Tidak ada error lagi! 🎉

---

**Update terakhir:** 15 Desember 2024
**Bucket yang digunakan:** writings-images (untuk semua file)
