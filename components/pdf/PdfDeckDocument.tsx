/**
 * PdfDeckDocument — dedicated PDF render tree.
 *
 * Architecture: 12 slide components, each 1200×849 px (landscape A4 ratio).
 * exportPdf.ts renders one slide at a time via PdfSlide{ slideIndex }.
 *
 * Layout rules (strictly enforced):
 *   1. Vertical stack only — no justifyContent:'center' on slide containers
 *   2. No position: absolute/fixed
 *   3. No CSS transforms
 *   4. No Framer Motion
 *   5. No 8-digit hex colors → use rgba() for transparency
 *   6. No calc() in inline styles → pre-computed px values
 *   7. No text-overflow/overflow:hidden on text nodes
 *   8. All styles inline — no Tailwind dependency
 *   9. overflow:'hidden' only on the outer slide wrapper
 *
 * Typography scale (mobile-readable):
 *   H1       = 88px  / lh 1.1
 *   H2       = 52px  / lh 1.15
 *   H3       = 18px  / lh 1.3
 *   body     = 16px  / lh 1.7
 *   small    = 14px  / lh 1.5
 *   overline = 13px  / lh 1.4
 *   caption  = 13px  / lh 1.4
 *
 * Spacing system (fixed, no auto margins):
 *   SP_SECTION = 80px  — top/bottom section padding
 *   SP_TITLE   = 28px  — title → body gap
 *   SP_BODY    = 20px  — body-text margin-bottom
 *   SP_BUTTON  = 40px  — body → button gap
 *   SP_FOOTER  = 56px  — button → footer gap
 */

import React from 'react';

/* ─── slide dimensions ──────────────────────────────────── */
const SW = 1200;   // slide width  (px)
const SH = 849;    // slide height (landscape A4: 1200 / (297/210) ≈ 849)
const PH = 64;     // horizontal padding (each side)

/* ─── fixed spacing constants ────────────────────────────── */
const SP_SECTION = 80;   // section top/bottom padding
const SP_TITLE   = 28;   // title margin-bottom
const SP_BODY    = 20;   // body-text margin-bottom
const SP_BUTTON  = 40;   // margin above button
const SP_FOOTER  = 56;   // margin above footer

/* ─── content width & pre-computed column widths ────────── */
const CW = SW - PH * 2;   // 1072px

// 2-col symmetric (gap 32)
const C2 = 520;   // (1072 - 32) / 2

// 3-col symmetric (gap 20 each)
const C3 = 344;   // floor((1072 - 40) / 3)

// Asymmetric pairs — left + 32 gap + right = 1072
const C_L_WC  = 632;   // Worldchefs text col
const C_R_WC  = 408;   // Worldchefs stats col
const C_L_SOL = 548;   // Solution / Payment left
const C_R_SOL = 492;   // Solution / Payment right
const C_L_RNK = 480;   // Ranking features col
const C_R_RNK = 560;   // Ranking table col

// Worldchefs inner 2×2 stats grid (gap 16)
const C_STAT = 196;   // (408 - 16) / 2

/* ─── color tokens — NO 8-digit hex ─────────────────────── */
const GOLD   = '#C8A45D';
const GOLD10 = 'rgba(200,164,93,0.10)';
const GOLD15 = 'rgba(200,164,93,0.15)';
const GOLD25 = 'rgba(200,164,93,0.25)';
const GOLD40 = 'rgba(200,164,93,0.40)';
const BLACK  = '#111111';
const DARK   = '#1a1a1a';
const DARK2  = '#222222';
const DARK3  = '#333333';
const MID    = '#666666';
const LIGHT  = '#999999';
const OFF    = '#f5f5f5';
const WHITE  = '#ffffff';
const BORDER = '#e5e5e5';
const RED    = '#f87171';
const RED10  = 'rgba(239,68,68,0.10)';
const RED20  = 'rgba(239,68,68,0.20)';
const GREEN  = '#22c55e';
const FONT   = "'Inter', system-ui, -apple-system, sans-serif";

/* ─── style helpers ──────────────────────────────────────── */

/**
 * Slide wrapper — always top-aligned vertical stack.
 * Override paddingTop per slide when needed (Hero, CTA use more top space).
 */
const slideBase = (bg: string, fg: string = BLACK): React.CSSProperties => ({
  width: SW,
  height: SH,
  overflow: 'hidden',
  background: bg,
  color: fg,
  fontFamily: FONT,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  paddingTop: SP_SECTION,
  paddingBottom: SP_SECTION,
  paddingLeft: PH,
  paddingRight: PH,
});

