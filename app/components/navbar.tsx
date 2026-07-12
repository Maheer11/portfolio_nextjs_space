'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navItems } from '@/lib/portfolio-data';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  /* Track scroll position for sticky background + active section */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems?.map?.((item: any) => item?.href?.replace('#', '')) ?? [];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i] ?? '');
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i] ?? 'home');
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((href: string) => {
    const id = href?.replace('#', '') ?? '';
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-md border-b border-border/40'
          : 'bg-transparent'
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <button
          onClick={() => scrollTo('#home')}
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <div className="flex items-center gap-0.5">
            <span className="text-2xl font-display font-semibold tracking-tight text-foreground">
              MAG
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1" />
          </div>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {(navItems ?? []).map((item: any) => (
            <button
              key={item?.href}
              onClick={() => scrollTo(item?.href ?? '#')}
              className={cn(
                'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast',
                activeSection === item?.href?.replace('#', '')
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              )}
            >
              {item?.label}
            </button>
          ))}
          <div className="ml-2 pl-2 border-l border-border/60">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border"
          >
            <div className="px-4 py-4 space-y-1">
              {(navItems ?? []).map((item: any) => (
                <button
                  key={item?.href}
                  onClick={() => scrollTo(item?.href ?? '#')}
                  className={cn(
                    'block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    activeSection === item?.href?.replace('#', '')
                      ? 'text-primary bg-primary/10'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  )}
                >
                  {item?.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
