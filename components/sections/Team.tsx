'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import SectionLabel from '@/components/ui/SectionLabel';

/* ─── data ──────────────────────────────────────────────── */
const TEAM = [
  {
    name: 'Clinton Zhu',
    initials: 'CZ',
    image: '/pics/clinton.jpg',
    title: 'Founder',
    background:
      'Senior chef and crypto product builder. Clinton brings a rare combination of professional kitchen expertise and on-chain protocol experience — the founding conviction behind ChefDex.',
    tags: ['Chef', 'Protocol Design', 'Crypto Products'],
    avatarVariant: 'gold' as const,
  },
  {
    name: 'Alex Li',
    initials: 'AL',
    image: '/pics/alex.jpg',
    title: 'Chef Partner',
    background:
      'Experienced professional chef mentored by Clinton Zhu. Alex drives culinary credibility and chef-side adoption, ensuring ChefDex is built to the standards of serious kitchen professionals.',
    tags: ['Fine Dining', 'Culinary Operations', 'Chef Network'],
    avatarVariant: 'dark' as const,
  },
  {
    name: 'Tina Liu',
    initials: 'TL',
    title: 'Head of Operations',
    background:
      'Private equity investing background. Tina leads operations, execution, and strategic partnerships — bringing institutional-grade discipline to how ChefDex scales and deploys capital.',
    tags: ['Private Equity', 'Operations', 'Partnerships'],
    avatarVariant: 'gold' as const,
  },
];

/* ─── avatar ─────────────────────────────────────────────── */
function MonogramAvatar({ initials, variant }: { initials: string; variant: 'gold' | 'dark' }) {
  const isGold = variant === 'gold';
  return (
    <div className="relative w-[72px] h-[72px] mb-6 flex-shrink-0">
      <div
        className={`absolute inset-[-6px] rounded-[22px] blur-[12px] pointer-events-none ${
          isGold ? 'bg-gold-400/30' : 'bg-charcoal-600/35'
        }`}
      />
      <div
        className={`relative w-full h-full rounded-[18px] flex items-center justify-center shadow-lg ring-2 ${
          isGold
            ? 'bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 ring-gold-400/25 shadow-gold-500/15'
            : 'bg-gradient-to-br from-charcoal-600 via-charcoal-800 to-charcoal-950 ring-charcoal-500/30 shadow-charcoal-900/25'
        }`}
      >
        <span className="text-white font-black text-xl tracking-tight leading-none select-none">
          {initials}
        </span>
      </div>
    </div>
  );
}

function PhotoAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-[72px] h-[72px] mb-6 flex-shrink-0">
      <div className="absolute inset-[-6px] rounded-[22px] blur-[12px] pointer-events-none bg-gold-400/20" />
      <div className="relative w-full h-full rounded-[18px] overflow-hidden shadow-lg ring-2 ring-gold-400/25">
        <Image
          src={src}
          alt={name}
          fill
          className="object-cover"
          sizes="72px"
        />
      </div>
    </div>
  );
}

/* ─── section ────────────────────────────────────────────── */
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
            className="mt-5 text-lg text-charcoal-500 leading-[1.65]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            A tight-knit team with deep roots in professional kitchens, crypto product
            development, and institutional finance.
          </motion.p>
        </div>

        {/* Grid: 1 col → 2 col (tablet) → 3 col (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative bg-white rounded-2xl border border-charcoal-100 p-8
                hover:border-gold-200 hover:shadow-md transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Hover fill — pointer-events-none so html2canvas / PDF mode hides it cleanly */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />

              <div className="relative">
                {'image' in member && member.image
                  ? <PhotoAvatar src={member.image} name={member.name} />
                  : <MonogramAvatar initials={member.initials} variant={member.avatarVariant} />
                }

                <h3 className="text-lg font-bold text-charcoal-950 leading-snug">{member.name}</h3>
                <div className="text-sm font-semibold text-gold-600 mt-0.5 mb-3">{member.title}</div>

                <p className="text-sm text-charcoal-500 leading-[1.65] mb-5">{member.background}</p>

                <div className="flex flex-wrap gap-1.5">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center whitespace-nowrap px-2.5 py-1
                        bg-charcoal-50 text-charcoal-600 text-xs font-semibold
                        rounded-full border border-charcoal-100"
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
