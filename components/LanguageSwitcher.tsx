'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { motion } from 'framer-motion';

type Locale = 'en' | 'de';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2 glass-effect glass-border rounded-full p-1">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('en')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          locale === 'en'
            ? 'bg-gradient-to-r from-[#C93C3C] to-[#C93C3C] text-gray-900'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Switch to English"
      >
        EN
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => switchLanguage('de')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          locale === 'de'
            ? 'bg-gradient-to-r from-[#C93C3C] to-[#C93C3C] text-gray-900'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </motion.button>
    </div>
  );
}