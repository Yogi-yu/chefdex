'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronRight, Globe } from 'lucide-react';
import Button from '@/components/ui/Button';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

const MOCK_RANKING = [
  { rank: 1, name: 'Éric Ripert', coin: 'ERIC', price: '$4.28', change: '+12.4%', flag: '🇫🇷' },
  { rank: 2, name: 'Nobu Matsuhisa', coin: 'NOBU', price: '$3.91', change: '+8.7%', flag: '🇯🇵' },
  { rank: 3, name: 'Dominique Crenn', coin: 'CRENN', price: '$3.54', change: '+5.2%', flag: '🇺🇸' },
  { rank: 4, name: 'Clare Smyth', coin: 'SMYTH', price: '$3.12', change: '+3.9%', flag: '🇬🇧' },
  { rank: 5, name: 'Massimo Bottura', coin: 'BOTTURA', price: '$2.87', change: '+2.1%', flag: '🇮🇹' },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden mesh-bg pt-20">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(to right, #1a1a1a 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gold orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-500/4 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
          {/* Left — Copy */}
          <div>
            <motion.div
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.45 }}
            >
              <a
                href="#worldchefs"
                className="inline-flex items-center gap-2.5 mb-7 px-4 py-2 rounded-full border border-gold-200 bg-gold-50/80 text-sm font-medium text-charcoal-700 hover:bg-gold-100/70 hover:border-gold-400 transition-all duration-200 cursor-pointer group select-none"
              >
                <div className="w-5 h-5 rounded-full bg-charcoal-900 flex items-center justify-center flex-shrink-0">
                  <Globe size={11} className="text-gold-400" />
                </div>
                <span>
                  Supported by{' '}
                  <span className="font-semibold text-charcoal-900">Worldchefs</span>
                  <span className="hidden sm:inline text-charcoal-500">
                    {' '}· World Association of Chefs Societies
                  </span>
                </span>
                <ChevronRight
                  size={13}
                  className="text-gold-400 group-hover:translate-x-0.5 transition-transform duration-200 flex-shrink-0"
                />
              </a>
            </motion.div>

            <motion.h1
              className="text-4xl lg:text-6xl font-black tracking-tight text-charcoal-950 leading-[1.06] mb-6"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, delay: 0.07 }}
            >
              On-chain Michelin{' '}
              <span className="text-gradient-gold">Ranking System</span>{' '}
              for Chefs
            </motion.h1>

            <motion.p
              className="text-lg lg:text-xl text-charcoal-500 leading-relaxed mb-10 max-w-lg"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, delay: 0.14 }}
            >
              Where chefs become on-chain assets and power a global culinary ranking
              benchmark system.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, delay: 0.21 }}
            >
              <Button variant="primary" size="lg" href="#chefcoin">
                Explore Chef Ranking
                <ArrowRight size={18} />
              </Button>
              <Button variant="secondary" size="lg" href="#payments">
                Enable Crypto Payments
              </Button>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 mt-12 pt-8 border-t border-charcoal-100"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.55, delay: 0.28 }}
            >
              {[
                { label: 'Chefs Onboarded', value: '240+' },
                { label: 'Restaurants', value: '80+' },
                { label: 'Countries', value: '34' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-charcoal-900">{stat.value}</div>
                  <div className="text-xs text-charcoal-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Animated ranking widget */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          >
            {/* Card background */}
            <div className="relative bg-white rounded-2xl border border-charcoal-100 shadow-2xl shadow-charcoal-900/8 overflow-hidden">
              {/* Card header */}
              <div className="px-5 py-4 border-b border-charcoal-100 flex items-center justify-between bg-charcoal-950">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-semibold text-charcoal-400 tracking-wide">
                  Global Chef Ranking — Live
                </span>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              </div>

              {/* Column headers */}
              <div className="px-5 py-3 grid grid-cols-12 gap-2 bg-charcoal-50 border-b border-charcoal-100">
                <span className="col-span-1 text-xs font-semibold text-charcoal-400">#</span>
                <span className="col-span-5 text-xs font-semibold text-charcoal-400">Chef</span>
                <span className="col-span-3 text-xs font-semibold text-charcoal-400">Coin</span>
                <span className="col-span-3 text-xs font-semibold text-charcoal-400 text-right">24h</span>
              </div>

              {/* Ranking rows */}
              <div className="divide-y divide-charcoal-50">
                {MOCK_RANKING.map((chef, i) => (
                  <motion.div
                    key={chef.coin}
                    className="px-5 py-3.5 grid grid-cols-12 gap-2 items-center hover:bg-gold-50/30 transition-colors cursor-default"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  >
                    <span className="col-span-1 text-xs font-bold text-charcoal-400">
                      {chef.rank}
                    </span>
                    <div className="col-span-5 flex items-center gap-2">
                      <span className="text-base leading-none">{chef.flag}</span>
                      <span className="text-sm font-semibold text-charcoal-800 truncate">
                        {chef.name}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <span className="inline-block px-2 py-0.5 bg-charcoal-900 text-gold-400 text-xs font-bold rounded tracking-wide">
                        {chef.coin}
                      </span>
                    </div>
                    <span className="col-span-3 text-xs font-semibold text-emerald-600 text-right">
                      {chef.change}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Footer CTA */}
              <div className="px-5 py-3.5 bg-charcoal-950 flex items-center justify-between">
                <span className="text-xs text-charcoal-400">Updated every block</span>
                <a href="#chefcoin" className="text-xs font-semibold text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1">
                  Full ranking <ArrowRight size={11} />
                </a>
              </div>
            </div>

            {/* Floating detail cards */}
            <motion.div
              className="absolute -bottom-4 -left-6 bg-white rounded-xl border border-charcoal-100 shadow-lg px-4 py-3 hidden lg:block"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-xs text-charcoal-400 mb-0.5">Settlement</div>
              <div className="text-sm font-bold text-charcoal-900 flex items-center gap-1.5">
                <span className="text-emerald-500">✓</span> USDC Confirmed
              </div>
            </motion.div>

            <motion.div
              className="absolute -top-4 -right-4 bg-charcoal-950 rounded-xl shadow-lg px-4 py-3 hidden lg:block"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="text-xs text-charcoal-400 mb-0.5">New ChefCoin</div>
              <div className="text-sm font-bold text-gold-400">$CRENN listed</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-charcoal-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
