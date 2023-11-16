import React from 'react';
import DealForm from './DealForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add a Black Friday Deal',
  description: 'Share the best deals that you know developers will love!',
};
export default function AddDealPage() {
  return (
    <main className="">
      <h1 className="text-4xl font-bold mb-10 text-gray-100 text-center">
        Share a deal?
      </h1>
      <DealForm />
    </main>
  );
}
