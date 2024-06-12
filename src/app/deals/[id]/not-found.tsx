import PageHeader from '@/components/PageHeader'
import Link from 'next/link'
import React from 'react'

export default function Deal404() {
  return (
    <div>
      <div className="pb-10">
        <PageHeader title="Deal not found" />
        <Link className="text-lg text-white underline" href="/deals">
          Back to all deals
        </Link>
      </div>
    </div>
  )
}
