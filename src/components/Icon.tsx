'use client'

interface IconProps {
  id: string
  size: number
  className?: string
}

export default function Icon({ id, size, className }: IconProps): JSX.Element {
  return (
    <svg width={size} height={size} className={className}>
      <use href={`/icons/sprite.svg#${id}`} />
    </svg>
  )
}
