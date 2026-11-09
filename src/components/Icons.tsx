type IconProps = { size?: number; className?: string }

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export function CalculatorIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="2.5" width="16" height="19" rx="2.6" />
      <path d="M7.5 6.5h9" />
      <path d="M8 11h.01M12 11h.01M16 11h.01M8 14.5h.01M12 14.5h.01M16 14.5h.01M8 18h.01M12 18h.01M16 18h.01" />
    </svg>
  )
}

export function WaveIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M2 13h3.5l2-6 3 11 2.5-8 2 5H22" />
    </svg>
  )
}

export function StarIcon({ size, className, preenchido = false }: IconProps & { preenchido?: boolean }) {
  return (
    <svg {...base(size)} className={className} fill={preenchido ? 'currentColor' : 'none'}>
      <path d="M12 3.2l2.65 5.4 5.95.86-4.3 4.2 1.02 5.93L12 16.79l-5.32 2.8 1.02-5.93-4.3-4.2 5.95-.86z" />
    </svg>
  )
}

export function InfoIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 11v5.2M12 7.6h.01" />
    </svg>
  )
}

export function SearchIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M16.2 16.2L21 21" />
    </svg>
  )
}

export function ChevronRightIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

export function ChevronLeftIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M15 5l-7 7 7 7" />
    </svg>
  )
}

export function ChevronDownIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 9l7 7 7-7" />
    </svg>
  )
}

export function SunIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.2M12 19.8V22M4.93 4.93l1.56 1.56M17.51 17.51l1.56 1.56M2 12h2.2M19.8 12H22M4.93 19.07l1.56-1.56M17.51 6.49l1.56-1.56" />
    </svg>
  )
}

export function MoonIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M20.5 14.2A8.5 8.5 0 019.8 3.5a8.5 8.5 0 1010.7 10.7z" />
    </svg>
  )
}

export function AlertIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M10.3 3.9L2.6 17.2A2 2 0 004.3 20h15.4a2 2 0 001.7-2.8L13.7 3.9a2 2 0 00-3.4 0z" />
      <path d="M12 9v4.5M12 17h.01" />
    </svg>
  )
}

export function BookIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5z" />
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    </svg>
  )
}

export function CopyIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="9" y="9" width="12" height="12" rx="2.4" />
      <path d="M5 15H4a1 1 0 01-1-1V4a1 1 0 011-1h10a1 1 0 011 1v1" />
    </svg>
  )
}

export function CheckIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export function ExternalIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M14 4h6v6M20 4l-9 9" />
      <path d="M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5" />
    </svg>
  )
}

export function UserCheckIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="9" cy="8" r="3.6" />
      <path d="M2.8 20c.6-3.3 3.2-5.3 6.2-5.3 1.3 0 2.5.4 3.5 1.1" />
      <path d="M15 18.5l2 2 4-4.5" />
    </svg>
  )
}

export function ShieldIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 2.5l7.5 3v5.8c0 4.6-3.1 8.3-7.5 9.7-4.4-1.4-7.5-5.1-7.5-9.7V5.5z" />
      <path d="M8.8 12l2.2 2.2 4.4-4.4" />
    </svg>
  )
}

export function LungsIcon({ size, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 4v7.5" />
      <path d="M12 8.5c-1.8 0-3 1.3-3 3.1V17a2.5 2.5 0 004.9.7" />
      <path d="M12 8.5c1.8 0 3 1.3 3 3.1V17a2.5 2.5 0 01-4.9.7" />
      <path d="M6 12.1c-1.9 1-3 2.7-3 4.5 0 2.4 1.6 4.4 3.8 4.4H8" />
      <path d="M18 12.1c1.9 1 3 2.7 3 4.5 0 2.4-1.6 4.4-3.8 4.4H16" />
    </svg>
  )
}
