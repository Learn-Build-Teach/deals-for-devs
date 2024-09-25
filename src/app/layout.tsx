import type { Metadata } from 'next'
import './globals.css'
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
      <head>
        <PlausibleProvider domain="dealsfordevs.com" />
      </head>
      <body>
        {children}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </body>
    </html>
  )
}
