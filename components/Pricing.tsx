'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Rocket, Crown, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

// --- TYPE DEFINITIONS ---
interface PricingPlan {
  id: number;
  titleKey: string;
  priceKey: string;
  descriptionKey: string;
  Icon: React.ElementType;
  popular?: boolean;
}

// --- DATA (Icons only, text comes from translations) ---
const pricingData: PricingPlan[] = [
  {
    id: 1,
    titleKey: 'starter.name',
    priceKey: 'starter.price',
    descriptionKey: 'starter.description',
    Icon: Zap,
    popular: false,
  },
  {
    id: 2,
    titleKey: 'professional.name',
    priceKey: 'professional.price',
    descriptionKey: 'professional.description',
    Icon: Rocket,
    popular: true,
  },
  {
    id: 3,
    titleKey: 'business.name',
    priceKey: 'business.price',
    descriptionKey: 'business.description',
    Icon: Crown,
    popular: false,
  },
  {
    id: 4,
    titleKey: 'enterprise.name',
    priceKey: 'enterprise.price',
    descriptionKey: 'enterprise.description',
    Icon: Building2,
    popular: false,
  },
];

// --- ANIMATION VARIANTS ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// --- PRICING CARD COMPONENT ---
const PricingCard = ({ plan, index, t }: { plan: PricingPlan; index: number; t: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border"
      style={{
        backgroundColor: plan.popular ? 'rgba(201, 60, 60, 0.1)' : 'rgba(201, 60, 60, 0.05)',
        borderColor: plan.popular ? '#C93C3C' : 'rgba(201, 60, 60, 0.2)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-labelledby={`pricing-title-${plan.id}`}
      aria-describedby={`pricing-desc-${plan.id}`}
    >
      {/* Popular Badge */}
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <div 
            className="px-4 py-1 rounded-full text-xs font-semibold text-white"
            style={{
              background: '#C93C3C',
            }}
          >
            {t('popular')}
          </div>
        </div>
      )}

      {/* Background Glow Animation - Only on Hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.5 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            style={{
              background: 'radial-gradient(circle at center, rgba(201, 60, 60, 0.2) 0%, transparent 60%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        {/* Top Section */}
        <div className="flex justify-between items-start mb-8">
          <plan.Icon 
            className="h-8 w-8" 
            style={{ color: '#C93C3C' }}
            aria-hidden="true" 
          />
          <span 
            className="text-xl font-medium"
            style={{
              color: 'rgba(201, 60, 60, 0.3)',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-6">
          <h3 
            id={`pricing-title-${plan.id}`} 
            className="text-2xl font-medium mb-3"
            style={{
              color: '#1f2937',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t(plan.titleKey)}
          </h3>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span 
              className="text-5xl font-bold"
              style={{
                color: '#C93C3C',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {t(plan.priceKey)}
            </span>
            {!t(plan.priceKey).toLowerCase().includes('custom') && !t(plan.priceKey).toLowerCase().includes('porosi') && (
              <span 
                className="text-base font-light"
                style={{
                  color: '#6b7280',
                  fontFamily: "'Outfit', sans-serif"
                }}
              >
                /{t('perMonth')}
              </span>
            )}
          </div>

          <p 
            id={`pricing-desc-${plan.id}`} 
            className="text-base font-light"
            style={{
              color: '#4b5563',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t(plan.descriptionKey)}
          </p>
        </div>

        {/* Features List */}
        <div className="flex-grow mb-6">
          <ul className="space-y-3">
            {[0, 1, 2, 3, 4].map((idx) => {
              const featureKey = `${plan.titleKey.split('.')[0]}.feature${idx + 1}`;
              const feature = t(featureKey);
              
              // Don't render if translation key not found
              if (feature === featureKey) return null;
              
              return (
                <li key={idx} className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
                    style={{ color: '#C93C3C' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span 
                    className="text-sm leading-relaxed"
                    style={{
                      color: '#4b5563',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  >
                    {feature}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* CTA Link */}
        <a 
          href="#contact" 
          className="mt-auto inline-flex items-center text-sm font-medium transition-colors duration-300"
          style={{
            color: '#C93C3C',
            fontFamily: "'Outfit', sans-serif"
          }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = '#a33030';
          }}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.currentTarget.style.color = '#C93C3C';
          }}
          aria-label={`${t('getStarted')} ${t(plan.titleKey)}`}
        >
          {t('getStarted')}
          <ArrowRight 
            className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" 
            aria-hidden="true" 
          />
        </a>
      </div>
    </motion.div>
  );
};

// --- MAIN COMPONENT ---
export default function Pricing() {
  const t = useTranslations('Pricing');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      id="plans"
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="pricing-heading"
    >
      <motion.div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={sectionVariants}
      >
        {/* Section Header */}
        <div className="text-center">
          <span 
            className="inline-block px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] mb-6 rounded-lg"
            style={{
              color: '#C93C3C',
              fontFamily: "'Outfit', sans-serif",
              backgroundColor: 'rgba(201, 60, 60, 0.1)',
              border: '1px solid rgba(201, 60, 60, 0.2)'
            }}
          >
            {t('badge')}
          </span>
          <h2
            id="pricing-heading"
            className="mt-6 text-4xl font-bold sm:text-5xl lg:text-6xl"
            style={{
              color: '#1f2937',
              letterSpacing: '-0.04em',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('title')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p 
            className="mx-auto mt-6 max-w-2xl text-lg font-light leading-8"
            style={{
              color: '#4b5563',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Pricing Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridContainerVariants}
        >
          {pricingData.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} t={t} />
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600">
            {t('note')} <a href="#contact" className="hover:underline transition-colors" style={{ color: '#C93C3C' }}>{t('contactUs')}</a>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}