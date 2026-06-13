interface ChefHatIconProps {
  className?: string;
  strokeWidth?: number;
}

/**
 * ChefDex brand mark — stroke-based chef hat (toque blanche).
 *
 * Geometry (48×48 viewBox):
 *
 *   DRAWING ORDER (back → front):
 *   1. Left C-hook  — cubic bezier swings hard left, returns with inward hook
 *   2. Right C-hook — mirror of left
 *   3. Center arch  — large inverted-U, drawn on top; visually covers the
 *                     hook connection points so hooks appear to emerge
 *                     from behind the center dome
 *   4. Brim         — short rounded horizontal line below the arches
 *
 *   Left hook:  M 17,18  C 5,16  5,40  17,42
 *   Right hook: M 31,18  C 43,16 43,40 31,42
 *   Center arch: M 16,42 C 16,4  32,4  32,42   (tallest, dominant)
 *   Brim:        M 12,46 L 36,46
 *
 * Uses currentColor for stroke — control color via Tailwind text-* utilities.
 * strokeWidth prop lets callers increase weight for small/dark contexts.
 */
export default function ChefHatIcon({ className, strokeWidth = 4 }: ChefHatIconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Left C-hook — drawn first (behind center arch) */}
      <path
        d="M17,18 C5,16 5,40 17,42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Right C-hook — mirror of left */}
      <path
        d="M31,18 C43,16 43,40 31,42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center arch — drawn on top, covers hook endpoints */}
      <path
        d="M16,42 C16,4 32,4 32,42"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Brim */}
      <path
        d="M12,46 L36,46"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  );
}
