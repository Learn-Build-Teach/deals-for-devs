import Link from 'next/link'
import React from 'react'

interface DashboardCardProps {
  children?: React.ReactNode
  heading: string
  href?: string
  linkText?: string
}

export default function DashboardCard({
  children,
  heading,
  href,
  linkText,
}: DashboardCardProps) {
  return (
    <div className="rounded-md bg-gray-800 px-10 py-10">
      <h2 className="mb-10 text-center text-2xl">{heading}</h2>
      {children}
      {href && linkText && (
        <div className="flex justify-end">
          <Link
            className="text-right underline transition-colors hover:text-teal-500"
            href={href}
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  )
}
