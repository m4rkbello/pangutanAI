import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { MdOutlineAutoAwesome } from 'react-icons/md';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <MdOutlineAutoAwesome className="w-6 h-6 text-blue-600" />
              <span className="font-bold text-xl">Pangutan<span className="text-blue-600">AI</span></span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
              Your intelligent AI assistant powered by DeepSeek R1. Experience advanced reasoning, code generation, and real-time answers.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Features</a></li>
              <li><a href="#demo" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Demo</a></li>
              <li><a href="#api" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">API</a></li>
              <li><a href="#docs" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Documentation</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Google Gemini API</a></li>
              <li><a href="" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">GitHub</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} PangutanAI. All rights reserved. Powered by DeepSeek R1.</p>
        </div>
      </div>
    </footer>
  );
}