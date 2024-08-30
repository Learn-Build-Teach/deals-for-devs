import React from 'react'
import LoadingTag from './LoadingTag'

export default function LoadingTagsList() {
  const arr = Array.from(Array(3).keys())

  return (
    <div className="flex flex-wrap gap-x-2 gap-y-4">
      {arr.map((tag, index) => (
        <LoadingTag key={index} />
      ))}
    </div>
  )
}
