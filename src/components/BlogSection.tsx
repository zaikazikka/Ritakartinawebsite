import { BlogPost } from "./BlogPost";

export function BlogSection() {
  const blogPosts = [
    {
      title: "Finding Inspiration in Everyday Moments",
      excerpt: "Sometimes the most profound insights come from the simplest experiences. Here's how I learned to notice the beauty in ordinary days.",
      date: "Nov 10, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzI0NzA0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Lifestyle"
    },
    {
      title: "The Art of Mindful Living",
      excerpt: "Exploring how mindfulness has transformed my daily routine and brought more peace into my life.",
      date: "Nov 5, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1603106358772-d86f54b51cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjMyOTcwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Personal Growth"
    },
    {
      title: "My Morning Routine for Productivity",
      excerpt: "A peek into my morning rituals that help me start each day with intention and energy.",
      date: "Oct 28, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1585499465621-d0cf92ff53f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBub3RlYm9va3xlbnwxfHx8fDE3NjMyOTcwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Productivity"
    },
    {
      title: "Lessons from a Year of Writing",
      excerpt: "Reflecting on what I've learned after committing to write consistently for an entire year.",
      date: "Oct 20, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1621762780741-57ed7111a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdyaXRpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYzMjg1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Writing"
    },
    {
      title: "Creating a Cozy Workspace at Home",
      excerpt: "Tips and ideas for designing a workspace that inspires creativity and comfort.",
      date: "Oct 12, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwd29ya3NwYWNlfGVufDF8fHx8MTc2MzI0NzA0MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Lifestyle"
    },
    {
      title: "Embracing Change and Growth",
      excerpt: "How I learned to welcome change instead of resisting it, and the growth that followed.",
      date: "Oct 5, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1603106358772-d86f54b51cfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMGxpZmVzdHlsZXxlbnwxfHx8fDE3NjMyOTcwNDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      category: "Personal Growth"
    }
  ];

  return (
    <section id="blog" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">Latest Articles</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Thoughts, stories, and insights from my journey
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <BlogPost
              key={index}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              readTime={post.readTime}
              image={post.image}
              category={post.category}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 border border-gray-700 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </section>
  );
}
