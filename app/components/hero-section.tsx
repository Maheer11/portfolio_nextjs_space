'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { heroData } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Sketched Brain Center Illustration
function TechBrain() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-80">
      {/* Left hemisphere */}
      <path
        d="M 40 30 Q 30 45 35 60 Q 28 75 40 85 Q 55 92 60 85"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary/60"
      />
      {/* Right hemisphere */}
      <path
        d="M 80 30 Q 90 45 85 60 Q 92 75 80 85 Q 65 92 60 85"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary/60"
      />
      {/* Brain stem */}
      <path
        d="M 58 85 Q 55 95 60 105"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-primary/50"
      />
      {/* Neural nodes - left */}
      <circle cx="45" cy="40" r="2.5" fill="currentColor" className="text-primary/70" />
      <circle cx="35" cy="55" r="2" fill="currentColor" className="text-primary/60" />
      <circle cx="42" cy="72" r="2" fill="currentColor" className="text-primary/60" />
      {/* Neural nodes - center */}
      <circle cx="60" cy="35" r="2.5" fill="currentColor" className="text-primary/70" />
      <circle cx="60" cy="60" r="2.5" fill="currentColor" className="text-primary/70" />
      {/* Neural nodes - right */}
      <circle cx="75" cy="40" r="2.5" fill="currentColor" className="text-primary/70" />
      <circle cx="85" cy="55" r="2" fill="currentColor" className="text-primary/60" />
      <circle cx="78" cy="72" r="2" fill="currentColor" className="text-primary/60" />
      {/* Connection lines */}
      <path d="M 45 40 L 60 35 L 75 40" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
      <path d="M 35 55 L 60 60 L 85 55" stroke="currentColor" strokeWidth="1" className="text-primary/30" />
    </svg>
  );
}

// Company Logos as SVG
const logos = {
  React: (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <ellipse cx="12" cy="12" rx="6" ry="3" fill="none" stroke="currentColor" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="6" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="6" ry="3" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
      <rect x="2" y="2" width="20" height="20" rx="2" />
      <text x="12" y="16" fontSize="9" fontWeight="bold" textAnchor="middle" fill="white">TS</text>
    </svg>
  ),
  Java: (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M8 9c0-1.1.9-2 2-2s2 .9 2 2-1 2-2 2-2-.9-2-2zm6 0c0-1.1.9-2 2-2s2 .9 2 2-1 2-2 2-2-.9-2-2zm-3 5c-3 0-5.5 1.5-5.5 3.5v4h11v-4c0-2-2.5-3.5-5.5-3.5z" />
    </svg>
  ),
  'Spring Boot': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8m1-13h-2v6h2v-6m0 8h-2v2h2v-2z" />
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <rect x="2" y="2" width="20" height="20" rx="2" fill="currentColor" />
      <path d="M8 7h8M8 12h6M8 17h4" stroke="white" strokeWidth="1.5" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2m-4 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2m8 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
    </svg>
  ),
  Git: (
    <svg viewBox="0 0 24 24" className="w-full h-full">
      <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.8 9.2.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1 .8-.2 1.6-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.8-4.5 5 .4.3.7.9.7 1.8v2.8c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.5-4.5-10-10-10z" />
    </svg>
  ),
};

