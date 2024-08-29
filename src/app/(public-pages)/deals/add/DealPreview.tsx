'use client'
import DealDetails from '@/components/deals/details/DealDetails'
import { useAddDealContext } from '@/context/AddDealContext'
import { DealWithTags } from '@/types/Types'
import React from 'react'

export default function DealPreview() {
  const { newDealData } = useAddDealContext()

  return <DealDetails deal={newDealData as unknown as DealWithTags} />
}
