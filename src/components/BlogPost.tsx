import { Calendar, Clock } from "lucide-react";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

export function BlogPost({ title, excerpt, date, readTime, image, category }: BlogPostProps) {
  return (
    <article className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10 transition-all group">
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden bg-gray-900">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="inline-block px-3 py-1 bg-red-600/20 text-red-400 rounded-full mb-4">
          {category}
        </div>

        <h3 className="text-white mb-3 group-hover:text-red-500 transition-colors">
          {title}
        </h3>

        <p className="text-gray-400 mb-4">
          {excerpt}
        </p>

        <div className="flex items-center gap-4 text-gray-500">
          <div className="flex items-center gap-1.5">
            <Calendar size={16} />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={16} />
            <span>{readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
