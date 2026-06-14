'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'ChefCoin', href: '#chefcoin' },
  { label: 'Payments', href: '#payments' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Team', href: '#team' },
  { label: 'Deck', href: '/deck' },
  { label: 'Demo', href: '/demo' },
  { label: 'Video', href: '/video' },
];

/**
 * Pages where the content at scroll-position 0 is dark-colored,
 * so the navbar should start transparent with white text.
 * All other pages get the white/glass navbar immediately.
 */
const DARK_HERO_PAGES = ['/deck'];

export default function Header() {
  const pathname  = usePathname();
  const [atTop, setAtTop]         = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setAtTop(window.scrollY < 50));
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* heroMode = transparent navbar with white text.
     Only active on dark-hero pages AND only while at the very top. */
  const heroMode = DARK_HERO_PAGES.includes(pathname) && atTop;

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        heroMode
          ? 'bg-transparent border-b border-transparent shadow-none'
          : 'bg-white/92 backdrop-blur-md border-b border-black/5 shadow-sm'
      )}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-8 md:px-14">
        <div className="flex items-center justify-between h-20 md:h-24">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <motion.span
              className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 block"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Image
                src="/logo.jpg"
                alt="ChefDex"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </motion.span>
            <span className={cn(
              'font-semibold text-2xl md:text-3xl tracking-tight transition-colors duration-300',
              heroMode ? 'text-white' : 'text-charcoal-900'
            )}>
              ChefDex
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'text-base xl:text-lg font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none',
                    heroMode
                      ? 'text-white/80 hover:text-white hover:bg-white/10'
                      : active
                      ? 'text-charcoal-900 bg-neutral-100'
                      : 'text-charcoal-500 hover:text-charcoal-900 hover:bg-neutral-100'
                  )}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                >
                  {link.label}
                </motion.a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href="#payments"
              className={cn(
                'text-base xl:text-lg font-medium px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap',
                heroMode
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-charcoal-500 hover:text-charcoal-900 hover:bg-neutral-100'
              )}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              For Restaurants
            </motion.a>
            <motion.a
              href="#chefcoin"
              className={cn(
                'inline-flex items-center justify-center text-base xl:text-lg font-medium px-6 py-2.5 rounded-full shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap select-none',
                heroMode
                  ? 'bg-white text-charcoal-900 hover:bg-white/90 hover:shadow-lg'
                  : 'bg-charcoal-900 text-white hover:bg-charcoal-800 hover:shadow-lg'
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              Explore Chef Ranking
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className={cn(
              'md:hidden p-2.5 transition-colors cursor-pointer',
              heroMode ? 'text-white/80 hover:text-white' : 'text-charcoal-600 hover:text-charcoal-900'
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-b border-charcoal-100"
          >
            <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="text-lg font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-neutral-100 py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer select-none border-b border-charcoal-50 last:border-0"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <motion.a
                  href="#payments"
                  className="text-lg font-medium text-charcoal-600 hover:text-charcoal-900 hover:bg-neutral-100 py-2.5 px-4 rounded-full transition-all duration-200 cursor-pointer select-none text-center"
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                >
                  For Restaurants
                </motion.a>
                <motion.a
                  href="#chefcoin"
                  className="inline-flex items-center justify-center bg-charcoal-900 text-white text-lg font-medium px-6 py-4 rounded-full shadow-md hover:bg-charcoal-800 transition-all duration-200 cursor-pointer min-h-[48px] select-none"
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  onClick={() => setMobileOpen(false)}
                >
                  Explore Chef Ranking
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
