'use client'

import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <Container>
      <PageHeader
        heading="Something went wrong"
        subheading="Unfortunately, an error has occurred. The owner has been notified and will fix it as soon as possible."
      />
    </Container>
  )
}
