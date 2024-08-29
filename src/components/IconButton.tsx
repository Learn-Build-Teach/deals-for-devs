import React from 'react'

export default function IconButton({
  handleClick,
  children,
}: {
  handleClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      className="text-brand bg-surface-1  hover:bg-surface-2 flex h-10 w-10 items-center justify-center rounded-full text-xs transition-transform hover:-translate-y-0.5"
      onClick={handleClick}
    >
      {children}
    </button>
  )
}