const overline = (color = GOLD): React.CSSProperties => ({
  display: 'block',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color,
  marginBottom: 14,
  lineHeight: 1.4,
});

const H1 = (color = WHITE): React.CSSProperties => ({
  fontSize: 88,
  fontWeight: 900,
  lineHeight: 1.1,
  margin: 0,
  marginBottom: SP_TITLE,
  letterSpacing: '-0.025em',
  color,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'visible',
});

const H2 = (color = BLACK): React.CSSProperties => ({
  fontSize: 52,
  fontWeight: 800,
  lineHeight: 1.15,
  margin: 0,
  marginBottom: SP_TITLE,
  letterSpacing: '-0.015em',
  color,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'visible',
});

const H3 = (color = BLACK): React.CSSProperties => ({
  fontSize: 18,
  fontWeight: 700,
  lineHeight: 1.3,
  margin: 0,
  marginBottom: 6,
  color,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
});

const body = (color = MID): React.CSSProperties => ({
  fontSize: 16,
  lineHeight: 1.7,
  color,
  margin: 0,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
  overflow: 'visible',
});

const small = (color = LIGHT): React.CSSProperties => ({
  fontSize: 14,
  color,
  lineHeight: 1.5,
  wordBreak: 'break-word',
  whiteSpace: 'normal',
});

const tag = (): React.CSSProperties => ({
  display: 'inline-block',
  padding: '5px 12px',
  borderRadius: 999,
  border: `1px solid ${BORDER}`,
  background: OFF,
  fontSize: 13,
  fontWeight: 600,
  color: MID,
  marginRight: 6,
  marginTop: 5,
  lineHeight: 1.4,
  whiteSpace: 'nowrap',
});

const iconBox = (): React.CSSProperties => ({
  width: 44,
  height: 44,
  borderRadius: 10,
  background: GOLD10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  fontSize: 18,
  color: GOLD,
  fontWeight: 900,
  lineHeight: 1,
  marginBottom: 10,
});

const card = (bg = WHITE, bdColor = BORDER): React.CSSProperties => ({
  background: bg,
  border: `1px solid ${bdColor}`,
  borderRadius: 12,
  padding: 26,
  boxSizing: 'border-box',
  overflow: 'visible',
});

/* ─── section header block ───────────────────────────────── */
function SectionHeader({
  label, title, goldPart, color = BLACK, mb = 24,
}: {
  label: string;
  title: string;
  goldPart?: string;
  color?: string;
  mb?: number;
}) {
  return (
    <div style={{ marginBottom: mb, width: CW }}>
      <span style={overline()}>{label}</span>
      <h2 style={{ ...H2(color), marginBottom: 0 }}>
        {title}{goldPart && <> <span style={{ color: GOLD }}>{goldPart}</span></>}
      </h2>
    </div>
  );
}

/* ─── data ───────────────────────────────────────────────── */
const FEATURES = [
  { icon: '★', label: 'Chef of the Year',     desc: "Market-cap-driven annual ranking of the world's top professional chefs, verified on-chain." },
  { icon: '↗', label: 'Chef Index',           desc: 'Real-time performance index tracking chef token liquidity and global reputation score.' },
  { icon: '⚡', label: 'Crypto Payment',       desc: 'USDC, USDT, ETH, and ChefCoin accepted natively at every partner restaurant.' },
  { icon: '◎', label: 'VIP Booking',          desc: 'Token-gated reservation system giving ChefCoin holders priority access to exclusive dining.' },
  { icon: '✦', label: 'Decentralized Rating', desc: 'Open, tamper-proof culinary credentialing infrastructure replacing closed guild systems.' },
];

const WC_STATS = [
  { value: '1928', label: 'Founded' },
  { value: '110+', label: 'National Associations' },
  { value: '10M+', label: 'Culinary Professionals' },
  { value: '50K+', label: 'Premium Restaurants' },
];

const RESTAURANTS = [
  { name: 'Noma',                city: 'Copenhagen',    chef: 'René Redzepi',       stars: 3 },
  { name: 'Eleven Madison Park', city: 'New York',      chef: 'Daniel Humm',        stars: 3 },
  { name: 'The Fat Duck',        city: 'Bray',          chef: 'Heston Blumenthal',  stars: 3 },
  { name: 'Mirazur',             city: 'Menton',        chef: 'Mauro Colagreco',    stars: 3 },
  { name: 'Geranium',            city: 'Copenhagen',    chef: 'Rasmus Kofoed',      stars: 3 },
  { name: 'Ultraviolet',         city: 'Shanghai',      chef: 'Paul Pairet',        stars: 3 },
  { name: 'Narisawa',            city: 'Tokyo',         chef: 'Yoshihiro Narisawa', stars: 2 },
  { name: 'Atelier Crenn',       city: 'San Francisco', chef: 'Dominique Crenn',    stars: 3 },
  { name: 'Central',             city: 'Lima',          chef: 'Virgilio Martínez',  stars: 2 },
];

