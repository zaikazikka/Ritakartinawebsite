import { useEffect, useState } from "react";
import { Mail, MessageSquare, BookOpen, Newspaper, Video, Image, FileText, X, Check, ArrowLeft, Plus, Edit, Trash2, LogOut, Upload, Calendar as CalendarIcon } from "lucide-react";
import { contactAPI, newsletterAPI, articlesAPI, booksAPI, newsAPI, videosAPI, galleryAPI, writingsAPI } from "../utils/api";
import { storageHelper } from "../utils/supabase/client";
import { toast } from "sonner@2.0.3";
import { Calendar } from "./ui/calendar";

interface DashboardStats {
  subscribers: number;
  contacts: number;
  articles: number;
  books: number;
  news: number;
  videos: number;
  gallery: number;
  writings: number;
}

type TabType = "inbox" | "articles" | "books" | "news" | "videos" | "gallery" | "writings" | "calendar";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("inbox");
  const [inboxTab, setInboxTab] = useState<"contacts" | "subscribers">("contacts");
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [articles, setArticles] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [writings, setWritings] = useState<any[]>([]);
  
  const [stats, setStats] = useState<DashboardStats>({
    subscribers: 0,
    contacts: 0,
    articles: 0,
    books: 0,
    news: 0,
    videos: 0,
    gallery: 0,
    writings: 0,
  });
  
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  
  // Additional images for gallery
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<string[]>([]);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  
  // Document file upload states for articles
  const [uploadingDocument, setUploadingDocument] = useState(false);
  const [selectedDocumentFile, setSelectedDocumentFile] = useState<File | null>(null);
  const [documentPreview, setDocumentPreview] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [
        subscribersRes,
        contactsRes,
        articlesRes,
        booksRes,
        newsRes,
        videosRes,
        galleryRes,
        writingsRes
      ] = await Promise.all([
        newsletterAPI.getSubscribers(),
        contactAPI.getAll(),
        articlesAPI.getAll(),
        booksAPI.getAll(),
        newsAPI.getAll(),
        videosAPI.getAll(),
        galleryAPI.getAll(),
        writingsAPI.getAll(),
      ]);

      setSubscribers(subscribersRes.data || []);
      setContacts(contactsRes.data || []);
      setArticles(articlesRes.data || []);
      setBooks(booksRes.data || []);
      setNews(newsRes.data || []);
      setVideos(videosRes.data || []);
      setGallery(galleryRes.data || []);
      setWritings(writingsRes.data || []);
      
      setStats({
        subscribers: subscribersRes.data?.length || 0,
        contacts: contactsRes.data?.length || 0,
        articles: articlesRes.data?.length || 0,
        books: booksRes.data?.length || 0,
        news: newsRes.data?.length || 0,
        videos: videosRes.data?.length || 0,
        gallery: galleryRes.data?.length || 0,
        writings: writingsRes.data?.length || 0,
      });
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Gagal memuat data");
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (contactId: string) => {
    try {
      await contactAPI.markAsRead(contactId);
      toast.success("Pesan ditandai sudah dibaca");
      loadData();
    } catch (error) {
      console.error("Error marking as read:", error);
      toast.error("Gagal menandai pesan");
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus item ini?")) return;
    
    try {
      switch (type) {
        case "articles":
          await articlesAPI.delete(id);
          break;
        case "books":
          await booksAPI.delete(id);
          break;
        case "news":
          await newsAPI.delete(id);
          break;
        case "videos":
          await videosAPI.delete(id);
          break;
        case "gallery":
          await galleryAPI.delete(id);
          break;
        case "writings":
          await writingsAPI.delete(id);
          break;
      }
      toast.success("Item berhasil dihapus");
      loadData();
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Gagal menghapus item");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    formData.forEach((value, key) => {
      // Skip file input, we handle it separately
      if (key !== 'imageFile' && key !== 'documentFile') {
        data[key] = value;
      }
    });

    // If there's a selected image file, upload it first
    if (selectedImageFile) {
      try {
        setUploadingImage(true);
        await storageHelper.initBucket(); // Init bucket jika belum ada
        
        // Upload ke folder yang sesuai berdasarkan tab aktif
        let folder = 'uploads';
        switch (activeTab) {
          case 'articles':
            folder = 'articles';
            break;
          case 'books':
            folder = 'books';
            break;
          case 'news':
            folder = 'news';
            break;
          case 'gallery':
            folder = 'gallery';
            break;
          case 'writings':
            folder = 'writings';
            break;
        }
        
        const imageUrl = await storageHelper.uploadImage(selectedImageFile, folder);
        
        // Set imageUrl atau coverUrl tergantung tipe konten
        if (activeTab === 'books') {
          data.coverUrl = imageUrl;
        } else {
          data.imageUrl = imageUrl;
        }
        
        toast.success("Gambar berhasil diupload");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Gagal mengupload gambar");
        setUploadingImage(false);
        return;
      } finally {
        setUploadingImage(false);
      }
    }

    // Handle document file upload for articles
    if (activeTab === 'articles' && selectedDocumentFile) {
      try {
        setUploadingDocument(true);
        await storageHelper.initBucket();
        
        const documentUrl = await storageHelper.uploadDocument(selectedDocumentFile, 'documents');
        data.documentUrl = documentUrl;
        data.documentName = selectedDocumentFile.name;
        
        toast.success("Dokumen berhasil diupload");
      } catch (error: any) {
        console.error("Error uploading document:", error);
        
        // Show detailed error message
        const errorMessage = error?.message || "Gagal mengupload dokumen";
        
        if (errorMessage.includes('KONFIGURASI BUCKET')) {
          // Show multi-line error in toast
          toast.error(errorMessage, { duration: 10000 });
        } else {
          toast.error(errorMessage);
        }
        
        setUploadingDocument(false);
        return;
      } finally {
        setUploadingDocument(false);
      }
    }

    // Handle additional images for gallery
    if (activeTab === 'gallery' && additionalImageFiles.length > 0) {
      try {
        setUploadingImage(true);
        await storageHelper.initBucket();
        
        const additionalUrls: string[] = [];
        for (const file of additionalImageFiles) {
          const url = await storageHelper.uploadImage(file, 'gallery');
          additionalUrls.push(url);
        }
        
        // Combine with existing content images if editing
        const existingContentImages = editingItem?.contentImages || [];
        data.contentImages = [...existingContentImages, ...additionalUrls];
        
        toast.success(`${additionalUrls.length} foto tambahan berhasil diupload`);
        setUploadingImage(false);
      } catch (error) {
        console.error("Error uploading additional images:", error);
        toast.error("Gagal mengupload beberapa foto");
        setUploadingImage(false);
      }
    }

    try {
      switch (activeTab) {
        case "articles":
          if (editingItem) {
            await articlesAPI.update(editingItem.id.replace("article:", ""), data);
            toast.success("Artikel berhasil diupdate");
          } else {
            await articlesAPI.create(data);
            toast.success("Artikel berhasil ditambahkan");
          }
          break;
        case "books":
          if (editingItem) {
            await booksAPI.update(editingItem.id.replace("book:", ""), data);
            toast.success("Buku berhasil diupdate");
          } else {
            await booksAPI.create(data);
            toast.success("Buku berhasil ditambahkan");
          }
          break;
        case "news":
          if (editingItem) {
            await newsAPI.update(editingItem.id.replace("news:", ""), data);
            toast.success("Berita berhasil diupdate");
          } else {
            await newsAPI.create(data);
            toast.success("Berita berhasil ditambahkan");
          }
          break;
        case "videos":
          if (editingItem) {
            await videosAPI.update(editingItem.id.replace("video:", ""), data);
            toast.success("Video berhasil diupdate");
          } else {
            await videosAPI.create(data);
            toast.success("Video berhasil ditambahkan");
          }
          break;
        case "gallery":
          if (editingItem) {
            await galleryAPI.update(editingItem.id.replace("gallery:", ""), data);
            toast.success("Galeri berhasil diupdate");
          } else {
            await galleryAPI.create(data);
            toast.success("Galeri berhasil ditambahkan");
          }
          break;
        case "writings":
          if (editingItem) {
            await writingsAPI.update(editingItem.id.replace("writing:", ""), data);
            toast.success("Karya Tulis berhasil diupdate");
          } else {
            await writingsAPI.create(data);
            toast.success("Karya Tulis berhasil ditambahkan");
          }
          break;
      }
      setShowForm(false);
      setEditingItem(null);
      setImagePreview(null);
      setSelectedImageFile(null);
      setDocumentPreview(null);
      setSelectedDocumentFile(null);
      setAdditionalImagePreviews([]);
      setAdditionalImageFiles([]);
      loadData();
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Gagal menyimpan data");
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar');
      return;
    }
    
    // Validasi ukuran file (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 5MB');
      return;
    }
    
    setSelectedImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setSelectedImageFile(null);
    setImagePreview(null);
  };

  const handleAdditionalImagesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    Array.from(files).forEach(file => {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        toast.error(`File ${file.name} bukan gambar`);
        return;
      }
      
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} terlalu besar (max 5MB)`);
        return;
      }
      
      newFiles.push(file);
      newPreviews.push(URL.createObjectURL(file));
    });
    
    setAdditionalImageFiles(prev => [...prev, ...newFiles]);
    setAdditionalImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveAdditionalImage = (index: number) => {
    setAdditionalImageFiles(prev => prev.filter((_, i) => i !== index));
    setAdditionalImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleDocumentSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validasi tipe file - hanya PDF dan PPT
    const validTypes = [
      'application/pdf',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    if (!validTypes.includes(file.type)) {
      toast.error('File harus berupa PDF atau PowerPoint (PPT/PPTX)');
      return;
    }
    
    // Validasi ukuran file (max 10MB untuk dokumen)
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran file maksimal 10MB');
      return;
    }
    
    setSelectedDocumentFile(file);
    setDocumentPreview(file.name);
  };

  const handleRemoveDocument = () => {
    setSelectedDocumentFile(null);
    setDocumentPreview(null);
  };

  const renderForm = () => {
    switch (activeTab) {
      case "articles":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Konten</label>
              <textarea
                name="content"
                defaultValue={editingItem?.content}
                required
                rows={6}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Kategori</label>
              <input
                type="text"
                name="category"
                defaultValue={editingItem?.category}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Tanggal Artikel</label>
              <input
                type="date"
                name="uploadDate"
                defaultValue={editingItem?.uploadDate ? new Date(editingItem.uploadDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Pilih tanggal untuk artikel ini (default: hari ini)
              </p>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Gambar Artikel</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload gambar dari komputer Anda (max 5MB, format: JPG, PNG, GIF, WEBP)
              </p>
              {imagePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-[#d1d5db]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
              <p className="text-xs text-[#9ca3af] mt-2">
                💡 Atau masukkan URL gambar dari <a href="https://imgur.com/upload" target="_blank" className="text-[#6b7280] hover:underline">Imgur</a> atau <a href="https://unsplash.com" target="_blank" className="text-[#6b7280] hover:underline">Unsplash</a>:
              </p>
              <input
                type="url"
                name="imageUrl"
                defaultValue={editingItem?.imageUrl}
                placeholder="https://example.com/image.jpg (opsional)"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] mt-2"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Dokumen Pendukung (PDF/PPT - Opsional)</label>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                <p className="text-xs text-amber-800">
                  ⚠️ <strong>Penting:</strong> Pastikan bucket "writings-images" sudah dibuat dan mengizinkan MIME types untuk PDF/PPT (pilih "Allow all MIME types"). 
                  <a 
                    href="https://supabase.com/dashboard" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline ml-1"
                  >
                    Buka Dashboard
                  </a>
                </p>
              </div>
              <input
                type="file"
                name="documentFile"
                accept=".pdf,.ppt,.pptx,application/pdf,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation"
                onChange={handleDocumentSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload dokumen PDF atau PowerPoint (max 10MB)
              </p>
              {documentPreview && (
                <div className="mt-3 flex items-center gap-3 p-3 bg-[#f9fafb] rounded-lg border border-[#d1d5db]">
                  <div className="flex-1">
                    <p className="text-sm text-[#6b7280]">📄 {documentPreview}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveDocument}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus
                  </button>
                </div>
              )}
              {editingItem?.documentUrl && !documentPreview && (
                <div className="mt-3 p-3 bg-[#f9fafb] rounded-lg border border-[#d1d5db]">
                  <p className="text-sm text-[#6b7280]">📄 Dokumen saat ini: <a href={editingItem.documentUrl} target="_blank" rel="noopener noreferrer" className="text-[#3b82f6] hover:underline">{editingItem.documentName || 'Unduh'}</a></p>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={uploadingImage || uploadingDocument}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage || uploadingDocument ? "Mengupload..." : editingItem ? "Update Artikel" : "Tambah Artikel"}
            </button>
          </form>
        );

      case "books":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul Buku</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Penulis</label>
              <input
                type="text"
                name="author"
                defaultValue={editingItem?.author}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">ISBN</label>
                <input
                  type="text"
                  name="isbn"
                  defaultValue={editingItem?.isbn}
                  required
                  placeholder="978-602-xxxxx-x-x"
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">Tahun Terbit</label>
                <input
                  type="number"
                  name="year"
                  defaultValue={editingItem?.year}
                  required
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">Penerbit</label>
                <input
                  type="text"
                  name="publisher"
                  defaultValue={editingItem?.publisher}
                  required
                  placeholder="Nama Penerbit"
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">Jumlah Halaman</label>
                <input
                  type="text"
                  name="pages"
                  defaultValue={editingItem?.pages}
                  required
                  placeholder="250 halaman"
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={editingItem?.rating || 5}
                  min="1"
                  max="5"
                  step="0.1"
                  required
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
              <div>
                <label className="block text-[#6b7280] text-sm mb-2">Jumlah Ulasan</label>
                <input
                  type="number"
                  name="reviews"
                  defaultValue={editingItem?.reviews || 0}
                  min="0"
                  placeholder="50"
                  className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
                />
              </div>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Link Beli Buku</label>
              <input
                type="url"
                name="buyLink"
                defaultValue={editingItem?.buyLink}
                required
                placeholder="https://tokopedia.com/..."
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                💡 Link ke toko online seperti Tokopedia, Shopee, Gramedia, dll
              </p>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description}
                required
                rows={4}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Cover Buku</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload cover dari komputer Anda (max 5MB, format: JPG, PNG, GIF, WEBP)
              </p>
              {imagePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-[#d1d5db]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
              <p className="text-xs text-[#9ca3af] mt-2">
                💡 Atau masukkan URL cover dari <a href="https://imgur.com/upload" target="_blank" className="text-[#6b7280] hover:underline">Imgur</a> atau <a href="https://unsplash.com" target="_blank" className="text-[#6b7280] hover:underline">Unsplash</a>:
              </p>
              <input
                type="url"
                name="coverUrl"
                defaultValue={editingItem?.coverUrl}
                placeholder="https://example.com/cover.jpg (opsional)"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] mt-2"
              />
            </div>
            <button
              type="submit"
              disabled={uploadingImage}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? "Mengupload gambar..." : editingItem ? "Update Buku" : "Tambah Buku"}
            </button>
          </form>
        );

      case "news":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul Berita</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Konten</label>
              <textarea
                name="content"
                defaultValue={editingItem?.content}
                required
                rows={6}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Tanggal Berita</label>
              <input
                type="date"
                name="uploadDate"
                defaultValue={editingItem?.uploadDate ? new Date(editingItem.uploadDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Pilih tanggal untuk berita ini (default: hari ini)
              </p>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Gambar Berita</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload gambar dari komputer Anda (max 5MB, format: JPG, PNG, GIF, WEBP)
              </p>
              {imagePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-[#d1d5db]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
              <p className="text-xs text-[#9ca3af] mt-2">
                💡 Atau masukkan URL gambar dari <a href="https://imgur.com/upload" target="_blank" className="text-[#6b7280] hover:underline">Imgur</a> atau <a href="https://unsplash.com" target="_blank" className="text-[#6b7280] hover:underline">Unsplash</a>:
              </p>
              <input
                type="url"
                name="imageUrl"
                defaultValue={editingItem?.imageUrl}
                placeholder="https://example.com/image.jpg (opsional)"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] mt-2"
              />
            </div>
            <button
              type="submit"
              disabled={uploadingImage}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? "Mengupload gambar..." : editingItem ? "Update Berita" : "Tambah Berita"}
            </button>
          </form>
        );

      case "videos":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul Video</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">URL Video (YouTube)</label>
              <input
                type="url"
                name="videoUrl"
                defaultValue={editingItem?.videoUrl}
                required
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                💡 Paste URL video YouTube di sini (contoh: https://www.youtube.com/watch?v=xxxxx)
              </p>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Kategori</label>
              <input
                type="text"
                name="category"
                defaultValue={editingItem?.category}
                placeholder="Seminar, Kuliah Umum, Diskusi, Workshop, dll"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Durasi (opsional)</label>
              <input
                type="text"
                name="duration"
                defaultValue={editingItem?.duration}
                placeholder="45 menit, 1 jam, dll"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Tanggal Upload</label>
              <input
                type="date"
                name="date"
                defaultValue={editingItem?.date || selectedDate}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">URL Gambar Thumbnail (opsional)</label>
              <input
                type="url"
                name="image"
                defaultValue={editingItem?.image}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                💡 Jika kosong, akan menggunakan thumbnail otomatis dari YouTube
              </p>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description}
                required
                rows={4}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all"
            >
              {editingItem ? "Update Video" : "Tambah Video"}
            </button>
          </form>
        );

      case "gallery":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Kategori</label>
              <input
                type="text"
                name="category"
                defaultValue={editingItem?.category}
                placeholder="Seminar, Akademik, Diskusi, Publikasi, Workshop, dll"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Gambar Utama (Tampilan)</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload gambar utama untuk tampilan galeri (max 5MB, format: JPG, PNG, GIF, WEBP)
              </p>
              {imagePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-[#d1d5db]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
              <p className="text-xs text-[#9ca3af] mt-2">
                💡 Atau masukkan URL gambar dari <a href="https://imgur.com/upload" target="_blank" className="text-[#6b7280] hover:underline">Imgur</a> atau <a href="https://unsplash.com" target="_blank" className="text-[#6b7280] hover:underline">Unsplash</a>:
              </p>
              <input
                type="url"
                name="imageUrl"
                defaultValue={editingItem?.imageUrl}
                placeholder="https://example.com/image.jpg (opsional)"
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280] mt-2"
              />
            </div>
            
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Foto-foto Tambahan (Opsional)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalImagesSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload beberapa foto sekaligus untuk isi galeri (opsional, max 5MB per file)
              </p>
              {additionalImagePreviews.length > 0 && (
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {additionalImagePreviews.map((preview, index) => (
                    <div key={index} className="relative">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-[#d1d5db]"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveAdditionalImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-[#ef4444] text-white rounded-full flex items-center justify-center hover:bg-[#dc2626] transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-[#9ca3af] mt-2">
                💡 Foto-foto tambahan ini akan ditampilkan di halaman detail galeri
              </p>
            </div>
            
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description}
                required
                rows={3}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <button
              type="submit"
              disabled={uploadingImage}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? "Mengupload gambar..." : editingItem ? "Update Galeri" : "Tambah Galeri"}
            </button>
          </form>
        );

      case "writings":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Judul</label>
              <input
                type="text"
                name="title"
                defaultValue={editingItem?.title}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Kategori</label>
              <select
                name="category"
                defaultValue={editingItem?.category}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              >
                <option value="hukum">Hukum</option>
                <option value="administrasi-publik">Administrasi Publik</option>
              </select>
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Deskripsi</label>
              <textarea
                name="description"
                defaultValue={editingItem?.description}
                required
                rows={4}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">URL File/Link</label>
              <input
                type="url"
                name="fileUrl"
                defaultValue={editingItem?.fileUrl}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Tahun</label>
              <input
                type="number"
                name="year"
                defaultValue={editingItem?.year}
                required
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
            </div>
            <div>
              <label className="block text-[#6b7280] text-sm mb-2">Gambar</label>
              <input
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleImageSelect}
                className="w-full px-4 py-2 border border-[#d1d5db] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6b7280]"
              />
              <p className="text-xs text-[#9ca3af] mt-1">
                Upload gambar untuk karya tulis (opsional, max 5MB, format: JPG, PNG, GIF, WEBP)
              </p>
              {imagePreview && (
                <div className="mt-3 flex items-center gap-3">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border border-[#d1d5db]"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="px-3 py-2 text-sm text-[#ef4444] hover:text-white hover:bg-[#ef4444] border border-[#ef4444] rounded-lg transition-colors"
                  >
                    Hapus Gambar
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={uploadingImage}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {uploadingImage ? "Mengupload gambar..." : editingItem ? "Update Karya Tulis" : "Tambah Karya Tulis"}
            </button>
          </form>
        );

      default:
        return null;
    }
  };

  const renderContent = () => {
    let items: any[] = [];
    let type = "";
    
    switch (activeTab) {
      case "articles":
        items = articles;
        type = "articles";
        break;
      case "books":
        items = books;
        type = "books";
        break;
      case "news":
        items = news;
        type = "news";
        break;
      case "videos":
        items = videos;
        type = "videos";
        break;
      case "gallery":
        items = gallery;
        type = "gallery";
        break;
      case "writings":
        items = writings;
        type = "writings";
        break;
    }

    if (activeTab === "inbox") {
      return (
        <>
          <div className="flex border-b border-[#d1d5db] mb-6">
            <button
              onClick={() => setInboxTab("contacts")}
              className={`px-6 py-3 text-sm transition-colors ${
                inboxTab === "contacts"
                  ? "border-b-2 border-[#6b7280] text-[#1a1d23]"
                  : "text-[#6b7280] hover:text-[#1a1d23]"
              }`}
            >
              Pesan Kontak ({stats.contacts})
            </button>
            <button
              onClick={() => setInboxTab("subscribers")}
              className={`px-6 py-3 text-sm transition-colors ${
                inboxTab === "subscribers"
                  ? "border-b-2 border-[#6b7280] text-[#1a1d23]"
                  : "text-[#6b7280] hover:text-[#1a1d23]"
              }`}
            >
              Subscribers ({stats.subscribers})
            </button>
          </div>

          {inboxTab === "contacts" ? (
            <div className="space-y-4">
              {contacts.length === 0 ? (
                <div className="text-center py-12 text-[#6b7280]">Belum ada pesan kontak</div>
              ) : (
                contacts.map((contact, index) => (
                  <div
                    key={index}
                    className={`border rounded-xl p-6 transition-all cursor-pointer ${
                      contact.status === "unread"
                        ? "border-[#6b7280] bg-[#f9fafb]"
                        : "border-[#d1d5db] bg-white"
                    }`}
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-[#1a1d23] font-medium">{contact.name}</h3>
                          {contact.status === "unread" && (
                            <span className="px-2 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-xs rounded-full">
                              Baru
                            </span>
                          )}
                        </div>
                        <p className="text-[#6b7280] text-sm mb-1">{contact.email}</p>
                        <p className="text-[#1a1d23] mb-2">{contact.subject}</p>
                        <p className="text-[#6b7280] text-sm line-clamp-2">{contact.message}</p>
                        <p className="text-[#9ca3af] text-xs mt-2">
                          {new Date(contact.submittedAt).toLocaleString("id-ID")}
                        </p>
                      </div>
                      {contact.status === "unread" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(contact.id.replace("contact:", ""));
                          }}
                          className="px-4 py-2 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white text-sm rounded-lg hover:shadow-lg transition-all"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subscribers.length === 0 ? (
                <div className="col-span-full text-center py-12 text-[#6b7280]">Belum ada subscriber</div>
              ) : (
                subscribers.map((subscriber, index) => (
                  <div
                    key={index}
                    className="border border-[#d1d5db] rounded-xl p-4 bg-white"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#1a1d23] text-sm">{subscriber.email}</p>
                        <p className="text-[#9ca3af] text-xs">
                          {new Date(subscriber.subscribedAt).toLocaleDateString("id-ID")}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      );
    }

    return (
      <div className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-12 text-[#6b7280]">
            Belum ada data. Klik tombol + untuk menambahkan.
          </div>
        ) : (
          items.map((item, index) => (
            <div
              key={index}
              className="border border-[#d1d5db] rounded-xl p-6 bg-white"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-[#1a1d23] font-medium mb-2">{item.title}</h3>
                  {item.author && <p className="text-[#6b7280] text-sm mb-1">Penulis: {item.author}</p>}
                  {item.category && <p className="text-[#6b7280] text-sm mb-1">Kategori: {item.category}</p>}
                  {item.year && <p className="text-[#6b7280] text-sm mb-1">Tahun: {item.year}</p>}
                  {item.videoUrl && (
                    <p className="text-[#6b7280] text-sm mb-1">
                      URL: <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{item.videoUrl}</a>
                    </p>
                  )}
                  {item.duration && <p className="text-[#6b7280] text-sm mb-1">Durasi: {item.duration}</p>}
                  {item.description && <p className="text-[#6b7280] text-sm line-clamp-2 mt-2">{item.description}</p>}
                  {item.content && <p className="text-[#6b7280] text-sm line-clamp-2 mt-2">{item.content}</p>}
                  <p className="text-[#9ca3af] text-xs mt-2">
                    {item.date ? new Date(item.date).toLocaleDateString("id-ID") : new Date(item.createdAt).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(true);
                    }}
                    className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#1a1d23] transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(type, item.id.replace(`${type.slice(0, -1)}:`, ""))}
                    className="w-8 h-8 flex items-center justify-center text-[#ef4444] hover:text-[#dc2626] transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl text-[#1a1d23] mb-2">Admin Dashboard</h1>
            <p className="text-[#6b7280]">Kelola konten dan lihat data pengunjung website</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = "";
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-[#d1d5db] text-[#6b7280] rounded-xl hover:border-[#6b7280] transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Website
            </a>
            <button
              onClick={onLogout}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white rounded-xl hover:shadow-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Pesan</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.contacts}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Subscribers</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.subscribers}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Artikel</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.articles}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Buku</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.books}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Berita</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.news}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Video</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.videos}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Galeri</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.gallery}</p>
          </div>

          <div className="bg-white border border-[#d1d5db] rounded-xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#6b7280] to-[#9ca3af] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-[#6b7280] text-sm">Karya Tulis</span>
            </div>
            <p className="text-3xl text-[#1a1d23]">{stats.writings}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab("inbox")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "inbox"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Inbox
            </div>
          </button>
          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "articles"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Artikel
            </div>
          </button>
          <button
            onClick={() => setActiveTab("books")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "books"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Buku
            </div>
          </button>
          <button
            onClick={() => setActiveTab("news")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "news"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4" />
              Berita
            </div>
          </button>
          <button
            onClick={() => setActiveTab("videos")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "videos"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Video
            </div>
          </button>
          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "gallery"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Galeri
            </div>
          </button>
          <button
            onClick={() => setActiveTab("writings")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "writings"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Karya Tulis
            </div>
          </button>
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === "calendar"
                ? "bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white"
                : "bg-white border border-[#d1d5db] text-[#6b7280] hover:border-[#6b7280]"
            }`}
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Kalender
            </div>
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white border border-[#d1d5db] rounded-xl overflow-hidden">
          <div className="p-6">
            {activeTab !== "inbox" && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-[#1a1d23]">
                  {activeTab === "articles" && "Kelola Artikel"}
                  {activeTab === "books" && "Kelola Buku"}
                  {activeTab === "news" && "Kelola Berita"}
                  {activeTab === "videos" && "Kelola Video"}
                  {activeTab === "gallery" && "Kelola Galeri"}
                  {activeTab === "writings" && "Kelola Karya Tulis"}
                </h2>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setShowForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-lg hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Tambah
                </button>
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12 text-[#6b7280]">Memuat data...</div>
            ) : (
              renderContent()
            )}
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#d1d5db] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl text-[#1a1d23]">Detail Pesan</h2>
              <button
                onClick={() => setSelectedContact(null)}
                className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#1a1d23] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[#6b7280] text-sm">Nama</label>
                <p className="text-[#1a1d23]">{selectedContact.name}</p>
              </div>
              
              <div>
                <label className="text-[#6b7280] text-sm">Email</label>
                <p className="text-[#1a1d23]">{selectedContact.email}</p>
              </div>
              
              <div>
                <label className="text-[#6b7280] text-sm">Subjek</label>
                <p className="text-[#1a1d23]">{selectedContact.subject}</p>
              </div>
              
              <div>
                <label className="text-[#6b7280] text-sm">Pesan</label>
                <p className="text-[#1a1d23] whitespace-pre-wrap">{selectedContact.message}</p>
              </div>
              
              <div>
                <label className="text-[#6b7280] text-sm">Waktu</label>
                <p className="text-[#1a1d23]">
                  {new Date(selectedContact.submittedAt).toLocaleString("id-ID")}
                </p>
              </div>

              {selectedContact.status === "unread" && (
                <button
                  onClick={() => {
                    markAsRead(selectedContact.id.replace("contact:", ""));
                    setSelectedContact(null);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Tandai Sudah Dibaca
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {showForm && activeTab !== "inbox" && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => {
            setShowForm(false);
            setEditingItem(null);
            setImagePreview(null);
            setSelectedImageFile(null);
            setAdditionalImagePreviews([]);
            setAdditionalImageFiles([]);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-[#d1d5db] px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl text-[#1a1d23]">
                {editingItem ? "Edit" : "Tambah"}{" "}
                {activeTab === "articles" && "Artikel"}
                {activeTab === "books" && "Buku"}
                {activeTab === "news" && "Berita"}
                {activeTab === "videos" && "Video"}
                {activeTab === "gallery" && "Galeri"}
                {activeTab === "writings" && "Karya Tulis"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditingItem(null);
                  setImagePreview(null);
                  setSelectedImageFile(null);
                  setAdditionalImagePreviews([]);
                  setAdditionalImageFiles([]);
                }}
                className="w-8 h-8 flex items-center justify-center text-[#6b7280] hover:text-[#1a1d23] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              {renderForm()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}