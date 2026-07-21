'use client';

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { heroData } from '@/lib/portfolio-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ============ Quality status board (desktop hero visual) ============
// One row is deliberately "lying" — clicking it plays a defect-caught-and-fixed
// beat; clicking a healthy row shakes it. Mirrors the QA positioning in copy.
const BOARD_ROWS = [
  { label: 'critical flows', value: 'passing' },
  { label: 'edge cases', value: 'covered' },
  { label: 'fallback states', value: 'tested' },
  { label: 'regressions escaped', value: '0', bugValue: '1' },
  { label: 'availability', value: 'abuja → worldwide' },
];

type BoardPhase = 'hunting' | 'fixing' | 'fixed';

function QualityStatusBoard() {
  const prefersReducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<BoardPhase>('hunting');
  const [shakenRow, setShakenRow] = useState<number | null>(null);

  const handleRowClick = (idx: number, isBug: boolean) => {
    if (phase !== 'hunting') return;
    if (!isBug) {
      setShakenRow(idx);
      setTimeout(() => setShakenRow(null), 450);
      return;
    }
    if (prefersReducedMotion) {
      setPhase('fixed');
      return;
    }
    setPhase('fixing');
    setTimeout(() => setPhase('fixed'), 1000);
  };

  const caption =
    phase === 'hunting'
      ? 'one status is lying — click it'
      : phase === 'fixing'
        ? 'defect logged → fix verified…'
        : 'caught it before your users did ✓';

  return (
    <div className="w-full max-w-md rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 shadow-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border/60">
        <span className="font-mono text-xs text-primary/80 tracking-wider">QA / LIVE STATUS</span>
        <motion.span
          className="w-2 h-2 rounded-full bg-primary"
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          aria-hidden="true"
        />
      </div>

      {/* Status rows */}
      <div className="divide-y divide-border/40">
        {BOARD_ROWS.map((row, idx) => {
          const isBug = 'bugValue' in row;
          const showBug = isBug && phase === 'hunting';
          const value = isBug
            ? phase === 'hunting'
              ? row.bugValue
              : phase === 'fixing'
                ? 'logged → fixing…'
                : row.value
            : row.value;

          return (
            <motion.button
              key={row.label}
              type="button"
              onClick={() => handleRowClick(idx, isBug)}
              animate={
                shakenRow === idx && !prefersReducedMotion
                  ? { x: [0, -5, 5, -3, 3, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.4 }}
              className={cn(
                'w-full flex items-center justify-between gap-4 px-6 py-3.5 text-left transition-colors',
                phase === 'hunting' ? 'hover:bg-primary/5 cursor-pointer' : 'cursor-default'
              )}
            >
              <span className="flex items-center gap-3 min-w-0">
                <span
                  className={cn(
                    'w-2 h-2 rounded-full flex-shrink-0 transition-colors',
                    showBug ? 'bg-destructive' : 'bg-primary/70'
                  )}
                />
                <span className="text-sm text-muted-foreground truncate">{row.label}</span>
              </span>
              <span
                className={cn(
                  'font-mono text-xs flex-shrink-0 transition-colors',
                  showBug
                    ? 'text-destructive'
                    : isBug && phase === 'fixed'
                      ? 'text-primary font-semibold'
                      : 'text-foreground/80'
                )}
              >
                {value}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Caption */}
      <div className="px-6 py-4 border-t border-border/60" role="status">
        <span
          className={cn(
            'font-mono text-xs tracking-wide',
            phase === 'fixed' ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {caption}
        </span>
      </div>
    </div>
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
            Ketapay · MVP1 shipped
            <ArrowUpRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          </span>
        </motion.button>

        <motion.div
          variants={item}
          className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70 p-4"
        >
          <MobileKicker text="03 / FOCUS" />
          <span className="block text-sm font-semibold text-foreground leading-snug">
            Full-stack
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
              <QualityStatusBoard />
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

                  <div className="relative">
                    <span className="text-base sm:text-lg font-bold text-foreground uppercase tracking-widest">
                      Software Engineer
                    </span>
                  </div>
                </motion.div>

                {/* Bio Bullets - Enhanced Colors & Interactivity */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4 pt-4 border-t border-primary/10">
                  {[
                    { icon: '→', text: 'QA that catches it before your users do', highlight: 'QA' },
                    { icon: '→', text: 'Full-stack • Reliable', highlight: 'Reliable' },
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
