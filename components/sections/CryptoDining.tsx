'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Zap,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  Coins,
  Star,
} from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import Button from '@/components/ui/Button';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

// ─── Payment methods ────────────────────────────────────────────────────────

type Token = 'USDC' | 'USDT' | 'ETH' | 'CHEF';

const STABLECOIN_TOKENS: Token[] = ['USDC', 'USDT', 'ETH'];

// ─── Stablecoin benefits (shown for USDC / USDT / ETH) ─────────────────────

const STABLECOIN_BENEFITS = [
  {
    icon: Shield,
    title: 'Stablecoin Settlement',
    description: 'Accept USDC and major stablecoins with no price volatility risk.',
  },
  {
    icon: Zap,
    title: 'Instant Confirmation',
    description: 'On-chain settlement in under three seconds — faster than card networks.',
  },
  {
    icon: Lock,
    title: 'Non-Custodial',
    description: 'Funds move directly to your wallet. No intermediary holds your revenue.',
  },
  {
    icon: CreditCard,
    title: 'Familiar Checkout',
    description: 'QR-based flow that requires zero crypto knowledge from the guest.',
  },
];

// ─── ChefCoin settlement details ────────────────────────────────────────────

const CHEF_BENEFITS = [
  {
    icon: Coins,
    title: 'Protocol-Native Settlement',
    description:
      'ChefCoin is the native settlement asset of the ChefDex protocol — not a third-party token.',
  },
  {
    icon: Star,
    title: 'Culinary Reputation Asset',
    description:
      'Each ChefCoin represents market-validated culinary standing. Settlement strengthens the on-chain ranking system.',
  },
  {
    icon: Zap,
    title: 'Instant On-chain Finality',
    description:
      'Settlement completes in under three seconds with full on-chain attestation tied to the chef\'s reputation score.',
  },
  {
    icon: Shield,
    title: 'Aligned Incentives',
    description:
      'Diners who pay in ChefCoin become stakeholders in the chef\'s on-chain ranking — aligning diner and chef interests.',
  },
];

// ─── Receipt items ───────────────────────────────────────────────────────────

const RECEIPT_ITEMS = [
  { label: 'Tasting Menu (2 guests)', amount: '$340.00' },
  { label: 'Sommelier Pairing', amount: '$180.00' },
  { label: 'Service', amount: '$52.00' },
];

// ─── QR grid pattern (stable — no Math.random to avoid hydration mismatch) ──

const QR_FILLED = new Set([
  0,1,2,3,4,5,6,
  7,13,
  14,20,
  21,22,23,24,25,26,27,
  34,
  42,43,44,45,46,47,48,
  8,15,29,36,
  11,18,32,39,
  9,12,16,19,
  33,30,37,40,
  10,17,31,38,
  // inner fill approximation
  2,3,4,
  44,45,46,
  28,35,
  23,24,25,
]);

