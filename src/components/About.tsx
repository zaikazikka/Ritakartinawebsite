import { BookOpen, Coffee, Heart, Sparkles } from "lucide-react";

export function About() {
  const interests = [
    {
      icon: BookOpen,
      title: "Writing",
      description: "Crafting stories and sharing experiences through words"
    },
    {
      icon: Coffee,
      title: "Coffee Lover",
      description: "Best ideas come with a good cup of coffee"
    },
    {
      icon: Heart,
      title: "Personal Growth",
      description: "Always learning and evolving every day"
    },
    {
      icon: Sparkles,
      title: "Creativity",
      description: "Finding inspiration in everyday moments"
    }
  ];

  return (
    <section id="about" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white mb-4">About Me</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            I believe in the power of storytelling and authentic connection. 
            Through this blog, I share my journey, insights, and creative adventures.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {interests.map((interest, index) => {
            const Icon = interest.icon;
            return (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-all hover:shadow-xl hover:shadow-red-500/10"
              >
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-white mb-2">{interest.title}</h3>
                <p className="text-gray-400">{interest.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
