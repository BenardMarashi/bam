'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  serviceKey: string;
  icon: string;
  index: number;
}

export default function ServiceCard({ serviceKey, icon, index }: ServiceCardProps) {
  const t = useTranslations('Services');

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 border border-gray-100"
    >
      <div className="text-5xl mb-4">{icon}</div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {t(`${serviceKey}.title`)}
      </h3>
      
      <p className="text-blue-600 font-semibold mb-4">
        {t(`${serviceKey}.price`)}
      </p>
      
      <p className="text-gray-600 mb-6">
        {t(`${serviceKey}.description`)}
      </p>
      
      <ul className="space-y-3 mb-6">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <li key={idx} className="flex items-start">
            <span className="text-green-500 mr-2 mt-1">✓</span>
            <span className="text-gray-700">
              {t(`${serviceKey}.features.${idx}`)}
            </span>
          </li>
        ))}
      </ul>
      
      <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-[#D8420E] text-white rounded-lg font-semibold hover:shadow-lg transition-all">
        {t('learnMore')}
      </button>
    </motion.div>
  );
}