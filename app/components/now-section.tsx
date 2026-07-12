'use client';

import { motion } from 'framer-motion';
import { Zap, BookOpen, Rocket } from 'lucide-react';
import { currentWork } from '@/lib/case-study-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, SlideIn } from '@/components/ui/animate';

export default function NowSection() {
  return (
    <Section id="now" className="bg-muted/30">
      <Container size="lg">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Latest Update
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              What I'm Working On Now
            </h2>
            <p className="text-muted-foreground text-lg">
              Not a past achievement. What's actually happening right now.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Primary Focus */}
          <SlideIn from="left" delay={0.1}>
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-8 border border-primary/30 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                {currentWork.focus}
              </h3>
              <ul className="space-y-3">
                {currentWork.whatImDoing.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </SlideIn>

          {/* Learning */}
          <SlideIn from="left" delay={0.2}>
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-gradient-to-br from-card to-card/80 p-8 border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Learning & Growing
              </h3>
              <ul className="space-y-3">
                {currentWork.learning.map((item, idx) => (
                  <li key={idx} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="text-primary font-bold flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </SlideIn>

          {/* Side Projects */}
          <SlideIn from="left" delay={0.3}>
            <motion.div
              whileHover={{ y: -8 }}
              className="rounded-2xl bg-gradient-to-br from-card to-card/80 p-8 border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-4">
                Side Exploration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {currentWork.side}
              </p>
            </motion.div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
