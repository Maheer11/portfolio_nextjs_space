'use client';

import { Zap } from 'lucide-react';
import { skillGroups } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';

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

        <div className="mt-12 space-y-10">
          {skillGroups.map((group, i) => (
            <FadeIn key={group.title} delay={0.1 + i * 0.1}>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                {group.title}
              </p>
              <Stagger className="flex flex-wrap gap-2" staggerDelay={0.05}>
                {group.skills.map((skill) => (
                  <StaggerItem key={skill}>
                    <span className="text-sm px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium border border-primary/20 inline-block">
                      {skill}
                    </span>
                  </StaggerItem>
                ))}
              </Stagger>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
