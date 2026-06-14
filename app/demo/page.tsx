'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Design tokens ────────────────────────────────────────────── */
const GOLD        = '#C8A45D';
const GOLD_TINT   = 'rgba(200,164,93,0.08)';
const GOLD_MID    = 'rgba(200,164,93,0.18)';
const GOLD_BORDER = 'rgba(200,164,93,0.30)';
const BLACK       = '#111111';
const GRAY        = '#6b7280';
const SURF        = '#f8f9fa';
const BORDER      = 'rgba(0,0,0,0.07)';
const SHADOW      = '0 1px 3px rgba(0,0,0,0.05), 0 8px 32px rgba(0,0,0,0.06)';

/* ── Auto-play timing ─────────────────────────────────────────── */
const FLOW_DURATION = 10_000; // ms each flow stays on screen
const IDLE_RESUME   = 15_000; // ms of idle before auto-play resumes

/* ── Static data ──────────────────────────────────────────────── */
const CHEFS = [
  { id: 1, initials: 'RR', name: 'René Redzepi',       restaurant: 'Noma',           mc: 4.21 },
  { id: 2, initials: 'YN', name: 'Yoshihiro Narisawa', restaurant: 'Narisawa',       mc: 3.87 },
  { id: 3, initials: 'DH', name: 'Daniel Humm',        restaurant: 'Eleven Madison', mc: 3.14 },
  { id: 4, initials: 'DC', name: 'Dominique Crenn',    restaurant: 'Atelier Crenn',  mc: 2.76 },
  { id: 5, initials: 'MC', name: 'Mauro Colagreco',    restaurant: 'Mirazur',        mc: 2.43 },
];

const BILL = [
  { name: 'Omakase Tasting Menu × 2', price: 760 },
  { name: 'Sake Pairing × 2',          price: 190 },
  { name: 'Truffle Supplement',         price:  65 },
  { name: 'Service (12%)',              price: 122 },
];
const BILL_TOTAL = BILL.reduce((s, i) => s + i.price, 0);

const VIP_SLOTS = [
  { time: '7:00 PM', vip: false },
  { time: '7:30 PM', vip: true  },
  { time: '8:00 PM', vip: false },
  { time: '8:30 PM', vip: true  },
];

/* ── State machine types ──────────────────────────────────────── */
type Phase    = 'idle' | 'flow1' | 'flow2' | 'flow3';
type RunPhase = 'flow1' | 'flow2' | 'flow3';

const FLOW_ORDER: RunPhase[] = ['flow1', 'flow2', 'flow3'];

/* ── Flow configuration ───────────────────────────────────────── */
const FLOWS: Record<RunPhase, {
  index:     number;
  label:     string;
  title:     string;
  tabLabel:  string;
  finalMsg:  string;
  delays:    number[];
  narrative: string[];
}> = {
  flow1: {
    index:    0,
    label:    '01',
    title:    'Global Chef Ranking',
    tabLabel: '01  Global Chef Ranking',
    finalMsg: 'Global On-chain Chef Ranking System Active',
    delays:   [1200, 1900, 2100, 0],
    narrative: [
      'Connecting to ChefDex Protocol…',
      'Minting ChefCoin tokens for 5 professional chefs',
      'Populating the global chef leaderboard',
      'Global On-chain Chef Ranking System is now live',
    ],
  },
  flow2: {
    index:    1,
    label:    '02',
    title:    'Membership & VIP Access',
    tabLabel: '02  Membership & VIP',
    finalMsg: 'Token-gated dining access enabled',
    delays:   [1000, 1400, 1200, 1900, 0],
    narrative: [
      'Verifying ChefCoin wallet balance…',
      'Balance confirmed — activating VIP membership card',
      'Platinum VIP membership unlocked',
      'Kitchening P0 priority request initiated',
      'VIP reservation confirmed at Narisawa, Tokyo',
    ],
  },
  flow3: {
    index:    2,
    label:    '03',
    title:    'Crypto Payment System',
    tabLabel: '03  Crypto Payment System',
    finalMsg: 'On-chain settlement completed in 2.1s',
    delays:   [1000, 1600, 1200, 2300, 0],
    narrative: [
      'Loading restaurant point-of-sale system…',
      'Bill generated — Omakase dining at Narisawa',
      'ChefCoin selected as settlement method',
      'Processing QR payment — biometric authentication',
      'On-chain settlement completed in 2.1 seconds',
    ],
  },
};

