'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function ContactCTA() {
  const t = useTranslations('ContactCTA');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section 
      ref={ref} 
      className="relative py-32 overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #0D2556 0%, #081b3d 100%)'
      }}
    >
      {/* Subtle grid - NO ORBS */}
      <div className="absolute inset-0 bg-grid-small opacity-10" />
      
      {/* Static decorative circles - NO animations */}
      <div className="absolute -top-20 -left-20 w-40 h-40 border border-[#D8420E]/10 rounded-full" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 border border-[#D8420E]/10 rounded-full" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-effect glass-border rounded-[40px] p-12 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D8420E]/5 to-[#D8420E]/5" />

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -top-20 -left-20 w-40 h-40 border border-[#D8420E]/20 rounded-full"
            />
            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-20 -right-20 w-40 h-40 border border-[#D8420E]/20 rounded-full"
            />

            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              >
                {t('title')}<br />
                <span className="gradient-text">{t('titleHighlight')}</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                {t('subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
              >
                <a
                  href="mailto:hello@codebear.at"
                  className="glass-effect glass-border rounded-2xl p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl glass-effect glass-border flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6 text-[#D8420E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-400">{t('emailLabel')}</div>
                      <div className="font-semibold text-white">hello@codebear.at</div>
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+43XXXXXXXXX"
                  className="glass-effect glass-border rounded-2xl p-6 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl glass-effect glass-border flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg
                        className="w-6 h-6 text-[#D8420E]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-gray-400">{t('phoneLabel')}</div>
                      <div className="font-semibold text-white">+43 (0) XXX XXX XXX</div>
                    </div>
                  </div>
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary text-lg px-12 py-5 shadow-2xl shadow-[#D8420E]/40"
                  >
                    {t('scheduleCTA')}
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-gray-400"
              >
                {[
                  { icon: '✓', text: t('features.consultation') },
                  { icon: '✓', text: t('features.response') },
                  { icon: '✓', text: t('features.solutions') },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-[#D8420E]">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}