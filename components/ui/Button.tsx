'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className,
  onClick,
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-charcoal-900 text-white hover:bg-charcoal-800 focus-visible:ring-charcoal-900 shadow-sm hover:shadow-md',
    secondary:
      'border border-gold-500 text-gold-600 hover:bg-gold-50 focus-visible:ring-gold-500 bg-white',
    ghost:
      'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50 focus-visible:ring-charcoal-500',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2',
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={classes}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
