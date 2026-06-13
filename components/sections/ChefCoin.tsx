'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Award, Globe, Coins } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import Badge from '@/components/ui/Badge';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const FEATURES = [
  {
    icon: Coins,
    title: 'Issue Your ChefCoin',
    description:
      'Any credentialed chef can issue a named token on the ChefDex network. Your coin is your on-chain brand — tradeable, transferable, and permanently attributed to your culinary identity.',
  },
  {
    icon: TrendingUp,
    title: 'Market-Driven Ranking',
    description:
      'Chef rankings are determined by market activity, coin adoption, and network engagement — not editorial committees. The protocol surfaces authentic market signals.',
  },
  {
    icon: Globe,
    title: 'Global Visibility',
    description:
      'Every ChefCoin holder becomes a stakeholder in that chef\'s reputation. The global ranking creates a live, transparent registry of culinary influence across 34 countries.',
  },
  {
    icon: Award,
    title: 'On-Chain Global Ranking Layer',
    description:
      'ChefDex is the on-chain equivalent of a culinary ranking authority — a transparent benchmark built on verifiable market signals, not editorial committees.',
  },
];

const EXTENDED_RANKING = [
  { rank: 1, name: 'Éric Ripert', coin: 'ERIC', price: '$4.28', change: '+12.4%', holders: '3,412', flag: '🇫🇷' },
  { rank: 2, name: 'Nobu Matsuhisa', coin: 'NOBU', price: '$3.91', change: '+8.7%', holders: '2,987', flag: '🇯🇵' },
  { rank: 3, name: 'Dominique Crenn', coin: 'CRENN', price: '$3.54', change: '+5.2%', holders: '2,654', flag: '🇺🇸' },
  { rank: 4, name: 'Clare Smyth', coin: 'SMYTH', price: '$3.12', change: '+3.9%', holders: '2,213', flag: '🇬🇧' },
  { rank: 5, name: 'Massimo Bottura', coin: 'BOTTURA', price: '$2.87', change: '+2.1%', holders: '1,998', flag: '🇮🇹' },
  { rank: 6, name: 'Ana Roš', coin: 'ROS', price: '$2.41', change: '+1.8%', holders: '1,745', flag: '🇸🇮' },
  { rank: 7, name: 'Grant Achatz', coin: 'ALINEA', price: '$2.19', change: '+0.9%', holders: '1,521', flag: '🇺🇸' },
];

export default function ChefCoin() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="chefcoin" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div {...fadeUp(0)}>
            <SectionLabel>ChefCoin System</SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-6xl font-black tracking-tight text-charcoal-950 leading-[1.05]"
            {...fadeUp(0.07)}
          >
            Chef Reputation as an{' '}
            <span className="text-gradient-gold">On-chain Asset</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-500 leading-relaxed"
            {...fadeUp(0.14)}
          >
            ChefDex is the on-chain global ranking layer for professional chefs. Each chef
            issues a named coin — a liquid, market-priced representation of their culinary
            standing that updates in real time.
          </motion.p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — Features grid */}
          <div className="grid grid-cols-1 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="flex gap-5 p-6 rounded-2xl border border-charcoal-100 hover:border-gold-200 hover:shadow-sm transition-all duration-300 group"
                {...fadeUp(0.1 + i * 0.07)}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-colors duration-300">
                  <feature.icon
                    size={18}
                    className="text-gold-600 group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-charcoal-900 mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right — Live ranking panel */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-24"
          >
            <div className="bg-charcoal-950 rounded-2xl overflow-hidden shadow-2xl">
              {/* Panel header */}
              <div className="px-6 py-5 border-b border-charcoal-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-charcoal-400 tracking-widest uppercase mb-1">
                    Live Network
                  </div>
                  <div className="text-white font-bold text-lg">Global Chef Ranking</div>
                </div>
                <Badge variant="gold">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                  Live
                </Badge>
              </div>

              {/* Column headers */}
              <div className="px-6 py-2.5 grid grid-cols-12 gap-2 bg-charcoal-900/50">
                <span className="col-span-1 text-xs font-semibold text-charcoal-500">#</span>
                <span className="col-span-4 text-xs font-semibold text-charcoal-500">Chef</span>
                <span className="col-span-2 text-xs font-semibold text-charcoal-500">Coin</span>
                <span className="col-span-2 text-xs font-semibold text-charcoal-500 text-right">Price</span>
                <span className="col-span-3 text-xs font-semibold text-charcoal-500 text-right">Holders</span>
              </div>

              {/* Rows */}
              <div className="divide-y divide-charcoal-800/50">
                {EXTENDED_RANKING.map((chef, i) => (
                  <motion.div
                    key={chef.coin}
                    className="px-6 py-3.5 grid grid-cols-12 gap-2 items-center hover:bg-charcoal-800/40 transition-colors cursor-default"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.3 + i * 0.06 }}
                  >
                    <span className="col-span-1 text-xs font-bold text-charcoal-500">
                      {chef.rank}
                    </span>
                    <div className="col-span-4 flex items-center gap-2">
                      <span className="text-sm leading-none">{chef.flag}</span>
                      <span className="text-sm font-semibold text-charcoal-200 truncate">
                        {chef.name.split(' ').slice(-1)[0]}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-xs font-bold text-gold-400">{chef.coin}</span>
                    </div>
                    <div className="col-span-2 text-right">
                      <span className="text-xs font-semibold text-charcoal-300">{chef.price}</span>
                    </div>
                    <div className="col-span-3 text-right flex items-center justify-end gap-1.5">
                      <span className="text-xs font-semibold text-emerald-400">{chef.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Bottom info */}
              <div className="px-6 py-4 bg-charcoal-900/50 border-t border-charcoal-800 grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Coins', value: '240' },
                  { label: 'Market Cap', value: '$2.4M' },
                  { label: 'Volume 24h', value: '$184K' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-sm font-bold text-gold-400">{stat.value}</div>
                    <div className="text-xs text-charcoal-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
