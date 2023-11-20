import CategoryOptions from '@/components/CategoryOptions';
import React from 'react';

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CategoryOptions />
      {children}
    </div>
  );
}
