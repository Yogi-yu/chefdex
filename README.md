# ChefDex — Official Marketing Website

Production-ready marketing website for the ChefDex Web3 + fine dining protocol.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Render

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
chefdex/
├── app/
│   ├── layout.tsx          # Root layout, SEO metadata
│   ├── page.tsx            # Home page (all sections composed here)
│   ├── globals.css         # Global styles, CSS custom properties
│   ├── terms/page.tsx      # Terms of Service
│   └── privacy/page.tsx    # Privacy Policy
├── components/
│   ├── layout/
│   │   ├── Header.tsx      # Fixed nav with scroll detection
│   │   └── Footer.tsx      # Multi-column footer
│   ├── sections/
│   │   ├── Hero.tsx        # Hero with animated ranking widget
│   │   ├── ChefCoin.tsx    # ChefCoin system + live ranking panel
│   │   ├── CryptoDining.tsx # Payment section with mock checkout
│   │   ├── HowItWorks.tsx  # 4-step protocol flow
│   │   ├── Ecosystem.tsx   # Network effects section
│   │   ├── Worldchefs.tsx  # Institutional endorsement
│   │   └── Team.tsx        # Team cards
│   └── ui/
│       ├── Button.tsx      # Animated button component
│       ├── Badge.tsx       # Label badge component
│       └── SectionLabel.tsx # Section heading label
├── lib/
│   └── utils.ts            # cn() utility
├── render.yaml             # Render deployment config
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

## Deploy to Render

### Option 1 — render.yaml (Infrastructure as Code)

1. Push this repo to GitHub
2. Go to [render.com](https://render.com) → New → Blueprint
3. Connect the repo — Render auto-reads `render.yaml`
4. Deploy

### Option 2 — Manual Web Service

1. Push to GitHub
2. Render → New → Web Service → Connect repo
3. Configure:
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Port:** `3000`
4. Add env var: `NODE_ENV=production`
5. Deploy

### Environment Variables

| Variable | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `NEXT_PUBLIC_SITE_URL` | `https://chefdex.io` |

## Design System

| Token | Value |
|---|---|
| Gold accent | `#C8A45D` |
| Charcoal dark | `#1a1a1a` |
| Background | `#ffffff` |
| Font | Inter |

## SEO

- Full OpenGraph + Twitter Card metadata in `app/layout.tsx`
- Per-page metadata on Terms and Privacy
- `robots` directives configured
- Place a 1200×630 `og-image.png` in `/public` for social sharing
