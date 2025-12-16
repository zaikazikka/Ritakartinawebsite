# 🚀 QUICK FIX - Error Upload (Bucket not found / MIME type not supported)

## ⚡ Solusi Super Cepat (3 Menit)

Ikuti langkah ini jika muncul error saat upload gambar atau PDF:

### 1️⃣ Buka Supabase Dashboard
👉 https://supabase.com/dashboard
- Login dengan akun Supabase
- Pilih project: **zmnhzduscqfgrxxsqoyo**

### 2️⃣ Buat Bucket (Jika Belum Ada)
Klik **Storage** → **New bucket**

```
┌─────────────────────────────────────┐
│ Name: writings-images               │
│                                     │
│ ☑ Public bucket    ← CENTANG!       │
│                                     │
│ Allowed MIME types:                 │
│ ● Allow all MIME types  ← PILIH!    │
│                                     │
│         [Create bucket]             │
└─────────────────────────────────────┘
```

**PENTING:**
- ✅ Name: `writings-images` (huruf kecil, pakai dash)
- ✅ Public bucket: WAJIB CENTANG
- ✅ Allowed MIME types: Pilih "Allow all MIME types"

### 3️⃣ Atau Update Bucket yang Sudah Ada
Jika bucket sudah ada tapi masih error:

Klik **Storage** → **writings-images** → **Configuration**
- Pilih **"Allow all MIME types"**
- Klik **Save**

### 4️⃣ Selesai!
- Refresh halaman admin (F5)
- Coba upload lagi
- Upload berhasil! 🎉

---

## 📋 Checklist Cepat

- [ ] Bucket "writings-images" sudah dibuat
- [ ] Bucket sudah diset Public (✅)
- [ ] Allowed MIME types = "Allow all" (✅)
- [ ] Sudah refresh halaman admin
- [ ] Upload berhasil!

---

## 🆘 Masih Error?

Baca panduan lengkap:
- **SUPABASE_SETUP.md** - Panduan lengkap setup
- **FIX_PDF_UPLOAD_ERROR.md** - Fix error MIME type khusus PDF

Atau hubungi:
- WhatsApp: +62 878 52429087
- Email: Rikamacetta88@gmail.com

---

**Project ID:** zmnhzduscqfgrxxsqoyo
**Bucket Name:** writings-images
**Update:** 15 Desember 2024
