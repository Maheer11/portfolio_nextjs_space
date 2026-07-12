'use client';

import { useState } from 'react';
import {
  Zap,
  Code2,
  Coffee,
  Layers,
  Server,
  Database,
  Braces,
  Palette,
} from 'lucide-react';
import { skillsData, skillCategories, type Skill } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, Stagger, StaggerItem } from '@/components/ui/animate';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const skillIcons: Record<string, React.ReactNode> = {
  'TypeScript': <Braces className="w-8 h-8" />,
  'JavaScript': <Code2 className="w-8 h-8" />,
  'HTML / CSS': <Palette className="w-8 h-8" />,
  'Tailwind CSS': <Layers className="w-8 h-8" />,
  'Node.js': <Server className="w-8 h-8" />,
  'Supabase': <Database className="w-8 h-8" />,
  'Java': <Coffee className="w-8 h-8" />,
};

function SkillCard({ skill }: { skill: Skill }) {
  const icon = skillIcons[skill.name] || <Code2 className="w-8 h-8" />;

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group h-full rounded-2xl bg-gradient-to-br from-card to-card/80 p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-border/60 hover:border-primary/50 backdrop-blur-sm flex flex-col items-center justify-center gap-5"
    >
      <motion.div
        whileHover={{ rotate: 12, scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        className="text-primary/80 group-hover:text-primary transition-colors duration-300"
      >
        {icon}
      </motion.div>
      <h3 className="font-display font-semibold text-foreground text-center text-sm sm:text-base">
        {skill.name}
      </h3>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredSkills = skillsData.filter((s: Skill) =>
    activeCategory === 'All' ? true : s.category === activeCategory
  );

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
            Skills & Technologies
          </h2>
        </FadeIn>

        {/* Category filter */}
        <FadeIn delay={0.1}>
          <div className="mt-8 flex flex-wrap gap-2">
            {skillCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast',
                  activeCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Skills grid */}
        {filteredSkills.length > 0 ? (
          <Stagger key={activeCategory} className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
            {filteredSkills.map((skill) => (
              <StaggerItem key={skill.name}>
                <SkillCard skill={skill} />
              </StaggerItem>
            ))}
          </Stagger>
        ) : (
          <div className="mt-12 text-center py-12">
            <p className="text-muted-foreground">No skills found in this category.</p>
          </div>
        )}
      </Container>
    </Section>
  );
}
