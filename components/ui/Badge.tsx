import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'gold' | 'dark' | 'light';
  className?: string;
}

export default function Badge({ children, variant = 'gold', className }: BadgeProps) {
  const variants = {
    gold: 'bg-gold-50 text-gold-700 border border-gold-200',
    dark: 'bg-charcoal-900 text-white',
    light: 'bg-charcoal-50 text-charcoal-600 border border-charcoal-100',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
