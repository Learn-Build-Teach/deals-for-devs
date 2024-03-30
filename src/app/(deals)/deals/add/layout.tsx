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
      <div className="w-full">
        <h1 className="mb-4 text-7xl font-semibold text-white">Share a Deal</h1>
        <span className="text-2xl font-light text-white">
          Have an amazing deal or discount tailored for developers? Let us know!
        </span>
        <Separator className="mb-32 mt-14" />
        <div className="mb-28 flex text-white">
          <StepNavigation />
          {children}
        </div>
      </div>
    </AddDealContextProvider>
  )
}
