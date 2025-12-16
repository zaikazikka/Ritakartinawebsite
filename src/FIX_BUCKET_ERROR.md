# ❌ FIX: Error "Bucket not found"

## Error yang Muncul:
```
StorageApiError: Bucket not found
```

## 🚀 SOLUSI CEPAT (3 Menit)

Error ini muncul karena bucket "writings-images" **belum dibuat** di Supabase Storage.

### Langkah 1: Buka Supabase Dashboard
1. Klik link: https://supabase.com/dashboard
2. Login dengan akun Supabase Anda
3. Pilih project: **zmnhzduscqfgrxxsqoyo**

### Langkah 2: Buat Bucket
1. Di sidebar kiri, klik menu **Storage**
2. Klik tombol **New bucket** (tombol hijau di pojok kanan atas)
3. Isi form dengan detail berikut:

```
┌─────────────────────────────────────────────┐
│ Name: writings-images                       │
│       ↑ ketik persis seperti ini            │
│                                             │
│ ☑ Public bucket    ← WAJIB DICENTANG!       │
│                                             │
│ File size limit: 50 MB (opsional)           │
│                                             │
│ Allowed MIME types:                         │
│ ● Allow all MIME types  ← PILIH INI!        │
│                                             │
│         [Create bucket]                     │
└─────────────────────────────────────────────┘
```

**PENTING:**
- ✅ **Name**: `writings-images` (huruf kecil, pakai dash, tanpa spasi)
- ✅ **Public bucket**: HARUS DICENTANG!
- ✅ **Allowed MIME types**: Pilih **"Allow all MIME types"**

### Langkah 3: Selesai!
- Kembali ke halaman admin blog
- Refresh halaman (F5 atau Ctrl+R)
- Coba upload gambar atau PDF lagi
- Upload seharusnya berhasil! 🎉

---

## ✅ Verifikasi Bucket Sudah Benar

Setelah membuat bucket, pastikan:

1. **Buka Storage** di Supabase Dashboard
2. **Lihat daftar bucket** - harus ada bucket bernama `writings-images`
3. **Klik bucket tersebut** → Klik tab **Configuration**
4. **Cek settingnya:**
   - Public: ✅ ON (hijau)
   - Allowed MIME types: "All MIME types allowed" atau manual: `image/*`, `application/pdf`, dll

---

## 🔍 Troubleshooting

### Masalah 1: Masih error "Bucket not found"
**Solusi:**
- Pastikan nama bucket persis: `writings-images` (tanpa typo)
- Refresh browser (Ctrl+Shift+R untuk hard refresh)
- Logout dan login lagi ke admin dashboard

### Masalah 2: Upload gambar berhasil, tapi upload PDF gagal
**Solusi:**
- Bucket sudah ada tapi MIME types salah
- Buka bucket → Configuration → Allowed MIME types
- Pilih **"Allow all MIME types"**
- Save dan coba lagi

### Masalah 3: Error "Object not found" atau 404
**Solusi:**
- Bucket tidak public
- Buka bucket → Settings
- Centang "Public bucket"
- Save

---

## 📸 Gambar Bantuan

Jika bingung, ini tampilan yang benar di Supabase Dashboard:

**Menu Storage harus tampak seperti ini:**
```
Storage
  └── writings-images (public) ✅
```

**BUKAN seperti ini:**
```
Storage
  └── (kosong, tidak ada bucket) ❌
```

---

## 🆘 Masih Gagal?

Jika setelah membuat bucket masih error:

1. **Cek Console Browser:**
   - Tekan F12
   - Klik tab Console
   - Screenshot error yang muncul

2. **Cek Project ID:**
   - Pastikan Anda berada di project yang benar: `zmnhzduscqfgrxxsqoyo`

3. **Cek Connection:**
   - Pastikan internet stabil
   - Coba logout dari Supabase Dashboard dan login lagi

4. **Hubungi Support:**
   - WhatsApp: +62 878 52429087
   - Email: Rikamacetta88@gmail.com

---

## ✅ Checklist Setup Lengkap

Pastikan semua berikut ini sudah dilakukan:

- [ ] Bucket "writings-images" sudah dibuat
- [ ] Bucket sudah diset sebagai **Public**
- [ ] Allowed MIME types diset **"Allow all MIME types"**
- [ ] Sudah refresh halaman admin dashboard
- [ ] Sudah coba upload gambar → Berhasil!
- [ ] Sudah coba upload PDF → Berhasil!
- [ ] Tidak ada error lagi! 🎉

---

## 📝 Info Teknis

**Bucket yang digunakan:** `writings-images`
- Untuk gambar: JPG, PNG, WebP, GIF, dll
- Untuk dokumen: PDF, PPT, PPTX

Semua file disimpan dalam 1 bucket untuk kemudahan management.

---

**Update terakhir:** 15 Desember 2024
