import { cn } from '@/lib/utils'

export default function Separator({ className }: { className?: string }) {
  return (
    <div className={cn('mx-6 border border-white/[.31] md:mx-0 ', className)} />
  )
}
