import React from 'react'
import { AddDealContextProvider } from '@/context/AddDealContext'
import Separator from '@/components/Separator'
import StepNavigation from '@/components/forms/add-a-deal/StepNavigation'
import PageHeader from '@/components/PageHeader'

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AddDealContextProvider>
      <div className="w-full px-2 lg:px-0">
        <PageHeader
          title="Share a Deal"
          subtitle="Have an amazing deal or discount tailored for developers? Let us know!"
        />

        <Separator className="mx-0 mb-4 mt-8 lg:mb-32 lg:mt-14" />
        <div className="mb-28 flex flex-col gap-x-10 text-white lg:flex-row">
          <StepNavigation />
          {children}
        </div>
      </div>
    </AddDealContextProvider>
  )
}
