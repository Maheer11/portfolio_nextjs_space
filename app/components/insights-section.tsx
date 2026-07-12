'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookMarked, Lightbulb } from 'lucide-react';
import { potentialBlogTopics } from '@/lib/case-study-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function InsightsSection() {
  return (
    <Section id="insights">
      <Container size="lg">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="mb-4" variant="secondary">
              Thinking Out Loud
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
              Insights I'm Building
            </h2>
            <p className="text-muted-foreground text-lg">
              These are real topics I want to write about. Not generic tutorials. Problems I've solved, lessons I've learned, experiences worth sharing.
            </p>
          </div>
        </FadeIn>

        <Stagger className="space-y-4 max-w-3xl" staggerDelay={0.1}>
          {potentialBlogTopics.map((topic, idx) => (
            <StaggerItem key={idx}>
              <motion.div
                whileHover={{ x: 8 }}
                className="group rounded-2xl bg-gradient-to-br from-card to-card/80 p-6 sm:p-8 border border-border/60 hover:border-primary/40 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex gap-5">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Lightbulb className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground italic">
                        Why: {topic.why}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Call to Action */}
        <FadeIn delay={0.5}>
          <div className="mt-16 text-center">
            <p className="text-muted-foreground mb-6">
              These are in progress. Subscribe or check back to see them when they're published.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
            >
              <BookMarked className="w-4 h-4" />
              Get notified when I write
            </Button>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
