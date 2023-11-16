import React from 'react';
import MyLink from './MyLink';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-gray-800 p-8">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-bold text-lg text-gray-200">
          {' '}
          Built with{' '}
          <MyLink text="Next.js 14" isFancy={true} href="https://nextjs.org/" />
          , <MyLink text="Xata" isFancy={true} href="https://xata.io/" />,{' '}
          <MyLink text="Sentry" isFancy={true} href="https://sentry.io/" />, and
          <MyLink text="Clerk" isFancy={true} href="https://clerk.dev/" />
        </p>
        <Link className="text-gray-200" href="https://jamesqquick.com/">
          @jamesqquick
        </Link>
      </div>
    </div>
  );
}
