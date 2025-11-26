'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll state after scrolling past hero section (approximately)
      setScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#process', label: 'Process' },
    { href: '#services', label: 'Services' },
    { href: '#benefits', label: 'Benefits' },
    { href: '#plans', label: 'Plans' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-4 left-0 right-0 z-50 flex justify-center transition-all duration-300`}
    >
      <motion.div 
        animate={{
          maxWidth: scrolled ? '900px' : '1400px',
          paddingLeft: scrolled ? '24px' : '48px',
          paddingRight: scrolled ? '24px' : '48px',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`transition-all duration-300 w-full ${
          scrolled ? 'backdrop-blur-xl bg-black/50' : 'backdrop-blur-md bg-black/30'
        } border border-white/10 rounded-lg py-3 mx-4`}
      >
        <div className={`flex items-center transition-all duration-300 ${
          scrolled ? 'gap-8' : 'gap-16'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
              <div className="grid grid-cols-2 gap-[2px] w-4 h-4">
                <div className="bg-[#D8420E] rounded-sm"></div>
                <div className="bg-[#D8420E] rounded-sm"></div>
                <div className="bg-[#D8420E] rounded-sm"></div>
                <div className="bg-[#D8420E] rounded-sm"></div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation - Center */}
          <div className={`hidden md:flex items-center flex-1 justify-center transition-all duration-300 ${
            scrolled ? 'gap-1' : 'gap-8'
          }`}>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <a  
                  href={link.href}
                  className={`py-2 text-sm text-gray-300 hover:text-white transition-all duration-300 rounded-md hover:bg-white/10 ${
                    scrolled ? 'px-3' : 'px-6'
                  }`}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right Side - CTA */}
          <div className="hidden md:flex items-center flex-shrink-0">
            <a href="#contact">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#D8420E] border border-white/10 text-white text-sm font-medium rounded-lg hover:bg-[#0D2556] hover:shadow-lg hover:shadow-[#D8420E]/30 transition-all flex items-center gap-2"
              >
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </motion.button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-white flex-shrink-0"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 mt-3 pt-3"
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}