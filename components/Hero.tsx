'use client';

import { motion, Variants } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('Hero');

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #0D2556 0%, #0a2849 50%, #0D2556 100%)'
      }}
    >
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] pointer-events-none"
        >
          <div className="w-full h-full rounded-full blur-[150px] bg-[radial-gradient(circle,rgba(216,66,14,0.4)_0%,rgba(216,66,14,0.3)_35%,transparent_70%)]" />
        </motion.div>

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-[400px] h-[400px] rounded-full blur-[100px] bg-[radial-gradient(circle,rgba(216,66,14,0.3)_0%,transparent_70%)]"
        />
        
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-20 left-20 w-[500px] h-[500px] rounded-full blur-[120px] bg-[radial-gradient(circle,rgba(216,66,14,0.25)_0%,transparent_70%)]"
        />
      </div>

      <div className="absolute inset-0 bg-grid opacity-40" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 section-container py-32 sm:py-40 lg:py-48 text-center"
      >
        <motion.div variants={itemVariants} className="mb-8 inline-block">
          <div className="glass-effect glass-border rounded-lg px-5 py-2 inline-flex items-center gap-2">
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #D8420E 0%, #0D2556 100%)',
                boxShadow: '0 0 10px rgba(13, 37, 86, 0.6)',
              }}
            />
            <span className="text-sm text-gray-300 font-medium">{t('badge')}</span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-bold mb-6 leading-[1.1] tracking-tight"
        >
          <span className="block text-white">{t('title')}</span>
          <span className="block mt-3">
            <span className="gradient-text">{t('subtitle')}</span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
        >
          {t('description')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary min-w-[220px] text-lg shadow-2xl shadow-[#D8420E]/30"
            >
              {t('getStarted')}
            </motion.button>
          </Link>
          <Link href="#services">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn-secondary min-w-[220px] text-lg"
            >
              {t('exploreServices')}
            </motion.button>
          </Link>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-50"
        >
          <span className="text-sm text-gray-500 uppercase tracking-wider">
            {t('trustedBy')}
          </span>
          <div className="flex items-center gap-8">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, opacity: 0.8 }}
                className="w-24 h-10 glass-effect glass-border rounded-lg flex items-center justify-center"
              >
                <div className="w-16 h-6 bg-gradient-to-r from-white/20 to-white/10 rounded" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}