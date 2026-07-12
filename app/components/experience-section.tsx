'use client';

import { useState } from 'react';
import { Briefcase, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { experienceData, type Experience } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn } from '@/components/ui/animate';
import { Badge } from '@/components/ui/badge';

function ExperienceCard({ exp, index }: { exp: Experience; index: number }) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative mb-6 last:mb-0"
    >
      {/* Timeline Node and Line */}
      <div className="absolute left-5 top-5 flex flex-col items-center -translate-x-1/2">
        {/* Node */}
        <motion.div
          className="w-4 h-4 rounded-full bg-gradient-to-br from-primary to-primary/70 border-3 border-background shadow-lg z-10"
          whileHover={{ scale: 1.25 }}
          whileInView={{ scale: 1 }}
        />

        {/* Connecting Line */}
        {index < experienceData.length - 1 && (
          <div className="w-0.5 h-20 bg-gradient-to-b from-primary/50 to-primary/10 mt-1" />
        )}
      </div>

      {/* Experience Card */}
      <div className="ml-0 pl-8">
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left group rounded-2xl bg-gradient-to-br from-card to-card/80 border border-border/60 hover:border-primary/40 shadow-md hover:shadow-lg transition-all duration-300 p-5"
          whileHover={{ y: -2 }}
        >
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-grow">
              <h3 className="font-display text-base font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                {exp?.title ?? ''}
              </h3>
              <p className="text-primary font-semibold text-xs mt-1">
                {exp?.company ?? ''}
              </p>
              <span className="inline-block text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border/50 mt-1.5">
                {exp?.period ?? ''}
              </span>
            </div>

            {/* Expand/Collapse Icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex-shrink-0 mt-0.5"
            >
              <ChevronDown className="w-4 h-4 text-primary" />
            </motion.div>
          </div>

          {/* Preview Description (always visible) */}
          <p className="text-xs text-muted-foreground leading-relaxed mt-2.5 line-clamp-2">
            {exp?.description ?? ''}
          </p>
        </motion.button>

        {/* Expandable Details */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-2 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-4">
                {/* Full Description */}
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {exp?.description ?? ''}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2.5">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(exp?.technologies ?? []).map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-medium bg-secondary/70 hover:bg-primary/20 border-border/50 hover:border-primary/50 transition-colors"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Learning */}
                {exp?.learning && (
                  <div className="pt-4 border-t border-primary/20">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                      💡 Key Takeaway
                    </p>
                    <p className="text-sm text-muted-foreground italic leading-relaxed">
                      {exp.learning}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ExperienceSection() {
  return (
    <Section id="experience" className="bg-muted/20">
      <Container size="lg">
        <FadeIn>
          <div className="flex items-center gap-3 mb-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Career path
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Work Experience
          </h2>
          <p className="text-muted-foreground mt-2">
            Click any card to expand and see full details
          </p>
        </FadeIn>

        {/* Combined Timeline + Accordion */}
        <div className="mt-12 max-w-3xl mx-auto px-4 sm:px-0">
          {(experienceData ?? []).map((exp: any, i: number) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
