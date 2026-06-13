import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ChefDex — On-chain Global Ranking System for Chefs',
  description:
    'ChefDex is the on-chain global ranking system for professional chefs. Chefs issue ChefCoins, build market-driven reputation, and power crypto payments across fine dining.',
  keywords: [
    'ChefDex',
    'ChefCoin',
    'chef ranking',
    'crypto dining',
    'Web3 restaurant',
    'USDC payments',
    'fine dining crypto',
    'chef protocol',
    'culinary blockchain',
  ],
  authors: [{ name: 'ChefDex' }],
  creator: 'ChefDex',
  publisher: 'ChefDex',
  metadataBase: new URL('https://chefdex.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chefdex.io',
    title: 'ChefDex — On-chain Global Ranking System for Chefs',
    description:
      'The on-chain global ranking system for chefs. Market-driven reputation, ChefCoin issuance, and crypto payments for fine dining.',
    siteName: 'ChefDex',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChefDex — On-chain Global Ranking System for Chefs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChefDex — On-chain Global Ranking System for Chefs',
    description:
      'The on-chain global ranking system for chefs. Market-driven reputation, ChefCoin issuance, and crypto payments for fine dining.',
    images: ['/og-image.png'],
    creator: '@chefdex',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
