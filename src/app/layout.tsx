import type { Metadata } from 'next';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GlobalSearch from '@/components/GlobalSearch';
import { SearchProvider } from '@/components/SearchContext';

export const metadata: Metadata = {
  title: 'Developer Deals',
  description:
    'The Best Black Friday deals on courses, tools, and desk setups for developers!',
  openGraph: {
    images: [
      {
        url: '/logo-wide.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="">
          <div className="bg-gray-900 min-h-screen flex justify-between flex-col">
            <div>
              <SearchProvider>
                <GlobalSearch />
                <Nav />
              </SearchProvider>
              <div className=" px-4 sm:px-8 py-6 pt-1 max-w-6xl mx-auto">
                {children}
              </div>
            </div>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
