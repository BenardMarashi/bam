'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, memo } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const FAQItem = memo(({ faq, index, isInView, openIndex, toggleFAQ }: any) => {
  const isOpen = openIndex === index;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.button
        onClick={() => toggleFAQ(index)}
        className="w-full rounded-2xl p-6 text-left group transition-colors border"
        style={{
          backgroundColor: 'rgba(201, 60, 60, 0.05)',
          borderColor: 'rgba(201, 60, 60, 0.2)'
        }}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold transition-colors pr-4"
            style={{ color: isOpen ? '#C93C3C' : '#1f2937' }}
          >
            {faq.question}
          </h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(201, 60, 60, 0.1)',
              borderColor: 'rgba(201, 60, 60, 0.2)'
            }}
          >
            <svg
              className="w-5 h-5"
              style={{ color: '#C93C3C' }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Use max-height instead of height for better performance */}
        <motion.div
          initial={false}
          animate={{
            maxHeight: isOpen ? 500 : 0,
            opacity: isOpen ? 1 : 0,
            marginTop: isOpen ? 16 : 0
          }}
          transition={{ 
            duration: 0.3,
            ease: "easeInOut"
          }}
          className="overflow-hidden"
        >
          <p className="leading-relaxed" style={{ color: '#4b5563' }}>{faq.answer}</p>
        </motion.div>
      </motion.button>
    </motion.div>
  );
});

FAQItem.displayName = 'FAQItem';

export default function FAQ() {
  const t = useTranslations('FAQ');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('questions.q1.question'),
      answer: t('questions.q1.answer'),
    },
    {
      question: t('questions.q2.question'),
      answer: t('questions.q2.answer'),
    },
    {
      question: t('questions.q3.question'),
      answer: t('questions.q3.answer'),
    },
    {
      question: t('questions.q4.question'),
      answer: t('questions.q4.answer'),
    },
    {
      question: t('questions.q5.question'),
      answer: t('questions.q5.answer'),
    },
    {
      question: t('questions.q6.question'),
      answer: t('questions.q6.answer'),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="absolute inset-0 bg-grid-small opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#C93C3C]/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#C93C3C]/10 rounded-full blur-[150px]" />

      <div className="relative z-10 section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block rounded-lg px-5 py-2 text-sm font-semibold mb-6 tracking-wider uppercase"
            style={{
              color: '#C93C3C',
              backgroundColor: 'rgba(201, 60, 60, 0.1)',
              border: '1px solid rgba(201, 60, 60, 0.2)'
            }}
          >
            {t('badge')}
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: '#1f2937' }}>
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-xl sm:text-2xl max-w-3xl mx-auto" style={{ color: '#4b5563' }}>
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isInView={isInView}
              openIndex={openIndex}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center rounded-3xl p-12 max-w-3xl mx-auto border"
          style={{
            backgroundColor: 'rgba(201, 60, 60, 0.05)',
            borderColor: 'rgba(201, 60, 60, 0.2)'
          }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: '#1f2937' }}>
            {t('stillHaveQuestions')}
          </h3>
          <p className="mb-8" style={{ color: '#4b5563' }}>
            {t('stillHaveQuestionsText')}
          </p>
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold text-white shadow-2xl shadow-[#C93C3C]/30"
              style={{ backgroundColor: '#C93C3C' }}
            >
              {t('contactUs')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}