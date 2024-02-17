import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import GlobalSearch from '@/components/GlobalSearch'
import { SearchProvider } from '@/components/SearchContext'
import { Suspense } from 'react'
import { PHProvider, PostHogPageview } from './providers'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'

import { Raleway } from 'next/font/google'
const raleway = Raleway({
	subsets: ['latin'],
	display: 'swap',
})

export const metadata: Metadata = {
	title: 'Developer Deals',
	metadataBase: new URL('https://dealsfordevs.com/'),
	description:
		'The Best Black Friday deals on courses, tools, and desk setups for developers!',
	openGraph: {
		images: [
			{
				url: '/logo-wide.png',
			},
		],
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<ClerkProvider>
			<html lang='en' className={raleway.className}>
				<Suspense>
					<PostHogPageview />
				</Suspense>
				<PHProvider>
					<body className=''>
						<div className='bg-gray-900 min-h-screen flex justify-between flex-col'>
							<div className='px-6 pt-5 md:px-24 md:pt-[84px]'>
								<SearchProvider>
									<GlobalSearch />
									<Nav />
								</SearchProvider>
								<div className=' px-4 sm:px-8 py-6 pt-1 max-w-6xl mx-auto'>
									{children}
								</div>
							</div>
							<Footer />
						</div>
						<SpeedInsights />
						<Analytics />
						<Toaster position='top-center' toastOptions={{ duration: 5000 }} />
					</body>
				</PHProvider>
			</html>
		</ClerkProvider>
	)
}
