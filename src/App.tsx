import { BlogHeader } from "./components/BlogHeader";
import { BlogHero } from "./components/BlogHero";
import { BlogProfil } from "./components/BlogProfil";
import { BlogKaryaTulis } from "./components/BlogKaryaTulis";
import { BlogPosts } from "./components/BlogPosts";
import { BlogBuku } from "./components/BlogBuku";
import { BlogBerita } from "./components/BlogBerita";
import { BlogPodcast } from "./components/BlogPodcast";
import { BlogGaleri } from "./components/BlogGaleri";
import { BlogNewsletter } from "./components/BlogNewsletter";
import { BlogKontak } from "./components/BlogKontak";
import { BlogFooter } from "./components/BlogFooter";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminLogin } from "./components/AdminLogin";
import { Toaster } from "./components/ui/sonner";
import { useState, useEffect } from "react";
import { supabase, storageHelper } from "./utils/supabase/client";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // Initialize storage bucket on app load
    const initStorage = async () => {
      try {
        await storageHelper.initBucket();
        console.log("✅ Storage bucket initialized");
      } catch (error) {
        console.error("❌ Error initializing storage bucket:", error);
      }
    };
    initStorage();
    
    // Function to check if we should show admin
    const checkAdminRoute = async () => {
      const isAdminRoute = window.location.pathname === "/admin" || window.location.hash === "#admin";
      console.log("🔍 Checking admin route:", isAdminRoute);
      setShowAdmin(isAdminRoute);
      
      // Check if user has valid session
      if (isAdminRoute) {
        setIsCheckingAuth(true);
        try {
          // Validate session with Supabase
          console.log("🔐 Validating session with Supabase...");
          const { data: { session }, error } = await supabase.auth.getSession();
          
          console.log("📋 Session data:", session);
          console.log("❌ Session error:", error);
          
          if (error || !session) {
            // Invalid or no session
            console.log("❌ No valid session - showing login");
            localStorage.removeItem("admin_session");
            setIsAuthenticated(false);
          } else {
            // Valid session
            console.log("✅ Valid session found - showing dashboard");
            localStorage.setItem("admin_session", JSON.stringify(session));
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error("Auth check error:", error);
          localStorage.removeItem("admin_session");
          setIsAuthenticated(false);
        } finally {
          setIsCheckingAuth(false);
        }
      } else {
        setIsCheckingAuth(false);
      }
    };

    // Check on mount
    checkAdminRoute();

    // Listen for hash changes
    const handleHashChange = () => {
      checkAdminRoute();
    };

    window.addEventListener('hashchange', handleHashChange);

    // Cleanup
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();
    localStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    window.location.hash = "";
  };

  const handleBackFromLogin = () => {
    window.location.hash = "";
  };

  if (showAdmin) {
    // Show loading while checking auth
    if (isCheckingAuth) {
      return (
        <div className="min-h-screen bg-[#f3f4f6] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b7280]"></div>
            <p className="mt-4 text-[#6b7280]">Memeriksa autentikasi...</p>
          </div>
        </div>
      );
    }

    if (!isAuthenticated) {
      return (
        <div className="min-h-screen bg-[#f3f4f6]">
          <AdminLogin onLoginSuccess={handleLoginSuccess} onBack={handleBackFromLogin} />
          <Toaster />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-[#f3f4f6]">
        <AdminDashboard onLogout={handleLogout} />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1d23]">
      <BlogHeader />
      <main>
        <BlogHero />
        <BlogProfil />
        <BlogBerita />
        <BlogBuku />
        <BlogPosts />
        <BlogKaryaTulis />
        <BlogPodcast />
        <BlogGaleri />
        <BlogNewsletter />
        <BlogKontak />
      </main>
      <BlogFooter />
      <Toaster />
    </div>
  );
}