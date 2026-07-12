'use client';

import { ChevronRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

import { FadeIn } from '@/components/ui/animate';
import { Container } from '@/components/layouts/container';
import { Section } from '@/components/layouts/section';
import { cn } from '@/lib/utils';

// ============ Strength Data ============
interface Strength {
  index: number;
  tag: string;
  title: string;
  subtitle: string;
  capability: string;
  proof?: string;
  href: string;
}

const STRENGTHS: Strength[] = [
  {
    index: 1,
    tag: 'Vision',
    title: 'System Thinking',
    subtitle: 'See the architecture. Understand how parts connect before writing code.',
    capability: 'Designed fintech escrow logic by mapping state transitions.',
    proof: 'Project: Ketapay',
    href: '#evidence-system-thinking',
  },
  {
    index: 2,
    tag: 'Build',
    title: 'Ship Quality',
    subtitle: 'Transform ideas into reliable products. Hands that build, test, and deliver.',
    capability: 'Engineered and shipped production features end-to-end.',
    proof: 'Projects: Ketapay, Fintech Auth Module',
    href: '#evidence-ship-quality',
  },
  {
    index: 3,
    tag: 'Core',
    title: 'Reliability',
    subtitle: 'What holds it all together. Attention to edge cases, fintech rigor.',
    capability: 'Built custom validation engines and tested payment system edge cases.',
    proof: 'Java Regex, Spring Security — zero production incidents',
    href: '#evidence-reliability',
  },
  {
    index: 4,
    tag: 'Reach',
    title: 'Integration',
    subtitle: 'Extend capabilities. Connect systems, automate workflows.',
    capability: 'Designed scalable architectures for multi-service integrations.',
    href: '#evidence-integration',
  },
  {
    index: 5,
    tag: 'Foundation',
    title: 'Learning Fast',
    subtitle: 'Strong stance. Learn backwards from problems, stay grounded.',
    capability: 'Self-taught from real problems.',
    href: '#evidence-learning-fast',
  },
];

// 3 cards on the first row, 2 wider cards on the second (6-column grid).
const CARD_SPANS = [
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-2',
  'lg:col-span-3',
  'sm:col-span-2 lg:col-span-3',
];

// ============ Hover spotlight (cursor-tracking radial glow) ============
function setSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

// ============ Card ============
const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

function StrengthCard({ strength, className }: { strength: Strength; className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.a
      href={strength.href}
      variants={cardVariants}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={setSpotlight}
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-border/60',
        'bg-gradient-to-br from-card to-card/70 p-6 sm:p-7',
        'hover:border-primary/40 transition-colors duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
        className
      )}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--primary) / 0.12), transparent 70%)',
        }}
      />

      {/* Oversized index watermark */}
      <span
        className="absolute top-3 right-5 font-mono text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors select-none"
        aria-hidden="true"
      >
        {String(strength.index).padStart(2, '0')}
      </span>

      <span className="relative font-mono text-xs text-primary tracking-wider mb-3">
        {String(strength.index).padStart(2, '0')} / {strength.tag.toUpperCase()}
      </span>

      <h3 className="relative font-display text-xl font-bold text-foreground flex items-center gap-1.5 group-hover:text-primary transition-colors">
        {strength.title}
        <ChevronRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all flex-shrink-0" />
      </h3>

      <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
        {strength.subtitle}
      </p>
      <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">
        {strength.capability}
      </p>

      {strength.proof && (
        <div className="relative mt-auto pt-5">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {strength.proof}
          </span>
        </div>
      )}
    </motion.a>
  );
}

// ============ Main Section ============
export default function CoreStrengthsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section className="bg-muted/20">
      <Container size="lg">
        <FadeIn>
          <div className="max-w-3xl mb-12 sm:mb-16">
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Core Strengths
            </h2>
            <p className="text-lg text-muted-foreground">
              Technical architecture. Product thinking. Reliability. How I approach building real systems.
            </p>
          </div>
        </FadeIn>

        <motion.div
          variants={gridVariants}
          initial={prefersReducedMotion ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6"
        >
          {STRENGTHS.map((strength, i) => (
            <StrengthCard key={strength.index} strength={strength} className={CARD_SPANS[i]} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
