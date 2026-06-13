'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';

const PARTICIPANTS = [
  {
    label: 'Chefs',
    icon: '👨‍🍳',
    color: 'bg-amber-50 border-amber-100',
    iconBg: 'bg-amber-100',
    description: 'Issue ChefCoins, build on-chain reputation, grow institutional recognition.',
    flows: ['Issue coins', 'Build ranking', 'Accept payments'],
  },
  {
    label: 'Diners & Investors',
    icon: '🍽️',
    color: 'bg-sky-50 border-sky-100',
    iconBg: 'bg-sky-100',
    description: 'Acquire ChefCoins, pay for fine dining in crypto, participate in culinary markets.',
    flows: ['Trade ChefCoins', 'Pay with USDC', 'Hold chef assets'],
  },
  {
    label: 'Restaurants',
    icon: '🏛️',
    color: 'bg-emerald-50 border-emerald-100',
    iconBg: 'bg-emerald-100',
    description: 'Accept stablecoin payments, attract crypto-native guests, leverage chef rankings.',
    flows: ['Accept crypto', 'Settle instantly', 'Access network'],
  },
];

const NETWORK_EFFECTS = [
  {
    title: 'More chefs → stronger ranking signal',
    description: 'A denser chef network creates richer market data and a more credible ranking system.',
  },
  {
    title: 'More restaurants → broader diner adoption',
    description: 'Each integrated establishment expands the utility of ChefCoin holdings for diners.',
  },
  {
    title: 'More holders → higher chef valuation',
    description: 'Growing coin demand directly reflects and amplifies a chef\'s market-measured reputation.',
  },
  {
    title: 'More payments → stronger protocol revenue',
    description: 'Transaction volume creates a self-sustaining protocol treasury that funds ecosystem growth.',
  },
];

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionLabel>Ecosystem Value</SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-5xl font-black tracking-tight text-charcoal-950 leading-[1.08]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.07 }}
          >
            A Network Built on{' '}
            <span className="text-gradient-gold">Aligned Incentives</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.14 }}
          >
            ChefDex creates compounding network effects between chefs, diners, and restaurants —
            each participant strengthens the value of every other.
          </motion.p>
        </div>

        {/* Participants */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {PARTICIPANTS.map((p, i) => (
            <motion.div
              key={p.label}
              className={`rounded-2xl border p-6 ${p.color}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`w-12 h-12 rounded-2xl ${p.iconBg} flex items-center justify-center text-2xl mb-5`}>
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">{p.label}</h3>
              <p className="text-sm text-charcoal-500 leading-relaxed mb-5">{p.description}</p>
              <ul className="space-y-2">
                {p.flows.map((flow) => (
                  <li key={flow} className="flex items-center gap-2 text-xs font-semibold text-charcoal-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                    {flow}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Network effects */}
        <motion.div
          className="bg-charcoal-950 rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-500">
              Network Effects
            </span>
            <h3 className="mt-3 text-2xl lg:text-3xl font-black text-white">
              Each participant compounds the value for all
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {NETWORK_EFFECTS.map((effect, i) => (
              <motion.div
                key={effect.title}
                className="flex gap-4 p-5 rounded-xl bg-charcoal-900 border border-charcoal-800"
                initial={{ opacity: 0, x: i % 2 === 0 ? -16 : 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3 + i * 0.07 }}
              >
                <ArrowRight size={18} className="text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm font-bold text-white mb-1">{effect.title}</div>
                  <div className="text-sm text-charcoal-400 leading-relaxed">{effect.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