const PROBLEM_STATS = [
  { value: '<2%',  label: 'Global crypto usage in retail payments' },
  { value: '<12%', label: 'Merchant acceptance rate worldwide' },
  { value: '$0',   label: 'On-chain culinary reputation infrastructure' },
];

const QUOTES = [
  { quote: 'The challenge of mainstream crypto adoption is not technical — it is about creating genuine utility that people can see and touch in daily life.', author: 'Vitalik Buterin', title: 'Ethereum Co-Founder' },
  { quote: 'Mass adoption happens when people use crypto without thinking about crypto. The infrastructure must be invisible and the experience must be familiar.', author: 'CZ', title: 'Binance Founder' },
];

const SOLUTION_ITEMS = [
  { label: 'ChefCoin Payment System',            desc: 'Protocol-native token enabling seamless on-chain settlement at the point of service.' },
  { label: 'Worldchefs-Endorsed Infrastructure', desc: 'The only Web3 platform built with institutional backing of a century-old culinary authority.' },
  { label: 'QR / Face ID / Palm Pay',            desc: 'Familiar UX primitives built on decentralized rails — no wallet knowledge required.' },
  { label: 'VIP Booking Protocol',               desc: 'Token-gated reservation access creating genuine utility demand for ChefCoin holders.' },
];

const PAYMENT_METHODS = [
  { num: '1', method: 'QR Code Scan', desc: 'One-scan checkout at the table — no app download required.' },
  { num: '2', method: 'Face ID Pay',  desc: 'Biometric authentication for returning guests at partner venues.' },
  { num: '3', method: 'Palm Pay',     desc: 'Hardware-integrated palm recognition for frictionless settlement.' },
];

const RANKING_TABLE = [
  { rank: 1, name: 'René Redzepi',       mc: '$4.2M', change: '+12.4%', up: true  },
  { rank: 2, name: 'Yoshihiro Narisawa', mc: '$3.8M', change: '+8.1%',  up: true  },
  { rank: 3, name: 'Daniel Humm',        mc: '$3.1M', change: '+5.7%',  up: true  },
  { rank: 4, name: 'Dominique Crenn',    mc: '$2.7M', change: '+3.2%',  up: true  },
  { rank: 5, name: 'Mauro Colagreco',    mc: '$2.4M', change: '-1.1%',  up: false },
];

const RANKING_FEATURES = [
  'Chef of the Year determined by market capitalization — the market votes with capital',
  'Real-time chef token ranking updated continuously on-chain',
  'Liquid chef tokens tradeable on decentralized exchanges globally',
  'Global ranking infrastructure replacing closed, opaque guild systems',
];

const COMPARISON = [
  { dim: 'Primary Focus',         b: 'Restaurants & loyalty programs', c: 'Individual chefs & reputation' },
  { dim: 'Ranking Model',         b: 'Static loyalty points',          c: 'Real-time market cap ranking'  },
  { dim: 'Network Scope',         b: 'Local / regional markets',       c: 'Global infrastructure'          },
  { dim: 'Asset Type',            b: 'Closed loyalty credits',         c: 'Liquid, tradeable chef tokens'  },
  { dim: 'Institutional Backing', b: 'VC-funded startup',              c: 'Worldchefs (110+ nations)'      },
  { dim: 'Settlement Layer',      b: 'Off-chain points system',        c: 'On-chain protocol'              },
];

const TEAM = [
  { initials: 'CZ', image: '/pics/clinton.jpg', name: 'Clinton Zhu', title: 'Founder',           avatarBg: GOLD, tags: ['Chef', 'Protocol Design', 'Crypto Products'],     desc: 'Senior chef and crypto product builder. Clinton brings a rare combination of professional kitchen expertise and on-chain protocol experience.' },
  { initials: 'AL', image: '/pics/alex.jpg',    name: 'Alex Li',     title: 'Chef Partner',       avatarBg: DARK, tags: ['Fine Dining', 'Culinary Operations', 'Chef Network'], desc: 'Experienced professional chef mentored by Clinton Zhu. Alex drives culinary credibility and chef-side adoption.' },
  { initials: 'TL',                             name: 'Tina Liu',    title: 'Head of Operations', avatarBg: GOLD, tags: ['Private Equity', 'Operations', 'Partnerships'],     desc: 'Private equity investing background. Tina leads operations, execution, and strategic partnerships with institutional-grade discipline.' },
];

