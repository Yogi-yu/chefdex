'use client';

import { motion } from 'framer-motion';
import { ChefHat, Briefcase } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';

const TEAM = [
  {
    name: 'Clinton Zhu',
    title: 'Founder',
    background:
      'Senior chef and crypto product builder. Clinton brings a rare combination of professional kitchen expertise and on-chain protocol experience — the founding conviction behind ChefDex.',
    tags: ['Chef', 'Protocol Design', 'Crypto Products'],
    icon: 'chef',
    accent: 'gold',
  },
  {
    name: 'Alex Li',
    title: 'Chef Partner',
    background:
      'Experienced professional chef mentored by Clinton Zhu. Alex drives culinary credibility and chef-side adoption, ensuring ChefDex is built to the standards of serious kitchen professionals.',
    tags: ['Fine Dining', 'Culinary Operations', 'Chef Network'],
    icon: 'chef',
    accent: 'charcoal',
  },
  {
    name: 'Tina Liu',
    title: 'Head of Operations',
    background:
      'Private equity investing background. Tina leads operations, execution, and strategic partnerships — bringing institutional-grade discipline to how ChefDex scales and deploys capital.',
    tags: ['Private Equity', 'Operations', 'Partnerships'],
    icon: 'professional',
    accent: 'gold',
  },
];

function AvatarIcon({ type, accent }: { type: string; accent: string }) {
  const isGold = accent === 'gold';

  if (type === 'chef') {
    return (
      <div
        className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${
          isGold ? 'bg-gold-500' : 'bg-charcoal-950'
        }`}
      >
        <ChefHat size={28} className="text-white" strokeWidth={1.75} />
      </div>
    );
  }

  return (
    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 ${
        isGold ? 'bg-gold-500' : 'bg-charcoal-950'
      }`}
    >
      <Briefcase size={26} className="text-white" strokeWidth={1.75} />
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>The Team</SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-5xl font-black tracking-tight text-charcoal-950 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            Built at the Intersection of{' '}
            <span className="text-gradient-gold">Craft &amp; Capital</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            A tight-knit team with deep roots in professional kitchens, crypto product
            development, and institutional finance.
          </motion.p>
        </div>

        {/* Team grid — 3 members, centered */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative bg-white rounded-2xl border border-charcoal-100 p-8 hover:border-gold-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div className="relative">
                {/* Avatar */}
                <div className="mb-6">
                  <AvatarIcon type={member.icon} accent={member.accent} />
                </div>

                <div className="mb-1">
                  <h3 className="text-lg font-bold text-charcoal-950">{member.name}</h3>
                  <div className="text-sm font-semibold text-gold-600 mt-0.5">{member.title}</div>
                </div>

                <p className="text-sm text-charcoal-500 leading-relaxed mt-3 mb-5">
                  {member.background}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-2.5 py-1 bg-charcoal-50 text-charcoal-600 text-xs font-semibold rounded-full border border-charcoal-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-charcoal-50 border border-charcoal-100">
            <span className="text-sm text-charcoal-600">
              Interested in partnering or joining the protocol?
            </span>
            <a
              href="mailto:hello@chefdex.io"
              className="text-sm font-bold text-gold-600 hover:text-gold-700 transition-colors whitespace-nowrap"
            >
              Get in touch &rarr;
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
