'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ChefHat, TrendingUp, Globe, Zap, Star, ArrowRight, Check, X } from 'lucide-react';
import SectionLabel from '@/components/ui/SectionLabel';
import ExportPdfButton from '@/components/ui/ExportPdfButton';

/* ─── animation helper ─── */
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] },
});

/* ─── data ─── */

const FEATURES = [
  { icon: Star,      label: 'Chef of the Year',     desc: "Market-cap-driven annual ranking of the world's top professional chefs, verified on-chain." },
  { icon: TrendingUp,label: 'Chef Index',            desc: 'Real-time performance index tracking chef token liquidity and global reputation score.' },
  { icon: Zap,       label: 'Crypto Payment',        desc: 'USDC, USDT, ETH, and ChefCoin accepted natively at every partner restaurant.' },
  { icon: Globe,     label: 'VIP Booking',           desc: 'Token-gated reservation system giving ChefCoin holders priority access to exclusive dining.' },
  { icon: ChefHat,   label: 'Decentralized Rating',  desc: 'Open, tamper-proof culinary credentialing infrastructure replacing closed guild systems.' },
];

const WC_STATS = [
  { value: '1928', label: 'Founded' },
  { value: '110+', label: 'National Associations' },
  { value: '10M+', label: 'Culinary Professionals' },
  { value: '50K+', label: 'Premium Restaurants' },
];

const RESTAURANTS = [
  { name: 'Noma',               city: 'Copenhagen',    chef: 'René Redzepi',       stars: 3 },
  { name: 'Eleven Madison Park',city: 'New York',      chef: 'Daniel Humm',        stars: 3 },
  { name: 'The Fat Duck',       city: 'Bray',          chef: 'Heston Blumenthal',  stars: 3 },
  { name: 'Mirazur',            city: 'Menton',        chef: 'Mauro Colagreco',    stars: 3 },
  { name: 'Geranium',           city: 'Copenhagen',    chef: 'Rasmus Kofoed',      stars: 3 },
  { name: 'Ultraviolet',        city: 'Shanghai',      chef: 'Paul Pairet',        stars: 3 },
  { name: 'Narisawa',           city: 'Tokyo',         chef: 'Yoshihiro Narisawa', stars: 2 },
  { name: 'Atelier Crenn',      city: 'San Francisco', chef: 'Dominique Crenn',    stars: 3 },
  { name: 'Central',            city: 'Lima',          chef: 'Virgilio Martínez',  stars: 2 },
];

const PROBLEM_STATS = [
  { value: '<2%',  label: 'Global crypto usage in retail payments' },
  { value: '<12%', label: 'Merchant acceptance rate worldwide' },
  { value: '$0',   label: 'On-chain culinary reputation infrastructure' },
];

const QUOTES = [
  {
    quote: 'The challenge of mainstream crypto adoption is not technical — it is about creating genuine utility that people can see and touch in daily life.',
    author: 'Vitalik Buterin', title: 'Ethereum Co-Founder',
  },
  {
    quote: 'Mass adoption happens when people use crypto without thinking about crypto. The infrastructure must be invisible and the experience must be familiar.',
    author: 'CZ', title: 'Binance Founder',
  },
];

const SOLUTION_ITEMS = [
  { label: 'ChefCoin Payment System',           desc: 'Protocol-native token enabling seamless on-chain settlement at the point of service.' },
  { label: 'Worldchefs-Endorsed Infrastructure',desc: 'The only Web3 platform built with institutional backing of a century-old culinary authority.' },
  { label: 'QR / Face ID / Palm Pay',           desc: 'Familiar UX primitives built on top of decentralized rails — no wallet knowledge required.' },
  { label: 'VIP Booking Protocol',              desc: 'Token-gated reservation access creating genuine utility demand for ChefCoin holders.' },
];

const PAYMENT_METHODS = [
  { num: '1', method: 'QR Code Scan',  desc: 'One-scan checkout at the table — no app download required.' },
  { num: '2', method: 'Face ID Pay',   desc: 'Biometric authentication for returning guests at partner venues.' },
  { num: '3', method: 'Palm Pay',      desc: 'Hardware-integrated palm recognition for frictionless settlement.' },
];

