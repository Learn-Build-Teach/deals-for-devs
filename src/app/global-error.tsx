'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import Container from '@/components/Container'
import PageHeader from '@/components/PageHeader'
import NextError from 'next/error'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <Container>
          <main className="mx-auto max-w-7xl">
            <PageHeader
              heading="Something went wrong"
              subheading="Unfortunately, something went wrong. Please try again."
            />
          </main>
        </Container>
        <NextError statusCode={0} />
      </body>
    </html>
  )
}
