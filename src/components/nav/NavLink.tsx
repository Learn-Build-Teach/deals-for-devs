import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavLinkProps {
	href: string
	className?: string
	children: React.ReactNode
}

export default function NavLink({ href, children, className }: NavLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				'text-sm leading-5 md:text-2xl text-white md:leading-9 hover:underline',
				className
			)}
		>
			{children}
		</Link>
	)
}
