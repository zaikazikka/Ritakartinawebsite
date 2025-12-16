import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";
import * as kv from "./kv_store.tsx";

const app = new Hono();

// Initialize Supabase client for storage
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Initialize storage bucket on startup
const BUCKET_NAME = "make-46c3d36c-uploads";
(async () => {
  try {
    const { data: buckets } = await supabase.storage.listBuckets();
    const bucketExists = buckets?.some((bucket) => bucket.name === BUCKET_NAME);
    if (!bucketExists) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: false,
        fileSizeLimit: 5242880, // 5MB
      });
      console.log(`Created storage bucket: ${BUCKET_NAME}`);
    }
  } catch (error) {
    console.error("Error initializing storage bucket:", error);
  }
})();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-46c3d36c/health", (c) => {
  return c.json({ status: "ok" });
});

// ==================== ARTICLES ====================
// Get all articles (blog posts & hobi)
app.get("/make-server-46c3d36c/articles", async (c) => {
  try {
    const articles = await kv.getByPrefix("article:");
    return c.json({ success: true, data: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get single article by ID
app.get("/make-server-46c3d36c/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const article = await kv.get(`article:${id}`);
    
    if (!article) {
      return c.json({ success: false, error: "Article not found" }, 404);
    }
    
    return c.json({ success: true, data: article });
  } catch (error) {
    console.error("Error fetching article:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new article
app.post("/make-server-46c3d36c/articles", async (c) => {
  try {
    const body = await c.req.json();
    const id = `article:${Date.now()}`;
    const article = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(id, article);
    return c.json({ success: true, data: article }, 201);
  } catch (error) {
    console.error("Error creating article:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update article
app.put("/make-server-46c3d36c/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `article:${id}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      return c.json({ success: false, error: "Article not found" }, 404);
    }
    
    const body = await c.req.json();
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating article:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete article
app.delete("/make-server-46c3d36c/articles/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `article:${id}`;
    await kv.del(key);
    return c.json({ success: true, message: "Article deleted" });
  } catch (error) {
    console.error("Error deleting article:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== BOOKS ====================
// Get all books
app.get("/make-server-46c3d36c/books", async (c) => {
  try {
    const books = await kv.getByPrefix("book:");
    return c.json({ success: true, data: books });
  } catch (error) {
    console.error("Error fetching books:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new book
app.post("/make-server-46c3d36c/books", async (c) => {
  try {
    const body = await c.req.json();
    const id = `book:${Date.now()}`;
    const book = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(id, book);
    return c.json({ success: true, data: book }, 201);
  } catch (error) {
    console.error("Error creating book:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update book
app.put("/make-server-46c3d36c/books/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `book:${id}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      return c.json({ success: false, error: "Book not found" }, 404);
    }
    
    const body = await c.req.json();
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating book:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete book
app.delete("/make-server-46c3d36c/books/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `book:${id}`;
    await kv.del(key);
    return c.json({ success: true, message: "Book deleted" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== NEWS ====================
// Get all news
app.get("/make-server-46c3d36c/news", async (c) => {
  try {
    const news = await kv.getByPrefix("news:");
    return c.json({ success: true, data: news });
  } catch (error) {
    console.error("Error fetching news:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new news
app.post("/make-server-46c3d36c/news", async (c) => {
  try {
    const body = await c.req.json();
    const id = `news:${Date.now()}`;
    const newsItem = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(id, newsItem);
    return c.json({ success: true, data: newsItem }, 201);
  } catch (error) {
    console.error("Error creating news:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Update news
app.put("/make-server-46c3d36c/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `news:${id}`;
    const existing = await kv.get(key);
    
    if (!existing) {
      return c.json({ success: false, error: "News not found" }, 404);
    }
    
    const body = await c.req.json();
    const updated = {
      ...existing,
      ...body,
      updatedAt: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error updating news:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Delete news
app.delete("/make-server-46c3d36c/news/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `news:${id}`;
    await kv.del(key);
    return c.json({ success: true, message: "News deleted" });
  } catch (error) {
    console.error("Error deleting news:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== VIDEOS ====================
// Get all videos
app.get("/make-server-46c3d36c/videos", async (c) => {
  try {
    const videos = await kv.getByPrefix("video:");
    return c.json({ success: true, data: videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new video
app.post("/make-server-46c3d36c/videos", async (c) => {
  try {
    const body = await c.req.json();
    const id = `video:${Date.now()}`;
    const video = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(id, video);
    return c.json({ success: true, data: video }, 201);
  } catch (error) {
    console.error("Error creating video:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== GALLERY ====================
// Get all gallery items
app.get("/make-server-46c3d36c/gallery", async (c) => {
  try {
    const gallery = await kv.getByPrefix("gallery:");
    return c.json({ success: true, data: gallery });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new gallery item
app.post("/make-server-46c3d36c/gallery", async (c) => {
  try {
    const body = await c.req.json();
    const id = `gallery:${Date.now()}`;
    const galleryItem = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(id, galleryItem);
    return c.json({ success: true, data: galleryItem }, 201);
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== WRITINGS ====================
// Get all writings (karya tulis)
app.get("/make-server-46c3d36c/writings", async (c) => {
  try {
    const writings = await kv.getByPrefix("writing:");
    return c.json({ success: true, data: writings });
  } catch (error) {
    console.error("Error fetching writings:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Create new writing
app.post("/make-server-46c3d36c/writings", async (c) => {
  try {
    const body = await c.req.json();
    const id = `writing:${Date.now()}`;
    const writing = {
      ...body,
      id,
      createdAt: new Date().toISOString(),
    };
    
    await kv.set(id, writing);
    return c.json({ success: true, data: writing }, 201);
  } catch (error) {
    console.error("Error creating writing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== NEWSLETTER ====================
// Subscribe to newsletter
app.post("/make-server-46c3d36c/subscribe", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ success: false, error: "Invalid email address" }, 400);
    }
    
    const id = `subscriber:${email}`;
    const subscriber = {
      email,
      subscribedAt: new Date().toISOString(),
    };
    
    await kv.set(id, subscriber);
    return c.json({ success: true, message: "Successfully subscribed to newsletter" }, 201);
  } catch (error) {
    console.error("Error subscribing:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all subscribers
app.get("/make-server-46c3d36c/subscribers", async (c) => {
  try {
    const subscribers = await kv.getByPrefix("subscriber:");
    return c.json({ success: true, data: subscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// ==================== CONTACT ====================
// Submit contact form
app.post("/make-server-46c3d36c/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message } = body;
    
    if (!name || !email || !subject || !message) {
      return c.json({ success: false, error: "All fields are required" }, 400);
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return c.json({ success: false, error: "Invalid email address" }, 400);
    }
    
    const id = `contact:${Date.now()}`;
    const contact = {
      id,
      name,
      email,
      subject,
      message,
      status: "unread",
      submittedAt: new Date().toISOString(),
    };
    
    await kv.set(id, contact);
    return c.json({ 
      success: true, 
      message: "Pesan Anda telah dikirim. Terima kasih!" 
    }, 201);
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Get all contact messages
app.get("/make-server-46c3d36c/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact:");
    return c.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

// Mark contact as read
app.put("/make-server-46c3d36c/contacts/:id/read", async (c) => {
  try {
    const id = c.req.param("id");
    const key = `contact:${id}`;
    const contact = await kv.get(key);
    
    if (!contact) {
      return c.json({ success: false, error: "Contact not found" }, 404);
    }
    
    const updated = {
      ...contact,
      status: "read",
      readAt: new Date().toISOString(),
    };
    
    await kv.set(key, updated);
    return c.json({ success: true, data: updated });
  } catch (error) {
    console.error("Error marking contact as read:", error);
    return c.json({ success: false, error: error.message }, 500);
  }
});

Deno.serve(app.fetch);