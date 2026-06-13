'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'ChefCoin', href: '#chefcoin' },
  { label: 'Payments', href: '#payments' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Team', href: '#team' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/92 backdrop-blur-md border-b border-charcoal-100 shadow-sm'
          : 'bg-transparent'
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
              <Image src="/logo.jpg" alt="ChefDex" width={36} height={36} className="w-full h-full object-contain" />
            </motion.span>
            <span className="font-semibold text-charcoal-900 text-2xl md:text-3xl tracking-tight">
              ChefDex
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-base xl:text-lg font-medium text-charcoal-500 hover:text-charcoal-900 hover:bg-neutral-100 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none"
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
              >
                {link.label}
              </motion.a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <motion.a
              href="#payments"
              className="text-base xl:text-lg font-medium text-charcoal-500 hover:text-charcoal-900 hover:bg-neutral-100 px-4 py-2 rounded-full transition-all duration-200 cursor-pointer select-none whitespace-nowrap"
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              For Restaurants
            </motion.a>
            <motion.a
              href="#chefcoin"
              className="inline-flex items-center justify-center bg-charcoal-900 text-white text-base xl:text-lg font-medium px-6 py-2.5 rounded-full shadow-md hover:bg-charcoal-800 hover:shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap select-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              Explore Chef Ranking
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2.5 text-charcoal-600 hover:text-charcoal-900 transition-colors cursor-pointer"
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
