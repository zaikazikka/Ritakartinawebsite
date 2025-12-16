import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

const supabaseUrl = `https://${projectId}.supabase.co`;

export const supabase = createSupabaseClient(supabaseUrl, publicAnonKey);

// KV Store helper functions untuk direct database access
const KV_TABLE = 'kv_store_46c3d36c';

// Storage bucket name
const STORAGE_BUCKET = 'writings-images'; // Gunakan 1 bucket untuk semua file (gambar dan dokumen)

export const kvStore = {
  // Get single value by key
  async get(key: string) {
    const { data, error } = await supabase
      .from(KV_TABLE)
      .select('value')
      .eq('key', key)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    
    return data?.value;
  },

  // Set single value
  async set(key: string, value: any) {
    const { error } = await supabase
      .from(KV_TABLE)
      .upsert({ key, value }, { onConflict: 'key' });
    
    if (error) throw error;
  },

  // Delete single value
  async del(key: string) {
    const { error } = await supabase
      .from(KV_TABLE)
      .delete()
      .eq('key', key);
    
    if (error) throw error;
  },

  // Get all values with prefix
  async getByPrefix(prefix: string) {
    const { data, error } = await supabase
      .from(KV_TABLE)
      .select('key, value')
      .like('key', `${prefix}%`)
      .order('key');
    
    if (error) throw error;
    
    return data || [];
  },

  // Get multiple values
  async mget(keys: string[]) {
    const { data, error } = await supabase
      .from(KV_TABLE)
      .select('key, value')
      .in('key', keys);
    
    if (error) throw error;
    
    return data || [];
  },

  // Set multiple values
  async mset(entries: Record<string, any>) {
    const rows = Object.entries(entries).map(([key, value]) => ({
      key,
      value,
    }));
    
    const { error } = await supabase
      .from(KV_TABLE)
      .upsert(rows, { onConflict: 'key' });
    
    if (error) throw error;
  },

  // Delete multiple values
  async mdel(keys: string[]) {
    const { error } = await supabase
      .from(KV_TABLE)
      .delete()
      .in('key', keys);
    
    if (error) throw error;
  },
};

// Storage helper functions untuk upload gambar
export const storageHelper = {
  // Upload gambar ke Supabase Storage
  async uploadImage(file: File, folder: string = 'uploads'): Promise<string> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Upload file
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Upload dokumen (PDF/PPT) ke Supabase Storage
  async uploadDocument(file: File, folder: string = 'documents'): Promise<string> {
    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      // Determine content type based on file extension
      let contentType = file.type;
      if (!contentType) {
        if (fileExt === 'pdf') {
          contentType = 'application/pdf';
        } else if (fileExt === 'ppt') {
          contentType = 'application/vnd.ms-powerpoint';
        } else if (fileExt === 'pptx') {
          contentType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        }
      }

      // Upload file with explicit content type
      const { data, error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: contentType
        });

      if (error) {
        console.error('Upload error:', error);
        
        // Check if error is MIME type related
        if (error.message && error.message.includes('mime type') && error.message.includes('not supported')) {
          throw new Error(`❌ KONFIGURASI BUCKET BELUM BENAR!\n\n` +
            `File ${fileExt?.toUpperCase()} tidak bisa diupload karena MIME type belum diizinkan.\n\n` +
            `CARA MEMPERBAIKI:\n` +
            `1. Buka https://supabase.com/dashboard\n` +
            `2. Pilih project → Storage → Klik bucket "writings-images"\n` +
            `3. Klik tab "Configuration" atau icon Settings (⚙️)\n` +
            `4. Cari "Allowed MIME types"\n` +
            `5. Pilih "Allow all MIME types" ATAU tambahkan:\n` +
            `   - image/*\n` +
            `   - application/pdf\n` +
            `   - application/vnd.ms-powerpoint\n` +
            `   - application/vnd.openxmlformats-officedocument.presentationml.presentation\n` +
            `6. Klik Save dan coba upload lagi\n\n` +
            `Original error: ${error.message}`);
        }
        
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading document:', error);
      throw error;
    }
  },

  // Delete gambar dari Supabase Storage
  async deleteImage(fileUrl: string): Promise<void> {
    try {
      // Extract file path from URL
      const urlParts = fileUrl.split(`/storage/v1/object/public/${STORAGE_BUCKET}/`);
      if (urlParts.length < 2) return;

      const filePath = urlParts[1];

      const { error } = await supabase.storage
        .from(STORAGE_BUCKET)
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  },

  // Inisialisasi storage bucket (dipanggil saat pertama kali menggunakan storage)
  async initBucket(): Promise<void> {
    try {
      // Check if bucket exists by trying to list files
      const { error: listError } = await supabase.storage
        .from(STORAGE_BUCKET)
        .list('', { limit: 1 });
      
      // If bucket exists, no error or error is not "Bucket not found"
      if (!listError || listError.message.includes('Bucket not found')) {
        console.log('✅ Storage bucket ready:', STORAGE_BUCKET);
      }
    } catch (error) {
      // Bucket doesn't exist - user needs to create it manually via Supabase Dashboard
      console.warn(`⚠️ Storage bucket not found. Please create bucket "${STORAGE_BUCKET}" via Supabase Dashboard:
      
1. Buka Supabase Dashboard → Storage → Create bucket
2. Nama bucket: "writings-images"
3. Public bucket: Ya (centang)
4. Allowed MIME types: image/*, application/pdf, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation
5. Klik Create bucket`);
    }
  }
};