// Orbiting Tools with Company Logos
function OrbitalSkills() {
  const prefersReducedMotion = useReducedMotion();

  const skills = [
    { name: 'React', logo: logos.React, speed: 25, size: 'large', proficiency: 95 },
    { name: 'TypeScript', logo: logos.TypeScript, speed: 28, size: 'large', proficiency: 90 },
    { name: 'Java', logo: logos.Java, speed: 32, size: 'large', proficiency: 88 },
    { name: 'Spring Boot', logo: logos['Spring Boot'], speed: 35, size: 'medium', proficiency: 85 },
    { name: 'Node.js', logo: logos['Node.js'], speed: 38, size: 'medium', proficiency: 87 },
    { name: 'Next.js', logo: logos['Next.js'], speed: 30, size: 'medium', proficiency: 86 },
    { name: 'Tailwind', logo: logos.Tailwind, speed: 27, size: 'medium', proficiency: 92 },
    { name: 'Git', logo: logos.Git, speed: 33, size: 'small', proficiency: 85 },
  ];

  const getSizeClass = (size: string) => {
    switch (size) {
      case 'large':
        return 'w-20 h-20';
      case 'medium':
        return 'w-16 h-16';
      case 'small':
        return 'w-14 h-14';
      default:
        return 'w-16 h-16';
    }
  };

  // Fixed orbital radius for even distribution
  const baseRadius = 120;
  const radiusIncrement = 15;

  const getOrbitRadius = (index: number) => {
    return baseRadius + index * radiusIncrement;
  };

  return (
    <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 relative flex items-center justify-center">
      {/* Central brain */}
      <motion.div
        className="absolute z-20 flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30 flex items-center justify-center">
          <TechBrain />
        </div>
      </motion.div>

      {/* Orbital rings */}
      {!prefersReducedMotion && [0, 1, 2, 3].map((ring) => (
        <motion.div
          key={`ring-${ring}`}
          className="absolute rounded-full border border-primary/10"
          style={{
            width: (ring + 1) * 80,
            height: (ring + 1) * 80,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{
            opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            delay: 0.8 + ring * 0.1,
          }}
        />
      ))}

      {/* Faint outward pulse (subtle, only when not reduced motion) */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-full border border-primary/20"
          animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeOut',
            delay: 2,
          }}
        />
      )}

      {/* Orbiting Tools - Emanate from Brain */}
      {skills.map((skill, index) => {
        const orbitRadius = getOrbitRadius(index);
        const angle = (index / skills.length) * 360;

        if (prefersReducedMotion) {
          // Static orbit layout for reduced motion
          const radian = (angle * Math.PI) / 180;
          const x = Math.cos(radian) * orbitRadius;
          const y = Math.sin(radian) * orbitRadius;

          return (
            <div
              key={skill.name}
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
              }}
            >
              <SkillIcon skill={skill} />
            </div>
          );
        }

        return (
          <motion.div
            key={skill.name}
            className="absolute"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: 1,
              x: Math.cos((angle * Math.PI) / 180) * orbitRadius,
              y: Math.sin((angle * Math.PI) / 180) * orbitRadius,
              rotate: [0, 360],
            }}
            transition={{
              opacity: { duration: 0.8, ease: 'easeOut', delay: 1.5 + index * 0.12 },
              x: { duration: 1.2, ease: 'easeOut', delay: 1.5 + index * 0.12 },
              y: { duration: 1.2, ease: 'easeOut', delay: 1.5 + index * 0.12 },
              rotate: {
                duration: skill.speed,
                repeat: Infinity,
                ease: 'linear',
                delay: 1.5 + index * 0.12,
              },
            }}
            style={{
              left: '50%',
              top: '50%',
              translateX: '-50%',
              translateY: '-50%',
            }}
          >
            <SkillIcon skill={skill} />
          </motion.div>
        );
      })}
    </div>
  );
}

// Extracted skill icon component for reusability
function SkillIcon({ skill }: { skill: any }) {
  const prefersReducedMotion = useReducedMotion();

  const sizeMap = {
    large: 'w-20 h-20',
    medium: 'w-16 h-16',
    small: 'w-14 h-14',
  };

  return (
    <motion.div
      className={`${sizeMap[skill.size as keyof typeof sizeMap]} rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center cursor-pointer group`}
      whileHover={
        !prefersReducedMotion
          ? {
              scale: 1.25,
              boxShadow: `0 0 20px hsl(var(--primary) / 0.6)`,
            }
          : {}
      }
    >
      {/* Logo Glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/20 blur-md"
          animate={{
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Logo */}
      <div className="relative z-10 w-3/4 h-3/4 text-primary/80 group-hover:text-primary transition-colors">
        {skill.logo}
      </div>

      {/* Label Tooltip */}
      <motion.div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-card border border-border/50 rounded-lg px-3 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-xs font-semibold text-foreground">{skill.name}</p>
        <p className="text-xs text-muted-foreground">{skill.proficiency}%</p>
      </motion.div>
    </motion.div>
  );
}

