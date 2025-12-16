# 🚀 Rita Kartina Blog - Backend API Documentation

Backend ini menggunakan **Supabase** (100% GRATIS) dengan Key-Value Store untuk menyimpan data.

## 📡 Base URL
```
https://{projectId}.supabase.co/functions/v1/make-server-46c3d36c
```

## 🔐 Authentication
Semua request memerlukan header:
```javascript
Authorization: Bearer {publicAnonKey}
```

---

## 📚 API Endpoints

### 1. **ARTICLES** (Artikel Blog & Hobi)

#### Get All Articles
```http
GET /articles
```

#### Get Single Article
```http
GET /articles/:id
```

#### Create Article
```http
POST /articles
Content-Type: application/json

{
  "title": "Judul Artikel",
  "excerpt": "Ringkasan artikel",
  "content": "Konten lengkap artikel...",
  "category": "Hukum Pidana",
  "author": "Dr. Rita Kartina, S.H., M.H., M.AP.",
  "image": "https://...",
  "date": "12 November 2024",
  "readTime": "8 menit",
  "tags": ["Hukum", "Pidana"]
}
```

#### Update Article
```http
PUT /articles/:id
Content-Type: application/json

{
  "title": "Judul Baru",
  "content": "..."
}
```

#### Delete Article
```http
DELETE /articles/:id
```

---

### 2. **BOOKS** (Buku & Publikasi)

#### Get All Books
```http
GET /books
```

#### Create Book
```http
POST /books
Content-Type: application/json

{
  "title": "Judul Buku",
  "subtitle": "Subtitle",
  "description": "Deskripsi buku",
  "year": "2024",
  "pages": "450 halaman",
  "isbn": "978-979-xxx-xxx-x",
  "publisher": "Nama Penerbit",
  "rating": 4.8,
  "reviews": 125,
  "image": "https://...",
  "buyLink": "https://..."
}
```

---

### 3. **NEWS** (Berita & Liputan)

#### Get All News
```http
GET /news
```

#### Create News
```http
POST /news
Content-Type: application/json

{
  "title": "Judul Berita",
  "excerpt": "Ringkasan berita",
  "category": "Seminar",
  "date": "10 November 2024",
  "readTime": "5 menit",
  "source": "Media Indonesia",
  "image": "https://..."
}
```

---

### 4. **VIDEOS** (Podcast & Video)

#### Get All Videos
```http
GET /videos
```

#### Create Video
```http
POST /videos
Content-Type: application/json

{
  "title": "Judul Video",
  "category": "Seminar",
  "date": "5 November 2024",
  "duration": "45:32",
  "views": "12.5K",
  "image": "https://...",
  "videoUrl": "https://youtube.com/..."
}
```

---

### 5. **GALLERY** (Galeri Foto)

#### Get All Gallery Items
```http
GET /gallery
```

#### Create Gallery Item
```http
POST /gallery
Content-Type: application/json

{
  "title": "Judul Foto",
  "category": "Seminar",
  "image": "https://..."
}
```

---

### 6. **WRITINGS** (Karya Tulis)

#### Get All Writings
```http
GET /writings
```

#### Create Writing
```http
POST /writings
Content-Type: application/json

{
  "title": "Judul Karya Tulis",
  "type": "Jurnal",
  "category": "Hukum Pidana",
  "year": "2024",
  "publisher": "Jurnal Hukum Indonesia",
  "description": "Deskripsi...",
  "downloadUrl": "https://..."
}
```

---

### 7. **NEWSLETTER** (Berlangganan)

#### Subscribe
```http
POST /subscribe
Content-Type: application/json

{
  "email": "nama@email.com"
}
```

#### Get All Subscribers
```http
GET /subscribers
```

---

### 8. **CONTACT** (Form Kontak)

#### Submit Contact
```http
POST /contact
Content-Type: application/json

{
  "name": "Nama Lengkap",
  "email": "email@example.com",
  "subject": "Subjek Pesan",
  "message": "Isi pesan..."
}
```

#### Get All Contacts
```http
GET /contacts
```

#### Mark as Read
```http
PUT /contacts/:id/read
```

---

## 💻 Frontend Usage Examples

### Newsletter Subscription
```javascript
import { newsletterAPI } from './utils/api';

const subscribe = async (email) => {
  try {
    await newsletterAPI.subscribe(email);
    console.log("Berhasil berlangganan!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Submit Contact Form
```javascript
import { contactAPI } from './utils/api';

const submitForm = async (formData) => {
  try {
    await contactAPI.submit(formData);
    console.log("Pesan terkirim!");
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

### Get All Articles
```javascript
import { articlesAPI } from './utils/api';

const loadArticles = async () => {
  try {
    const response = await articlesAPI.getAll();
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
};
```

---

## 🎯 Admin Dashboard

Akses admin dashboard di:
```
https://your-domain.com/#admin
```

Dashboard menampilkan:
- ✅ Statistik lengkap (artikel, buku, berita, dll)
- ✅ Daftar pesan kontak
- ✅ Daftar subscriber newsletter
- ✅ Mark contact sebagai sudah dibaca

---

## 🆓 Supabase Free Tier

Backend ini 100% GRATIS dengan limit:
- **Database**: 500 MB
- **API Requests**: 50,000/bulan
- **Storage**: 1 GB
- **Authentication**: Unlimited users

Lebih dari cukup untuk personal blog!

---

## 🔧 Database Structure

Menggunakan Key-Value Store dengan prefix:
- `article:*` - Artikel blog & hobi
- `book:*` - Buku & publikasi
- `news:*` - Berita & liputan
- `video:*` - Podcast & video
- `gallery:*` - Galeri foto
- `writing:*` - Karya tulis
- `subscriber:*` - Newsletter subscribers
- `contact:*` - Pesan kontak

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "data": [...] // atau object
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## 🚨 Important Notes

⚠️ **Figma Make tidak dirancang untuk mengumpulkan informasi pribadi (PII) atau mengamankan data sensitif.**

Untuk aplikasi production:
- Tambahkan autentikasi admin
- Implementasi Row Level Security
- Backup data secara berkala
- Patuhi regulasi perlindungan data (GDPR, UU PDP)

---

## 📞 Support

Untuk pertanyaan atau bantuan, hubungi:
- Email: konsultasi@ritakartina.com
- WhatsApp: +62 812 3456 7890
