import { cn } from '@/lib/utils'

export default function Separator({ className }: { className?: string }) {
  return <div className={cn('border border-white/[.31] ', className)} />
}
