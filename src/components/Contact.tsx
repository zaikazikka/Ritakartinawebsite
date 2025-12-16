import { Mail, Instagram, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-white mb-4">Let's Connect</h2>
        <p className="text-gray-300 mb-8 text-lg">
          I'd love to hear from you! Feel free to reach out through any of these platforms.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="mailto:zaikazikka@gmail.com"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Mail size={20} />
            Email Me
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Instagram size={20} />
            Instagram
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 border border-gray-700 text-white rounded-lg hover:border-red-500 hover:text-red-500 transition-colors"
          >
            <Twitter size={20} />
            Twitter
          </a>
        </div>

        <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12">
          <h3 className="text-white mb-6">Subscribe to My Newsletter</h3>
          <p className="text-gray-400 mb-6">
            Get the latest articles and updates delivered directly to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}