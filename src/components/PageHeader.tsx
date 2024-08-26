import React from 'react'

export default function PageHeader({
  heading,
  subheading,
}: {
  heading: string
  subheading?: string
}) {
  return (
    <div className="mb-10">
      <h1 className="mb-4 text-4xl font-semibold text-white md:text-7xl">
        {heading}
      </h1>
      {subheading && (
        <span className="text-sm font-light text-white md:text-2xl">
          {subheading}
        </span>
      )}
    </div>
  )
}
