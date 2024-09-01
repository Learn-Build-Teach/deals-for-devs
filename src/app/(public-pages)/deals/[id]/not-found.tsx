import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import Link from 'next/link'
import React from 'react'

export default function Deal404() {
  return (
    <Container className="pb-10">
      <main>
        <PageHeader heading="Deal not found" />
        <Link className="text-lg text-white underline" href="/deals">
          Back to all deals
        </Link>
      </main>
    </Container>
  )
}
