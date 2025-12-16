import { Play, Calendar, Clock, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { videosAPI } from "../utils/api";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Helper function to convert YouTube URL to embed URL
const getYouTubeEmbedUrl = (url: string): string => {
  if (!url) return "";
  
  // Handle different YouTube URL formats
  let videoId = "";
  
  // Format: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("watch?v=")[1]?.split("&")[0];
  }
  // Format: https://youtu.be/VIDEO_ID
  else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  }
  // Format: https://www.youtube.com/embed/VIDEO_ID
  else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (url: string): string => {
  if (!url) return "";
  
  let videoId = "";
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.split("watch?v=")[1]?.split("&")[0];
  } else if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1]?.split("?")[0];
  } else if (url.includes("youtube.com/embed/")) {
    videoId = url.split("embed/")[1]?.split("?")[0];
  }
  
  return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "";
};

export function BlogPodcast() {
  const [videos, setVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const response = await videosAPI.getAll();
      const data = response.data || [];
      // Sort by date, newest first
      const sortedData = data.sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      setVideos(sortedData);
    } catch (error) {
      console.error("Error loading videos:", error);
      setVideos([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Default videos jika database kosong
  const defaultVideos = [
    {
      title: "Seminar Hukum Pidana dan Penegakan Hukum",
      date: "12 November 2024",
      duration: "45 menit",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Seminar"
    },
    {
      title: "Kuliah Umum: Hukum Tata Negara Indonesia",
      date: "8 November 2024",
      duration: "60 menit",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Kuliah Umum"
    },
    {
      title: "Diskusi Panel: UU Perlindungan Data Pribadi",
      date: "25 Oktober 2024",
      duration: "90 menit",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Diskusi"
    },
    {
      title: "Workshop: Metodologi Penelitian Hukum",
      date: "15 Oktober 2024",
      duration: "120 menit",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      category: "Workshop"
    }
  ];

  // Show loading state
  if (isLoading) {
    return (
      <section className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            <p className="text-[#d1d5db]">Memuat video...</p>
          </div>
        </div>
      </section>
    );
  }

  // Use database videos if available, otherwise show default videos
  const displayVideos = videos.length > 0 ? videos : defaultVideos;

  // Format display date
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  // Get thumbnail image with priority: YouTube thumbnail > custom image > fallback
  const getThumbnail = (video: any) => {
    // Always prioritize YouTube thumbnail if videoUrl exists
    if (video.videoUrl) {
      const ytThumbnail = getYouTubeThumbnail(video.videoUrl);
      if (ytThumbnail) return ytThumbnail;
    }
    // Fallback to custom image if provided
    if (video.image) return video.image;
    // Last fallback
    return "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800";
  };

  return (
    <>
      <section className="relative py-20 px-6 lg:px-12 bg-[#1a1d23]" ref={sectionRef}>
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#6b7280] rounded-full blur-[150px] opacity-10" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl text-[#f3f4f6] uppercase">Podcast & Video</h2>
            <p className="text-[#d1d5db] max-w-2xl mx-auto">
              Kumpulan video seminar, kuliah umum, dan diskusi panel tentang berbagai topik hukum Indonesia dari Dr. Rita Kartina.
            </p>
          </div>

          {/* Featured Video */}
          {displayVideos.length > 0 && (
            <div className="mb-12">
              <div 
                className="relative rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setSelectedVideo(displayVideos[0])}
              >
                <div className="relative h-[500px]">
                  <ImageWithFallback
                    src={getThumbnail(displayVideos[0])}
                    alt={displayVideos[0]?.title || "Video"}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md border-3 border-white flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all">
                      <Play className="w-12 h-12 text-white fill-white ml-1" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4">
                    <span className="px-4 py-2 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-full text-sm inline-block">
                      {displayVideos[0]?.category || "Video"}
                    </span>
                    
                    <h3 className="text-white text-3xl">
                      {displayVideos[0]?.title || defaultVideos[0].title}
                    </h3>
                    
                    <div className="flex items-center gap-6 text-white/80 text-sm">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {displayVideos[0]?.date ? formatDate(displayVideos[0].date) : defaultVideos[0].date}
                      </span>
                      {displayVideos[0]?.duration && (
                        <span className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {displayVideos[0].duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(showAll ? displayVideos.slice(1) : displayVideos.slice(1, 4)).map((video, index) => (
              <div 
                key={index}
                className="group cursor-pointer bg-white border border-[#d1d5db] rounded-xl overflow-hidden hover:border-[#6b7280] transition-all"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative h-56">
                  <ImageWithFallback
                    src={getThumbnail(video)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white flex items-center justify-center hover:bg-white/30 transition-all">
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    </button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-[#1a1d23]/80 backdrop-blur-sm text-white text-xs rounded-full border border-[#3a3d47]">
                      {video.category || "Video"}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 space-y-3">
                  <h3 className="text-[#1a1d23] text-lg group-hover:text-[#6b7280] transition-colors line-clamp-2">
                    {video.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-[#6b7280] text-sm">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {video.date ? formatDate(video.date) : video.date}
                    </span>
                    {video.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          {displayVideos.length > 4 && (
            <div className="text-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-xl hover:shadow-lg hover:shadow-[#6b7280]/30 transition-all"
                onClick={() => {
                  if (showAll) {
                    // Scroll to section top when collapsing
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                  }
                  setShowAll(!showAll);
                }}
              >
                {showAll ? "Tampilkan Lebih Sedikit" : `Muat Lebih Banyak (${displayVideos.length - 4} Video Lainnya)`}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-5xl bg-[#1a1d23] rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 flex items-center justify-center transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Video Player */}
            <div className="relative aspect-video">
              {selectedVideo.videoUrl ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                  title={selectedVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#2a2d33]">
                  <p className="text-white/60">Video tidak tersedia</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            <div className="p-6 space-y-4">
              <h3 className="text-white text-2xl">
                {selectedVideo.title}
              </h3>
              
              {selectedVideo.description && (
                <p className="text-white/80 text-sm">
                  {selectedVideo.description}
                </p>
              )}
              
              <div className="flex items-center gap-6 text-white/60 text-sm">
                {selectedVideo.category && (
                  <span className="px-3 py-1 bg-gradient-to-r from-[#6b7280] to-[#9ca3af] text-white rounded-full text-xs">
                    {selectedVideo.category}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {selectedVideo.date ? formatDate(selectedVideo.date) : selectedVideo.date}
                </span>
                {selectedVideo.duration && (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {selectedVideo.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}