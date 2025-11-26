'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const socialLinks = [
    { icon: '𝕏', href: '#', label: 'Twitter' },
    { icon: '📘', href: '#', label: 'Facebook' },
    { icon: '💼', href: '#', label: 'LinkedIn' },
    { icon: '📸', href: '#', label: 'Instagram' },
  ];

  return (
    <footer ref={ref} className="relative py-20 overflow-hidden border-t" style={{ borderColor: 'rgba(13, 37, 86, 0.3)' }}>
      
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-12 h-12 rounded-xl glass-effect glass-border flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-3xl">🐻</span>
              </div>
              <span className="text-2xl font-bold text-gray-900 group-hover:text-indigo-300 transition-colors">
                BAM
              </span>
            </Link>

            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              {t('description')}
            </p>

            <p className="text-gray-500 text-sm mb-8">
              📍 {t('location')}
            </p>

            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 glass-effect glass-border rounded-xl flex items-center justify-center hover:bg-[#C93C3C]/10 transition-all"
                  aria-label={social.label}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {[
                { label: tNav('home'), href: '/' },
                { label: tNav('services'), href: '#services' },
                { label: tNav('about'), href: '#about' },
                { label: tNav('contact'), href: '#contact' },
              ].map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-[#C93C3C] transition-colors inline-flex items-center group"
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="mr-2 text-[#C93C3C]"
                    >
                      →
                    </motion.span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-lg text-gray-900 mb-4">
              {t('newsletter.title')}
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              {t('newsletter.description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full px-4 py-3 glass-effect glass-border rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#C93C3C] transition-all text-sm"
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary py-3 text-sm"
              >
                {t('newsletter.subscribe')}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} BAM. {t('rights')}
              </p>
              
              {/* Language Switcher in Footer */}
              <div className="flex items-center gap-4">
                <span className="text-gray-500 text-sm hidden md:inline">|</span>
                <LanguageSwitcher />
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-[#C93C3C] transition-colors">
                {t('legal.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-[#C93C3C] transition-colors">
                {t('legal.terms')}
              </Link>
              <Link href="/cookies" className="text-gray-500 hover:text-[#C93C3C] transition-colors">
                {t('legal.cookies')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}