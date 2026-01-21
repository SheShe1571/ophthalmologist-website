'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FloatingEyeProps {
  className?: string;
  size?: number;
  opacity?: number;
  parallaxStrength?: number;
}

// Single floating eye SVG component
function EyeSVG({ size = 100, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer eye shape */}
      <ellipse
        cx="50"
        cy="50"
        rx="45"
        ry="30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.3"
      />
      {/* Iris */}
      <circle cx="50" cy="50" r="20" fill="currentColor" opacity="0.2" />
      {/* Pupil */}
      <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.4" />
      {/* Highlight */}
      <circle cx="55" cy="45" r="4" fill="white" opacity="0.6" />
    </svg>
  );
}

// Stylized eye icon
function StylizedEye({ size = 80, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.6}
      viewBox="0 0 100 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Eye outline */}
      <path
        d="M50 5C25 5 5 30 5 30s20 25 45 25 45-25 45-25S75 5 50 5z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        opacity="0.2"
      />
      {/* Iris outer */}
      <circle cx="50" cy="30" r="18" fill="currentColor" opacity="0.15" />
      {/* Iris inner */}
      <circle cx="50" cy="30" r="12" fill="currentColor" opacity="0.25" />
      {/* Pupil */}
      <circle cx="50" cy="30" r="6" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

interface FloatingEyeElementProps {
  x: number;
  y: number;
  size: number;
  delay: number;
  type: 'round' | 'stylized';
  scrollY: ReturnType<typeof useScroll>['scrollY'];
  parallaxStrength: number;
}

function FloatingEyeElement({
  x,
  y,
  size,
  delay,
  type,
  scrollY,
  parallaxStrength,
}: FloatingEyeElementProps) {
  // Parallax effect based on scroll
  const yOffset = useTransform(
    scrollY,
    [0, 1000],
    [0, parallaxStrength * (Math.random() > 0.5 ? 1 : -1)]
  );
  const smoothY = useSpring(yOffset, { stiffness: 50, damping: 20 });

  return (
    <motion.div
      className="absolute pointer-events-none text-primary-500"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        y: smoothY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: [0, 10, -5, 8, 0],
        y: [0, -15, 5, -10, 0],
      }}
      transition={{
        opacity: { duration: 1, delay },
        scale: { duration: 1, delay },
        x: {
          duration: 15 + Math.random() * 10,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        y: {
          duration: 12 + Math.random() * 8,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {type === 'round' ? (
        <EyeSVG size={size} />
      ) : (
        <StylizedEye size={size} />
      )}
    </motion.div>
  );
}

export function FloatingEyes({
  className = '',
  opacity = 0.15,
  parallaxStrength = 50,
}: FloatingEyeProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Eye positions and configurations
  const eyes = [
    { x: 5, y: 10, size: 80, delay: 0, type: 'round' as const },
    { x: 85, y: 15, size: 60, delay: 0.2, type: 'stylized' as const },
    { x: 15, y: 40, size: 50, delay: 0.4, type: 'stylized' as const },
    { x: 90, y: 45, size: 70, delay: 0.3, type: 'round' as const },
    { x: 8, y: 70, size: 55, delay: 0.5, type: 'round' as const },
    { x: 80, y: 75, size: 65, delay: 0.1, type: 'stylized' as const },
    { x: 50, y: 85, size: 45, delay: 0.6, type: 'round' as const },
  ];

  useEffect(() => {
    // Check for mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile or if reduced motion is preferred
  if (isMobile || isReducedMotion) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      {eyes.map((eye, index) => (
        <FloatingEyeElement
          key={index}
          {...eye}
          scrollY={scrollY}
          parallaxStrength={parallaxStrength}
        />
      ))}
    </div>
  );
}

// Simplified version for sections
export function SectionFloatingEyes({ className = '' }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute -right-10 top-10 text-primary-200 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <EyeSVG size={120} />
      </motion.div>
      <motion.div
        className="absolute -left-5 bottom-20 text-secondary-200 opacity-15"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <StylizedEye size={100} />
      </motion.div>
    </div>
  );
}
