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

  // Nav links now use translation keys
  const navLinks = [
    { href: '#process', labelKey: 'process' },
    { href: '#services', labelKey: 'services' },
    { href: '#benefits', labelKey: 'benefits' },
    { href: '#plans', labelKey: 'plans' },
    { href: '#contact', labelKey: 'contact' },
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
          scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'
        } rounded-lg py-3 mx-4 border`}
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.7)',
          borderColor: 'rgba(201, 60, 60, 0.2)'
        }}
      >
        <div className={`flex items-center transition-all duration-300 ${
          scrolled ? 'gap-8' : 'gap-16'
        }`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ backgroundColor: '#C93C3C' }}>
              <div className="grid grid-cols-2 gap-[2px] w-4 h-4">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
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
                  className={`py-2 text-sm transition-all duration-300 rounded-md ${
                    scrolled ? 'px-3' : 'px-6'
                  }`}
                  style={{ color: '#374151' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#C93C3C';
                    e.currentTarget.style.backgroundColor = 'rgba(201, 60, 60, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#374151';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {t(link.labelKey)}
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
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-2 text-white"
                style={{
                  backgroundColor: '#C93C3C'
                }}
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
            className="md:hidden w-10 h-10 flex items-center justify-center flex-shrink-0"
            style={{ color: '#374151' }}
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
            className="md:hidden mt-3 pt-3"
            style={{ borderTop: '1px solid rgba(201, 60, 60, 0.2)' }}
          >
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg transition-colors"
                  style={{ color: '#374151' }}
                >
                  {t(link.labelKey)}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  );
}