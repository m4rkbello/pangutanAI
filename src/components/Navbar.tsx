import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '#demo' },
    { name: 'API', href: '#api' },
    { name: 'Docs', href: '#docs' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/80 backdrop-blur-xl border-b border-neon-blue/20 shadow-[0_0_30px_rgba(0,243,255,0.1)]' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Neon Glow */}
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <Sparkles className="w-7 h-7 text-neon-blue animate-pulse" />
              <div className="absolute inset-0 blur-md bg-neon-blue/30 rounded-full group-hover:scale-150 transition-transform duration-300" />
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent animate-gradient-shift">
              Pangutan<span className="text-white">AI</span>
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-blue transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-pink transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Button className="bg-gradient-to-r from-neon-blue to-neon-pink hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all duration-300 border-0">
              Get Started
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 flex flex-col gap-4 bg-black/90 backdrop-blur-xl rounded-2xl p-6 border border-neon-blue/20">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-300 hover:text-neon-blue transition-colors py-2 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button className="bg-gradient-to-r from-neon-blue to-neon-pink w-full">
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}