/* ── Animation variants ───────────────────────────────────────── */
const pageFade = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
  exit:    { opacity: 0, transition: { duration: 0.3  } },
};

const slideUp = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.28 } },
};

const flowSlide = {
  hidden:  { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0,  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const } },
  exit:    { opacity: 0, x: -28, transition: { duration: 0.26 } },
};

/* ── Shared primitives ────────────────────────────────────────── */
function Card({ children, className = '', style = {} }: {
  children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-2xl bg-white border overflow-hidden ${className}`}
      style={{ borderColor: BORDER, boxShadow: SHADOW, ...style }}
    >
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
      className="w-7 h-7 rounded-full border-2 border-neutral-200"
      style={{ borderTopColor: GOLD }}
    />
  );
}

/* ════════════════════════════════════════════════════════════
   TAB BAR with auto-play progress bar
   ════════════════════════════════════════════════════════════ */
function DemoTabs({
  phase,
  isAutoPlaying,
  onSelectTab,
}: {
  phase: RunPhase;
  isAutoPlaying: boolean;
  onSelectTab: (f: RunPhase) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-10 md:mb-12">
      {FLOW_ORDER.map((flow) => {
        const active = phase === flow;
        return (
          <button
            key={flow}
            onClick={() => onSelectTab(flow)}
            className="relative px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 overflow-hidden select-none"
            style={{
              background:  active ? BLACK : SURF,
              color:       active ? '#fff' : GRAY,
              border:      active ? '1.5px solid transparent' : `1.5px solid ${BORDER}`,
              boxShadow:   active ? '0 2px 8px rgba(0,0,0,0.10)' : 'none',
            }}
          >
            {FLOWS[flow].tabLabel}

            {/* Auto-play progress bar — bottom of active tab */}
            {active && isAutoPlaying && (
              <motion.div
                key={`${flow}-${isAutoPlaying}`}
                className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
                style={{ background: GOLD }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: FLOW_DURATION / 1000, ease: 'linear' }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FLOW 1 — Global Chef Ranking panel
   ════════════════════════════════════════════════════════════ */
function Flow1Panel({ step }: { step: number }) {
  const [chefs, setChefs] = useState(CHEFS);

  useEffect(() => {
    if (step < 3) return;
    const id = setInterval(() => {
      setChefs(prev =>
        prev.map(c => ({ ...c, mc: Math.max(0.3, +(c.mc + (Math.random() - 0.46) * 0.07).toFixed(2)) }))
      );
    }, 2000);
    return () => clearInterval(id);
  }, [step]);

  return (
    <Card style={{ minHeight: 420 }}>
      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.div key="s0" variants={slideUp} initial="hidden" animate="visible" exit="exit"
            className="h-[420px] flex flex-col items-center justify-center gap-4"
          >
            <Spinner />
            <span className="text-sm text-neutral-400">Connecting to ChefDex Protocol…</span>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" variants={slideUp} initial="hidden" animate="visible" exit="exit"
            className="h-[420px] p-8 flex flex-col"
          >
            <div className="text-[10px] font-black tracking-[0.22em] uppercase mb-6" style={{ color: GOLD }}>
              ChefCoin Minting
            </div>
            <div className="flex flex-wrap gap-5 justify-center items-center flex-1">
              {CHEFS.map((chef, i) => (
                <motion.div
                  key={chef.id}
                  initial={{ scale: 0, y: 28, opacity: 0 }}
                  animate={{ scale: 1, y: 0,  opacity: 1 }}
                  transition={{ delay: i * 0.2, duration: 0.5, type: 'spring', stiffness: 260, damping: 18 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-sm font-black"
                    style={{ background: GOLD_MID, color: GOLD, border: `2px solid ${GOLD_BORDER}` }}
                  >
                    {chef.initials}
                  </div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.2 + 0.35 }}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: GOLD_TINT, color: GOLD }}
                  >
                    MINTED
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step >= 2 && (
          <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col" style={{ minHeight: 420 }}>
            <div
              className="flex items-center justify-between px-5 py-3.5 border-b"
              style={{ borderColor: BORDER, background: SURF }}
            >
              <div>
                <div className="text-sm font-bold" style={{ color: BLACK }}>Global Chef Index</div>
                <div className="text-xs text-neutral-400">Market cap · USDC</div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse block" />
                <span className="text-xs font-semibold text-green-600">Live</span>
              </div>
            </div>

            <div
              className="grid px-5 py-2 text-[10px] font-bold tracking-widest uppercase text-neutral-400 border-b"
              style={{ gridTemplateColumns: '20px 1fr auto', borderColor: BORDER }}
            >
              <span>#</span><span>Chef</span><span>Mkt Cap</span>
            </div>

            {chefs.map((chef, i) => (
              <motion.div
                key={chef.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.09, duration: 0.3 }}
                className="grid items-center px-5 py-3 border-b last:border-0 hover:bg-neutral-50 transition-colors"
                style={{ gridTemplateColumns: '20px 1fr auto', borderColor: BORDER }}
              >
                <span className="text-xs font-bold" style={{ color: i === 0 ? GOLD : '#d1d5db' }}>{i + 1}</span>
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center text-[10px] font-black"
                    style={{ background: i === 0 ? GOLD_MID : 'rgba(0,0,0,0.04)', color: i === 0 ? GOLD : '#9ca3af' }}
                  >
                    {chef.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: BLACK }}>{chef.name}</div>
                    <div className="text-[10px] text-neutral-400 truncate">{chef.restaurant}</div>
                  </div>
                </div>
                <motion.span
                  key={`${chef.id}-${chef.mc}`}
                  initial={{ color: '#16a34a' }}
                  animate={{ color: BLACK }}
                  transition={{ duration: 1.5 }}
                  className="text-xs font-bold font-mono tabular-nums"
                >
                  ${chef.mc.toFixed(2)}M
                </motion.span>
              </motion.div>
            ))}

            <div className="px-5 py-3 border-t" style={{ borderColor: BORDER, background: SURF }}>
              <span className="text-[10px] text-neutral-400">Updated every block · ChefDex Protocol</span>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════
   FLOW 2 — Membership & VIP panel
   ════════════════════════════════════════════════════════════ */
function Flow2Panel({ step }: { step: number }) {
  return (
    <div className="flex flex-col gap-4" style={{ minHeight: 420 }}>

      <div style={{ perspective: 900 }}>
        <motion.div
          animate={{ rotateY: step >= 1 ? 180 : 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d', position: 'relative', height: 162 }}
        >
          {/* Front — locked */}
          <div
            className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 border bg-[#f3f4f6]"
            style={{ backfaceVisibility: 'hidden', borderColor: BORDER }}
          >
            <div className="text-4xl opacity-25">🔒</div>
            <span className="text-xs font-bold tracking-widest uppercase text-neutral-400">ChefCoin Required</span>
          </div>

          {/* Back — VIP card */}
          <div
            className="absolute inset-0 rounded-2xl border overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              background: 'linear-gradient(135deg, #fffbf0 0%, #f5e6c8 50%, #ede0c0 100%)',
              borderColor: GOLD_BORDER,
              boxShadow: `0 4px 24px rgba(200,164,93,0.20)`,
            }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 25% 25%, rgba(200,164,93,0.22) 0%, transparent 55%)' }}
            />
            <div className="relative h-full p-6 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[9px] font-bold tracking-[0.22em] uppercase mb-1" style={{ color: 'rgba(200,164,93,0.50)' }}>ChefDex Protocol</div>
                  <div className="text-sm font-black" style={{ color: BLACK }}>VIP MEMBERSHIP</div>
                </div>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base font-black" style={{ background: GOLD, color: '#111' }}>⬡</div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(200,164,93,0.50)' }}>Tier</div>
                  <div className="text-sm font-black" style={{ color: GOLD }}>PLATINUM VIP</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-widest mb-1" style={{ color: 'rgba(200,164,93,0.50)' }}>Balance</div>
                  <div className="text-sm font-bold" style={{ color: BLACK }}>2,500 CHEF</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {step >= 2 && (
          <motion.div key="cal" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card>
              <div
                className="px-5 py-3.5 border-b flex items-center justify-between"
                style={{ borderColor: BORDER, background: SURF }}
              >
                <div>
                  <div className="text-sm font-bold" style={{ color: BLACK }}>Narisawa · Tokyo</div>
                  <div className="text-xs text-neutral-400">21 June 2026 · Party of 2</div>
                </div>
                <AnimatePresence>
                  {step >= 3 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[10px] font-black px-2.5 py-1 rounded-full"
                      style={{ background: 'rgba(239,68,68,0.10)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.22)' }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0.35, 1] }}
                        transition={{ repeat: Infinity, duration: 0.85 }}
                        className="inline-block"
                      >
                        P0 URGENT
                      </motion.span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <div className="p-3.5 grid grid-cols-2 gap-2">
                {VIP_SLOTS.map((slot, i) => {
                  const booked = step >= 4 && slot.time === '7:30 PM';
                  return (
                    <motion.div
                      key={slot.time}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-xl py-3 px-3.5 border"
                      style={{
                        background:  booked ? GOLD      : slot.vip ? GOLD_TINT  : SURF,
                        borderColor: booked ? GOLD      : slot.vip ? GOLD_BORDER : BORDER,
                        color:       booked ? '#111'    : slot.vip ? GOLD       : '#d1d5db',
                      }}
                    >
                      <div className="text-xs font-bold">{slot.time}</div>
                      <div className="text-[10px] mt-0.5 opacity-70">
                        {booked ? '✓ Reserved' : slot.vip ? 'VIP Available' : 'Fully Booked'}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <AnimatePresence>
                {step >= 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-3.5 mb-3.5 rounded-xl py-3 px-4 border text-center"
                    style={{ background: 'rgba(22,163,74,0.07)', borderColor: 'rgba(22,163,74,0.20)' }}
                  >
                    <div className="text-xs font-bold text-green-600">Reservation Confirmed</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">Narisawa · 7:30 PM · 21 June 2026</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FLOW 3 — Crypto Payment panel
   ════════════════════════════════════════════════════════════ */
const PAY_TOKENS = [
  { id: 'chef', label: 'ChefCoin', accent: GOLD,      bg: GOLD_TINT                 },
  { id: 'usdc', label: 'USDC',     accent: '#2775ca', bg: 'rgba(39,117,202,0.07)'   },
  { id: 'eth',  label: 'ETH',      accent: '#627eea', bg: 'rgba(98,126,234,0.07)'   },
];

function QRCode({ scanning }: { scanning: boolean }) {
  const M = [
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1],
    [0,0,0,1,0,1,0,0,0],
    [1,0,1,1,0,0,0,1,0],
    [0,1,0,0,1,0,1,0,1],
    [1,1,1,0,0,1,0,1,0],
    [0,0,1,1,0,0,1,1,0],
    [1,1,0,0,1,1,0,0,1],
  ];
  return (
    <div
      className="relative w-28 h-28 mx-auto rounded-xl overflow-hidden"
      style={{ border: '3px solid #111', background: '#fff', padding: 7 }}
    >
      <div className="grid h-full gap-0.5" style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
        {M.flat().map((cell, i) => (
          <div key={i} className="rounded-[1px]" style={{ background: cell ? '#111' : 'transparent' }} />
        ))}
      </div>
      {scanning && (
        <motion.div
          className="absolute inset-x-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${GOLD} 25%, ${GOLD} 75%, transparent)` }}
          initial={{ top: '5%' }}
          animate={{ top: ['5%', '92%', '5%'] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
        />
      )}
    </div>
  );
}

