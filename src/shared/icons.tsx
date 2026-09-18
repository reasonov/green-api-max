import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

export function LogoIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 32 32" width={32} height={32} fill="none" aria-hidden="true" {...props}>
      <rect width="32" height="32" rx="8" fill="#3D8BFF" />
      <path
        d="M8 11.5C8 9.567 9.567 8 11.5 8h9C22.433 8 24 9.567 24 11.5v7c0 1.933-1.567 3.5-3.5 3.5h-4.3L12 25.2V22H11.5C9.567 22 8 20.433 8 18.5v-7Z"
        fill="white"
      />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

export function SendIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="m5 12 14-7-4 14-3-4-7-3Z" />
      <path d="m12 15 3-3" />
    </svg>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M10 7H7a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3" />
      <path d="M15 12H9" />
      <path d="m13 9 3 3-3 3" />
    </svg>
  )
}

export function BackIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M15 6 9 12l6 6" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} aria-hidden="true" {...props}>
      <path d="M7 7 17 17M17 7 7 17" />
    </svg>
  )
}
