import React from 'react'
import { AddDealContextProvider } from '@/context/AddDealContext'
import PageHeader from '@/components/PageHeader'

export default function DealsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AddDealContextProvider>{children}</AddDealContextProvider>
}
