'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Testimonials() {
  const t = useTranslations('Testimonials');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart Inc',
      avatar: '👩‍💼',
      content: t('testimonial1.content'),
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder, GrowthLabs',
      avatar: '👨‍💼',
      content: t('testimonial2.content'),
      rating: 5,
    },
    {
      name: 'Emma Williams',
      role: 'Marketing Director, InnovateCo',
      avatar: '👩‍🎨',
      content: t('testimonial3.content'),
      rating: 5,
    },
    {
      name: 'David Martinez',
      role: 'CTO, DataFlow Systems',
      avatar: '👨‍💻',
      content: t('testimonial4.content'),
      rating: 5,
    },
  ];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="relative py-32 overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#C93C3C]/10 rounded-full blur-[150px]" />

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

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl p-8 mb-16 border"
          style={{
            backgroundColor: 'rgba(201, 60, 60, 0.05)',
            borderColor: 'rgba(201, 60, 60, 0.2)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { value: '200+', label: t('socialProof.clients') },
              { value: '4.9/5', label: t('socialProof.rating') },
              { value: '98%', label: t('socialProof.satisfaction') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <div className="text-4xl sm:text-5xl font-bold mb-2" style={{ color: '#C93C3C' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#4b5563' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-12 relative border"
              style={{
                backgroundColor: 'rgba(201, 60, 60, 0.05)',
                borderColor: 'rgba(201, 60, 60, 0.2)'
              }}
            >
              <div className="absolute top-8 left-8 text-6xl" style={{ color: 'rgba(201, 60, 60, 0.2)' }}>"</div>
              <div className="absolute bottom-8 right-8 text-6xl" style={{ color: 'rgba(201, 60, 60, 0.2)' }}>"</div>

              <div className="relative z-10">
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.svg
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                      className="w-6 h-6 fill-current text-yellow-400"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </motion.svg>
                  ))}
                </div>

                <p className="text-xl leading-relaxed mb-8 text-center max-w-3xl mx-auto" style={{ color: '#374151' }}>
                  {testimonials[currentIndex].content}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border"
                    style={{
                      backgroundColor: 'rgba(201, 60, 60, 0.1)',
                      borderColor: 'rgba(201, 60, 60, 0.2)'
                    }}
                  >
                    {testimonials[currentIndex].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-lg" style={{ color: '#1f2937' }}>
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-sm" style={{ color: '#6b7280' }}>
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors border"
              style={{
                backgroundColor: 'rgba(201, 60, 60, 0.1)',
                borderColor: 'rgba(201, 60, 60, 0.2)',
                color: '#C93C3C'
              }}
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-8 bg-[#C93C3C]'
                      : 'bg-[#C93C3C]/30 hover:bg-[#C93C3C]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              className="w-12 h-12 rounded-full flex items-center justify-center transition-colors border"
              style={{
                backgroundColor: 'rgba(201, 60, 60, 0.1)',
                borderColor: 'rgba(201, 60, 60, 0.2)',
                color: '#C93C3C'
              }}
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}