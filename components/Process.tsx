'use client';

import React, { memo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

// MacOS Window Component - Optimized
const MacWindow = memo(({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative rounded-lg overflow-hidden border ${className}`}
    style={{
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(12px)',
      borderColor: 'rgba(255, 255, 255, 0.1)'
    }}
  >
    <div className="h-6 flex items-center px-2.5 gap-1.5"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
    >
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
    </div>
    <div className="p-4">
      {children}
    </div>
  </div>
));

MacWindow.displayName = 'MacWindow';

// Optimized Bar Chart - CSS animations for GPU acceleration
const AnimatedBarChart = memo(() => {
  const bars = [
    { height: 75, color: 'bg-[#C93C3C]/70', delay: 0 },
    { height: 45, color: 'bg-[#FFFFFF]/60', delay: 0.15 },
    { height: 85, color: 'bg-[#FFFFFF]/70', delay: 0.3 },
    { height: 55, color: 'bg-[#FFFFFF]/60', delay: 0.45 },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between h-14 gap-1.5">
        {bars.map((bar, index) => (
          <div key={index} className="flex-1 flex flex-col justify-end">
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ 
                height: `${bar.height}%`,
                opacity: 1
              }}
              transition={{
                duration: 0.8,
                delay: bar.delay,
                ease: "easeOut"
              }}
              className={`w-full ${bar.color} rounded-t`}
              style={{
                animation: `barPulse 2s ease-in-out ${bar.delay}s infinite`,
                transformOrigin: 'bottom'
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="space-y-1.5">
        {[60, 80, 70].map((width, i) => (
          <motion.div
            key={i}
            initial={{ width: 0, opacity: 0 }}
            animate={{ 
              width: `${width}%`,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              delay: i * 0.15,
              ease: "easeOut"
            }}
            className="h-1 bg-white/10 rounded"
            style={{
              animation: `textFade 3s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>
    </div>
  );
});

AnimatedBarChart.displayName = 'AnimatedBarChart';

// Optimized Target/Gauge - CSS animations for smooth performance
const TargetGauge = memo(() => {
  return (
    <div className="relative w-16 h-16">
      {/* Multiple animated circles - CSS animations */}
      <div
        className="absolute inset-0 border-2 border-[#C93C3C]/30 rounded-full"
        style={{
          animation: 'gaugePulse1 2.5s ease-in-out infinite'
        }}
      />
      <div
        className="absolute inset-1 border-2 border-[#C93C3C]/40 rounded-full"
        style={{
          animation: 'gaugePulse2 2s ease-in-out infinite'
        }}
      />
      <div
        className="absolute inset-2 border-2 border-[#FFFFFF]/50 rounded-full"
        style={{
          animation: 'gaugePulse3 1.8s ease-in-out infinite'
        }}
      />
      
      {/* Rotating arc */}
      <div
        className="absolute inset-0"
        style={{
          animation: 'gaugeRotate 4s linear infinite'
        }}
      >
        <div className="w-full h-full border-2 border-transparent border-t-[#C93C3C] rounded-full" />
      </div>
      
      {/* Center pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-2.5 h-2.5 bg-[#C93C3C] rounded-full shadow-lg shadow-[#C93C3C]/50"
          style={{
            animation: 'centerPulse 1.5s ease-in-out infinite'
          }}
        />
      </div>
      
      {/* Orbiting dots */}
      {[0, 120, 240].map((angle, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{
            animation: `orbitRotate 3s linear infinite`,
            animationDelay: `${i * 0.3}s`
          }}
        >
          <div 
            className="absolute w-1 h-1 bg-[#FFFFFF] rounded-full"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateY(-24px)'
            }}
          />
        </div>
      ))}
    </div>
  );
});

TargetGauge.displayName = 'TargetGauge';

// Optimized Code Animation - CSS animations for typing effect
const CodeAnimation = memo(() => {
  const codeLines = [
    { text: 'Sampling(ayers.Layer):', color: 'text-[#C93C3C]', width: 85, delay: 0 },
    { text: '"""Uses mean, log_var to sample z..."""', color: 'text-gray-500', width: 95, delay: 0.6 },
    { text: '', color: '', width: 0, delay: 0 },
    { text: 'call(self, inputs):', color: 'text-blue-400', width: 70, delay: 1.2 },
    { text: '  mean, log_var = inputs', color: 'text-gray-700', width: 80, delay: 1.5 },
    { text: '  batch = tf.shape(mean)[0]', color: 'text-gray-700', width: 85, delay: 1.8 },
    { text: '  dim = tf.shape(mean)[1]', color: 'text-gray-700', width: 82, delay: 2.1 },
  ];

  return (
    <div className="space-y-2 py-2 font-mono text-[10px]">
      {codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.4,
            delay: i * 0.15,
          }}
          className="flex items-center gap-2"
        >
          {line.width > 0 && (
            <>
              <div 
                className="text-[#C93C3C]"
                style={{
                  animation: `cursorBlink 0.8s ease-in-out ${line.delay}s 3`
                }}
              >
                {'>'}
              </div>
              <div
                className={`overflow-hidden whitespace-nowrap ${line.color}`}
                style={{
                  animation: `typeWriter 0.8s steps(${Math.floor(line.text.length / 2)}) ${line.delay}s forwards`,
                  width: 0,
                  maxWidth: `${line.width}%`
                }}
              >
                {line.text}
              </div>
            </>
          )}
        </motion.div>
      ))}
      {/* Blinking cursor at the end */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="flex items-center gap-2"
      >
        <div className="text-[#C93C3C]">{'>'}</div>
        <div 
          className="w-1 h-3 bg-[#C93C3C]"
          style={{
            animation: 'cursorBlink 0.8s ease-in-out infinite'
          }}
        />
      </motion.div>
    </div>
  );
});

