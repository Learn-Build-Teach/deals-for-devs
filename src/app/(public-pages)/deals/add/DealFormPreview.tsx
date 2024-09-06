'use client'
import DealPreview from '@/components/deals/details/DealPreview'
import { useAddDealContext } from '@/context/AddDealContext'
import { DealWithTags } from '@/types/Types'
import React from 'react'

export default function DealFormPreview() {
  const { newDealData } = useAddDealContext()

  return <DealPreview deal={newDealData as unknown as DealWithTags} />
}