const ROADMAP = [
  { phase: 'Phase 1', title: 'Pilot Launch',     items: ['10 pilot cities globally', 'Tokyo, Dubai, Hong Kong initial markets', 'Chef token minting infrastructure live'] },
  { phase: 'Phase 2', title: 'POS Rollout',      items: ['Restaurant POS system integration', 'QR / Face ID / Palm Pay deployment', 'ChefCoin payment acceptance live'] },
  { phase: 'Phase 3', title: 'Global Expansion', items: ['50+ cities across 6 continents', 'Chef of the Year first global ceremony', 'DEX listing for all chef tokens'] },
];

const CITIES = ['Tokyo', 'Dubai', 'Hong Kong', 'New York', 'Paris', 'London', 'Singapore', 'Sydney', 'São Paulo', 'Milan'];

/* ═══════════════════════════════════════════════════════════
   SLIDE COMPONENTS
   Each slide is 1200×849px, top-aligned vertical stack.
   ═══════════════════════════════════════════════════════════ */

/* ── Slide 1: Hero ─────────────────────────────────────────── */
function Slide1() {
  return (
    <div style={{ ...slideBase(DARK, WHITE), paddingTop: 148 }}>
      <div style={{
        fontSize: 13, fontWeight: 700, letterSpacing: '0.18em',
        textTransform: 'uppercase', color: GOLD,
        marginBottom: 22, lineHeight: 1.4,
        width: CW, textAlign: 'center',
      }}>
        Investor Deck · 2026
      </div>

      <h1 style={{
        fontSize: 88, fontWeight: 900, lineHeight: 1.1,
        letterSpacing: '-0.025em', color: WHITE,
        margin: 0, marginBottom: SP_TITLE,
        width: CW, textAlign: 'center',
        wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'visible',
      }}>
        ChefDex Protocol
      </h1>

      <p style={{
        fontSize: 22, color: LIGHT, lineHeight: 1.65,
        margin: 0, marginBottom: 36,
        width: CW, textAlign: 'center',
        wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'visible',
      }}>
        On-chain Global Ranking System for Chefs
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 14, width: CW }}>
        {[
          { label: 'Worldchefs Endorsed',      gold: false },
          { label: 'On-chain · Institutional', gold: false },
          { label: 'Chef of the Year 2026',    gold: true  },
        ].map(({ label, gold }) => (
          <span key={label} style={{
            padding: '9px 22px', borderRadius: 999,
            border: `1px solid ${gold ? GOLD40 : DARK3}`,
            background: gold ? GOLD15 : 'transparent',
            color: gold ? GOLD : LIGHT,
            fontSize: 14, fontWeight: 500, lineHeight: 1.4, whiteSpace: 'nowrap',
          }}>{label}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 2: What is ChefDex ───────────────────────────── */
function Slide2() {
  const left  = FEATURES.slice(0, 3);
  const right = FEATURES.slice(3);
  return (
    <div style={{ ...slideBase(WHITE, BLACK), paddingTop: 56 }}>
      <SectionHeader
        label="What is ChefDex"
        title="Decentralized Rating Infrastructure for"
        goldPart="Fine Dining"
        mb={20}
      />
      <div style={{ display: 'flex', gap: 24, width: CW }}>
        <div style={{ width: C2, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {left.map((f) => (
            <div key={f.label} style={{ ...card(), display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={iconBox()}>{f.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={H3()}>{f.label}</div>
                <p style={body()}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ width: C2, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {right.map((f) => (
            <div key={f.label} style={{ ...card(), display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={iconBox()}>{f.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={H3()}>{f.label}</div>
                <p style={body()}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 3: Worldchefs Alliance ───────────────────────── */
function Slide3() {
  return (
    <div style={slideBase(DARK, WHITE)}>
      <div style={{ display: 'flex', gap: 32, width: CW, alignItems: 'flex-start' }}>
        <div style={{ width: C_L_WC, flexShrink: 0 }}>
          <span style={{
            display: 'inline-block', padding: '7px 18px', borderRadius: 999,
            border: `1px solid ${DARK3}`, background: GOLD15, color: GOLD,
            fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', lineHeight: 1.4, marginBottom: 22,
            whiteSpace: 'nowrap',
          }}>Strategic Alliance</span>
          <h2 style={{ ...H2(WHITE), marginBottom: SP_TITLE }}>
            Worldchefs <span style={{ color: GOLD }}>Global Authority</span>
          </h2>
          <p style={{ ...body(LIGHT), marginBottom: SP_BODY + 8, maxWidth: 560 }}>
            Founded in 1928, Worldchefs is the world&apos;s premier culinary authority — representing every national chef association on earth. ChefDex is their endorsed digital paradigm in Web3.
          </p>
          <div style={{ borderLeft: `3px solid ${GOLD}`, paddingLeft: 20 }}>
            <p style={{ ...body(LIGHT), fontStyle: 'italic', marginBottom: 10 }}>
              &ldquo;The digital paradigm in Web3 — backed by a century of culinary institution-building.&rdquo;
            </p>
            <span style={{ fontSize: 14, color: GOLD, fontWeight: 600, lineHeight: 1.4 }}>
              Worldchefs · World Association of Chefs Societies
            </span>
          </div>
        </div>
        <div style={{ width: C_R_WC, flexShrink: 0, display: 'flex', flexWrap: 'wrap', gap: 16 }}>
          {WC_STATS.map((s) => (
            <div key={s.label} style={{
              width: C_STAT, flexShrink: 0,
              background: DARK2, border: `1px solid ${DARK3}`,
              borderRadius: 12, padding: '28px 16px',
              textAlign: 'center', boxSizing: 'border-box',
            }}>
              <div style={{ fontSize: 38, fontWeight: 900, color: GOLD, marginBottom: 8, lineHeight: 1.15 }}>{s.value}</div>
              <div style={small(LIGHT)}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Slide 4: Restaurant Network ────────────────────────── */
function Slide4() {
  return (
    <div style={{ ...slideBase(WHITE, BLACK), paddingTop: 56 }}>
      <SectionHeader
        label="Restaurant Network"
        title="First-Batch Partner Restaurants"
        goldPart="Joining the Protocol"
        mb={20}
      />
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, width: CW }}>
        {RESTAURANTS.map((r) => (
          <div key={r.name} style={{
            width: C3, flexShrink: 0,
            ...card(),
            display: 'flex', alignItems: 'flex-start', gap: 14,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', background: GOLD10,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0, fontSize: 16, color: GOLD, lineHeight: 1,
            }}>★</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 3, lineHeight: 1.3, wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'visible', color: BLACK }}>{r.name}</div>
              <div style={small(MID)}>{r.chef}</div>
              <div style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                <span style={small(LIGHT)}>{r.city}</span>
                <span style={{ ...small(GOLD), fontWeight: 700 }}>{'★'.repeat(r.stars)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 5: Problem ───────────────────────────────────── */
function Slide5() {
  return (
    <div style={{ ...slideBase(DARK, WHITE), paddingTop: 64 }}>
      <span style={{
        display: 'inline-block', padding: '7px 18px', borderRadius: 999,
        border: `1px solid ${RED20}`, background: RED10, color: RED,
        fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', lineHeight: 1.4, marginBottom: 20, whiteSpace: 'nowrap',
      }}>The Problem</span>
      <h2 style={{ ...H2(WHITE), marginBottom: SP_TITLE }}>
        Mass Adoption <span style={{ color: RED }}>Remains Unsolved</span>
      </h2>
      <div style={{ display: 'flex', gap: 20, width: CW, marginBottom: SP_BODY }}>
        {PROBLEM_STATS.map((s) => (
          <div key={s.label} style={{
            width: C3, flexShrink: 0,
            background: DARK2, border: `1px solid ${DARK3}`,
            borderRadius: 12, padding: '24px 20px',
            textAlign: 'center', boxSizing: 'border-box',
          }}>
            <div style={{ fontSize: 48, fontWeight: 900, color: RED, marginBottom: 10, lineHeight: 1.1 }}>{s.value}</div>
            <div style={small(LIGHT)}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 20, width: CW }}>
        {QUOTES.map((q) => (
          <div key={q.author} style={{
            width: C2, flexShrink: 0,
            background: DARK2, border: `1px solid ${DARK3}`,
            borderRadius: 12, padding: 26, boxSizing: 'border-box',
          }}>
            <p style={{ ...body(LIGHT), fontStyle: 'italic', marginBottom: 18 }}>&ldquo;{q.quote}&rdquo;</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: DARK3, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: LIGHT }}>{q.author[0]}</span>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: WHITE, lineHeight: 1.3 }}>{q.author}</div>
                <div style={small(LIGHT)}>{q.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 6: Solution ──────────────────────────────────── */
function Slide6() {
  return (
    <div style={slideBase(WHITE, BLACK)}>
      <div style={{ display: 'flex', gap: 32, width: CW, alignItems: 'flex-start' }}>
        <div style={{ width: C_L_SOL, flexShrink: 0 }}>
          <span style={overline()}>The Solution</span>
          <h2 style={H2()}>
            ChefDex Solves <span style={{ color: GOLD }}>Real-World Crypto</span>
          </h2>
          <p style={{ ...body(), marginBottom: SP_BODY + 8 }}>
            By embedding crypto payment and on-chain reputation into fine dining — the first self-reinforcing crypto utility loop.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {SOLUTION_ITEMS.map((item) => (
              <div key={item.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2, color: WHITE, fontSize: 13, fontWeight: 700, lineHeight: 1 }}>✓</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: BLACK, marginBottom: 4, lineHeight: 1.3 }}>{item.label}</div>
                  <p style={body()}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: C_R_SOL, flexShrink: 0, background: DARK, borderRadius: 16, padding: 32, boxSizing: 'border-box' }}>
          <div style={{ ...overline(), marginBottom: 22 }}>ChefDex Solution Stack</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['On-chain chef reputation protocol', 'Worldchefs institutional backing', 'Consumer-grade UX — no wallet required', 'Restaurant POS integration'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px', borderRadius: 10, border: `1px solid ${DARK3}`, background: DARK2, boxSizing: 'border-box' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: WHITE, fontSize: 12, fontWeight: 700, lineHeight: 1 }}>✓</div>
                <span style={{ fontSize: 15, color: LIGHT, lineHeight: 1.5, wordBreak: 'break-word' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 7: Payment System ────────────────────────────── */
function Slide7() {
  return (
    <div style={slideBase(DARK, WHITE)}>
      <div style={{ display: 'flex', gap: 32, width: CW, alignItems: 'flex-start' }}>
        <div style={{ width: C_L_SOL, flexShrink: 0 }}>
          <span style={{
            display: 'inline-block', padding: '7px 18px', borderRadius: 999,
            border: `1px solid ${DARK3}`, background: GOLD15, color: GOLD,
            fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', lineHeight: 1.4, marginBottom: 20, whiteSpace: 'nowrap',
          }}>Payment System</span>
          <h2 style={{ ...H2(WHITE), marginBottom: SP_TITLE }}>
            Crypto Payments <span style={{ color: GOLD }}>at the Table</span>
          </h2>
          <p style={{ ...body(LIGHT), marginBottom: SP_BODY + 8 }}>
            ChefDex POS integrates directly with restaurant systems. Guests pay via QR, Face ID, or Palm Pay — all settling on-chain with no friction.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {PAYMENT_METHODS.map((m) => (
              <div key={m.method} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', padding: '16px 18px', borderRadius: 10, border: `1px solid ${DARK3}`, background: DARK2, boxSizing: 'border-box' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: GOLD15, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 14, fontWeight: 900, color: GOLD, lineHeight: 1 }}>{m.num}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: WHITE, marginBottom: 4, lineHeight: 1.3 }}>{m.method}</div>
                  <p style={small(LIGHT)}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: C_R_SOL, flexShrink: 0, background: DARK2, border: `1px solid ${DARK3}`, borderRadius: 16, padding: 32, boxSizing: 'border-box' }}>
          <div style={{ ...overline(), marginBottom: 22 }}>Accepted Tokens</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {['ChefCoin (CHEF)', 'USDC', 'USDT', 'Ethereum (ETH)'].map((token, i) => (
              <div key={token} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '16px 18px', borderRadius: 10,
                border: `1px solid ${i === 0 ? GOLD40 : DARK3}`,
                background: i === 0 ? GOLD10 : DARK,
                boxSizing: 'border-box',
              }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: i === 0 ? GOLD : LIGHT }}>{token}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: i === 0 ? GOLD : MID, padding: '4px 12px', borderRadius: 999, background: i === 0 ? GOLD25 : DARK3, whiteSpace: 'nowrap' }}>
                  {i === 0 ? 'Protocol Native' : 'Accepted'}
                </span>
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${DARK3}`, paddingTop: 18, marginTop: 18, display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: GREEN, flexShrink: 0 }} />
            <span style={small(LIGHT)}>On-chain Settlement Enabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 8: Chef Ranking ──────────────────────────────── */
function Slide8() {
  return (
    <div style={{ ...slideBase(OFF, BLACK), paddingTop: 60 }}>
      <div style={{ display: 'flex', gap: 32, width: CW, alignItems: 'flex-start' }}>
        <div style={{ width: C_L_RNK, flexShrink: 0 }}>
          <span style={overline()}>Chef Ranking System</span>
          <h2 style={{ ...H2(), marginBottom: SP_TITLE }}>
            Reputation Becomes <span style={{ color: GOLD }}>Market Capital</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {RANKING_FEATURES.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 10, padding: '14px 18px', boxSizing: 'border-box' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: BLACK, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: WHITE, fontSize: 13, fontWeight: 700, lineHeight: 1 }}>{i + 1}</div>
                <p style={{ ...body(), fontSize: 14 }}>{f}</p>
              </div>
            ))}
          </div>
        </div>
        <div style={{ width: C_R_RNK, flexShrink: 0, background: WHITE, border: `1px solid ${BORDER}`, borderRadius: 12, overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${BORDER}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Global Chef Index</span>
            <span style={{ fontSize: 13, color: GREEN, fontWeight: 600 }}>● Live</span>
          </div>
          {RANKING_TABLE.map((row) => (
            <div key={row.rank} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 20px', borderBottom: `1px solid ${BORDER}` }}>
              <span style={{ width: 20, textAlign: 'center', fontSize: 15, fontWeight: 900, color: row.rank === 1 ? GOLD : MID, flexShrink: 0 }}>{row.rank}</span>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: OFF, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 15 }}>🍳</div>
              <span style={{ flex: 1, fontSize: 14, fontWeight: 600, minWidth: 0, wordBreak: 'break-word' }}>{row.name}</span>
              <span style={{ fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{row.mc}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: row.up ? '#16a34a' : '#dc2626', flexShrink: 0 }}>{row.change}</span>
            </div>
          ))}
          <div style={{ padding: '11px 20px', background: OFF, borderTop: `1px solid ${BORDER}` }}>
            <span style={small()}>Market cap in USDC · Updated every block</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Slide 9: Comparison ────────────────────────────────── */
function Slide9() {
  return (
    <div style={slideBase(WHITE, BLACK)}>
      <SectionHeader label="Competitive Landscape" title="ChefDex vs" goldPart="Blackbird" mb={24} />
      <table style={{ width: CW, borderCollapse: 'collapse', fontSize: 15, tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '25%' }} />
          <col style={{ width: '37.5%' }} />
          <col style={{ width: '37.5%' }} />
        </colgroup>
        <thead>
          <tr style={{ background: BLACK, color: WHITE }}>
            <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 600, color: LIGHT }}>Dimension</th>
            <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 700, borderLeft: `1px solid ${DARK3}` }}>Blackbird</th>
            <th style={{ padding: '14px 20px', textAlign: 'left', fontWeight: 700, color: GOLD, borderLeft: `1px solid ${DARK3}` }}>ChefDex</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row, i) => (
            <tr key={row.dim} style={{ background: i % 2 === 0 ? WHITE : OFF }}>
              <td style={{ padding: '13px 20px', fontSize: 13, fontWeight: 700, color: MID, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: `1px solid ${BORDER}`, wordBreak: 'break-word' }}>{row.dim}</td>
              <td style={{ padding: '13px 20px', color: MID, borderLeft: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, wordBreak: 'break-word' }}>✕ {row.b}</td>
              <td style={{ padding: '13px 20px', fontWeight: 500, borderLeft: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, wordBreak: 'break-word' }}>✓ {row.c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── Slide 10: Team ─────────────────────────────────────── */
function Slide10() {
  return (
    <div style={slideBase(OFF, BLACK)}>
      <SectionHeader label="The Team" title="Built at the Intersection of" goldPart="Craft & Capital" mb={24} />
      <div style={{ display: 'flex', gap: 20, width: CW }}>
        {TEAM.map((member) => (
          <div key={member.name} style={{
            width: C3, flexShrink: 0, background: WHITE,
            border: `1px solid ${BORDER}`, borderRadius: 14,
            padding: 28, boxSizing: 'border-box',
          }}>
            {'image' in member && member.image
              ? (
                <div style={{ width: 56, height: 56, borderRadius: 14, marginBottom: 16, overflow: 'hidden' }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={member.image} alt={member.name} width={56} height={56} style={{ width: 56, height: 56, objectFit: 'cover', display: 'block' }} />
                </div>
              ) : (
                <div style={{
                  width: 56, height: 56, borderRadius: 14,
                  background: member.avatarBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16, color: WHITE, fontSize: 20, fontWeight: 900,
                  letterSpacing: '-0.02em', lineHeight: 1,
                }}>{member.initials}</div>
              )
            }
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4, lineHeight: 1.25, wordBreak: 'break-word' }}>{member.name}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: GOLD, marginBottom: 12, lineHeight: 1.3 }}>{member.title}</div>
            <p style={{ ...body(), fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{member.desc}</p>
            <div>
              {member.tags.map((t) => <span key={t} style={tag()}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 11: Roadmap ──────────────────────────────────── */
function Slide11() {
  return (
    <div style={{ ...slideBase(DARK, WHITE), paddingTop: 64 }}>
      <span style={{
        display: 'inline-block', padding: '7px 18px', borderRadius: 999,
        border: `1px solid ${DARK3}`, background: GOLD15, color: GOLD,
        fontSize: 13, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', lineHeight: 1.4, marginBottom: 20, whiteSpace: 'nowrap',
      }}>Roadmap</span>
      <h2 style={{ ...H2(WHITE), marginBottom: SP_TITLE }}>
        Path to <span style={{ color: GOLD }}>Global Deployment</span>
      </h2>
      <div style={{ display: 'flex', gap: 20, width: CW, marginBottom: 20 }}>
        {ROADMAP.map((phase) => (
          <div key={phase.phase} style={{
            width: C3, flexShrink: 0, background: DARK2,
            border: `1px solid ${DARK3}`, borderRadius: 12,
            padding: 26, boxSizing: 'border-box',
          }}>
            <div style={{ ...overline(), marginBottom: 4 }}>{phase.phase}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: WHITE, marginBottom: 16, lineHeight: 1.25 }}>{phase.title}</div>
            {phase.items.map((item) => (
              <div key={item} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                <span style={{ color: GOLD, flexShrink: 0, fontSize: 14, lineHeight: 1.65 }}>→</span>
                <span style={{ ...body(LIGHT), fontSize: 14 }}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, width: CW }}>
        {CITIES.map((city) => (
          <span key={city} style={{
            padding: '7px 16px', borderRadius: 999,
            border: `1px solid ${DARK3}`, background: DARK2,
            fontSize: 13, color: LIGHT, lineHeight: 1.4, whiteSpace: 'nowrap',
          }}>{city}</span>
        ))}
      </div>
    </div>
  );
}

/* ── Slide 12: CTA ──────────────────────────────────────── */
function Slide12() {
  return (
    <div style={{ ...slideBase(WHITE, BLACK), paddingTop: 148 }}>
      <h2 style={{
        fontSize: 52, fontWeight: 900, lineHeight: 1.15,
        letterSpacing: '-0.015em', color: BLACK,
        margin: 0, marginBottom: SP_TITLE,
        width: CW, textAlign: 'center',
        wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'visible',
      }}>
        Ready to Build the{' '}
        <span style={{ color: GOLD }}>Future of Fine Dining?</span>
      </h2>

      <p style={{
        fontSize: 18, lineHeight: 1.7, color: MID,
        margin: 0, marginBottom: SP_BUTTON,
        width: CW, textAlign: 'center',
        wordBreak: 'break-word', whiteSpace: 'normal', overflow: 'visible',
      }}>
        We are accepting strategic investors and restaurant partners for the inaugural cohort.
      </p>

      <div style={{ width: CW, textAlign: 'center', marginTop: SP_BUTTON }}>
        <span style={{
          display: 'inline-block',
          padding: '18px 48px', borderRadius: 999,
          background: BLACK, color: WHITE,
          fontSize: 17, fontWeight: 600, lineHeight: 1.4,
          whiteSpace: 'nowrap',
        }}>
          hello@chefdex.io
        </span>
      </div>

      <div style={{ width: CW, textAlign: 'center', marginTop: SP_FOOTER }}>
        <span style={{ fontSize: 14, color: LIGHT, lineHeight: 1.4 }}>chefdex.io · ChefDex Protocol · 2026</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   REGISTRY & EXPORTS
   ═══════════════════════════════════════════════════════════ */

const SLIDES = [
  Slide1, Slide2, Slide3, Slide4,
  Slide5, Slide6, Slide7, Slide8,
  Slide9, Slide10, Slide11, Slide12,
];

export const SLIDE_COUNT = SLIDES.length;

/** Named export: renders one slide by index. Used by exportPdf.ts. */
export function PdfSlide({ slideIndex }: { slideIndex: number }) {
  const SlideComp = SLIDES[Math.min(slideIndex, SLIDES.length - 1)];
  return <SlideComp />;
}

/** Default export: all slides stacked (preview / reference). */
export default function PdfDeckDocument() {
  return (
    <div style={{ width: SW, background: WHITE }}>
      {SLIDES.map((SlideComp, i) => <SlideComp key={i} />)}
    </div>
  );
}