const RANKING_FEATURES = [
  'Chef of the Year determined by market capitalization — the market votes with capital',
  'Real-time chef token ranking updated continuously on-chain',
  'Liquid chef tokens tradeable on decentralized exchanges globally',
  'Global ranking infrastructure replacing closed, opaque guild systems',
];

const COMPARISON = [
  { dim: 'Primary Focus',        blackbird: 'Restaurants & loyalty programs', chefdex: 'Individual chefs & reputation' },
  { dim: 'Ranking Model',        blackbird: 'Static loyalty points',          chefdex: 'Real-time market cap ranking' },
  { dim: 'Network Scope',        blackbird: 'Local / regional markets',       chefdex: 'Global infrastructure' },
  { dim: 'Asset Type',           blackbird: 'Closed loyalty credits',         chefdex: 'Liquid, tradeable chef tokens' },
  { dim: 'Institutional Backing',blackbird: 'VC-funded startup',              chefdex: 'Worldchefs (110+ nations)' },
  { dim: 'Settlement Layer',     blackbird: 'Off-chain points system',        chefdex: 'On-chain protocol' },
];

const TEAM = [
  {
    name: 'Clinton Zhu', initials: 'CZ', image: '/pics/clinton.jpg', title: 'Founder',
    background: 'Senior chef and crypto product builder. Clinton brings a rare combination of professional kitchen expertise and on-chain protocol experience — the founding conviction behind ChefDex.',
    tags: ['Chef', 'Protocol Design', 'Crypto Products'], avatarVariant: 'gold' as const,
  },
  {
    name: 'Alex Li', initials: 'AL', image: '/pics/alex.jpg', title: 'Chef Partner',
    background: 'Experienced professional chef mentored by Clinton Zhu. Alex drives culinary credibility and chef-side adoption, ensuring ChefDex is built to the standards of serious kitchen professionals.',
    tags: ['Fine Dining', 'Culinary Operations', 'Chef Network'], avatarVariant: 'dark' as const,
  },
  {
    name: 'Tina Liu', initials: 'TL', title: 'Head of Operations',
    background: 'Private equity investing background. Tina leads operations, execution, and strategic partnerships — bringing institutional-grade discipline to how ChefDex scales and deploys capital.',
    tags: ['Private Equity', 'Operations', 'Partnerships'], avatarVariant: 'gold' as const,
  },
];

const ROADMAP = [
  {
    phase: 'Phase 1', title: 'Pilot Launch',
    items: ['10 pilot cities globally', 'Tokyo, Dubai, Hong Kong initial markets', 'Chef token minting infrastructure live'],
  },
  {
    phase: 'Phase 2', title: 'POS Rollout',
    items: ['Restaurant POS system integration', 'QR / Face ID / Palm Pay deployment', 'ChefCoin payment acceptance live'],
  },
  {
    phase: 'Phase 3', title: 'Global Expansion',
    items: ['50+ cities across 6 continents', 'Chef of the Year first global ceremony', 'DEX listing for all chef tokens'],
  },
];

/* ─── sub-components ─── */

function MonogramAvatar({ initials, variant }: { initials: string; variant: 'gold' | 'dark' }) {
  const isGold = variant === 'gold';
  return (
    <div className="relative w-14 h-14 mb-4 flex-shrink-0">
      <div className={`absolute inset-[-4px] rounded-[18px] blur-[8px] pointer-events-none ${isGold ? 'bg-gold-400/30' : 'bg-charcoal-600/35'}`} />
      <div className={`relative w-full h-full rounded-[14px] flex items-center justify-center shadow-md ring-2 ${isGold ? 'bg-gradient-to-br from-gold-300 via-gold-500 to-gold-700 ring-gold-400/25' : 'bg-gradient-to-br from-charcoal-600 via-charcoal-800 to-charcoal-950 ring-charcoal-500/30'}`}>
        <span className="text-white font-black text-base tracking-tight leading-none select-none">{initials}</span>
      </div>
    </div>
  );
}

function PhotoAvatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative w-14 h-14 mb-4 flex-shrink-0">
      <div className="absolute inset-[-4px] rounded-[18px] blur-[8px] pointer-events-none bg-gold-400/20" />
      <div className="relative w-full h-full rounded-[14px] overflow-hidden shadow-md ring-2 ring-gold-400/25">
        <Image src={src} alt={name} fill className="object-cover" sizes="56px" />
      </div>
    </div>
  );
}

/* ─── page ─── */

export default function DeckPage() {
  return (
    <div className="text-charcoal-950">
      <ExportPdfButton />

      {/* ── SLIDE 1: HERO ───────────────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-950 text-white">
        {/* gold glow — pointer-events-none is fine here, kept for visual only */}
        <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[480px] h-[480px] rounded-full bg-gold-500/8 blur-[90px]" />
        </div>
        <div className="flex flex-col items-center justify-center flex-1 w-full max-w-4xl mx-auto px-10 relative z-10 text-center">
          <motion.div {...fade(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 bg-gold-500/10 mb-7">
              <Image src="/logo.jpg" alt="ChefDex" width={18} height={18} className="w-[18px] h-[18px] object-contain rounded-sm opacity-90" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400">Investor Deck · 2026</span>
            </div>
          </motion.div>
          <motion.p className="text-sm font-semibold tracking-[0.25em] uppercase text-gold-400 mb-3" {...fade(0.08)}>
            Beyond the Stars
          </motion.p>
          <motion.h1 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-5" {...fade(0.15)}>
            ChefDex<br /><span className="text-gradient-gold">Protocol</span>
          </motion.h1>
          <motion.p className="text-lg text-charcoal-300 max-w-lg mx-auto leading-relaxed mb-9" {...fade(0.22)}>
            The Decentralized Scoring Infrastructure for High-End Dining Ecosystems
          </motion.p>
          <motion.div className="flex flex-wrap items-center justify-center gap-3" {...fade(0.3)}>
            <div className="px-4 py-2 rounded-full border border-charcoal-700 text-sm text-charcoal-300">Worldchefs Endorsed</div>
            <div className="px-4 py-2 rounded-full border border-charcoal-700 text-sm text-charcoal-300">On-chain · Institutional Grade</div>
            <div className="px-4 py-2 rounded-full border border-gold-500/40 bg-gold-500/10 text-sm text-gold-400">Chef of the Year 2026</div>
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 2: WHAT IS CHEFDEX ────────────────────────────────── */}
      <section className="deck-slide bg-white">
        <div className="flex flex-col justify-center flex-1 max-w-7xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}><SectionLabel>What is ChefDex</SectionLabel></motion.div>
            <motion.h2 className="mt-2 text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              Decentralized Rating Infrastructure{' '}
              <span className="text-gradient-gold">for Fine Dining</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {FEATURES.slice(0, 3).map((f, i) => (
              <motion.div key={f.label} className="rounded-2xl border border-charcoal-100 p-6 hover:border-gold-200 transition-colors duration-300" {...fade(i * 0.07)}>
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <f.icon size={19} className="text-gold-600" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold text-charcoal-950 mb-2">{f.label}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4 max-w-xl mx-auto w-full">
            {FEATURES.slice(3).map((f, i) => (
              <motion.div key={f.label} className="rounded-2xl border border-charcoal-100 p-6 hover:border-gold-200 transition-colors duration-300" {...fade(0.21 + i * 0.07)}>
                <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mb-4">
                  <f.icon size={19} className="text-gold-600" strokeWidth={1.75} />
                </div>
                <h3 className="text-sm font-bold text-charcoal-950 mb-2">{f.label}</h3>
                <p className="text-xs text-charcoal-500 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE 3: WORLDCHEFS ALLIANCE ────────────────────────────── */}
      <section className="deck-slide bg-charcoal-950 text-white">
        <div className="flex items-center flex-1 max-w-7xl mx-auto px-14 w-full gap-14">
          <div className="flex-1">
            <motion.div {...fade(0)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-5">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400">Strategic Alliance</span>
              </div>
            </motion.div>
            <motion.h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] mb-5" {...fade(0.07)}>
              Worldchefs<br /><span className="text-gradient-gold">Global Authority</span>
            </motion.h2>
            <motion.p className="text-base text-charcoal-300 leading-relaxed mb-6" {...fade(0.14)}>
              Founded in 1928, Worldchefs is the world&apos;s premier culinary authority — representing every national chef association on earth. ChefDex is their endorsed digital paradigm in Web3.
            </motion.p>
            <motion.blockquote className="border-l-2 border-gold-500 pl-5" {...fade(0.2)}>
              <p className="text-charcoal-200 italic text-sm leading-relaxed">
                &ldquo;The digital paradigm in Web3 — backed by a century of culinary institution-building.&rdquo;
              </p>
              <footer className="mt-2 text-sm text-gold-400 font-semibold">Worldchefs · World Association of Chefs Societies</footer>
            </motion.blockquote>
          </div>
          <div className="grid grid-cols-2 gap-4 w-[340px] flex-shrink-0">
            {WC_STATS.map((s, i) => (
              <motion.div key={s.label} className="rounded-2xl border border-charcoal-800 bg-charcoal-900 p-6 text-center" {...fade(i * 0.1)}>
                <div className="text-3xl font-black text-gradient-gold mb-2">{s.value}</div>
                <div className="text-xs text-charcoal-400">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE 4: RESTAURANT NETWORK ─────────────────────────────── */}
      <section className="deck-slide bg-white">
        <div className="flex flex-col justify-center flex-1 max-w-7xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}><SectionLabel>Restaurant Network</SectionLabel></motion.div>
            <motion.h2 className="mt-2 text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              First-Batch Partner Restaurants{' '}
              <span className="text-gradient-gold">Joining the Protocol</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {RESTAURANTS.map((r, i) => (
              <motion.div key={r.name} className="flex items-center gap-3 rounded-xl border border-charcoal-100 bg-white p-4 hover:border-gold-200 hover:shadow-sm transition-all duration-300" {...fade(i * 0.05)}>
                <div className="w-9 h-9 rounded-full bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                  <Star size={14} className="text-gold-600" fill="currentColor" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-charcoal-950 text-sm truncate">{r.name}</div>
                  <div className="text-xs text-charcoal-500">{r.chef}</div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-xs text-charcoal-400">{r.city}</span>
                    <span className="text-charcoal-200">·</span>
                    <span className="text-xs text-gold-600 font-semibold">{'★'.repeat(r.stars)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE 5: PROBLEM ────────────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-950 text-white">
        <div className="flex flex-col justify-center flex-1 max-w-7xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 mb-4">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-red-400">The Problem</span>
              </div>
            </motion.div>
            <motion.h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              Mass Adoption <span className="text-red-400">Remains Unsolved</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-6">
            {PROBLEM_STATS.map((s, i) => (
              <motion.div key={s.label} className="rounded-2xl border border-charcoal-800 bg-charcoal-900 p-6 text-center" {...fade(i * 0.1)}>
                <div className="text-4xl lg:text-5xl font-black text-red-400 mb-2">{s.value}</div>
                <div className="text-xs text-charcoal-400 leading-relaxed">{s.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-5">
            {QUOTES.map((q, i) => (
              <motion.blockquote key={q.author} className="rounded-2xl border border-charcoal-800 bg-charcoal-900 p-6" {...fade(i * 0.12)}>
                <p className="text-charcoal-200 leading-relaxed mb-4 text-sm">&ldquo;{q.quote}&rdquo;</p>
                <footer className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-charcoal-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-charcoal-300">{q.author[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{q.author}</div>
                    <div className="text-xs text-charcoal-500">{q.title}</div>
                  </div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE 6: SOLUTION ───────────────────────────────────────── */}
      <section className="deck-slide bg-white">
        <div className="flex items-center flex-1 max-w-7xl mx-auto px-14 w-full gap-12">
          <div className="flex-1">
            <motion.div {...fade(0)}><SectionLabel>The Solution</SectionLabel></motion.div>
            <motion.h2 className="mt-3 text-3xl lg:text-4xl font-black tracking-tight leading-[1.08] mb-4" {...fade(0.07)}>
              ChefDex Solves{' '}
              <span className="text-gradient-gold">Real-World Crypto</span>
            </motion.h2>
            <motion.p className="text-base text-charcoal-500 mb-6" {...fade(0.14)}>
              By embedding crypto payment and on-chain reputation into fine dining — the first self-reinforcing crypto utility loop.
            </motion.p>
            <div className="flex flex-col gap-4">
              {SOLUTION_ITEMS.map((item, i) => (
                <motion.div key={item.label} className="flex items-start gap-3" {...fade(0.14 + i * 0.07)}>
                  <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="font-bold text-charcoal-950 text-sm">{item.label}</div>
                    <div className="text-xs text-charcoal-500 leading-relaxed">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="w-[400px] flex-shrink-0 rounded-2xl bg-charcoal-950 p-7 text-white" {...fade(0.1)}>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400 mb-5">ChefDex Solution Stack</div>
            <div className="space-y-3">
              {['On-chain chef reputation protocol', 'Worldchefs institutional backing', 'Consumer-grade UX — no wallet required', 'Restaurant POS integration'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3 border border-charcoal-800 bg-charcoal-900">
                  <div className="w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                    <Check size={10} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-charcoal-200">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 7: PAYMENT SYSTEM ─────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-950 text-white">
        <div className="flex items-center flex-1 max-w-7xl mx-auto px-14 w-full gap-12">
          <div className="flex-1">
            <motion.div {...fade(0)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-5">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400">Payment System</span>
              </div>
            </motion.div>
            <motion.h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.08] mb-4" {...fade(0.07)}>
              Crypto Payments{' '}
              <span className="text-gradient-gold">at the Table</span>
            </motion.h2>
            <motion.p className="text-base text-charcoal-300 mb-6" {...fade(0.14)}>
              ChefDex POS integrates directly with restaurant systems. Guests pay via QR, Face ID, or Palm Pay — all settling on-chain with no friction.
            </motion.p>
            <div className="flex flex-col gap-3">
              {PAYMENT_METHODS.map((m, i) => (
                <motion.div key={m.method} className="flex items-start gap-4 rounded-xl border border-charcoal-800 bg-charcoal-900 p-5" {...fade(0.14 + i * 0.08)}>
                  <div className="w-8 h-8 rounded-full bg-gold-500/15 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-gold-400">{m.num}</span>
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{m.method}</div>
                    <div className="text-xs text-charcoal-400 leading-relaxed">{m.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="w-[380px] flex-shrink-0 rounded-2xl bg-charcoal-900 border border-charcoal-800 p-7" {...fade(0.1)}>
            <div className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400 mb-5">Accepted Tokens</div>
            <div className="space-y-3">
              {['ChefCoin (CHEF)', 'USDC', 'USDT', 'Ethereum (ETH)'].map((token, i) => (
                <div key={token} className={`flex items-center justify-between rounded-xl px-4 py-3 border ${i === 0 ? 'border-gold-500/40 bg-gold-500/10' : 'border-charcoal-800 bg-charcoal-950'}`}>
                  <span className={`text-sm font-semibold ${i === 0 ? 'text-gold-400' : 'text-charcoal-300'}`}>{token}</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${i === 0 ? 'bg-gold-500/20 text-gold-400' : 'bg-charcoal-800 text-charcoal-500'}`}>
                    {i === 0 ? 'Protocol Native' : 'Accepted'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-5 border-t border-charcoal-800">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-charcoal-400">On-chain Settlement Enabled</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 8: RANKING SYSTEM ─────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-50">
        <div className="flex items-center flex-1 max-w-7xl mx-auto px-14 w-full gap-10">
          <div className="flex-1 flex flex-col gap-4">
            <motion.div {...fade(0)}><SectionLabel>Chef Ranking System</SectionLabel></motion.div>
            <motion.h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              Reputation Becomes{' '}
              <span className="text-gradient-gold">Market Capital</span>
            </motion.h2>
            <div className="flex flex-col gap-2.5">
              {RANKING_FEATURES.map((f, i) => (
                <motion.div key={f} className="flex items-start gap-3 rounded-xl border border-charcoal-100 bg-white p-4" {...fade(i * 0.08)}>
                  <div className="w-6 h-6 rounded-full bg-charcoal-950 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-white">{i + 1}</span>
                  </div>
                  <p className="text-sm text-charcoal-700 leading-relaxed">{f}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div className="w-[440px] flex-shrink-0 rounded-2xl border border-charcoal-100 bg-white overflow-hidden shadow-sm" {...fade(0.1)}>
            <div className="px-5 py-4 border-b border-charcoal-100 flex items-center justify-between">
              <span className="text-sm font-bold text-charcoal-950">Global Chef Index</span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-charcoal-500">Live</span>
              </div>
            </div>
            <div className="divide-y divide-charcoal-50">
              {[
                { rank: 1, name: 'René Redzepi',       mc: '$4.2M', change: '+12.4%' },
                { rank: 2, name: 'Yoshihiro Narisawa', mc: '$3.8M', change: '+8.1%' },
                { rank: 3, name: 'Daniel Humm',        mc: '$3.1M', change: '+5.7%' },
                { rank: 4, name: 'Dominique Crenn',    mc: '$2.7M', change: '+3.2%' },
                { rank: 5, name: 'Mauro Colagreco',    mc: '$2.4M', change: '-1.1%' },
              ].map((row) => (
                <div key={row.rank} className="px-5 py-3.5 flex items-center gap-4">
                  <span className={`text-sm font-black w-5 text-center ${row.rank === 1 ? 'text-gold-600' : 'text-charcoal-400'}`}>{row.rank}</span>
                  <div className="w-7 h-7 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
                    <ChefHat size={13} className="text-charcoal-500" strokeWidth={1.75} />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-charcoal-900 min-w-0">{row.name}</span>
                  <span className="text-sm font-bold text-charcoal-950">{row.mc}</span>
                  <span className={`text-xs font-semibold ${row.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>{row.change}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-charcoal-50 border-t border-charcoal-100">
              <span className="text-xs text-charcoal-500">Market cap in USDC · Updated every block</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 9: COMPARISON ─────────────────────────────────────── */}
      <section className="deck-slide bg-white">
        <div className="flex flex-col justify-center flex-1 max-w-5xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}><SectionLabel>Competitive Landscape</SectionLabel></motion.div>
            <motion.h2 className="mt-2 text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              ChefDex vs <span className="text-gradient-gold">Blackbird</span>
            </motion.h2>
          </div>
          <motion.div className="rounded-2xl border border-charcoal-100 overflow-hidden shadow-sm" {...fade(0.1)}>
            <div className="grid grid-cols-3 bg-charcoal-950 text-white">
              <div className="px-6 py-3.5 text-sm font-semibold text-charcoal-400" />
              <div className="px-6 py-3.5 text-sm font-bold text-center border-l border-charcoal-800">Blackbird</div>
              <div className="px-6 py-3.5 text-sm font-bold text-center border-l border-charcoal-800">
                <span className="text-gradient-gold">ChefDex</span>
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.dim} className={`grid grid-cols-3 border-t border-charcoal-100 ${i % 2 === 0 ? 'bg-white' : 'bg-charcoal-50/50'}`}>
                <div className="px-6 py-3 text-xs font-semibold text-charcoal-500 uppercase tracking-wide flex items-center">{row.dim}</div>
                <div className="px-6 py-3 text-sm text-charcoal-500 border-l border-charcoal-100 flex items-center gap-2">
                  <X size={12} className="text-charcoal-300 flex-shrink-0" />{row.blackbird}
                </div>
                <div className="px-6 py-3 text-sm text-charcoal-900 font-medium border-l border-charcoal-100 flex items-center gap-2">
                  <Check size={12} className="text-gold-500 flex-shrink-0" strokeWidth={2.5} />{row.chefdex}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 10: TEAM ──────────────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-50">
        <div className="flex flex-col justify-center flex-1 max-w-6xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}><SectionLabel>The Team</SectionLabel></motion.div>
            <motion.h2 className="mt-2 text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              Built at the Intersection of{' '}
              <span className="text-gradient-gold">Craft &amp; Capital</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <motion.div key={member.name} className="group relative bg-white rounded-2xl border border-charcoal-100 p-6 hover:border-gold-200 hover:shadow-md transition-all duration-300 overflow-hidden" {...fade(i * 0.1)}>
                <div className="absolute inset-0 bg-gradient-to-br from-gold-50/0 to-gold-50/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                <div className="relative">
                  {'image' in member && member.image
                    ? <PhotoAvatar src={member.image} name={member.name} />
                    : <MonogramAvatar initials={member.initials} variant={member.avatarVariant} />
                  }
                  <h3 className="text-sm font-bold text-charcoal-950">{member.name}</h3>
                  <div className="text-xs font-semibold text-gold-600 mt-0.5 mb-2">{member.title}</div>
                  <p className="text-xs text-charcoal-500 leading-relaxed mb-3">{member.background}</p>
                  <div className="flex flex-wrap gap-1">
                    {member.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center whitespace-nowrap px-2 py-0.5 bg-charcoal-50 text-charcoal-600 text-xs font-semibold rounded-full border border-charcoal-100">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SLIDE 11: ROADMAP ───────────────────────────────────────── */}
      <section className="deck-slide bg-charcoal-950 text-white">
        <div className="flex flex-col justify-center flex-1 max-w-7xl mx-auto px-14 py-10 w-full">
          <div className="text-center mb-7">
            <motion.div {...fade(0)}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gold-500/30 bg-gold-500/10 mb-4">
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400">Roadmap</span>
              </div>
            </motion.div>
            <motion.h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.08]" {...fade(0.07)}>
              Path to <span className="text-gradient-gold">Global Deployment</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-3 gap-5 mb-5">
            {ROADMAP.map((phase, i) => (
              <motion.div key={phase.phase} className="rounded-2xl border border-charcoal-800 bg-charcoal-900 p-6" {...fade(i * 0.12)}>
                <div className="text-xs font-semibold tracking-[0.15em] uppercase text-gold-400 mb-1">{phase.phase}</div>
                <h3 className="text-lg font-black text-white mb-4">{phase.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {phase.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <ArrowRight size={12} className="text-gold-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-charcoal-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div className="flex flex-wrap justify-center gap-2" {...fade(0.3)}>
            {['Tokyo', 'Dubai', 'Hong Kong', 'New York', 'Paris', 'London', 'Singapore', 'Sydney', 'São Paulo', 'Milan'].map((city) => (
              <div key={city} className="px-3 py-1.5 rounded-full border border-charcoal-800 bg-charcoal-900 text-xs text-charcoal-400">{city}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SLIDE 12: CTA ───────────────────────────────────────────── */}
      <section className="deck-slide bg-white">
        <div className="flex flex-col items-center justify-center flex-1 max-w-3xl mx-auto px-12 text-center">
          <motion.div {...fade(0)}>
            <Image src="/logo.jpg" alt="ChefDex" width={52} height={52} className="mx-auto mb-7 object-contain rounded-xl" />
          </motion.div>
          <motion.h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] mb-5" {...fade(0.07)}>
            Ready to Build the<br /><span className="text-gradient-gold">Future of Fine Dining?</span>
          </motion.h2>
          <motion.p className="text-lg text-charcoal-500 mb-9" {...fade(0.14)}>
            We are accepting strategic investors and restaurant partners for the inaugural cohort.
          </motion.p>
          <motion.div className="flex flex-wrap items-center justify-center gap-4" {...fade(0.2)}>
            <a href="mailto:hello@chefdex.io" className="inline-flex items-center gap-2 bg-charcoal-950 text-white font-semibold px-8 py-4 rounded-full hover:bg-charcoal-800 transition-colors duration-200">
              Contact the Team <ArrowRight size={15} />
            </a>
            <a href="/" className="inline-flex items-center gap-2 border border-charcoal-200 text-charcoal-700 font-semibold px-8 py-4 rounded-full hover:border-charcoal-400 transition-colors duration-200">
              View Protocol Site
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
