import React from 'react'
import { AddDealContextProvider } from '@/context/AddDealContext'
import Separator from '@/components/Separator'
import StepNavigation from '@/components/forms/add-a-deal/StepNavigation'

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AddDealContextProvider>
      <div className="w-full px-6 md:px-0">
        <h1 className="mb-4 text-4xl font-semibold text-white md:text-7xl">
          Share a Deal
        </h1>
        <span className="text-sm font-light text-white md:text-2xl">
          Have an amazing deal or discount tailored for developers? Let us know!
        </span>
        <Separator className="mx-0 mb-4 mt-8 md:mb-32 md:mt-14" />
        <div className="mb-28 flex flex-col gap-x-10 text-white lg:flex-row">
          <StepNavigation />
          {children}
        </div>
      </div>
    </AddDealContextProvider>
  )
}
