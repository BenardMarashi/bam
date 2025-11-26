'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Optimized AnimatedCounter with proper cleanup
const AnimatedCounter = memo(({ end, duration = 2, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let animationFrame: number;
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
});

AnimatedCounter.displayName = 'AnimatedCounter';

const BenefitCard = memo(({ benefit, index, isInView, t }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-3xl p-8 h-full relative overflow-hidden border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Simplified hover effect - only opacity */}
        {isHovered && (
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, rgba(13, 37, 86, 0.6) 0%, transparent 60%)',
            }}
          />
        )}

        <div className="relative z-10">
          {/* Icon Container */}
          <div
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 border"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderColor: 'rgba(255, 255, 255, 0.1)'
            }}
          >
            <span className="text-5xl">{benefit.icon}</span>
          </div>

          {/* Stat Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
            className="mb-6"
          >
            <div 
              className="text-6xl font-bold mb-2"
              style={{
                background: 'linear-gradient(135deg, #C93C3C 0%, #F06666 50%, #FFFFFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              <AnimatedCounter end={parseInt(benefit.stat)} suffix={benefit.suffix} />
            </div>
            <div 
              className="text-sm font-medium"
              style={{
                color: 'rgba(255, 255, 255, 0.5)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {benefit.statLabel}
            </div>
          </motion.div>

          {/* Title */}
          <h3 
            className="text-2xl font-bold mb-4 transition-colors"
            style={{
              color: isHovered ? '#C93C3C' : '#FFFFFF',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {benefit.title}
          </h3>

          {/* Description */}
          <p 
            className="leading-relaxed font-light"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {benefit.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
});

BenefitCard.displayName = 'BenefitCard';

export default function Benefits() {
  const t = useTranslations('Benefits');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: '💰',
      title: t('benefit1.title'),
      description: t('benefit1.description'),
      stat: '40',
      statLabel: t('benefit1.statLabel'),
      suffix: '%',
    },
    {
      icon: '📈',
      title: t('benefit2.title'),
      description: t('benefit2.description'),
      stat: '3',
      statLabel: t('benefit2.statLabel'),
      suffix: 'x',
    },
    {
      icon: '⚡',
      title: t('benefit3.title'),
      description: t('benefit3.description'),
      stat: '60',
      statLabel: t('benefit3.statLabel'),
      suffix: '%',
    },
  ];

  return (
    <section 
      ref={ref} 
      className="py-20 sm:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
            className="inline-block px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] mb-6 rounded-lg"
            style={{
              color: '#C93C3C',
              fontFamily: "'Outfit', sans-serif",
              backgroundColor: 'rgba(216, 66, 14, 0.1)',
              border: '1px solid rgba(216, 66, 14, 0.2)'
            }}
          >
            {t('badge')}
          </motion.span>
          <h2 
            id="benefits-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('title')} <span style={{
              background: 'linear-gradient(135deg, #C93C3C 0%, #F06666 50%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>{t('titleHighlight')}</span>
          </h2>
          <p 
            className="text-xl sm:text-2xl max-w-3xl mx-auto font-light leading-8"
            style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {benefits.map((benefit, index) => (
            <BenefitCard 
              key={index}
              benefit={benefit}
              index={index}
              isInView={isInView}
              t={t}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="rounded-3xl p-8 lg:p-12 border"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderColor: 'rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 150, suffix: '+', label: t('stats.projects') },
              { value: 98, suffix: '%', label: t('stats.satisfaction') },
              { value: 50, suffix: '+', label: t('stats.team') },
              { value: 10, suffix: '+', label: t('stats.experience') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div 
                  className="text-5xl lg:text-6xl font-bold mb-3"
                  style={{
                    background: 'linear-gradient(135deg, #C93C3C 0%, #F06666 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2.5} />
                </div>
                <div 
                  className="text-sm lg:text-base font-medium"
                  style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}