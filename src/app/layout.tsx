import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Nav from '@/components/Nav';

export const metadata: Metadata = {
  title: 'Developer Black Friday Deals',
  description: 'The Best Black Friday deals for developers!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-gray-900 min-h-screen">
          <Nav />
          <div className="min-h-screen px-4 sm:px-8 py-12 max-w-6xl mx-auto">
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
