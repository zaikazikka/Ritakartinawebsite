export function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1.5 bg-gray-800 rounded-full text-gray-300">
              👋 Welcome to my blog
            </div>
            <h1 className="text-white">
              Hi, I'm <span className="text-red-500">Rita Kartina</span>
            </h1>
            <p className="text-gray-300 text-lg">
              A passionate writer, creative thinker, and storyteller. 
              I share my thoughts on life, creativity, personal growth, and everything in between.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#blog"
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Read My Blog
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-800 border-2 border-gray-700">
              <img
                src="https://images.unsplash.com/photo-1621762780741-57ed7111a3ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHdyaXRpbmclMjBsYXB0b3B8ZW58MXx8fHwxNzYzMjg1NzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Rita Kartina"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-600/20 rounded-2xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gray-800 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
