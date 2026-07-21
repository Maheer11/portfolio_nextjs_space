'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Code2, FlaskConical, Workflow } from 'lucide-react';
import { servicesData } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { Button } from '@/components/ui/button';

const SERVICE_ICONS = [FlaskConical, Workflow, Code2];

export default function ServicesSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Section id="services">
      <Container size="lg">
        {/* Header */}
        <FadeIn>
          <div className="max-w-3xl">
            <span className="block font-mono text-xs text-primary/80 tracking-wider mb-3">
              05 / SERVICES
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {servicesData.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {servicesData.subheading}
            </p>
          </div>
        </FadeIn>

        {/* Service cards */}
        <Stagger className="mt-12 grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
          {(servicesData.services ?? []).map((service, idx) => {
            const Icon = SERVICE_ICONS[idx % SERVICE_ICONS.length];
            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full flex flex-col rounded-2xl bg-gradient-to-br from-card to-card/80 p-6 border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all"
                >
                  <Icon className="w-5 h-5 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-3">{service.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                  {service.proof && (
                    <div className="mt-auto pt-5">
                      <p className="pt-4 border-t border-border/30 text-xs font-medium text-primary leading-relaxed">
                        {service.proof}
                      </p>
                    </div>
                  )}
                </motion.div>
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <Button
              size="lg"
              onClick={() => scrollTo('contact')}
              className="rounded-xl text-base font-semibold"
            >
              {servicesData.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-sm text-muted-foreground">{servicesData.ctaNote}</p>
          </div>
        </FadeIn>
      </Container>
    </Section>
  );
}
