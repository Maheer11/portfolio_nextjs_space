'use client';

import { motion } from 'framer-motion';
import { Download, Award } from 'lucide-react';
import { siteConfig } from '@/lib/portfolio-data';
import { cn } from '@/lib/utils';

export default function ResumeSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

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
          className="mb-16 flex justify-center"
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

        {/* Core Strengths - Timeline Flow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-12">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold font-display">What I Bring</h3>
            </div>

            {/* Horizontal Timeline */}
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-5 md:gap-4">
                {[
                  { title: 'Full-Stack', desc: 'React • TypeScript • Java • Node.js' },
                  { title: 'Code Fluency', desc: 'Debug • Refactor • Extend' },
                  { title: 'Problem Solving', desc: 'Design • Plan • Ship' },
                  { title: 'Quality First', desc: 'Test • Iterate • Deploy' },
                ].map((strength, idx) => (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="relative"
                  >
                    {/* Node */}
                    <div className="flex flex-col items-center md:items-center">
                      <div className="relative z-10 mb-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/50 flex items-center justify-center"
                        >
                          <span className="text-2xl font-display font-bold text-primary">
                            {idx + 1}
                          </span>
                        </motion.div>
                      </div>

                      {/* Text */}
                      <div className="text-center">
                        <h4 className="font-semibold text-foreground text-base mb-2">
                          {strength.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {strength.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
