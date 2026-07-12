'use client';

import { Code2, Heart } from 'lucide-react';
import { siteConfig } from '@/lib/portfolio-data';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="h-4 w-4 text-primary" />
            <span>&lt;{siteConfig?.name ?? 'Developer'} /&gt;</span>
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="h-3.5 w-3.5 text-primary fill-primary" /> and modern web technologies
          </p>
        </div>
      </div>
    </footer>
  );
}
