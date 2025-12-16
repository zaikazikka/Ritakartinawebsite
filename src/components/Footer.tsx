export function Footer() {
  return (
    <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-black border-t border-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2025 Rita Kartina. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-red-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
