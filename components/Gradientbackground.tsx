'use client';

import { memo } from 'react';

interface GradientBackgroundProps {
  variant?: 'default' | 'hero' | 'section' | 'minimal' | 'global';
  className?: string;
}

/**
 * GradientBackground - Beautiful flowing green aura lights (like aurora borealis)
 * Creates smooth, atmospheric gradient lighting effects throughout your site
 * 
 * Variants:
 * - global: Site-wide animated background (lighter, more shaded than hero)
 * - hero: Bright, prominent aura lights
 * - default: Balanced aura effect
 * - section: Subtle aura glow
 * - minimal: Very subtle single aura
 */
const GradientBackground = memo(function GradientBackground({ 
  variant = 'default',
  className = '' 
}: GradientBackgroundProps) {
  
  const getAuraForVariant = () => {
    switch (variant) {
      case 'global':
        return (
          <>
            {/* Main gradient base - lighter than hero */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(180deg, #0D2556 0%, #081b3d 50%, #0D2556 100%)'
              }}
            />

            {/* Top-left flowing orb - lighter opacity */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                width: '50%',
                height: '50%',
                background: 'radial-gradient(circle, rgba(216, 66, 14, 0.15) 0%, rgba(216, 66, 14, 0.08) 40%, transparent 70%)',
                filter: 'blur(80px)',
                animation: 'floatOrb1 25s ease-in-out infinite',
                opacity: 0.8
              }}
            />

            {/* Center large ambient glow - very subtle */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '25%',
                left: '25%',
                width: '50%',
                height: '50%',
                background: 'radial-gradient(ellipse at center, rgba(13, 37, 86, 0.12) 0%, rgba(216, 66, 14, 0.06) 30%, transparent 60%)',
                filter: 'blur(120px)',
                animation: 'floatOrb2 30s ease-in-out infinite',
                opacity: 0.7
              }}
            />

            {/* Right side gradient sweep - lighter */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '10%',
                right: '-10%',
                width: '45%',
                height: '60%',
                background: 'radial-gradient(ellipse, rgba(216, 66, 14, 0.14) 0%, rgba(216, 66, 14, 0.07) 35%, transparent 65%)',
                filter: 'blur(100px)',
                animation: 'floatOrb3 28s ease-in-out infinite',
                opacity: 0.75
              }}
            />

            {/* Bottom-left accent - subtle green tint */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '5%',
                left: '10%',
                width: '40%',
                height: '40%',
                background: 'radial-gradient(circle, rgba(137, 138, 141, 0.1) 0%, rgba(216, 66, 14, 0.05) 40%, transparent 70%)',
                filter: 'blur(90px)',
                animation: 'floatOrb4 32s ease-in-out infinite',
                opacity: 0.65
              }}
            />

            {/* Bottom-right gradient - very light */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-5%',
                right: '5%',
                width: '45%',
                height: '45%',
                background: 'radial-gradient(circle, rgba(216, 66, 14, 0.11) 0%, rgba(13, 37, 86, 0.06) 40%, transparent 70%)',
                filter: 'blur(95px)',
                animation: 'floatOrb5 27s ease-in-out infinite',
                opacity: 0.7
              }}
            />

            {/* Additional ambient overlay for more depth */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 50% 30%, rgba(216, 66, 14, 0.04) 0%, transparent 50%)',
                opacity: 0.8
              }}
            />

            {/* Subtle grid texture */}
            <div 
              className="absolute inset-0 bg-grid-small"
              style={{ opacity: 0.15 }}
            />
          </>
        );

      case 'hero':
        return (
          <>
            {/* Top flowing aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-20%',
                left: '0',
                right: '0',
                height: '60%',
                background: 'linear-gradient(180deg, rgba(216, 66, 14, 0.15) 0%, rgba(216, 66, 14, 0.08) 40%, transparent 100%)',
                filter: 'blur(60px)',
                animation: 'auraFlow1 20s ease-in-out infinite',
                opacity: 0.8
              }}
            />
            
            {/* Right side aura sweep */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '0',
                right: '-10%',
                width: '50%',
                height: '80%',
                background: 'linear-gradient(270deg, rgba(216, 66, 14, 0.12) 0%, rgba(13, 37, 86, 0.06) 50%, transparent 100%)',
                filter: 'blur(80px)',
                animation: 'auraFlow2 25s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Bottom flowing aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-20%',
                left: '0',
                right: '0',
                height: '50%',
                background: 'linear-gradient(0deg, rgba(216, 66, 14, 0.1) 0%, rgba(216, 66, 14, 0.05) 40%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow3 30s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
        
      case 'section':
        return (
          <>
            {/* Subtle top aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-15%',
                left: '10%',
                right: '10%',
                height: '40%',
                background: 'linear-gradient(180deg, rgba(216, 66, 14, 0.08) 0%, rgba(216, 66, 14, 0.04) 50%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow1 22s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Subtle bottom aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-15%',
                left: '15%',
                right: '15%',
                height: '35%',
                background: 'linear-gradient(0deg, rgba(216, 66, 14, 0.06) 0%, transparent 100%)',
                filter: 'blur(60px)',
                animation: 'auraFlow2 28s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
        
      case 'minimal':
        return (
          <div 
            className="aura-light"
            style={{
              position: 'absolute',
              top: '30%',
              left: '20%',
              right: '20%',
              height: '40%',
              background: 'linear-gradient(180deg, rgba(216, 66, 14, 0.05) 0%, transparent 100%)',
              filter: 'blur(80px)',
              animation: 'auraFlow1 25s ease-in-out infinite',
              opacity: 0.5
            }}
          />
        );
        
      default: // 'default'
        return (
          <>
            {/* Diagonal aura sweep */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '60%',
                height: '60%',
                background: 'linear-gradient(135deg, rgba(216, 66, 14, 0.1) 0%, rgba(216, 66, 14, 0.05) 50%, transparent 100%)',
                filter: 'blur(70px)',
                animation: 'auraFlow1 23s ease-in-out infinite',
                opacity: 0.7
              }}
            />
            
            {/* Center aura glow */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                right: '20%',
                height: '60%',
                background: 'radial-gradient(ellipse at center, rgba(216, 66, 14, 0.06) 0%, transparent 70%)',
                filter: 'blur(90px)',
                animation: 'auraPulse 20s ease-in-out infinite',
                opacity: 0.8
              }}
            />
            
            {/* Bottom right aura */}
            <div 
              className="aura-light"
              style={{
                position: 'absolute',
                bottom: '-10%',
                right: '-10%',
                width: '50%',
                height: '50%',
                background: 'linear-gradient(315deg, rgba(216, 66, 14, 0.08) 0%, transparent 70%)',
                filter: 'blur(75px)',
                animation: 'auraFlow3 27s ease-in-out infinite',
                opacity: 0.6
              }}
            />
          </>
        );
    }
  };

  // For global variant, use fixed positioning
  const positionClass = variant === 'global' ? 'fixed' : 'absolute';

  return (
    <div 
      className={`${positionClass} inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {getAuraForVariant()}
    </div>
  );
});

export default GradientBackground;