function Flow3Panel({ step }: { step: number }) {
  return (
    <Card style={{ minHeight: 420 }}>
      <AnimatePresence mode="wait">

        {step === 0 && (
          <motion.div key="s0" variants={slideUp} initial="hidden" animate="visible" exit="exit"
            className="h-[420px] flex flex-col items-center justify-center gap-4"
          >
            <Spinner />
            <span className="text-sm text-neutral-400">Loading restaurant POS…</span>
          </motion.div>
        )}

        {step >= 1 && (
          <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            <div className="px-5 py-3.5 border-b flex items-center justify-between"
              style={{ borderColor: BORDER, background: SURF }}>
              <div>
                <div className="text-sm font-bold" style={{ color: BLACK }}>Narisawa · Tokyo</div>
                <div className="text-xs text-neutral-400">Table 7 · 21 Jun 2026</div>
              </div>
              <div className="text-xs font-semibold px-3 py-1.5 rounded-full border"
                style={{ color: GRAY, borderColor: BORDER, background: '#fff' }}>
                Party of 2
              </div>
            </div>

            <div className="px-5 pt-4 pb-3">
              <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-3">Bill Summary</div>
              <div className="flex flex-col gap-2 mb-3">
                {BILL.map((item, i) => (
                  <motion.div key={item.name}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center justify-between"
                  >
                    <span className="text-xs" style={{ color: GRAY }}>{item.name}</span>
                    <span className="text-xs font-semibold tabular-nums" style={{ color: BLACK }}>${item.price}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor: BORDER }}>
                <span className="text-sm font-bold" style={{ color: BLACK }}>Total</span>
                <span className="text-lg font-black tabular-nums" style={{ color: BLACK }}>${BILL_TOTAL}</span>
              </div>
            </div>

            <div className="px-5 pb-3">
              <div className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2">Pay with</div>
              <div className="flex gap-2">
                {PAY_TOKENS.map(t => {
                  const active = step >= 2 && t.id === 'chef';
                  return (
                    <div key={t.id}
                      className="flex-1 py-2.5 rounded-xl text-[11px] font-bold text-center border transition-all duration-400"
                      style={{
                        background:  active ? t.bg    : '#fff',
                        borderColor: active ? t.accent : BORDER,
                        color:       active ? t.accent : '#d1d5db',
                      }}
                    >
                      {t.label}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-5 pb-5 flex flex-col items-center justify-center flex-1">
              <AnimatePresence mode="wait">
                {step === 3 && (
                  <motion.div key="qr" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-3"
                  >
                    <div className="text-xs text-neutral-400">Scan to pay with ChefCoin</div>
                    <QRCode scanning />
                  </motion.div>
                )}
                {step >= 4 && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    className="flex flex-col items-center gap-2 py-2"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{ background: 'rgba(22,163,74,0.12)' }}
                    >
                      ✓
                    </motion.div>
                    <div className="text-sm font-bold text-green-600">Payment Confirmed</div>
                    <div className="text-xs text-neutral-400">Settled on-chain in 2.1s · ChefCoin</div>
                  </motion.div>
                )}
                {step < 3 && (
                  <motion.div key="btn"
                    className="w-full py-3.5 rounded-xl text-sm font-bold text-center transition-all duration-400"
                    style={{
                      background: step >= 2 ? GOLD : SURF,
                      color:      step >= 2 ? '#111' : '#d1d5db',
                      boxShadow:  step >= 2 ? `0 4px 20px rgba(200,164,93,0.25)` : 'none',
                    }}
                  >
                    Pay Now
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </Card>
  );
}

/* ════════════════════════════════════════════════════════════
   IDLE SECTION — minimal hero
   ════════════════════════════════════════════════════════════ */
function IdleSection({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      key="idle"
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
      style={{ paddingTop: 120, paddingBottom: 80 }}
    >
      <div className="relative max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="font-black leading-[1.0] tracking-tight mb-12"
          style={{ fontSize: 'clamp(56px, 9vw, 104px)', color: BLACK, letterSpacing: '-0.04em' }}
        >
          ChefDex<br />
          <span style={{ color: GOLD }}>Demo</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base"
            style={{
              background: GOLD,
              color: '#111',
              boxShadow: `0 8px 36px rgba(200,164,93,0.35)`,
            }}
          >
            <span className="text-lg leading-none">▶</span>
            Start Demo
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════
   DEMO RUNNER — tabs + auto-play carousel
   ════════════════════════════════════════════════════════════ */
function DemoRunner({
  phase,
  step,
  isAutoPlaying,
  onSelectTab,
  onRestart,
}: {
  phase: RunPhase;
  step: number;
  isAutoPlaying: boolean;
  onSelectTab: (f: RunPhase) => void;
  onRestart: () => void;
}) {
  const meta = FLOWS[phase];

  return (
    <motion.div
      key="runner"
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen px-8 md:px-14"
      style={{ paddingTop: 112, paddingBottom: 64 }}
    >
      <div className="max-w-7xl mx-auto">

        {/* Tab bar */}
        <DemoTabs phase={phase} isAutoPlaying={isAutoPlaying} onSelectTab={onSelectTab} />

        {/* Flow content — transitions on phase change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={phase}
            variants={flowSlide}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left: narrative */}
              <div>
                <div className="text-xs font-black tracking-[0.25em] uppercase mb-4" style={{ color: GOLD }}>
                  {meta.label}
                </div>
                <h2
                  className="font-black leading-[1.08] tracking-tight mb-8"
                  style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: BLACK, letterSpacing: '-0.02em' }}
                >
                  {meta.title}
                </h2>

                {/* Narrative — fades between steps */}
                <div className="mb-8" style={{ minHeight: 60 }}>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={`${phase}-${step}`}
                      variants={slideUp}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="text-lg leading-relaxed"
                      style={{ color: GRAY }}
                    >
                      {meta.narrative[step]}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Step progress dots */}
                <div className="flex gap-2 mb-10">
                  {meta.delays.map((_, i) => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-500"
                      style={{
                        width:      i <= step ? 24 : 8,
                        background: i <= step ? GOLD : 'rgba(0,0,0,0.12)',
                      }}
                    />
                  ))}
                </div>

                {/* Final state badge */}
                <AnimatePresence>
                  {meta.delays[step] === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="flex items-center gap-3 rounded-xl px-5 py-4 border"
                      style={{ background: GOLD_TINT, borderColor: GOLD_BORDER }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                        style={{ background: GOLD, color: '#111' }}
                      >
                        ✓
                      </div>
                      <span className="text-sm font-semibold" style={{ color: BLACK }}>{meta.finalMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Right: animated panel */}
              <div>
                {phase === 'flow1' && <Flow1Panel step={step} />}
                {phase === 'flow2' && <Flow2Panel step={step} />}
                {phase === 'flow3' && <Flow3Panel step={step} />}
              </div>
            </div>

            {/* Restart */}
            <div className="mt-14 text-center">
              <button
                onClick={onRestart}
                className="text-xs underline text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                Restart demo
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE — state machine + auto-play controller
   ════════════════════════════════════════════════════════════ */
export default function DemoPage() {
  const [phase, setPhase]               = useState<Phase>('flow1');
  const [step,  setStep]                = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [lastInteraction, setLastInteraction] = useState(0);

  /* Auto-advance steps within the active flow */
  useEffect(() => {
    const delays = FLOWS[phase as RunPhase].delays;
    const delay  = delays[step];
    if (!delay) return; // final step — wait for auto-play timer
    const t = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [phase, step]);

  /* Auto-play: cycle to next flow every FLOW_DURATION ms */
  useEffect(() => {
    if (!isAutoPlaying) return;
    const t = setTimeout(() => {
      const idx  = FLOW_ORDER.indexOf(phase as RunPhase);
      const next = FLOW_ORDER[(idx + 1) % FLOW_ORDER.length];
      setPhase(next);
      setStep(0);
    }, FLOW_DURATION);
    return () => clearTimeout(t);
  }, [phase, isAutoPlaying]);

  /* Resume auto-play IDLE_RESUME ms after the last manual interaction */
  useEffect(() => {
    if (isAutoPlaying || lastInteraction === 0) return;
    const t = setTimeout(() => setIsAutoPlaying(true), IDLE_RESUME);
    return () => clearTimeout(t);
  }, [lastInteraction, isAutoPlaying]);

  const selectTab = (flow: RunPhase) => {
    setPhase(flow);
    setStep(0);
    setIsAutoPlaying(false);
    setLastInteraction(Date.now());
  };

  const restartDemo = () => {
    setPhase('idle');
    setStep(0);
    setIsAutoPlaying(true);
  };

  return (
    <main className="bg-white overflow-hidden">
      <DemoRunner
        phase={phase as RunPhase}
        step={step}
        isAutoPlaying={isAutoPlaying}
        onSelectTab={selectTab}
        onRestart={restartDemo}
      />
    </main>
  );
}
