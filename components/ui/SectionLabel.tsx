import { cn } from '@/lib/utils';

interface SectionLabelProps {
  children: string;
  className?: string;
}

export default function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] uppercase text-gold-600">
        <span className="w-4 h-px bg-gold-400" />
        {children}
        <span className="w-4 h-px bg-gold-400" />
      </span>
    </div>
  );
}