// Minimal CTA Button with Animated Arrow
function ViewProjectsButton({ scrollTo }: { scrollTo: (id: string) => void }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      onClick={() => scrollTo('projects')}
      className="group relative inline-flex items-center gap-2 text-base sm:text-lg font-medium text-foreground py-2 px-1"
      whileHover={!prefersReducedMotion ? { x: 4 } : {}}
    >
      {/* Text */}
      <span className="relative">
        View Projects
        {/* Animated underline */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          whileHover={!prefersReducedMotion ? { width: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </span>

      {/* Animated arrow */}
      <motion.svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
        animate={!prefersReducedMotion ? { x: [0, 4, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </motion.svg>
    </motion.button>
  );
}

// ============ Mobile hero (bento identity dashboard) ============
function HeroAvatar({ animate }: { animate: boolean }) {
  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 }}
      className="relative flex-shrink-0"
    >
      <div className="relative w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-primary/40 ring-offset-2 ring-offset-background">
        <Image
          src="/profile.jpg"
          alt="Portrait of Mahmud Abdul Gafar"
          fill
          sizes="80px"
          className="object-cover"
          priority
        />
      </div>
      <span
        className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-background"
        aria-hidden="true"
      />
    </motion.div>
  );
}

function MobileKicker({ text }: { text: string }) {
  return (
    <span className="block font-mono text-[11px] text-primary/80 tracking-wider mb-1.5">{text}</span>
  );
}

const MOBILE_STACK = ['React', 'TypeScript', 'Java', 'Spring Boot', 'Node.js', 'Next.js', 'Tailwind', 'Git'];

function MobileHeroBento({ scrollTo }: { scrollTo: (id: string) => void }) {
  const prefersReducedMotion = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="lg:hidden w-full flex flex-col gap-3"
      variants={container}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate="visible"
    >
      {/* 01 / identity */}
      <motion.div
        variants={item}
        className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 p-5 flex items-center justify-between gap-4"
      >
        <div className="min-w-0">
          <MobileKicker text="01 / HELLO" />
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {heroData?.name ?? 'Developer'}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"
              animate={prefersReducedMotion ? undefined : { scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-bold text-primary uppercase tracking-widest">
              {heroData?.title ?? 'Software Engineer'}
            </span>
          </div>
        </div>
        <HeroAvatar animate={!prefersReducedMotion} />
      </motion.div>

      {/* 02 / now + 03 / focus */}
      <div className="grid grid-cols-2 gap-3">
        <motion.button
          variants={item}
          whileTap={{ scale: 0.97 }}
          onClick={() => scrollTo('case-study')}
          className="text-left rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
        >
          <MobileKicker text="02 / NOW" />
          <span className="block text-sm font-semibold text-foreground leading-snug">
            Building in public
          </span>
          <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
            Ketapay · Pre-Launch
            <ArrowUpRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          </span>
        </motion.button>

        <motion.div
          variants={item}
          className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 p-4"
        >
          <MobileKicker text="03 / FOCUS" />
          <span className="block text-sm font-semibold text-foreground leading-snug">
            Full-stack · Fintech
          </span>
          <span className="mt-1 block text-xs text-muted-foreground">
            Shipping with quality &amp; speed
          </span>
        </motion.div>
      </div>

      {/* 04 / stack */}
      <motion.div
        variants={item}
        className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 p-4"
      >
        <MobileKicker text="04 / STACK" />
        <div className="flex flex-wrap gap-1.5">
          {MOBILE_STACK.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-medium">
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>

      {/* CTAs — thumb zone */}
      <motion.div variants={item} className="grid grid-cols-2 gap-3 pt-1">
        <Button
          size="lg"
          onClick={() => scrollTo('projects')}
          className="h-12 rounded-xl text-base font-semibold"
        >
          {heroData?.cta ?? 'View My Work'}
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => scrollTo('contact')}
          className="h-12 rounded-xl text-base font-semibold border-primary/40"
        >
          Contact
        </Button>
      </motion.div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [bgGradient, setBgGradient] = useState({ x: 50, y: 50 });
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Optimized mousemove handler with RAF throttling
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!sectionRef.current || prefersReducedMotion) return;

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const rect = sectionRef.current!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const normalizedX = (x / rect.width - 0.5) * 2;
      const normalizedY = (y / rect.height - 0.5) * 2;

      setMousePos({ x: normalizedX * 20, y: normalizedY * 20 });
      setBgGradient({
        x: 50 + normalizedX * 15,
        y: 50 + normalizedY * 15,
      });
      rafRef.current = null;
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 sm:pt-20 lg:pt-0 lg:py-20 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Interactive Animated Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: prefersReducedMotion
            ? 'transparent'
            : `radial-gradient(circle at ${bgGradient.x}% ${bgGradient.y}%, hsl(var(--primary) / 0.1) 0%, transparent 50%)`,
          transition: 'background 0.5s ease-out',
        }}
      />

      {/* Animated gradient blobs - Gentle entrance */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 z-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            opacity: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
          }}
        >
          <motion.div
            animate={{
              x: [0, 50 + mousePos.x, 0],
              y: [0, -30 + mousePos.y, 0],
            }}
            transition={{ duration: 15, ease: 'easeInOut', delay: 1 }}
            className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.div
            animate={{
              x: [0, -50 - mousePos.x, 0],
              y: [0, 30 - mousePos.y, 0],
            }}
            transition={{ duration: 18, ease: 'easeInOut', delay: 1.5 }}
            className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
          />
        </motion.div>
      )}

      <div className="relative z-10 w-full flex-1 flex items-center">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
          {/* Mobile / tablet: bento identity dashboard */}
          <MobileHeroBento scrollTo={scrollTo} />

          {/* Desktop: orbital + text columns */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left: Orbital Skills System (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="hidden lg:flex justify-center order-2 lg:order-1"
            >
              <OrbitalSkills />
            </motion.div>

            {/* Right: Text Content - Gentle Entrance */}
            <div className="flex flex-col justify-center order-1 lg:order-2 space-y-5 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              >
                <span className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary border border-primary/20 whitespace-nowrap">
                  {heroData?.greeting ?? 'Hello'}
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                className="flex flex-col gap-5 sm:gap-6"
              >
                {/* Name - Gradient Text */}
                <div>
                  <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                    {heroData?.name ?? 'Developer'}
                  </h1>
                </div>

                {/* Role Badge - Interactive */}
                <motion.div
                  className="flex items-center gap-3 w-fit relative"
                  whileHover={{ scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Animated dot */}
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Text with underline animation */}
                  <div className="relative">
                    <span className="text-base sm:text-lg font-bold text-primary uppercase tracking-widest">
                      Software Engineer
                    </span>
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-transparent"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 1 }}
                    />
                  </div>
                </motion.div>

                {/* Bio Bullets - Enhanced Colors & Interactivity */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 pt-4 border-t border-primary/10">
                  {[
                    { icon: '→', text: 'Building products that matter', highlight: 'products' },
                    { icon: '→', text: 'Full-stack • Fintech • Reliable', highlight: 'Fintech' },
                    { icon: '→', text: 'Shipping with quality & speed', highlight: 'quality' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.8 + idx * 0.1 }}
                      className="flex items-center gap-3 group cursor-pointer p-2 rounded-lg hover:bg-primary/5 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      {/* Arrow icon with animation */}
                      <motion.span
                        className="text-primary font-bold text-sm sm:text-base flex-shrink-0"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 + idx * 0.2 }}
                      >
                        {item.icon}
                      </motion.span>

                      {/* Text with color variation */}
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                        {item.text.includes('•')
                          ? item.text.split('•').map((part, i) => (
                              <span key={i}>
                                {i > 0 && <span className="text-primary/60"> • </span>}
                                {part.trim().toLowerCase() === item.highlight.toLowerCase() ? (
                                  <span className="font-semibold text-primary">{part.trim()}</span>
                                ) : (
                                  part.trim()
                                )}
                              </span>
                            ))
                          : item.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.9 }}
                className="pt-4"
              >
                <ViewProjectsButton scrollTo={scrollTo} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Gentle entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 2 }}
        className="relative z-10 pt-8"
      >
        <motion.button
          animate={!prefersReducedMotion ? { y: [0, 8, 0] } : {}}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          onClick={() => scrollTo('about')}
          className="text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="h-6 w-6" />
        </motion.button>
      </motion.div>
    </section>
  );
}
