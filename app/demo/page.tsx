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
type Phase    = 'idle' | 'flow1' | 'flow2' | 'flow3' | 'complete';
type RunPhase = 'flow1' | 'flow2' | 'flow3';

/* ── Flow configuration ───────────────────────────────────────── */
const FLOWS: Record<RunPhase, {
  index:     number;
  label:     string;
  title:     string;
  finalMsg:  string;
  /** ms delay before auto-advancing to next step. 0 = pause for user. */
  delays:    number[];
  narrative: string[];
}> = {
  flow1: {
    index:    0,
    label:    '01',
    title:    'Global Chef Ranking',
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

/* ── Progress indicator ───────────────────────────────────────── */
function FlowProgress({ phase }: { phase: Phase }) {
  const flows: RunPhase[] = ['flow1', 'flow2', 'flow3'];
  const ci = phase === 'flow1' ? 0 : phase === 'flow2' ? 1 : phase === 'flow3' ? 2 : phase === 'complete' ? 3 : -1;

  return (
    <div className="flex items-center gap-2">
      {flows.map((f, i) => (
        <div key={f} className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300"
            style={{
              background:  ci >= i ? GOLD : SURF,
              color:       ci >= i ? '#111' : '#9ca3af',
              border:      ci === i ? `2px solid ${GOLD}` : '2px solid transparent',
              boxShadow:   ci === i ? `0 0 0 3px ${GOLD_TINT}` : 'none',
            }}
          >
            {ci > i ? '✓' : i + 1}
          </div>
          {i < 2 && (
            <div
              className="h-px w-10 rounded-full transition-all duration-500"
              style={{ background: ci > i ? GOLD : BORDER }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   FLOW 1 — Global Chef Ranking panel
   ════════════════════════════════════════════════════════════ */
function Flow1Panel({ step }: { step: number }) {
  const [chefs, setChefs] = useState(CHEFS);

  /* Live market-cap ticker at final step */
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

        {/* Step 0 — connecting */}
        {step === 0 && (
          <motion.div key="s0" variants={slideUp} initial="hidden" animate="visible" exit="exit"
            className="h-[420px] flex flex-col items-center justify-center gap-4"
          >
            <Spinner />
            <span className="text-sm text-neutral-400">Connecting to ChefDex Protocol…</span>
          </motion.div>
        )}

        {/* Step 1 — minting tokens */}
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

        {/* Steps 2-3 — leaderboard */}
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

      {/* Membership card with flip */}
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

      {/* Calendar — appears at step 2 */}
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
  /* 9×9 binary matrix — approximates a QR corner-marker layout */
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

        {/* Step 0 — loading */}
        {step === 0 && (
          <motion.div key="s0" variants={slideUp} initial="hidden" animate="visible" exit="exit"
            className="h-[420px] flex flex-col items-center justify-center gap-4"
          >
            <Spinner />
            <span className="text-sm text-neutral-400">Loading restaurant POS…</span>
          </motion.div>
        )}

        {/* Steps 1+ — terminal */}
        {step >= 1 && (
          <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
            {/* Header */}
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

            {/* Bill */}
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

            {/* Token selector */}
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

            {/* QR / confirmed */}
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
   IDLE SECTION
   ════════════════════════════════════════════════════════════ */
function IdleSection({ onStart }: { onStart: () => void }) {
  return (
    <motion.section
      key="idle"
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-8 md:px-14 text-center"
      style={{ paddingTop: 120, paddingBottom: 80 }}
    >
      {/* Subtle gold radial */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(200,164,93,0.08) 0%, transparent 65%)' }}
      />

      <div className="relative max-w-3xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <div className="h-px w-8" style={{ background: GOLD }} />
          <span className="text-xs font-bold tracking-[0.22em] uppercase" style={{ color: GOLD }}>
            Interactive Product Demo · 2026
          </span>
          <div className="h-px w-8" style={{ background: GOLD }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="font-black leading-[1.0] tracking-tight mb-6"
          style={{ fontSize: 'clamp(52px, 8vw, 96px)', color: BLACK, letterSpacing: '-0.035em' }}
        >
          Experience<br />
          <span style={{ color: GOLD }}>ChefDex.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.26 }}
          className="text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
          style={{ color: GRAY }}
        >
          Three product modules. One on-chain protocol. Click start to see how ChefDex connects chef reputation, token-gated dining, and real-world crypto payments.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="flex flex-col items-center gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            className="flex items-center gap-3 px-10 py-5 rounded-full font-bold text-base"
            style={{
              background: GOLD,
              color: '#111',
              boxShadow: `0 8px 36px rgba(200,164,93,0.35)`,
            }}
          >
            <span className="text-lg leading-none">▶</span>
            Start Demo
          </motion.button>

          {/* Module labels */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { num: '01', title: 'Global Chef Ranking'  },
              { num: '02', title: 'Membership & VIP'     },
              { num: '03', title: 'Crypto Payment System'},
            ].map(m => (
              <div
                key={m.num}
                className="flex items-center gap-2 px-4 py-2 rounded-full border"
                style={{ borderColor: BORDER, background: SURF }}
              >
                <span className="text-[10px] font-black" style={{ color: GOLD }}>{m.num}</span>
                <span className="text-xs font-semibold text-neutral-500">{m.title}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════
   DEMO RUNNER
   ════════════════════════════════════════════════════════════ */
function DemoRunner({
  phase, step, onContinue,
}: {
  phase: RunPhase; step: number; onContinue: () => void;
}) {
  const meta     = FLOWS[phase];
  const isFinal  = meta.delays[step] === 0;
  const isLast   = phase === 'flow3';

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

        {/* Top bar */}
        <div className="flex items-center justify-between mb-12">
          <FlowProgress phase={phase} />
          <div className="hidden md:flex items-center gap-2">
            <span className="text-xs font-black tracking-[0.2em] uppercase" style={{ color: GOLD }}>{meta.label}</span>
            <div className="h-px w-6" style={{ background: GOLD_BORDER }} />
            <span className="text-xs font-semibold text-neutral-400">{meta.title}</span>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* ── Left: narrative ── */}
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

            {/* Step narrative — fades between steps */}
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

            {/* Final step: confirmation badge + continue button */}
            <AnimatePresence>
              {isFinal && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <div
                    className="flex items-center gap-3 rounded-xl px-5 py-4 border mb-6"
                    style={{ background: GOLD_TINT, borderColor: GOLD_BORDER }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold"
                      style={{ background: GOLD, color: '#111' }}
                    >
                      ✓
                    </div>
                    <span className="text-sm font-semibold" style={{ color: BLACK }}>{meta.finalMsg}</span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onContinue}
                    className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm"
                    style={{
                      background: GOLD,
                      color: '#111',
                      boxShadow: `0 4px 20px rgba(200,164,93,0.30)`,
                    }}
                  >
                    {isLast ? 'See Summary' : 'Next Module'}
                    <span>→</span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Right: animated panel (persists between steps, content updates internally) ── */}
          <div>
            {phase === 'flow1' && <Flow1Panel step={step} />}
            {phase === 'flow2' && <Flow2Panel step={step} />}
            {phase === 'flow3' && <Flow3Panel step={step} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMPLETE SECTION
   ════════════════════════════════════════════════════════════ */
function CompleteSection({ onRestart }: { onRestart: () => void }) {
  const RESULTS = [
    { label: 'Global On-chain Chef Ranking System Active', sub: 'ChefCoin Launchpad · Live rankings updated every block' },
    { label: 'Token-gated dining access enabled',          sub: 'VIP Membership · Kitchening P0 priority system' },
    { label: 'On-chain settlement completed in 2.1s',      sub: 'Crypto Payment · QR · Face ID · Palm Pay' },
  ];

  return (
    <motion.section
      key="complete"
      variants={pageFade}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center px-8 md:px-14 text-center"
      style={{ paddingTop: 112, paddingBottom: 80 }}
    >
      <div className="max-w-2xl w-full">
        {/* Check mark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mx-auto mb-8"
          style={{ background: GOLD, color: '#111', boxShadow: `0 8px 32px rgba(200,164,93,0.30)` }}
        >
          ✓
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-black tracking-tight mb-4"
          style={{ fontSize: 'clamp(36px, 5vw, 56px)', color: BLACK, letterSpacing: '-0.025em' }}
        >
          Demo Complete.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="text-lg leading-relaxed mb-10"
          style={{ color: GRAY }}
        >
          You just experienced all three ChefDex modules — the full on-chain ecosystem for professional chefs and fine dining.
        </motion.p>

        {/* Result cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-3 mb-10 text-left"
        >
          {RESULTS.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + i * 0.1 }}
              className="flex items-start gap-4 rounded-xl px-5 py-4 border"
              style={{ background: GOLD_TINT, borderColor: GOLD_BORDER }}
            >
              <div
                className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5"
                style={{ background: GOLD, color: '#111' }}
              >
                ✓
              </div>
              <div>
                <div className="text-sm font-semibold mb-0.5" style={{ color: BLACK }}>{r.label}</div>
                <div className="text-xs" style={{ color: GRAY }}>{r.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:hello@chefdex.io"
            className="px-8 py-4 rounded-full font-bold text-sm transition-all hover:opacity-88"
            style={{ background: GOLD, color: '#111', boxShadow: `0 4px 20px rgba(200,164,93,0.28)` }}
          >
            Contact Us → hello@chefdex.io
          </a>
          <a
            href="/deck"
            className="px-8 py-4 rounded-full font-bold text-sm border transition-all hover:bg-neutral-50"
            style={{ borderColor: BORDER, color: GRAY }}
          >
            View Investor Deck
          </a>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onRestart}
          className="mt-6 text-xs underline text-neutral-400 hover:text-neutral-600 transition-colors"
        >
          Restart demo
        </motion.button>
      </div>
    </motion.section>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE — state machine controller
   ════════════════════════════════════════════════════════════ */
export default function DemoPage() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [step,  setStep]  = useState(0);

  /* Auto-advance through steps with configured delays */
  useEffect(() => {
    if (phase === 'idle' || phase === 'complete') return;
    const delays = FLOWS[phase as RunPhase].delays;
    const delay  = delays[step];
    if (!delay) return; // 0 = pause, wait for user to click Continue
    const t = setTimeout(() => setStep(s => s + 1), delay);
    return () => clearTimeout(t);
  }, [phase, step]);

  const startDemo = () => { setPhase('flow1'); setStep(0); };

  const continueDemo = () => {
    if (phase === 'flow1') { setPhase('flow2'); setStep(0); }
    else if (phase === 'flow2') { setPhase('flow3'); setStep(0); }
    else if (phase === 'flow3') { setPhase('complete'); setStep(0); }
  };

  const restartDemo = () => { setPhase('idle'); setStep(0); };

  return (
    <main className="bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <IdleSection key="idle" onStart={startDemo} />
        )}
        {(phase === 'flow1' || phase === 'flow2' || phase === 'flow3') && (
          <DemoRunner key="runner" phase={phase as RunPhase} step={step} onContinue={continueDemo} />
        )}
        {phase === 'complete' && (
          <CompleteSection key="complete" onRestart={restartDemo} />
        )}
      </AnimatePresence>
    </main>
  );
}
