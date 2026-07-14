'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Briefcase, ChevronRight, Trophy } from 'lucide-react';
import { experienceData, type Experience, type ExperienceCategory } from '@/lib/portfolio-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn } from '@/components/ui/animate';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type FilterKey = 'all' | ExperienceCategory;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'engineering', label: 'Engineering' },
  { key: 'qa', label: 'QA' },
  { key: 'freelance', label: 'Freelance' },
];

const CATEGORY_META: Record<ExperienceCategory, { label: string; dot: string }> = {
  engineering: { label: 'Engineering', dot: 'bg-primary' },
  qa: { label: 'QA', dot: 'bg-chart-2' },
  freelance: { label: 'Freelance', dot: 'bg-chart-3' },
};

function CategoryDots({ category }: { category: ExperienceCategory[] }) {
  if (category.length === 0) {
    return <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 flex-shrink-0" aria-hidden="true" />;
  }
  return (
    <span className="flex items-center gap-1 flex-shrink-0">
      {category.map((cat) => (
        <span
          key={cat}
          className={cn('w-1.5 h-1.5 rounded-full', CATEGORY_META[cat].dot)}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function FilterChips({
  active,
  onChange,
}: {
  active: FilterKey;
  onChange: (key: FilterKey) => void;
}) {
  return (
    <div
      className="flex gap-2 overflow-x-auto md:flex-wrap md:overflow-visible pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Filter work experience by category"
    >
      {FILTERS.map((f) => (
        <button
          key={f.key}
          type="button"
          onClick={() => onChange(f.key)}
          aria-pressed={active === f.key}
          className={cn(
            'flex-shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50',
            active === f.key
              ? 'bg-primary text-primary-foreground border-primary'
              : 'border-border/60 text-muted-foreground hover:border-primary/40 hover:text-foreground'
          )}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

function RoleRow({
  role,
  active,
  showMetric,
  showChevron,
  onSelect,
}: {
  role: Experience;
  active: boolean;
  showMetric: boolean;
  showChevron: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-current={active ? 'true' : undefined}
      className={cn(
        'w-full text-left flex items-center gap-3 border-b border-border/50 py-3 px-3 transition-colors last:border-b-0',
        'hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset',
        active && 'bg-primary/5 md:border-l-2 md:border-l-primary md:pl-[10px]'
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <CategoryDots category={role.category} />
          <p className="text-sm font-semibold text-foreground truncate">{role.title}</p>
        </div>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {role.company} · {role.period}
        </p>
        {showMetric && (
          <p className="text-xs font-semibold text-chart-2 mt-1.5 leading-snug">
            {role.keyMetric}
          </p>
        )}
      </div>
      {showChevron && (
        <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}

function RoleDetail({ role }: { role: Experience }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <CategoryDots category={role.category} />
        {role.category.map((cat) => (
          <span key={cat} className="text-xs font-medium text-muted-foreground">
            {CATEGORY_META[cat].label}
          </span>
        ))}
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
        {role.title}
      </h3>
      <p className="text-primary font-semibold text-sm mt-1">
        {role.company} · {role.period}
      </p>

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-chart-2/10 border border-chart-2/20 p-4">
        <Trophy className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p className="text-sm font-bold text-foreground leading-relaxed">{role.keyMetric}</p>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mt-5">{role.description}</p>

      {role.learning && (
        <div className="mt-5 pt-5 border-t border-border/50">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
            Key Takeaway
          </p>
          <p className="text-sm text-muted-foreground italic leading-relaxed">{role.learning}</p>
        </div>
      )}

      {role.technologies.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {role.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="text-xs font-medium text-muted-foreground border-border/60 bg-transparent"
            >
              {tech}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExperienceSection() {
  const prefersReducedMotion = useReducedMotion();
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selectedTitle, setSelectedTitle] = useState<string>(experienceData[0].title);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const filteredRoles = useMemo(
    () => (filter === 'all' ? experienceData : experienceData.filter((r) => r.category.includes(filter))),
    [filter]
  );

  useEffect(() => {
    if (!filteredRoles.some((r) => r.title === selectedTitle)) {
      setSelectedTitle(filteredRoles[0]?.title ?? '');
    }
  }, [filteredRoles, selectedTitle]);

  const selectedRole = filteredRoles.find((r) => r.title === selectedTitle) ?? filteredRoles[0];

  const handleFilterChange = (key: FilterKey) => {
    setFilter(key);
  };

  const transition = {
    initial: prefersReducedMotion ? false : { opacity: 0, x: 12 },
    animate: { opacity: 1, x: 0 },
    exit: prefersReducedMotion ? undefined : { opacity: 0, x: -12 },
    transition: { duration: prefersReducedMotion ? 0 : 0.2, ease: 'easeOut' as const },
  };

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
            Filter by category, or pick a role to see the full story.
          </p>
        </FadeIn>

        <div className="mt-8 max-w-4xl mx-auto">
          <div className="mb-4">
            <FilterChips active={filter} onChange={handleFilterChange} />
          </div>

          {/* Desktop: master-detail split */}
          <div className="hidden md:flex rounded-2xl border border-border/60 bg-background/40 overflow-hidden">
            <div className="w-[270px] flex-shrink-0 border-r border-border/60 overflow-y-auto max-h-[600px]">
              {filteredRoles.map((role) => (
                <RoleRow
                  key={role.title}
                  role={role}
                  active={role.title === selectedRole?.title}
                  showMetric={false}
                  showChevron={false}
                  onSelect={() => setSelectedTitle(role.title)}
                />
              ))}
            </div>
            <div className="flex-1 min-w-0 p-6 lg:p-8 overflow-y-auto max-h-[600px] min-h-[420px]">
              {selectedRole && <RoleDetail role={selectedRole} />}
            </div>
          </div>

          {/* Mobile: tap-to-drill-down */}
          <div className="md:hidden relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 min-h-[420px]">
            <AnimatePresence initial={false} mode="wait">
              {!mobileDetailOpen ? (
                <motion.div key="list" {...transition}>
                  {filteredRoles.map((role) => (
                    <RoleRow
                      key={role.title}
                      role={role}
                      active={false}
                      showMetric
                      showChevron
                      onSelect={() => {
                        setSelectedTitle(role.title);
                        setMobileDetailOpen(true);
                      }}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="detail" {...transition}>
                  <button
                    type="button"
                    onClick={() => setMobileDetailOpen(false)}
                    className="flex items-center gap-2 p-4 text-sm font-medium text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
                  >
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                    Back
                  </button>
                  <div className="px-4 pb-6">
                    {selectedRole && <RoleDetail role={selectedRole} />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
