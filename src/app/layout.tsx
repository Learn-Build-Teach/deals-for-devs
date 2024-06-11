import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import Nav from '@/components/nav/Nav'
import Footer from '@/components/Footer'
import GlobalSearch from '@/components/GlobalSearch'
import { SearchProvider } from '@/components/SearchContext'
import { Toaster } from 'react-hot-toast'
import PlausibleProvider from 'next-plausible'
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
    <html lang="en" className={raleway.className}>
      <head>
        <PlausibleProvider domain="dealsfordevs.com" />
      </head>

      <body className="">
        <ClerkProvider>
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
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        </ClerkProvider>
      </body>
    </html>
  )
}
