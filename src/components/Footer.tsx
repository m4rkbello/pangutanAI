import { FaGithub, FaFacebook, FaYoutube, FaGoogle } from 'react-icons/fa';
import { MdOutlineAutoAwesome } from 'react-icons/md';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black/60 backdrop-blur-xl border-t border-white/10 shadow-[0_-8px_32px_rgba(0,0,0,0.2)]">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-1 sm:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative">
                <MdOutlineAutoAwesome className="w-5 h-5 sm:w-6 sm:h-6 text-neon-blue animate-pulse" />
                <div className="absolute inset-0 blur-md bg-neon-blue/20 rounded-full" />
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-neon-blue to-neon-pink bg-clip-text text-transparent">
                Pangutan<span className="text-white">AI</span>
              </span>
            </div>
            <p className="text-sm sm:text-base text-white/60 mb-4 max-w-md">
              Your intelligent AI assistant powered by Google Gemini 2.5 Flash. Experience advanced reasoning, code generation, and real-time answers.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <a 
                href="https://github.com/m4rkbello" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#333] transition-all duration-300 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              
              <a 
                href="https://facebook.com/m4rkbello" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#1877F2] transition-all duration-300 hover:scale-110 transform"
                aria-label="Facebook"
              >
                <FaFacebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              
              <a 
                href="https://youtube.com/@m4rkbello" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/40 hover:text-[#FF0000] transition-all duration-300 hover:scale-110 transform"
                aria-label="YouTube"
              >
                <FaYoutube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              
              <a 
                href="mailto:markamarcortejopanesbello@gmail.com?subject=Hello%20PangutanAI&body=I%20would%20like%20to%20know%20more%20about..." 
                className="text-white/40 hover:text-[#EA4335] transition-all duration-300 hover:scale-110 transform"
                aria-label="Gmail"
              >
                <FaGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-neon-blue text-sm sm:text-base">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/60 hover:text-neon-blue transition-colors text-sm sm:text-base">Features</a></li>
              <li><a href="#demo" className="text-white/60 hover:text-neon-blue transition-colors text-sm sm:text-base">Demo</a></li>
              <li><a href="#api" className="text-white/60 hover:text-neon-blue transition-colors text-sm sm:text-base">API</a></li>
              <li><a href="#docs" className="text-white/60 hover:text-neon-blue transition-colors text-sm sm:text-base">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 sm:mb-4 text-neon-pink text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://aistudio.google.com/" className="text-white/60 hover:text-neon-pink transition-colors text-sm sm:text-base" target="_blank" rel="noopener noreferrer">Google Gemini API</a></li>
              <li><a href="https://github.com/m4rkbello/pangutanAI" className="text-white/60 hover:text-neon-pink transition-colors text-sm sm:text-base" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="#" className="text-white/60 hover:text-neon-pink transition-colors text-sm sm:text-base">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-neon-pink transition-colors text-sm sm:text-base">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/10 text-center text-white/40 text-xs sm:text-sm">
          <p>&copy; {currentYear} PangutanAI by Mark Bello. All rights reserved. Powered by Google Gemini 2.5 Flash.</p>
        </div>
      </div>
    </footer>
  );
}