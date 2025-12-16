import { kvStore } from './supabase/client';

// ==================== ARTICLES API ====================
export const articlesAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('article:');
    return { data: data.map(item => item.value) };
  },
  getById: async (id: string) => {
    const data = await kvStore.get(`article:${id}`);
    return { data };
  },
  create: async (article: any) => {
    const id = Date.now().toString();
    const articleData = {
      id: `article:${id}`,
      ...article,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`article:${id}`, articleData);
    return { data: articleData };
  },
  update: async (id: string, article: any) => {
    const existing = await kvStore.get(`article:${id}`);
    const updated = {
      ...existing,
      ...article,
      updatedAt: new Date().toISOString(),
    };
    await kvStore.set(`article:${id}`, updated);
    return { data: updated };
  },
  delete: async (id: string) => {
    await kvStore.del(`article:${id}`);
    return { data: null };
  },
  incrementViews: async (id: string) => {
    const existing = await kvStore.get(`article:${id}`);
    if (existing) {
      const updated = {
        ...existing,
        views: (existing.views || 0) + 1,
      };
      await kvStore.set(`article:${id}`, updated);
      return { data: updated };
    }
    return { data: null };
  },
};

// ==================== BOOKS API ====================
export const booksAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('book:');
    return { data: data.map(item => item.value) };
  },
  create: async (book: any) => {
    const id = Date.now().toString();
    const bookData = {
      id: `book:${id}`,
      ...book,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`book:${id}`, bookData);
    return { data: bookData };
  },
  update: async (id: string, book: any) => {
    const existing = await kvStore.get(`book:${id}`);
    const updated = {
      ...existing,
      ...book,
      updatedAt: new Date().toISOString(),
    };
    await kvStore.set(`book:${id}`, updated);
    return { data: updated };
  },
  delete: async (id: string) => {
    await kvStore.del(`book:${id}`);
    return { data: null };
  },
  incrementViews: async (id: string) => {
    const existing = await kvStore.get(`book:${id}`);
    if (existing) {
      const updated = {
        ...existing,
        views: (existing.views || 0) + 1,
      };
      await kvStore.set(`book:${id}`, updated);
      return { data: updated };
    }
    return { data: null };
  },
};

// ==================== NEWS API ====================
export const newsAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('news:');
    return { data: data.map(item => item.value) };
  },
  create: async (news: any) => {
    const id = Date.now().toString();
    const newsData = {
      id: `news:${id}`,
      ...news,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`news:${id}`, newsData);
    return { data: newsData };
  },
  update: async (id: string, news: any) => {
    const existing = await kvStore.get(`news:${id}`);
    const updated = {
      ...existing,
      ...news,
      updatedAt: new Date().toISOString(),
    };
    await kvStore.set(`news:${id}`, updated);
    return { data: updated };
  },
  delete: async (id: string) => {
    await kvStore.del(`news:${id}`);
    return { data: null };
  },
  incrementViews: async (id: string) => {
    const existing = await kvStore.get(`news:${id}`);
    if (existing) {
      const updated = {
        ...existing,
        views: (existing.views || 0) + 1,
      };
      await kvStore.set(`news:${id}`, updated);
      return { data: updated };
    }
    return { data: null };
  },
};

// ==================== VIDEOS API ====================
export const videosAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('video:');
    return { data: data.map(item => item.value) };
  },
  create: async (video: any) => {
    const id = Date.now().toString();
    const videoData = {
      id: `video:${id}`,
      ...video,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`video:${id}`, videoData);
    return { data: videoData };
  },
  delete: async (id: string) => {
    await kvStore.del(`video:${id}`);
    return { data: null };
  },
};

// ==================== GALLERY API ====================
export const galleryAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('gallery:');
    return { data: data.map(item => item.value) };
  },
  create: async (item: any) => {
    const id = Date.now().toString();
    const galleryData = {
      id: `gallery:${id}`,
      ...item,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`gallery:${id}`, galleryData);
    return { data: galleryData };
  },
  delete: async (id: string) => {
    await kvStore.del(`gallery:${id}`);
    return { data: null };
  },
};

// ==================== WRITINGS API ====================
export const writingsAPI = {
  getAll: async () => {
    const data = await kvStore.getByPrefix('writing:');
    return { data: data.map(item => item.value) };
  },
  create: async (writing: any) => {
    const id = Date.now().toString();
    const writingData = {
      id: `writing:${id}`,
      ...writing,
      views: 0,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`writing:${id}`, writingData);
    return { data: writingData };
  },
  update: async (id: string, writing: any) => {
    const existing = await kvStore.get(`writing:${id}`);
    const updated = {
      ...existing,
      ...writing,
      updatedAt: new Date().toISOString(),
    };
    await kvStore.set(`writing:${id}`, updated);
    return { data: updated };
  },
  delete: async (id: string) => {
    await kvStore.del(`writing:${id}`);
    return { data: null };
  },
  incrementViews: async (id: string) => {
    const existing = await kvStore.get(`writing:${id}`);
    if (existing) {
      const updated = {
        ...existing,
        views: (existing.views || 0) + 1,
      };
      await kvStore.set(`writing:${id}`, updated);
      return { data: updated };
    }
    return { data: null };
  },
};

// ==================== NEWSLETTER API ====================
export const newsletterAPI = {
  subscribe: async (email: string) => {
    const id = Date.now().toString();
    const subscriberData = {
      id: `subscriber:${id}`,
      email,
      subscribedAt: new Date().toISOString(),
    };
    await kvStore.set(`subscriber:${id}`, subscriberData);
    return { data: subscriberData };
  },
  getSubscribers: async () => {
    const data = await kvStore.getByPrefix('subscriber:');
    return { data: data.map(item => item.value) };
  },
};

// ==================== CONTACT API ====================
export const contactAPI = {
  submit: async (contact: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) => {
    const id = Date.now().toString();
    const contactData = {
      id: `contact:${id}`,
      ...contact,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    await kvStore.set(`contact:${id}`, contactData);
    return { data: contactData };
  },
  getAll: async () => {
    const data = await kvStore.getByPrefix('contact:');
    return { data: data.map(item => item.value) };
  },
  markAsRead: async (id: string) => {
    const existing = await kvStore.get(`contact:${id}`);
    const updated = {
      ...existing,
      isRead: true,
      readAt: new Date().toISOString(),
    };
    await kvStore.set(`contact:${id}`, updated);
    return { data: updated };
  },
};