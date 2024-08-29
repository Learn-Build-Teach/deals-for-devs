import React from 'react'
import PageHeader from '../PageHeader'
import Section from '../Section'

interface DashboardCardProps {
  children?: React.ReactNode
  heading: string
}

export default function DashboardCard({
  children,
  heading,
}: DashboardCardProps) {
  return (
    <Section>
      <PageHeader heading={heading} />
      {children}
    </Section>
  )
}
