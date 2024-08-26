import React from 'react'
import PageHeader from '../PageHeader'

interface DashboardCardProps {
  children?: React.ReactNode
  heading: string
}

export default function DashboardCard({
  children,
  heading,
}: DashboardCardProps) {
  return (
    <section>
      <PageHeader heading={heading} />
      {children}
    </section>
  )
}
