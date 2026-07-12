'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Target, Zap, BookOpen } from 'lucide-react';
import { learningsAndPrinciples, honestReflection } from '@/lib/case-study-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { cn } from '@/lib/utils';

const iconMap = {
  tool: Target,
  test: Zap,
  learn: Lightbulb,
  problem: BookOpen,
};

// Animated motion illustrations for each principle.
// All shapes use currentColor so they inherit the theme-aware wrapper color —
// hard-coded white was invisible on light-mode cards.
const ToolIllustration = () => (
  <svg className="w-full h-32" viewBox="0 0 200 120" fill="none">
    {/* Animate attributes/opacity, never `scale`, on SVG shapes — framer-motion
        scale mispositions raw SVG elements */}
    <motion.circle
      cx="50"
      cy="60"
      r="18"
      fill="currentColor"
      animate={{ fillOpacity: [0.5, 0.85, 0.5], r: [18, 19.5, 18] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.rect
      x="90"
      y="45"
      width="36"
      height="30"
      rx="4"
      fill="currentColor"
      animate={{ fillOpacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
    />
    <motion.path
      d="M 150 40 L 165 60 L 150 80 L 150 40"
      fill="currentColor"
      animate={{ fillOpacity: [0.5, 0.85, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}
    />
    <motion.path
      d="M 50 60 Q 70 55 90 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.5"
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <motion.path
      d="M 126 60 Q 138 55 150 60"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.5"
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
    />
  </svg>
);

// The check draws itself on a loop, matching the other looping illustrations
// (a single on-mount draw finished before the card ever scrolled into view).
const TestIllustration = () => (
  <svg className="w-full h-32" viewBox="0 0 200 120" fill="none">
    <motion.circle
      cx="100"
      cy="60"
      r="35"
      stroke="currentColor"
      strokeWidth="2"
      animate={{ strokeOpacity: [0.45, 0.7, 0.45] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.path
      d="M 75 60 L 90 75 L 125 45"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.9"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0, 1, 1] }}
      transition={{ duration: 3.5, times: [0, 0.4, 1], repeat: Infinity, repeatDelay: 0.5, ease: 'easeInOut' }}
    />
  </svg>
);

const LearnIllustration = () => (
  <svg className="w-full h-32" viewBox="0 0 200 120" fill="none">
    <motion.path
      d="M 30 80 Q 50 40 100 50 Q 150 40 170 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.6"
    />
    <motion.circle
      cx="30"
      cy="80"
      r="8"
      fill="currentColor"
      fillOpacity="0.8"
      animate={{ cx: [30, 100, 170, 30] }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.circle
      cx="100"
      cy="50"
      r="6"
      fill="currentColor"
      fillOpacity="0.7"
      animate={{ r: [6, 7.8, 6] }}
      transition={{ duration: 4, repeat: Infinity, delay: 1.33 }}
    />
  </svg>
);

const AmbiguityIllustration = () => (
  <svg className="w-full h-32" viewBox="0 0 200 120" fill="none">
    <motion.path
      d="M 40 50 L 100 90 L 80 50 L 140 90 L 100 50 L 120 100 L 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeOpacity="0.6"
      animate={{ strokeDashoffset: [0, -10] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      strokeDasharray="5"
    />
    <motion.circle
      cx="100"
      cy="70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeOpacity="0.5"
      animate={{ r: [16, 24], opacity: [0.5, 0] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
  </svg>
);

const illustrationMap = {
  tool: ToolIllustration,
  test: TestIllustration,
  learn: LearnIllustration,
  problem: AmbiguityIllustration,
};

const BrainHeaderAnimation = () => (
  <svg className="w-16 h-16" viewBox="0 0 100 100" fill="none">
    {/* Left hemisphere */}
    <motion.path
      d="M 30 50 Q 25 35 35 25 Q 45 15 50 20 Q 45 30 40 40 Q 35 48 30 50"
      fill="currentColor"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 3, repeat: Infinity }}
    />

    {/* Right hemisphere */}
    <motion.path
      d="M 70 50 Q 75 35 65 25 Q 55 15 50 20 Q 55 30 60 40 Q 65 48 70 50"
      fill="currentColor"
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
    />

    {/* Brain stem */}
    <motion.path
      d="M 48 50 Q 47 60 50 70"
      stroke="currentColor"
      strokeWidth="2.5"
    />

    {/* Neural connections - left */}
    <motion.circle
      cx="38"
      cy="32"
      r="3"
      fill="currentColor"
      animate={{ r: [3, 4.2, 3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* Neural connections - center */}
    <motion.circle
      cx="50"
      cy="35"
      r="3"
      fill="currentColor"
      animate={{ r: [3, 4.2, 3] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
    />

    {/* Neural connections - right */}
    <motion.circle
      cx="62"
      cy="32"
      r="3"
      fill="currentColor"
      animate={{ r: [3, 4.2, 3] }}
      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
    />

    {/* Connection lines */}
    <motion.path
      d="M 38 32 L 50 35 L 62 32"
      stroke="currentColor"
      strokeWidth="1.5"
      animate={{ strokeOpacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    />
  </svg>
);

export default function PrinciplesSection() {
  return (
    <Section id="principles" className="bg-muted/10">
      <Container size="lg">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="flex justify-center mb-6">
              <div className="text-primary/60">
                <BrainHeaderAnimation />
              </div>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              How I Think
            </h2>
            <p className="text-lg text-muted-foreground">
              These principles aren't borrowed from blogs. They come from building real things, making mistakes, and learning what actually works.
            </p>
          </div>
        </FadeIn>

        {/* Principles Grid */}
        <Stagger className="grid md:grid-cols-2 gap-8 mb-16" staggerDelay={0.1}>
          {learningsAndPrinciples.map((item, idx) => {
            const IconComponent = iconMap[Object.keys(iconMap)[idx % 4] as keyof typeof iconMap];

            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -12 }}
                  whileInView={{ y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  viewport={{ once: false, amount: 0.5 }}
                  className="group h-full rounded-2xl bg-gradient-to-br from-card to-card/80 p-8 border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all overflow-hidden"
                >
                  {/* Animated Illustration */}
                  <motion.div
                    className="mb-6 -mx-8 px-8 py-4 bg-gradient-to-b from-primary/5 to-transparent"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div className="text-primary/70">
                      {(() => {
                        const key = Object.keys(illustrationMap)[idx % 4] as keyof typeof illustrationMap;
                        const Illustration = illustrationMap[key];
                        return <Illustration />;
                      })()}
                    </div>
                  </motion.div>

                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground pt-1">
                      {item.principle}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground italic">
                      <span className="font-semibold text-foreground">Example: </span>
                      {item.example}
                    </p>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Honest Reflection */}
        <FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 p-10 border border-primary/20">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                The Real Story
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line text-lg">
                {honestReflection}
              </p>
            </div>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
