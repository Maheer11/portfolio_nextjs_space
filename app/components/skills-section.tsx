'use client';

import { Zap } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import type { IconType } from 'react-icons';
import {
  SiDocker,
  SiGit,
  SiKubernetes,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from 'react-icons/si';
import { DiJava } from 'react-icons/di';
import { skillGroups } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { cn } from '@/lib/utils';

/* Exact brand marks for each tool. Simple Icons has no Java glyph, so Java
   comes from the Devicons set. */
const SKILL_ICONS: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  'Node.js': SiNodedotjs,
  'Next.js': SiNextdotjs,
  Java: DiJava,
  'Spring Boot': SiSpringboot,
  Git: SiGit,
  Supabase: SiSupabase,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
};

// Cursor-tracking radial glow, same pattern as the Core Strengths cards.
function setSpotlight(e: React.MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
}

function SkillTile({ skill, large }: { skill: string; large: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const Icon = SKILL_ICONS[skill];

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      onMouseMove={setSpotlight}
      className={cn(
        'group relative overflow-hidden flex flex-col items-center justify-center gap-3 text-center',
        'rounded-2xl border border-border/60 bg-gradient-to-br from-card to-card/70',
        'hover:border-primary/40 transition-colors duration-300',
        large ? 'p-6 sm:p-7' : 'p-5'
      )}
    >
      {/* Cursor-following spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            'radial-gradient(200px circle at var(--spot-x, 50%) var(--spot-y, 50%), hsl(var(--primary) / 0.12), transparent 70%)',
        }}
      />

      {Icon ? (
        <Icon
          className={cn(
            'relative text-foreground/80 group-hover:text-primary transition-colors',
            large ? 'w-9 h-9' : 'w-7 h-7'
          )}
          aria-hidden="true"
        />
      ) : (
        <Zap
          className={cn('relative text-primary/70', large ? 'w-9 h-9' : 'w-7 h-7')}
          aria-hidden="true"
        />
      )}
      <span className={cn('relative font-medium text-foreground', large ? 'text-sm' : 'text-xs')}>
        {skill}
      </span>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <Section id="skills">
      <Container size="lg">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              What I work with
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Skills &amp; Technologies
          </h2>
        </FadeIn>

        <div className="mt-12 space-y-12">
          {skillGroups.map((group, i) => {
            const large = i === 0;
            return (
              <FadeIn key={group.title} delay={0.1 + i * 0.1}>
                <span className="block font-mono text-xs text-primary/80 tracking-wider mb-4">
                  {String(i + 1).padStart(2, '0')} / {group.title.toUpperCase()}
                </span>
                <Stagger
                  className={cn(
                    'grid gap-4',
                    large
                      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
                      : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:max-w-3xl'
                  )}
                  staggerDelay={0.05}
                >
                  {group.skills.map((skill) => (
                    <StaggerItem key={skill}>
                      <SkillTile skill={skill} large={large} />
                    </StaggerItem>
                  ))}
                </Stagger>
              </FadeIn>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