export default function CryptoDining() {
  const [selected, setSelected] = useState<Token>('USDC');
  const isChef = selected === 'CHEF';

  const displayAmount = isChef ? '572.00 CHEF' : `572.00 ${selected}`;
  const benefits = isChef ? CHEF_BENEFITS : STABLECOIN_BENEFITS;

  return (
    <section id="payments" className="py-24 lg:py-32 bg-charcoal-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section header ────────────────────────────────────────────── */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div {...fadeUp(0)}>
            <SectionLabel className="text-charcoal-400 [&>span]:text-gold-500 [&>span]:!text-gold-500">
              Crypto Dining Payments
            </SectionLabel>
          </motion.div>
          <motion.h2
            className="mt-5 text-4xl lg:text-6xl font-black tracking-tight text-white leading-[1.05]"
            {...fadeUp(0.07)}
          >
            Fine Dining,{' '}
            <span className="text-gradient-gold">On-Chain</span>
          </motion.h2>
          <motion.p
            className="mt-5 text-lg text-charcoal-400 leading-relaxed"
            {...fadeUp(0.14)}
          >
            ChefDex integrates seamlessly into Michelin-level operations, enabling stablecoin
            and protocol-native payments with a checkout experience designed to match the
            standards of the room.
          </motion.p>
        </div>

        {/* ── Content grid ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: Mock checkout card ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

              {/* Restaurant header */}
              <div className="px-6 py-5 bg-charcoal-50 border-b border-charcoal-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-charcoal-400 mb-0.5">Evening Service</div>
                  <div className="font-bold text-charcoal-900">Atelier Crenn, SF</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-charcoal-400 mb-0.5">Table 12 • Sat Jun 14</div>
                  <div className="text-xs font-semibold text-charcoal-600">9:15 PM</div>
                </div>
              </div>

              {/* Line items */}
              <div className="px-6 py-5 space-y-3">
                {RECEIPT_ITEMS.map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm text-charcoal-600">{item.label}</span>
                    <span className="text-sm font-semibold text-charcoal-900">{item.amount}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between">
                  <span className="text-base font-bold text-charcoal-900">Total</span>
                  <span className="text-base font-black text-charcoal-950">$572.00</span>
                </div>
              </div>

              {/* Payment method selector */}
              <div className="px-6 pb-5 space-y-3">
                <div className="text-xs font-semibold text-charcoal-400 uppercase tracking-wide">
                  Pay with
                </div>

                {/* Top row: stablecoins */}
                <div className="grid grid-cols-3 gap-2">
                  {STABLECOIN_TOKENS.map((token) => (
                    <motion.button
                      key={token}
                      onClick={() => setSelected(token)}
                      whileTap={{ scale: 0.94 }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                      className={`py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer ${
                        selected === token
                          ? 'bg-charcoal-950 text-gold-400 border-charcoal-950'
                          : 'bg-charcoal-50 text-charcoal-500 border-charcoal-100 hover:border-charcoal-300 hover:bg-charcoal-100'
                      }`}
                    >
                      {token}
                    </motion.button>
                  ))}
                </div>

                {/* Bottom row: ChefCoin — full width, protocol-primary */}
                <motion.button
                  onClick={() => setSelected('CHEF')}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12, ease: 'easeOut' }}
                  className={`w-full py-3 rounded-xl text-sm font-bold border-2 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                    isChef
                      ? 'bg-gold-500 text-white border-gold-500 shadow-[0_0_0_3px_rgba(200,164,93,0.25)]'
                      : 'bg-charcoal-50 text-charcoal-600 border-charcoal-100 hover:border-gold-300 hover:bg-gold-50/50 hover:text-gold-700'
                  }`}
                >
                  <Coins size={15} className={isChef ? 'text-white' : 'text-gold-500'} />
                  <span>CHEF</span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      isChef
                        ? 'bg-white/20 text-white'
                        : 'bg-gold-100 text-gold-700'
                    }`}
                  >
                    Protocol Native
                  </span>
                </motion.button>

                {/* QR area */}
                <div
                  className={`mt-1 rounded-xl p-5 flex flex-col items-center gap-3 transition-colors duration-300 ${
                    isChef ? 'bg-gold-50' : 'bg-charcoal-50'
                  }`}
                >
                  {/* Static QR mockup */}
                  <div className="w-24 h-24">
                    <div className="grid grid-cols-7 grid-rows-7 w-full h-full gap-0.5">
                      {Array.from({ length: 49 }).map((_, idx) => (
                        <div
                          key={idx}
                          className={`rounded-[1px] transition-colors duration-300 ${
                            QR_FILLED.has(idx)
                              ? isChef
                                ? 'bg-gold-600'
                                : 'bg-charcoal-900'
                              : 'bg-transparent'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      key={displayAmount}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`text-xs font-bold ${isChef ? 'text-gold-700' : 'text-charcoal-700'}`}
                    >
                      {displayAmount}
                    </motion.div>
                    <div className="text-xs text-charcoal-400 mt-0.5">Scan to pay</div>
                  </div>
                </div>

                {/* Verification row — changes with ChefCoin */}
                <AnimatePresence mode="wait">
                  {isChef ? (
                    <motion.div
                      key="chef-verified"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 px-4 py-3 bg-gold-50 rounded-xl border border-gold-200"
                    >
                      <CheckCircle2 size={16} className="text-gold-500 flex-shrink-0" />
                      <span className="text-xs font-semibold text-gold-700">
                        On-chain Michelin Settlement Enabled
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="standard-verified"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center gap-2 px-4 py-3 bg-emerald-50 rounded-xl border border-emerald-100"
                    >
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span className="text-xs font-semibold text-emerald-700">
                        ChefDex Verified Restaurant
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Floating confirmation chip */}
            <motion.div
              className="absolute -bottom-5 -right-5 bg-charcoal-950 rounded-xl shadow-xl px-4 py-3 border border-charcoal-800"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="text-xs text-charcoal-400 mb-0.5">Settlement</div>
              <div className="text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Confirmed in 2.1s
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Benefits / ChefCoin panel ─────────────────────────── */}
          <div>
            {/* ChefCoin header — only visible when CHEF selected */}
            <AnimatePresence mode="wait">
              {isChef && (
                <motion.div
                  key="chef-header"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mb-6 p-5 rounded-2xl border border-gold-500/30 bg-gold-500/5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl bg-gold-500/15 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                      <Coins size={18} className="text-gold-400" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gold-500 uppercase tracking-widest">
                        Protocol-Native
                      </div>
                      <div className="text-base font-bold text-white">ChefCoin Settlement</div>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal-400 leading-relaxed">
                    Pay directly using ChefCoin — the native asset of the ChefDex ranking
                    protocol. Settlement is completed on-chain and tied to the chef&apos;s live
                    reputation score.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                    <span className="text-xs text-charcoal-400">
                      Protocol-native settlement · USD equivalent: $572.00
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Benefits grid — animates between stablecoin and CHEF content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={isChef ? 'chef-benefits' : 'stable-benefits'}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 gap-5 mb-10"
              >
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={benefit.title}
                    className="flex gap-4 p-5 rounded-2xl border border-charcoal-800 hover:border-gold-600/30 hover:bg-charcoal-900/50 transition-all duration-300 group"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-charcoal-800 border border-charcoal-700 flex items-center justify-center group-hover:bg-gold-500/10 group-hover:border-gold-500/30 transition-colors duration-300">
                      <benefit.icon
                        size={18}
                        className="text-charcoal-400 group-hover:text-gold-400 transition-colors duration-300"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{benefit.title}</h3>
                      <p className="text-sm text-charcoal-400 leading-relaxed">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            <motion.div {...fadeUp(0.5)}>
              <Button
                variant="secondary"
                size="lg"
                href="mailto:restaurants@chefdex.io"
                className="border-gold-500/40 text-gold-400 hover:bg-gold-500/10"
              >
                Apply for Restaurant Access
                <ArrowRight size={18} />
              </Button>
              <p className="mt-4 text-xs text-charcoal-500">
                Currently onboarding Michelin-rated and fine dining establishments globally.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
