import React from 'react'

interface DashboardCardProps {
  children?: React.ReactNode
  heading: string
}

export default function DashboardCard({
  children,
  heading,
}: DashboardCardProps) {
  return (
    <div className="rounded-md bg-gray-800 px-10 py-10">
      <h2 className="mb-10 text-center text-2xl">{heading}</h2>
      {children}
    </div>
  )
}
