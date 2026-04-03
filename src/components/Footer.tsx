import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { MdOutlineAutoAwesome } from 'react-icons/md';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/80 backdrop-blur-xl border-t border-neon-blue/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <MdOutlineAutoAwesome className="w-6 h-6 text-neon-blue animate-pulse" />
                <div className="absolute inset-0 blur-md bg-neon-blue/20 rounded-full" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
                Pangutan<span className="text-white">AI</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your intelligent AI assistant powered by Google Gemini 2.5 Flash. Experience advanced reasoning, code generation, and real-time answers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-110 transform">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-110 transform">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-110 transform">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-neon-blue transition-all duration-300 hover:scale-110 transform">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-neon-blue">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-neon-blue transition-colors">Features</a></li>
              <li><a href="#demo" className="text-gray-400 hover:text-neon-blue transition-colors">Demo</a></li>
              <li><a href="#api" className="text-gray-400 hover:text-neon-blue transition-colors">API</a></li>
              <li><a href="#docs" className="text-gray-400 hover:text-neon-blue transition-colors">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-neon-pink">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://aistudio.google.com/" className="text-gray-400 hover:text-neon-pink transition-colors">Google Gemini API</a></li>
              <li><a href="https://github.com/m4rkbello/pangutanAI" className="text-gray-400 hover:text-neon-pink transition-colors">GitHub</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-neon-pink transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neon-blue/20 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} PangutanAI by Mark Bello. All rights reserved. Powered by Google Gemini 2.5 Flash.</p>
        </div>
      </div>
    </footer>
  );
}