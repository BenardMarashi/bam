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
    <footer ref={ref} className="relative py-20 overflow-hidden border-t" style={{ borderColor: 'rgba(201, 60, 60, 0.2)', backgroundColor: '#FFFFFF' }}>
      
      <div className="relative z-10 section-container">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <img src="/logo.png" alt="BAM" className="h-12 w-auto group-hover:scale-110 transition-transform" />
            </Link>

            <p className="leading-relaxed mb-6 max-w-md" style={{ color: '#4b5563' }}>
              {t('description')}
            </p>

            <p className="text-sm mb-8" style={{ color: '#6b7280' }}>
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
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-all border"
                  style={{
                    backgroundColor: 'rgba(201, 60, 60, 0.1)',
                    borderColor: 'rgba(201, 60, 60, 0.2)'
                  }}
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
            <h3 className="font-semibold text-lg mb-6" style={{ color: '#1f2937' }}>
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
                    className="transition-colors inline-flex items-center group"
                    style={{ color: '#4b5563' }}
                  >
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      className="mr-2"
                      style={{ color: '#C93C3C' }}
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
            <h3 className="font-semibold text-lg mb-4" style={{ color: '#1f2937' }}>
              {t('newsletter.title')}
            </h3>
            <p className="text-sm mb-6" style={{ color: '#4b5563' }}>
              {t('newsletter.description')}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="w-full px-4 py-3 rounded-xl text-sm transition-all border focus:outline-none focus:ring-2 focus:ring-[#C93C3C]"
                style={{
                  backgroundColor: 'rgba(201, 60, 60, 0.05)',
                  borderColor: 'rgba(201, 60, 60, 0.2)',
                  color: '#1f2937'
                }}
                required
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 text-sm rounded-full font-semibold text-white"
                style={{ backgroundColor: '#C93C3C' }}
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
          className="pt-8"
          style={{ borderTop: '1px solid rgba(201, 60, 60, 0.2)' }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm" style={{ color: '#6b7280' }}>
                © {new Date().getFullYear()} BAM. {t('rights')}
              </p>
              
              {/* Language Switcher in Footer */}
              <div className="flex items-center gap-4">
                <span className="text-sm hidden md:inline" style={{ color: '#6b7280' }}>|</span>
                <LanguageSwitcher />
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="transition-colors" style={{ color: '#6b7280' }}>
                {t('legal.privacy')}
              </Link>
              <Link href="/terms" className="transition-colors" style={{ color: '#6b7280' }}>
                {t('legal.terms')}
              </Link>
              <Link href="/cookies" className="transition-colors" style={{ color: '#6b7280' }}>
                {t('legal.cookies')}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}