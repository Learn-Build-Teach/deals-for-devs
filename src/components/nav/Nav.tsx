'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { GoSearch } from 'react-icons/go'
import { useSearch } from '../SearchContext'
import NavLink from './NavLink'
import Separator from './Separator'

export default function Nav() {
	const { user, isLoaded } = useUser()
	const { setSearchOpen } = useSearch()

	const isUserAuthenticated = user && isLoaded

	return (
		<header>
			<nav
				className='flex items-center justify-between mb-[153px]'
				aria-label='Global'
			>
				{/* D4D logo */}
				<Link href='/'>
					<Image
						src='/logo-teal.png'
						alt='me'
						height='88'
						width='54'
						className='w-[42px] h-[70px]  md:w-[54px] md:h-[88px]'
					/>
				</Link>

				{/* nav links */}
				<div className=' flex flex-1 flex-row justify-end gap-x-5 items-center gap-y-2'>
					<NavLink href='/deals'>Shop All Deals</NavLink>
					<NavLink href='/deals/add'>Add a deal</NavLink>

					{/* admin dashboard */}
					{isUserAuthenticated && (
						<NavLink href='/dashboard'>Dashboard</NavLink>
					)}

					<Separator />

					{/* search */}
					<button className='text-white' onClick={() => setSearchOpen(true)}>
						<GoSearch className='w-4 h-4 md:w-7 md:h-7' />
					</button>

					{/* user logout */}
					{isUserAuthenticated && (
						<>
							<UserButton afterSignOutUrl='/' />
						</>
					)}
				</div>
			</nav>
		</header>
	)
}
