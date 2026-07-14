'use client';

import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';
import {
  FlaskConical,
  MousePointerClick,
  Network,
  Quote,
} from 'lucide-react';

import { ketapayCaseStudy } from '@/lib/case-study-data';
import { Section } from '@/components/layouts/section';
import { Container } from '@/components/layouts/container';
import { FadeIn, SlideIn } from '@/components/ui/animate';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// ============ Scannability helpers ============
function Kicker({ index, label }: { index: number; label: string }) {
  return (
    <span className="block font-mono text-xs text-primary/80 tracking-wider mb-3">
      {String(index).padStart(2, '0')} / {label.toUpperCase()}
    </span>
  );
}

/** Wraps known load-bearing phrases so skimmers catch them without reading full sentences. */
function Highlight({ text, phrases }: { text: string; phrases: string[] }) {
  let segments: Array<string | JSX.Element> = [text];

  phrases.forEach((phrase, pi) => {
    segments = segments.flatMap((seg) => {
      if (typeof seg !== 'string' || !seg.includes(phrase)) return [seg];
      const parts = seg.split(phrase);
      return parts.flatMap((part, i) =>
        i < parts.length - 1
          ? [
              part,
              <span key={`${pi}-${i}`} className="text-foreground font-medium">
                {phrase}
              </span>,
            ]
          : [part]
      );
    });
  });

  return <>{segments}</>;
}

// ============ Escrow flow diagram ============
// All coordinates share this one viewBox.
const FLOW_VIEW = { w: 720, h: 170 } as const;

const FLOW_NODES = {
  BUYER: { x: 100, y: 80 },
  ESCROW: { x: 360, y: 80 },
  SELLER: { x: 620, y: 80 },
} as const;

const NODE_R = 30;

const flowDraw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 0.5, ease: 'easeInOut' },
      opacity: { delay, duration: 0.01 },
    },
  }),
};

const flowFade = {
  hidden: { opacity: 0 },
  visible: (delay: number) => ({ opacity: 1, transition: { delay, duration: 0.3 } }),
};

