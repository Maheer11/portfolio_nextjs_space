'use client';

import { useRef, useEffect, useState } from 'react';
import { User, MapPin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { aboutData, siteConfig } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { useInView } from 'react-intersection-observer';

/* Animated counter — initial state must be the real value so server-rendered
   HTML (SEO, no-JS, link previews) never shows "0+"; the count-up only runs
   client-side once the stat scrolls into view. */
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(target);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (!inView) return;
    setCount(0);
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-display font-bold text-primary">
        {count}+
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  return (
    <Section id="about" className="bg-muted/30">
      <Container size="lg">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-6">
            {/* Heading Section */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <User className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wider">
                  Get to know me
                </span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {aboutData?.heading ?? 'About Me'}
              </h2>
            </div>

            {/* Profile Image - Close to Header */}
            <div className="flex justify-center md:justify-start">
              <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-40 md:h-40 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="w-full h-full"
                >
                  <div className="relative w-full h-full">
                    {/* Outer ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    />

                    {/* Inner glow */}
                    <div className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/10 to-transparent" />

                    {/* Profile Image Container */}
                    <div className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-br from-card to-card/80 border border-primary/20 shadow-lg">
                      <Image
                        src="/profile.jpg"
                        alt="Profile"
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>

                    {/* Accent dot */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-4 h-4 bg-primary rounded-full border-2 border-card shadow-lg"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="mt-10 grid md:grid-cols-5 gap-10">
          {/* Text */}
          <div className="md:col-span-3 space-y-4">
            {(aboutData?.paragraphs ?? []).map((p: string, i: number) => (
              <SlideIn key={i} from="left" delay={i * 0.1}>
                <p className="text-muted-foreground leading-relaxed">{p}</p>
              </SlideIn>
            ))}
            <SlideIn from="left" delay={0.3}>
              <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  {siteConfig?.location ?? ''}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="h-4 w-4 text-primary" />
                  {siteConfig?.email ?? ''}
                </span>
              </div>
            </SlideIn>

          </div>

          {/* Stats */}
          <div className="md:col-span-2">
            <SlideIn from="right">
              <div className="grid grid-cols-2 gap-6 rounded-xl bg-card p-6 shadow-md">
                {(aboutData?.stats ?? []).map((s: any, i: number) => (
                  <AnimatedCounter key={i} target={s?.value ?? 0} label={s?.label ?? ''} />
                ))}
              </div>
            </SlideIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
