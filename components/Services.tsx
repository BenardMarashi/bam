'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Bot, BrainCircuit, Rocket, ShieldCheck, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

// --- TYPE DEFINITIONS ---
interface Service {
  id: number;
  titleKey: string;
  descriptionKey: string;
  Icon: React.ElementType;
}

// --- DATA (Icons only, text comes from translations) ---
const servicesData: Service[] = [
  {
    id: 1,
    titleKey: 'service1.title',
    descriptionKey: 'service1.description',
    Icon: Bot,
  },
  {
    id: 2,
    titleKey: 'service2.title',
    descriptionKey: 'service2.description',
    Icon: BrainCircuit,
  },
  {
    id: 3,
    titleKey: 'service3.title',
    descriptionKey: 'service3.description',
    Icon: Zap,
  },
  {
    id: 4,
    titleKey: 'service4.title',
    descriptionKey: 'service4.description',
    Icon: Rocket,
  },
  {
    id: 5,
    titleKey: 'service5.title',
    descriptionKey: 'service5.description',
    Icon: Code,
  },
  {
    id: 6,
    titleKey: 'service6.title',
    descriptionKey: 'service6.description',
    Icon: ShieldCheck,
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

// --- SERVICE CARD - OPTIMIZED WITH MEMO ---
const ServiceCard = memo(({ service, index, t }: { service: Service; index: number; t: any }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border"
      style={{
        backgroundColor: 'rgba(201, 60, 60, 0.05)',
        borderColor: 'rgba(201, 60, 60, 0.2)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      aria-labelledby={`service-title-${service.id}`}
      aria-describedby={`service-desc-${service.id}`}
    >
      {/* Simplified Background Glow - Only opacity for performance */}
      {isHovered && (
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(201, 60, 60, 0.4) 0%, transparent 60%)',
          }}
        />
      )}

      {/* Card Content */}
      <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
        <div className="flex justify-between items-start">
          <service.Icon 
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
        <div className="flex-grow mt-8">
          <h3 
            id={`service-title-${service.id}`} 
            className="text-2xl font-medium"
            style={{
              color: '#1f2937',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t(service.titleKey)}
          </h3>
          <p 
            id={`service-desc-${service.id}`} 
            className="mt-3 text-base font-light"
            style={{
              color: '#4b5563',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t(service.descriptionKey)}
          </p>
        </div>
        <a 
          href="#contact" 
          className="mt-8 inline-flex items-center text-sm font-medium transition-colors duration-300"
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
          aria-label={`${t('learnMore')} ${t(service.titleKey)}`}
        >
          {t('learnMore')}
          <ArrowRight 
            className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" 
            aria-hidden="true" 
          />
        </a>
      </div>
    </motion.div>
  );
});

ServiceCard.displayName = 'ServiceCard';

// --- MAIN COMPONENT ---
export default function Services() {
  const t = useTranslations('Services');

  return (
    <section
      id="services"
      className="py-20 sm:py-24 lg:py-32"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="services-heading"
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
          <p 
            className="font-bold text-sm uppercase"
            style={{
              color: '#C93C3C',
              letterSpacing: '0.2em',
              fontFamily: "'Outfit', sans-serif"
            }}
          >
            {t('badge')}
          </p>
          <h2
            id="services-heading"
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

        {/* Services Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridContainerVariants}
        >
          {servicesData.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} t={t} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}