function EscrowFlowDiagram({ animate }: { animate: boolean }) {
  const { BUYER, ESCROW, SELLER } = FLOW_NODES;

  const nodes = [
    { key: 'BUYER', ...BUYER, delay: 0 },
    { key: 'ESCROW', ...ESCROW, delay: 0.5 },
    { key: 'SELLER', ...SELLER, delay: 1.0 },
  ];

  return (
    <motion.svg
      viewBox={`0 0 ${FLOW_VIEW.w} ${FLOW_VIEW.h}`}
      className="w-full max-w-2xl h-auto"
      role="img"
      aria-label="Escrow flow: the buyer's funds are held in escrow and released to the seller once everyone confirms."
      initial={animate ? 'hidden' : false}
      whileInView={animate ? 'visible' : undefined}
      animate={animate ? undefined : 'visible'}
      viewport={{ once: true, margin: '-60px' }}
    >
      {/* Connectors */}
      <motion.line
        x1={BUYER.x + NODE_R}
        y1={BUYER.y}
        x2={ESCROW.x - NODE_R}
        y2={ESCROW.y}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 5"
        className="text-primary/70"
        variants={flowDraw}
        custom={0.2}
      />
      <motion.line
        x1={ESCROW.x + NODE_R}
        y1={ESCROW.y}
        x2={SELLER.x - NODE_R}
        y2={SELLER.y}
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="8 5"
        className="text-primary/70"
        variants={flowDraw}
        custom={0.7}
      />

      {/* Arrowheads */}
      <motion.path
        d={`M ${ESCROW.x - NODE_R - 12} ${ESCROW.y - 6} L ${ESCROW.x - NODE_R} ${ESCROW.y} L ${ESCROW.x - NODE_R - 12} ${ESCROW.y + 6}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary/70"
        variants={flowFade}
        custom={0.6}
      />
      <motion.path
        d={`M ${SELLER.x - NODE_R - 12} ${SELLER.y - 6} L ${SELLER.x - NODE_R} ${SELLER.y} L ${SELLER.x - NODE_R - 12} ${SELLER.y + 6}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-primary/70"
        variants={flowFade}
        custom={1.1}
      />

      {/* Step captions */}
      <motion.text
        x={(BUYER.x + ESCROW.x) / 2}
        y={BUYER.y - 22}
        textAnchor="middle"
        className="fill-current text-muted-foreground font-mono"
        fontSize="12"
        variants={flowFade}
        custom={0.5}
      >
        1 · funds in
      </motion.text>
      <motion.text
        x={(ESCROW.x + SELLER.x) / 2}
        y={ESCROW.y - 22}
        textAnchor="middle"
        className="fill-current text-muted-foreground font-mono"
        fontSize="12"
        variants={flowFade}
        custom={1.0}
      >
        2 · released on confirmation
      </motion.text>

      {/* Nodes */}
      {nodes.map((node) => (
        <g key={node.key}>
          <motion.circle
            cx={node.x}
            cy={node.y}
            r={NODE_R}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary/40"
            variants={flowDraw}
            custom={node.delay}
          />
          <motion.text
            x={node.x}
            y={node.y + NODE_R + 24}
            textAnchor="middle"
            className="fill-current text-muted-foreground font-mono"
            fontSize="12"
            variants={flowFade}
            custom={node.delay + 0.3}
          >
            {node.key}
          </motion.text>
        </g>
      ))}

      {/* Lock glyph inside the escrow node */}
      <motion.g variants={flowFade} custom={0.8} className="text-primary/70">
        <rect
          x={ESCROW.x - 9}
          y={ESCROW.y - 2}
          width="18"
          height="13"
          rx="2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d={`M ${ESCROW.x - 5} ${ESCROW.y - 2} v -4 a 5 5 0 0 1 10 0 v 4`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </motion.g>
    </motion.svg>
  );
}

// ============ Main Section ============
const ROLE_ICONS = [FlaskConical, MousePointerClick, Network];

export default function CaseStudySection() {
  const prefersReducedMotion = useReducedMotion();

  const spineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: spineRef,
    offset: ['start 0.8', 'end 0.6'],
  });
  const spineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <Section id="case-study" className="bg-muted/20">
      <Container size="lg">
        {/* Header */}
        <FadeIn>
          <div className="max-w-3xl">
            <Badge className="mb-4" variant="secondary">
              Case Study
            </Badge>
            <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              {ketapayCaseStudy.title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {ketapayCaseStudy.subtitle}
            </p>
            <div className="mt-4 flex gap-3">
              <Badge variant="outline" className="border-primary/50 text-primary">
                {ketapayCaseStudy.stage}
              </Badge>
              <Badge variant="outline" className="border-primary/50 text-primary">
                {ketapayCaseStudy.status}
              </Badge>
            </div>
          </div>
        </FadeIn>

        {/* Narrative spine + numbered story */}
        <div ref={spineRef} className="relative mt-16 lg:pl-12">
          {/* Scroll-linked progress line (desktop) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-border" aria-hidden="true">
            <motion.div
              className="absolute inset-0 bg-primary/50 origin-top"
              style={{ scaleY: prefersReducedMotion ? 1 : spineScale }}
            />
          </div>

          {/* 01 / Problem — diagram first, prose as caption */}
          <SlideIn from="left">
            <div>
              <Kicker index={1} label="Problem" />
              <h3 className="text-2xl font-bold text-foreground mb-8">The Problem</h3>
              <EscrowFlowDiagram animate={!prefersReducedMotion} />
              <p className="mt-6 text-muted-foreground leading-relaxed max-w-3xl">
                <Highlight
                  text={ketapayCaseStudy.problem}
                  phrases={["hold the buyer's money safely until everyone confirms"]}
                />
              </p>
            </div>
          </SlideIn>

          {/* 02 / Role */}
          <SlideIn from="right" className="mt-20">
            <div>
              <Kicker index={2} label="Role" />
              <h3 className="text-2xl font-bold text-foreground mb-8">
                My Role (Product Thinking &gt; Just Code)
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                {ketapayCaseStudy.myRole.map((role, idx) => {
                  const Icon = ROLE_ICONS[idx % ROLE_ICONS.length];
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -8 }}
                      className="rounded-2xl bg-gradient-to-br from-card to-card/80 p-6 border border-border/60 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all"
                    >
                      <Icon className="w-5 h-5 text-primary mb-4" />
                      <h4 className="font-semibold text-foreground mb-3">{role.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {role.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </SlideIn>

          {/* 03 / Insight — pull quote */}
          <SlideIn from="right" className="mt-20">
            <div className="max-w-3xl">
              <Kicker index={3} label="Insight" />
              <figure className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-8 sm:p-10 border border-primary/20">
                <Quote className="absolute top-6 left-6 w-8 h-8 text-primary/20" aria-hidden="true" />
                <blockquote className="relative font-display text-xl sm:text-2xl text-foreground leading-relaxed">
                  <Highlight
                    text={ketapayCaseStudy.keyTakeaway}
                    phrases={['product thinking > just coding', '"what if this fails?"']}
                  />
                </blockquote>
              </figure>
            </div>
          </SlideIn>

          {/* 05 / Now — merged status + why-it's-here footer */}
          <SlideIn from="left" className="mt-20 pb-12">
            <div>
              <Kicker index={4} label="Now" />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">Where We Are Now</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    <Highlight
                      text={ketapayCaseStudy.currentStatus}
                      phrases={['talking to early users']}
                    />
                  </p>
                </div>
                <div className="rounded-2xl bg-muted/50 p-6 sm:p-8 border border-border/50 self-start">
                  <h4 className="font-semibold text-foreground mb-3">
                    Why This is in My Portfolio
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <Highlight
                      text={ketapayCaseStudy.whyItsInMyPortfolio}
                      phrases={['building matters more than the outcome']}
                    />
                  </p>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
