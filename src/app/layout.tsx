import './globals.css'
import { SearchProvider } from '@/components/SearchContext'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import Footer from '@/components/Footer'
import GlobalSearch from '@/components/GlobalSearch'
import Nav from '@/components/nav/Nav'
import type { Metadata } from 'next'

import { Raleway } from 'next/font/google'
const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Developer Deals',
  metadataBase: new URL('https://dealsfordevs.com/'),
  description: 'The best deals and giveaways for developers!',
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
    <html lang="en" className={raleway.className}>
      <Suspense>
        <PostHogPageview />
      </Suspense>
      <PHProvider>
        <body className="">
          <div className="flex min-h-screen flex-col justify-between bg-gray-900">
            <div className="mx-auto w-full max-w-screen-2xl pt-5 md:px-24 xl:pt-20">
              <SearchProvider>
                <GlobalSearch />
                <Nav />
              </SearchProvider>
              <div>{children}</div>
            </div>
            <Footer />
          </div>
          <SpeedInsights />
          <Analytics />
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </body>
      </PHProvider>
    </html>
  )
}
