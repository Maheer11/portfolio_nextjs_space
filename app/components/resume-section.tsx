'use client';

import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { siteConfig } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export default function ResumeSection() {
  const downloadCV = () => {
    const element = document.createElement('a');
    element.setAttribute('href', '/MAG_CV.pdf');
    element.setAttribute('download', `${siteConfig.name.replace(/\s+/g, '_')}_CV.pdf`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold font-display mb-4">Resume</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Download my full resume below.
          </p>
        </motion.div>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <button
            onClick={downloadCV}
            className={cn(
              'flex items-center gap-3 px-6 py-3 rounded-lg font-medium transition-all duration-300',
              'bg-primary text-primary-foreground hover:bg-primary/90',
              'shadow-lg hover:shadow-xl hover:scale-105'
            )}
          >
            <Download className="h-5 w-5" />
            Download Full Resume (PDF)
          </button>
        </motion.div>
      </div>
    </section>
  );
}