CodeAnimation.displayName = 'CodeAnimation';

// Status Panel - Simplified
const StatusPanel = memo(() => {
  const statuses = [
    { label: 'Security', icon: '🛡️' },
    { label: 'Efficiency', icon: '⚡' },
    { label: 'Speed', icon: '🚀' },
    { label: 'Accuracy', icon: '🎯' }
  ];

  return (
    <div className="space-y-2">
      {statuses.map((status, index) => (
        <motion.div
          key={status.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${
            index === 1 ? 'bg-white/20' : 'bg-white/5'
          }`}
        >
          <div className="w-6 h-6 flex items-center justify-center bg-white/10 rounded">
            <span className="text-[10px]">{status.icon}</span>
          </div>
          <span className="text-gray-900/70">{status.label}</span>
        </motion.div>
      ))}
    </div>
  );
});

StatusPanel.displayName = 'StatusPanel';

// Updating Status - Simplified
const UpdatingStatus = memo(() => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="w-12 h-12"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgba(216, 66, 14, 0.5)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="rgb(216, 66, 14)"
            strokeWidth="8"
            strokeDasharray="70 210"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
      <p className="text-xs text-gray-900/70">Updating...</p>
    </div>
  );
});

UpdatingStatus.displayName = 'UpdatingStatus';

const ProcessCard = memo(({ step, index, isInView }: any) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative group"
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="rounded-3xl p-8 h-full flex flex-col relative overflow-hidden border"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Simplified hover effect - only opacity for performance */}
        {isHovered && (
          <div
            className="absolute inset-0 z-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at center, rgba(13, 37, 86, 0.6) 0%, transparent 60%)',
            }}
          />
        )}

        <div className="relative z-10 flex flex-col h-full space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
          >
            {step.component}
          </motion.div>

          <div className="flex-grow">
            <h3 
              className="text-2xl font-bold mb-4 transition-colors"
              style={{
                color: isHovered ? '#C93C3C' : '#FFFFFF',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {step.title}
            </h3>
            <p 
              className="leading-relaxed font-light"
              style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {step.description}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
});

ProcessCard.displayName = 'ProcessCard';

export default function Process() {
  const t = useTranslations('Process');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      number: '01',
      title: 'Discovery & Analysis',
      description: 'We dive deep into your needs, exploring ideas and defining strategies for long-term success.',
      component: (
        <MacWindow className="h-[180px]">
          <div className="flex gap-3 h-full items-center">
            <div className="flex-1">
              <AnimatedBarChart />
            </div>
            <div className="flex items-center justify-center">
              <TargetGauge />
            </div>
          </div>
        </MacWindow>
      )
    },
    {
      number: '02',
      title: 'Development & Test',
      description: 'We craft tailored solutions for your goals and rigorously test them for top-notch reliability.',
      component: (
        <MacWindow className="h-[180px]">
          <CodeAnimation />
        </MacWindow>
      )
    },
    {
      number: '03',
      title: 'Launch & Maintain',
      description: 'We deploy your solution seamlessly and ensure its continued performance with ongoing care.',
      component: (
        <MacWindow className="h-[180px]">
          <div className="grid grid-cols-2 gap-3 h-full">
            <StatusPanel />
            <div className="flex items-center justify-center">
              <UpdatingStatus />
            </div>
          </div>
        </MacWindow>
      )
    }
  ];

  return (
    <section 
      ref={ref} 
      id="process" 
      className="py-20 sm:py-24 lg:py-32 overflow-hidden"
      style={{ backgroundColor: '#FFFFFF' }}
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
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
            id="process-heading"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="#contact">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full font-semibold text-gray-900 transition-all duration-300 shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #C93C3C 0%, #FFFFFF 100%)',
                fontFamily: "'Outfit', sans-serif"
              }}
            >
              {t('cta')}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}