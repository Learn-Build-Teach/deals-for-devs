import React from 'react'
import { AddDealContextProvider } from '@/context/AddDealContext'
import PageHeader from '@/components/PageHeader'

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AddDealContextProvider>
      <main className="px-2 lg:px-0">
        <PageHeader
          heading="Share a Deal"
          subheading="Have an amazing deal or discount tailored for developers? Let us know!"
        />

        {children}
      </main>
    </AddDealContextProvider>
  )
}
