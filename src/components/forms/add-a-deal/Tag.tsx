import React from 'react'
import { FaTimes } from 'react-icons/fa'

interface TagProps {
  text: string
  handleDelete?: (text: string) => void
}
export default function Tag({ text, handleDelete }: TagProps) {
  return (
    <span className="border-1 flex items-center gap-x-1 rounded-2xl bg-gray-800 px-3 py-2">
      <span>{text}</span>
      {handleDelete && (
        <button
          onClick={() => handleDelete(text)}
          type="button"
          className=" text-gray-400 transition-colors hover:text-white"
          aria-label="Close"
        >
          <FaTimes className="h-4" />
        </button>
      )}
    </span>
  )
}
