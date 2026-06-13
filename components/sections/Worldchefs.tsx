'use client';

import { motion } from 'framer-motion';
import { Globe, Users, BookOpen, CheckCircle2 } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';

const WORLDCHEFS_FACTS = [
  { icon: Globe, label: '110 Countries', description: 'Global member network' },
  { icon: Users, label: '10M+ Chefs', description: 'Professional members worldwide' },
  { icon: BookOpen, label: 'Since 1928', description: 'Nearly a century of culinary leadership' },
];

const CREDENTIALS = [
  'Mutual recognition of culinary credentials across member nations',
  'ChefDex-verified badges for Worldchefs members',
  'Co-promotion through Worldchefs global events and congresses',
  'Integration with established culinary standards and certification',
];

export default function Worldchefs() {
  return (
    <section id="worldchefs" className="py-24 lg:py-32 bg-charcoal-50 scroll-mt-20 md:scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Institutional Support</SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-5xl font-black tracking-tight text-charcoal-950 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            Supported by{' '}
            <span className="text-gradient-gold">Worldchefs</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            ChefDex is endorsed by the World Association of Chefs Societies — the governing
            body for professional chefs across 110 countries.
          </motion.p>
        </div>

        {/* Main endorsement card */}
        <motion.div
          className="bg-white rounded-3xl border border-charcoal-100 shadow-sm overflow-hidden mb-10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Left — Endorsement block */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              {/* Worldchefs brand block */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-charcoal-950 flex items-center justify-center shadow-sm flex-shrink-0">
                  <Globe size={28} className="text-gold-400" />
                </div>
                <div>
                  <div className="text-lg font-black text-charcoal-950">Worldchefs</div>
                  <div className="text-sm text-charcoal-500">
                    World Association of Chefs Societies
                  </div>
                </div>
              </div>

              <blockquote className="text-lg lg:text-xl font-medium text-charcoal-800 leading-relaxed mb-6 border-l-4 border-gold-400 pl-5">
                &ldquo;ChefDex represents a meaningful step in recognizing culinary excellence
                through transparent, market-driven validation — aligned with Worldchefs&apos; mission
                to elevate the profession globally.&rdquo;
              </blockquote>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-charcoal-200 flex items-center justify-center text-charcoal-600 text-sm font-bold">
                  WC
                </div>
                <div>
                  <div className="text-sm font-bold text-charcoal-900">Worldchefs Leadership</div>
                  <div className="text-xs text-charcoal-400">Official Endorsement, 2024</div>
                </div>
              </div>
            </div>

            {/* Right — Stats and credentials */}
            <div className="bg-charcoal-950 p-8 lg:p-12">
              {/* Stats */}
              <div className="grid grid-cols-1 gap-5 mb-8">
                {WORLDCHEFS_FACTS.map((fact, i) => (
                  <motion.div
                    key={fact.label}
                    className="flex items-center gap-4 p-4 rounded-xl bg-charcoal-900 border border-charcoal-800"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  >
                    <div className="w-9 h-9 rounded-lg bg-gold-500/10 border border-gold-500/20 flex items-center justify-center flex-shrink-0">
                      <fact.icon size={18} className="text-gold-400" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{fact.label}</div>
                      <div className="text-xs text-charcoal-400">{fact.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Credential list */}
              <div>
                <div className="text-xs font-semibold text-charcoal-400 uppercase tracking-widest mb-4">
                  Partnership Scope
                </div>
                <ul className="space-y-3">
                  {CREDENTIALS.map((cred, i) => (
                    <motion.li
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-charcoal-300 leading-relaxed"
                      initial={{ opacity: 0, x: 12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.35 + i * 0.06 }}
                    >
                      <CheckCircle2 size={14} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      {cred}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust badges row */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 lg:gap-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {[
            'Official Worldchefs Partner',
            'Global Chef Credential Recognition',
            'Endorsed by 110-Country Network',
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2 text-sm text-charcoal-500">
              <CheckCircle2 size={15} className="text-gold-500" />
              <span>{badge}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
